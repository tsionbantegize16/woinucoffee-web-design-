import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setTestimonials(data || []);
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-coffee-900">Testimonials</h1>
      <p>Manage customer reviews and testimonials</p>
    </div>
  );
};

export default Testimonials;
