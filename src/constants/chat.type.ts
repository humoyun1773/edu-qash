export interface ChatMessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf' | 'voice';
  timestamp: string;
  isMe: boolean;
}

export interface ChatThreadItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessageItem[];
}

export interface SendChatMessagePayload {
  threadId: string;
  text: string;
}
