import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Camera, X, ZoomIn, Heart, Share2, Filter, Grid3x3, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedImages, setLikedImages] = useState(new Set());

  // Local gallery images
  const localGalleryImages = [
    { id: 1, src: '/1.jpg', title: 'Our Signature Coffee Moments', category: 'Ambiance', description: 'Experience the warmth and comfort of Woinu Coffee' },
    { id: 2, src: '/2.jpg', title: 'Crafted with Passion', category: 'Coffee Art', description: 'Every cup is a masterpiece' },
    { id: 3, src: '/3.jpg', title: 'Ethiopian Coffee Excellence', category: 'Products', description: 'Premium beans from the birthplace of coffee' },
    { id: 4, src: '/4.jpg', title: 'A Journey in Every Cup', category: 'Experience', description: '3,000 years of tradition in every sip' },
  ];

  useEffect(() => {
    fetchImages();
    loadLikedImages();
  }, []);

  const loadLikedImages = () => {
    const saved = localStorage.getItem('likedGalleryImages');
    if (saved) {
      setLikedImages(new Set(JSON.parse(saved)));
    }
  };

  const saveLikedImages = (liked) => {
    localStorage.setItem('likedGalleryImages', JSON.stringify([...liked]));
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      
      // Map database images to match local format
      const mappedImages = (data || []).map(img => ({
        id: img.id,
        src: img.image_url,
        image_url: img.image_url,
        title: img.title,
        description: img.description || 'Beautiful coffee moments',
        category: img.category || 'Ambiance',
        likes: img.likes || 0,
      }));
      
      setImages(mappedImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to load some images');
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleLike = async (imageId, e) => {
    e.stopPropagation();
    
    const newLiked = new Set(likedImages);
    const isLiked = newLiked.has(imageId);
    
    if (isLiked) {
      newLiked.delete(imageId);
      toast('Removed from favorites', { icon: '💔' });
    } else {
      newLiked.add(imageId);
      toast.success('Added to favorites!', { icon: '❤️' });
    }
    
    setLikedImages(newLiked);
    saveLikedImages(newLiked);
    
    // Update like count in database
    try {
      const image = displayImages.find(img => img.id === imageId);
      if (image) {
        const newLikeCount = isLiked ? (image.likes || 0) - 1 : (image.likes || 0) + 1;
        await supabase
          .from('gallery_images')
          .update({ likes: Math.max(0, newLikeCount) })
          .eq('id', imageId);
        
        // Update local state
        setImages(prev => prev.map(img => 
          img.id === imageId ? { ...img, likes: Math.max(0, newLikeCount) } : img
        ));
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleShare = async (image, e) => {
    e.stopPropagation();
    
    const shareData = {
      title: image.title,
      text: `Check out this amazing photo from Woinu Coffee: ${image.title}`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        toast.error('Failed to share');
      }
    }
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
      <Toaster position="top-center" />

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
      <section className="py-6 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Image Count */}
            <div className="flex items-center gap-2 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              <span>
                {filteredImages.length} {filteredImages.length === 1 ? 'Image' : 'Images'} Found
              </span>
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
                            onClick={(e) => handleLike(image.id, e)}
                            className={`w-10 h-10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                              likedImages.has(image.id) ? 'bg-red-500/80' : 'bg-white/20 hover:bg-white/30'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-white text-white' : 'text-white'}`} />
                          </button>
                          <button 
                            onClick={(e) => handleShare(image, e)}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                          >
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        {image.likes > 0 && (
                          <div className="flex items-center gap-1 text-white/80 text-xs mt-2">
                            <Heart className="w-3 h-3 fill-white" />
                            <span>{image.likes} {image.likes === 1 ? 'like' : 'likes'}</span>
                          </div>
                        )}
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

      {/* Enhanced Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-amber-500/50 z-10 animate-slide-in-left"
          >
            <ChevronLeft className="w-7 h-7 text-coffee-900" />
          </button>
          
          {/* Image Container */}
          <div className="max-w-6xl max-h-[90vh] relative animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayImages[currentImageIndex].src || displayImages[currentImageIndex].image_url}
              alt={displayImages[currentImageIndex].title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                {displayImages[currentImageIndex].title}
              </h3>
              <p className="text-amber-100">
                {displayImages[currentImageIndex].description}
              </p>
              {/* Image Counter */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span className="text-white font-medium text-sm">
                  {currentImageIndex + 1} / {displayImages.length}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-amber-500/50 z-10 animate-slide-in-right"
          >
            <ChevronRight className="w-7 h-7 text-coffee-900" />
          </button>
        </div>
      )}

      <Footer />

      {/* CSS Animations */}
      <style>{`
        /* Floating animation for decorative elements */
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

        /* Fade in animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        /* Slide up animation */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        /* Fade in up animation for gallery cards */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }

        /* Zoom in animation for lightbox */
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-zoom-in {
          animation: zoomIn 0.8s ease-out 0.6s both;
        }

        /* Slide in from left */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out 0.3s both;
        }

        /* Slide in from right */
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out 0.4s both;
        }

        /* Text line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Loading pulse animation enhancement */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
