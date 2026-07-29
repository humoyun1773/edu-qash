export interface PendingContentItem {
  id: string;
  type: 'course' | 'quiz' | 'review' | 'center';
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContentReportItem {
  id: string;
  contentType: 'comment' | 'course' | 'user';
  contentId: string;
  reportedBy: string;
  reason: string;
  createdAt: string;
}

export interface ModerationActionPayload {
  itemId: string;
  action: 'approve' | 'reject';
  reason?: string;
}
