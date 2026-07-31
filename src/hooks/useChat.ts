import { useState, useEffect, useCallback } from 'react';
import { chatApi } from '../services/chatApi';
import type { ChatThread } from '../types';

export const useChat = () => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThreads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatApi.getThreads();
      setThreads(data);
      if (data.length > 0 && !activeThreadId) {
        setActiveThreadId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Chatlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, [activeThreadId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const sendMessage = async (threadId: string, text: string) => {
    try {
      const newMsg = await chatApi.sendMessage(threadId, text);
      setThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            messages: [...(t.messages || []), newMsg]
          };
        }
        return t;
      }));
      return newMsg;
    } catch (err: any) {
      setError(err.message || 'Xabar yuborishda xatolik');
      throw err;
    }
  };

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  return {
    threads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    loading,
    error,
    refetch: fetchThreads,
    sendMessage
  };
};
