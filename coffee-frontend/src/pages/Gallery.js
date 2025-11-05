import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    setImages(data || []);
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
      <Navbar />

      <div className="relative py-20" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Gallery</h1>
          <p className="text-xl text-amber-100">Moments from Woinu Coffee</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              <img src={img.image_url} alt={img.title} className="w-full h-64 object-cover" />
              {img.title && (
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-coffee-900">{img.title}</h3>
                  {img.description && <p className="text-sm text-amber-800">{img.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
