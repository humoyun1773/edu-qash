import { useState, useEffect, useCallback } from 'react';

export interface SystemLogItem {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
}

export interface GlobalSettings {
  siteName: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
}

export interface TenantItem {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'suspended';
}

export type UpdateGlobalSettingsPayload = Partial<GlobalSettings>;

const MOCK_LOGS: SystemLogItem[] = [
  { id: 'l1', level: 'info', message: 'System updated successfully', timestamp: 'Hozir' }
];

const MOCK_SETTINGS: GlobalSettings = {
  siteName: 'Eduqash Platform',
  maintenanceMode: false,
  allowRegistrations: true
};

const MOCK_TENANTS: TenantItem[] = [
  { id: 't1', name: 'Tashkent Branch', subdomain: 'tashkent', status: 'active' }
];

export const useSuperAdmin = () => {
  const [logs, setLogs] = useState<SystemLogItem[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuperAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLogs(MOCK_LOGS);
      setSettings(MOCK_SETTINGS);
      setTenants(MOCK_TENANTS);
    } catch (err: any) {
      setError(err.message || 'Super Admin ma\'lumotlarini yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuperAdminData();
  }, [fetchSuperAdminData]);

  const updateSettings = async (payload: UpdateGlobalSettingsPayload) => {
    try {
      const updated = { ...MOCK_SETTINGS, ...payload };
      setSettings(updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Sozlamalarni yangilashda xatolik');
      throw err;
    }
  };

  const deleteTenant = async (id: string) => {
    try {
      setTenants(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message || "Tenantni o'chirishda xatolik");
      throw err;
    }
  };

  return {
    logs,
    settings,
    tenants,
    loading,
    error,
    refetch: fetchSuperAdminData,
    updateSettings,
    deleteTenant
  };
};
