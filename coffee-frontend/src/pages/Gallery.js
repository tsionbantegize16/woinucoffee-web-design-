import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Camera, X, ZoomIn, Heart, Share2, Filter, Grid3x3, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Local gallery images
  const localGalleryImages = [
    { id: 1, src: '/1.jpg', title: 'Our Signature Coffee Moments', category: 'Ambiance', description: 'Experience the warmth and comfort of Woinu Coffee' },
    { id: 2, src: '/2.jpg', title: 'Crafted with Passion', category: 'Coffee Art', description: 'Every cup is a masterpiece' },
    { id: 3, src: '/3.jpg', title: 'Ethiopian Coffee Excellence', category: 'Products', description: 'Premium beans from the birthplace of coffee' },
    { id: 4, src: '/4.jpg', title: 'A Journey in Every Cup', category: 'Experience', description: '3,000 years of tradition in every sip' },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    setImages(data || []);
    setTimeout(() => setLoading(false), 500);
  };

  const displayImages = images.length > 0 ? images : localGalleryImages;
  const categories = ['All', 'Ambiance', 'Coffee Art', 'Products', 'Experience'];
  const filteredImages = selectedCategory === 'All' 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-600">
                <div className="w-12 h-0.5 bg-amber-600"></div>
                <span className="text-sm font-medium uppercase tracking-wider">Our Collection</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Visual
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
                  Journey
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Explore the heart and soul of Woinu Coffee through our carefully curated gallery. Every image tells a story of craftsmanship, tradition, and passion.
              </p>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-amber-600">{displayImages.length}+</div>
                  <div className="text-sm text-gray-500 mt-1">Photos</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">{categories.length - 1}</div>
                  <div className="text-sm text-gray-500 mt-1">Categories</div>
                </div>
              </div>
            </div>
            
            {/* Right Images Grid */}
            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute top-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={displayImages[0]?.src || displayImages[0]?.image_url || '/1.jpg'} 
                  alt="Gallery preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={displayImages[1]?.src || displayImages[1]?.image_url || '/2.jpg'} 
                  alt="Gallery preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                <img 
                  src={displayImages[2]?.src || displayImages[2]?.image_url || '/3.jpg'} 
                  alt="Gallery preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5 text-amber-600" />
              <span className="font-semibold">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((image, index) => {
                const heights = ['h-72', 'h-96', 'h-80', 'h-64'];
                const randomHeight = heights[index % heights.length];
                
                return (
                  <div
                    key={image.id}
                    className="break-inside-avoid mb-6"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      onClick={() => openLightbox(displayImages.findIndex(img => img.id === image.id))}
                      className={`group relative ${randomHeight} rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <img
                        src={image.src || image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Category Badge */}
                      {image.category && (
                        <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                          <span className="text-xs font-semibold text-gray-800">{image.category}</span>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                        <p className="text-gray-200 text-sm mb-4 line-clamp-2">{image.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); }}
                            className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ZoomIn className="w-4 h-4" />
                            View
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); }}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          >
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); }}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          >
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Hover Indicator */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <Camera className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
            <ChevronLeft className="w-7 h-7 text-coffee-900" />
          </button>
          
          <div className="max-w-6xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayImages[currentImageIndex].src || displayImages[currentImageIndex].image_url}
              alt={displayImages[currentImageIndex].title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                {displayImages[currentImageIndex].title}
              </h3>
              <p className="text-amber-100">
                {displayImages[currentImageIndex].description}
              </p>
            </div>
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
            <ChevronRight className="w-7 h-7 text-coffee-900" />
          </button>
        </div>
      )}

      <Footer />

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
