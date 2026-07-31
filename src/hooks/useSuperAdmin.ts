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

const DEFAULT_SETTINGS: GlobalSettings = {
  siteName: 'Eduqash Platform',
  maintenanceMode: false,
  allowRegistrations: true
};

export const useSuperAdmin = () => {
  const [logs, setLogs] = useState<SystemLogItem[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(DEFAULT_SETTINGS);
  const [tenants, setTenants] = useState<TenantItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuperAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLogs([]);
      setSettings(DEFAULT_SETTINGS);
      setTenants([]);
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
      const updated = { ...DEFAULT_SETTINGS, ...settings, ...payload };
      setSettings(updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Tizim sozlamalarini yangilashda xatolik');
      throw err;
    }
  };

  const createTenant = async (tenant: { name: string; subdomain: string }) => {
    try {
      const newTenant: TenantItem = {
        id: `tenant_${Date.now()}`,
        name: tenant.name,
        subdomain: tenant.subdomain,
        status: 'active'
      };
      setTenants(prev => [newTenant, ...prev]);
      return newTenant;
    } catch (err: any) {
      setError(err.message || 'Tashkilot yaratishda xatolik');
      throw err;
    }
  };

  return {
    logs,
    settings,
    tenants,
    loading,
    error,
    updateSettings,
    createTenant,
    refetch: fetchSuperAdminData
  };
};
