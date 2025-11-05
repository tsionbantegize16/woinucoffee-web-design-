import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const { data } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
    setPromotions(data || []);
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-coffee-900">Promotions</h1>
      <p>Manage your coffee shop promotions and discounts</p>
    </div>
  );
};

export default Promotions;
