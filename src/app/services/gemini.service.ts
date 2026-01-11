
import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";
import { Message, GroundingSource, ModelMode } from '../types';

declare const process: any;

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private getClient() {
    // Safety check for process.env
    let apiKey = '';
    try {
      if (typeof process !== 'undefined' && process.env) {
        apiKey = process.env['API_KEY'] || '';
      }
    } catch (e) {
      console.error("Error accessing environment variables", e);
    }

    if (!apiKey) {
      console.warn("API Key not found in process.env. Ensure it is set in Vercel Environment Variables.");
      // Fallback or empty string to prevent immediate crash, though calls will fail
    }
    return new GoogleGenAI({ apiKey });
  }

  async generateResponse(
    history: Message[],
    currentPrompt: string,
    imageBase64: string | undefined,
    mode: ModelMode,
    customSystemInstruction?: string
  ): Promise<{ text: string; sources: GroundingSource[] }> {
    const ai = this.getClient();
    const modelName = 'gemini-2.5-flash';

    let systemInstruction = `
      أنت "21UMAS ${mode === 'pro' ? 'PRO' : 'FLASH'}"، المساعد الطبي الرسمي لجامعة 21 سبتمبر.
      الوضع الحالي: ${mode === 'pro' ? 'استدلال عميق (Deep Reasoning)' : 'سرعة فائقة (High Speed)'}
      المهام: تحليل الصور، التشخيص، الدواء.
      اللغة: العربية الطبية.
    `;

    if (customSystemInstruction) {
      systemInstruction = customSystemInstruction;
    }

    try {
      const currentParts: any[] = [{ text: currentPrompt }];
      
      if (imageBase64) {
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        currentParts.unshift({
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        });
      }

      const contents = [
        ...history.filter(m => !m.isThinking).map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user',
          parts: currentParts
        }
      ];

      const config: any = {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      };

      if (mode === 'flash') {
         config.thinkingConfig = { thinkingBudget: 0 };
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: config
      });

      const text = response.text || "عذراً، لا توجد استجابة.";
      
      const sources: GroundingSource[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri && chunk.web?.title) {
            sources.push({
              title: chunk.web.title,
              uri: chunk.web.uri
            });
          }
        });
      }

      return { text, sources };

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
}
