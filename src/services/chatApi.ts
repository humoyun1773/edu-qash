import { api } from './api';
import type { ChatThread, ChatMessage } from '../types';
import { MOCK_CHATS } from '../data/mockData';

export const chatApi = {
  getThreads: async (): Promise<ChatThread[]> => {
    try {
      const data = await api.get<ChatThread[]>('/chat/threads');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info('[chatApi] GET /chat/threads fallback.');
      return MOCK_CHATS;
    }
  },

  getMessages: async (threadId: string): Promise<ChatMessage[]> => {
    try {
      const data = await api.get<ChatMessage[]>(`/chat/threads/${threadId}/messages`);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch (err) {
      console.info(`[chatApi] GET /chat/threads/${threadId}/messages fallback.`);
      const thread = MOCK_CHATS.find(t => t.id === threadId);
      return thread ? thread.messages : [];
    }
  },

  sendMessage: async (threadId: string, text: string): Promise<ChatMessage> => {
    try {
      return await api.post<ChatMessage>(`/chat/threads/${threadId}/messages`, { text });
    } catch {
      return {
        id: `m_${Date.now()}`,
        senderId: 'usr_student_1',
        senderName: 'Shahzod',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        text,
        timestamp: 'Hozir',
        isMe: true
      };
    }
  },

  sendVoiceMessage: async (threadId: string, audioBlob: Blob): Promise<ChatMessage> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice.webm');
      return await api.post<ChatMessage>(`/chat/threads/${threadId}/voice`, formData);
    } catch {
      return {
        id: `m_${Date.now()}`,
        senderId: 'usr_student_1',
        senderName: 'Shahzod',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        text: '🎤 Ovozli xabar',
        attachmentType: 'voice',
        timestamp: 'Hozir',
        isMe: true
      };
    }
  }
};
