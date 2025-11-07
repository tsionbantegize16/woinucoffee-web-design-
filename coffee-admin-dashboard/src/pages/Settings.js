import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('settings').select('*');
      if (error) throw error;

      const settingsObj = {};
      data?.forEach((s) => {
        settingsObj[s.key] = s.value;
      });
      setSettings(settingsObj);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveAllSettings = async () => {
    setSaving(true);
    try {
      // Convert settings object into an array of { key, value } objects for upsert
      const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from('settings').upsert(updates);

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const settingFields = [
    { key: 'site_title', label: 'Site Title' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
    { key: 'address', label: 'Address' },
    { key: 'opening_hours', label: 'Opening Hours' },
  ];

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div>
      </div>
    );

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-coffee-900">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {settingFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              value={settings[field.key] || ''}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-coffee-500 focus:border-coffee-500"
            />
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <button
            onClick={saveAllSettings}
            disabled={saving}
            className={`px-6 py-2 rounded-lg text-white font-semibold ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-coffee-700 hover:bg-coffee-800 transition'
            }`}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
