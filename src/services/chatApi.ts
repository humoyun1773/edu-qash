import { api } from './api';
import type { ChatThread, ChatMessage } from '../types';

export const chatApi = {
  getThreads: async (): Promise<ChatThread[]> => {
    try {
      const data: any = await api.get('/chat/conversations/');
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  },

  getMessages: async (threadId: string): Promise<ChatMessage[]> => {
    try {
      const data: any = await api.get(`/chat/messages/?conversation=${threadId}`);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  },

  sendMessage: async (threadId: string, text: string): Promise<ChatMessage> => {
    return await api.post<ChatMessage>(`/chat/messages/`, { conversation: threadId, text });
  },

  sendVoiceMessage: async (threadId: string, audioBlob: Blob): Promise<ChatMessage> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice.webm');
    formData.append('conversation', threadId);
    return await api.post<ChatMessage>(`/chat/messages/`, formData);
  }
};
