import { useState, useEffect, useCallback } from 'react';
import { superAdminService } from '../constants/superAdmin.service';
import type { SystemLogItem, GlobalSettings, TenantItem, UpdateGlobalSettingsPayload } from '../constants/superAdmin.type';

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
      const [lData, sData, tData] = await Promise.all([
        superAdminService.getLogs(),
        superAdminService.getGlobalSettings(),
        superAdminService.getTenants()
      ]);
      setLogs(lData);
      setSettings(sData);
      setTenants(tData);
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
      const updated = await superAdminService.updateGlobalSettings(payload);
      setSettings(updated);
      return updated;
    } catch (err: any) {
      setError(err.message || 'Sozlamalarni yangilashda xatolik');
      throw err;
    }
  };

  const deleteTenant = async (id: string) => {
    try {
      await superAdminService.deleteTenant(id);
      setTenants(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message || 'Tenantni o\'chirishda xatolik');
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
