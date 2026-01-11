
import { Injectable, signal } from '@angular/core';
import { Message, ModelMode } from '../types';
import { GeminiService } from './gemini.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  messages = signal<Message[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  mode = signal<ModelMode>('pro');

  constructor(private gemini: GeminiService, private router: Router) {}

  async sendMessage(text: string, image?: string | null, customSystemInstruction?: string) {
    if ((!text.trim() && !image) || this.isLoading()) return;

    this.router.navigate(['/dashboard']);

    const currentMode = this.mode();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      image: image || undefined,
      timestamp: new Date(),
    };

    this.messages.update(prev => [...prev, userMessage]);
    this.isLoading.set(true);
    this.error.set(null);

    const thinkingId = (Date.now() + 1).toString();
    this.messages.update(prev => [...prev, {
      id: thinkingId,
      role: 'model',
      content: '',
      timestamp: new Date(),
      isThinking: true,
      modelUsed: currentMode === 'pro' ? 'Pro' : 'Flash'
    }]);

    try {
      const { text: responseText, sources } = await this.gemini.generateResponse(
        this.messages().filter(m => m.id !== thinkingId),
        userMessage.content,
        image || undefined,
        currentMode,
        customSystemInstruction
      );
      
      this.messages.update(prev => prev.map(msg => {
        if (msg.id === thinkingId) {
          return {
            ...msg,
            content: responseText,
            isThinking: false,
            groundingSources: sources,
            modelUsed: currentMode === 'pro' ? 'Pro' : 'Flash'
          };
        }
        return msg;
      }));
    } catch (err: any) {
      this.error.set(err.message || 'خطأ في الاتصال بالنظام.');
      this.messages.update(prev => prev.filter(msg => msg.id !== thinkingId));
    } finally {
      this.isLoading.set(false);
    }
  }

  setMode(m: ModelMode) {
    this.mode.set(m);
  }
}
