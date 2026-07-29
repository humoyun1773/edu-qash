export interface SystemLogItem {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  ip: string;
}

export interface GlobalSettings {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxUploadMB: number;
  systemName: string;
  supportEmail: string;
}

export interface TenantItem {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
}

export interface UpdateGlobalSettingsPayload {
  maintenanceMode?: boolean;
  allowRegistration?: boolean;
  maxUploadMB?: number;
  systemName?: string;
  supportEmail?: string;
}
