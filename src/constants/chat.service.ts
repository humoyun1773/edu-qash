import { api } from '../services/api';
import { API_ENDPOINTS } from './apiEndpoints';
import type { ChatThreadItem, ChatMessageItem, SendChatMessagePayload } from './chat.type';
import { MOCK_CHATS } from '../data/mockData';

export const chatService = {
  // GET: Fetch all active chat threads
  getThreads: async (): Promise<ChatThreadItem[]> => {
    try {
      const data = await api.get<ChatThreadItem[]>(API_ENDPOINTS.CHAT.THREADS);
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return MOCK_CHATS;
    }
  },

  // GET: Fetch messages for a specific thread
  getMessages: async (threadId: string): Promise<ChatMessageItem[]> => {
    try {
      const data = await api.get<ChatMessageItem[]>(API_ENDPOINTS.CHAT.MESSAGES(threadId));
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      const thread = MOCK_CHATS.find(t => t.id === threadId);
      return thread ? thread.messages : [];
    }
  },

  // POST: Send text message
  sendMessage: async (payload: SendChatMessagePayload): Promise<ChatMessageItem> => {
    try {
      return await api.post<ChatMessageItem>(API_ENDPOINTS.CHAT.MESSAGES(payload.threadId), { text: payload.text });
    } catch {
      return {
        id: `m_${Date.now()}`,
        senderId: 'usr_student_1',
        senderName: 'Shahzod',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        text: payload.text,
        timestamp: 'Hozir',
        isMe: true
      };
    }
  },

  // POST: Send voice message
  sendVoiceMessage: async (threadId: string, audioBlob: Blob): Promise<ChatMessageItem> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice.webm');
      return await api.post<ChatMessageItem>(API_ENDPOINTS.CHAT.VOICE(threadId), formData);
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
