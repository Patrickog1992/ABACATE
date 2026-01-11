export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DIVIDER = 'divider',
}

export enum Sender {
  BOT = 'bot',
  USER = 'user',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  type: MessageType;
  sender: Sender;
  content?: string; // Text content or URL for media
  mediaUrl?: string;
  list?: string[]; // For bullet points
}

export interface UserData {
  name: string;
  age: string;
  symptoms: string;
}

export interface StepConfig {
  messages: Message[];
  inputType?: 'text' | 'number' | 'button';
  inputLabel?: string; // Placeholder or button label
  nextStepDelay?: number; // Auto advance after X ms
  waitForAudio?: boolean; // Wait for audio to finish before next step
}