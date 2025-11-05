import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.from('gallery_images').select('*').order('display_order');
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
      toast.success('Image deleted!');
      fetchImages();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-coffee-900">Gallery</h1>
        <button className="btn-primary flex items-center gap-2"><Plus className="w-5 h-5" />Add Image</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative group">
            <img src={img.image_url} alt={img.title} className="w-full h-48 object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button onClick={() => handleDelete(img.id)} className="btn-danger p-2"><Trash2 className="w-5 h-5" /></button>
            </div>
            <p className="mt-2 text-sm font-medium">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
