
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  groundingSources?: GroundingSource[];
  image?: string;
  modelUsed?: 'Pro' | 'Flash';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export type ModelMode = 'pro' | 'flash';

export interface PanelField {
  key: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'file';
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  cols?: number; // 1 or 2
}

export interface PanelConfig {
  title: string;
  subtitle: string;
  icon: string;
  color: string; // Tailwind color name e.g. 'sky', 'rose'
  fields: PanelField[];
  submitLabel: string;
  submitIcon?: string;
  promptTemplate: (values: any) => string;
  systemInstruction?: (values: any) => string;
}
