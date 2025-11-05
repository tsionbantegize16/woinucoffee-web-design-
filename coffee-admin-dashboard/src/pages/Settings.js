import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase.from('settings').select('*');
      const settingsObj = {};
      data?.forEach(s => { settingsObj[s.key] = s.value; });
      setSettings(settingsObj);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key, value) => {
    try {
      const { error } = await supabase.from('settings').upsert({ key, value });
      if (error) throw error;
      toast.success('Setting updated!');
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const settingFields = [
    { key: 'site_title', label: 'Site Title' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
    { key: 'address', label: 'Address' },
    { key: 'opening_hours', label: 'Opening Hours' },
  ];

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div></div>;

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-coffee-900">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {settingFields.map(field => (
          <div key={field.key}>
            <label className="label">{field.label}</label>
            <input
              type="text"
              value={settings[field.key] || ''}
              onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
              onBlur={(e) => updateSetting(field.key, e.target.value)}
              className="input-field"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
