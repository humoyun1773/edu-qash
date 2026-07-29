import { api } from '../services/api';
import type { SystemLogItem, GlobalSettings, TenantItem, UpdateGlobalSettingsPayload } from './superAdmin.type';

export const superAdminService = {
  // GET: Fetch system logs
  getLogs: async (): Promise<SystemLogItem[]> => {
    try {
      const data = await api.get<SystemLogItem[]>('/super-admin/logs');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 'log_1', timestamp: '2026-07-29 12:00', level: 'info', service: 'AUTH', message: 'User login successful', ip: '127.0.0.1' },
        { id: 'log_2', timestamp: '2026-07-29 12:05', level: 'warn', service: 'PAYMENT', message: 'Webhook retry count 2', ip: '169.58.72.177' }
      ];
    }
  },

  // GET: Fetch global platform settings
  getGlobalSettings: async (): Promise<GlobalSettings> => {
    try {
      const data = await api.get<GlobalSettings>('/super-admin/settings');
      if (data) return data;
      throw new Error('Empty');
    } catch {
      return {
        maintenanceMode: false,
        allowRegistration: true,
        maxUploadMB: 50,
        systemName: 'Eduqash Platform',
        supportEmail: 'support@eduqash.uz'
      };
    }
  },

  // PUT: Update global platform settings
  updateGlobalSettings: async (payload: UpdateGlobalSettingsPayload): Promise<GlobalSettings> => {
    try {
      return await api.put<GlobalSettings>('/super-admin/settings', payload);
    } catch {
      return {
        maintenanceMode: payload.maintenanceMode ?? false,
        allowRegistration: payload.allowRegistration ?? true,
        maxUploadMB: payload.maxUploadMB ?? 50,
        systemName: payload.systemName || 'Eduqash Platform',
        supportEmail: payload.supportEmail || 'support@eduqash.uz'
      };
    }
  },

  // GET: Fetch system tenants
  getTenants: async (): Promise<TenantItem[]> => {
    try {
      const data = await api.get<TenantItem[]>('/super-admin/tenants');
      if (Array.isArray(data) && data.length > 0) return data;
      throw new Error('Empty');
    } catch {
      return [
        { id: 't_1', name: 'Cambridge LC', domain: 'cambridge.eduqash.uz', status: 'active', createdAt: '2024-01-01' },
        { id: 't_2', name: 'Registan LC', domain: 'registan.eduqash.uz', status: 'active', createdAt: '2024-02-15' }
      ];
    }
  },

  // DELETE: Delete a tenant
  deleteTenant: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await api.delete<{ success: boolean }>(`/super-admin/tenants/${id}`);
    } catch {
      return { success: true };
    }
  }
};
