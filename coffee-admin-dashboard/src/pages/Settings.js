import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, Eye, EyeOff, Key } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('settings').select('*');
      if (error) {
        console.error('Fetch settings error:', error);
        
        // If table doesn't exist, show a more helpful error
        if (error.code === 'PGRST116') {
          toast.error('Settings table not found. Please run the database setup script.');
        } else {
          toast.error(`Failed to load settings: ${error.message}`);
        }
        return;
      }

      const settingsObj = {};
      data?.forEach((s) => {
        settingsObj[s.key] = s.value;
      });
      setSettings(settingsObj);
    } catch (error) {
      console.error('Unexpected error fetching settings:', error);
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
      
      // Use upsert with onConflict to handle duplicate keys
      const { error } = await supabase
        .from('settings')
        .upsert(updates, { 
          onConflict: 'key',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Supabase upsert error:', error);
        throw error;
      }
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Save settings error:', error);
      toast.error(`Failed to save settings: ${error.message}`);
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
      
      {/* General Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-coffee-900 mb-4">General Settings</h2>
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
            className={`px-6 py-3 font-bold shadow-md border-2 rounded-xl transition-all hover:shadow-lg ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
              color: '#FFFFFF',
              borderColor: '#B8956A'
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-coffee-900 mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Key className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Password</h3>
                <p className="text-sm text-gray-500">Change your account password</p>
              </div>
            </div>
            <button
              onClick={() => setShowChangePassword(true)}
              className="inline-flex items-center gap-2 px-6 py-3 font-bold shadow-md border-2 rounded-xl transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                color: '#FFFFFF',
                borderColor: '#B8956A'
              }}
            >
              <Lock className="w-4 h-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default Settings;
