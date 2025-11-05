import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Coffee, Award, Users, Clock, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsRes, testimonialsRes] = await Promise.all([
        supabase.from('menu_items').select('*').eq('is_featured', true).limit(6),
        supabase.from('testimonials').select('*').eq('is_approved', true).limit(3),
      ]);
      setFeaturedItems(itemsRes.data || []);
      setTestimonials(testimonialsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/buna.jpeg" 
            alt="Ethiopian Coffee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/90 via-coffee-800/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-white">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Premium Ethiopian
                <span className="block mt-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Coffee Experience
                </span>
              </h1>
              <p className="text-xl text-amber-100 leading-relaxed">
                From the highlands of Ethiopia, where coffee was born, we bring you an authentic experience 
                that honors tradition while embracing global excellence.
              </p>
              <p className="text-lg text-amber-200 italic">
                "ቡና ቤት የጓደኛ ቤት ነው" - A coffee house is a home of friends
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="btn-primary text-lg">
                  Explore Menu <ArrowRight className="inline w-5 h-5 ml-2" />
                </Link>
                <button className="btn-secondary text-lg">Order Online</button>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Empty space to balance layout */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: 'Premium Quality', desc: '100% Ethiopian coffee beans' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence' },
              { icon: Users, title: 'Expert Baristas', desc: 'Skilled coffee craftsmen' },
              { icon: Clock, title: 'Fast Service', desc: 'Quick & efficient delivery' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-amber-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-coffee-900 mb-2">{feature.title}</h3>
                <p className="text-amber-800">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-coffee-900 mb-4">Featured Menu</h2>
            <p className="text-amber-700 text-lg">Discover our most popular coffee selections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-amber-200">
                  <div className="h-48 bg-amber-50 relative">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                        <Coffee className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full font-bold text-white" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                      ${item.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <button className="btn-primary w-full">Add to Order</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                Loading featured items...
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-secondary inline-flex items-center gap-2">
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-coffee-900">
                About Woinu Coffee
              </h2>
              <p className="text-amber-900 text-lg leading-relaxed">
                <strong style={{color: '#D4A574'}}>From the Birthplace of Coffee:</strong> Nestled in the heart of Addis Ababa, 
                Woinu Coffee brings you an authentic Ethiopian coffee experience. Our journey began with a passion for celebrating 
                the birthplace of coffee and sharing its rich, 3,000-year heritage with the world.
              </p>
              <p className="text-amber-900 text-lg leading-relaxed">
                <strong style={{color: '#D4A574'}}>Tradition Meets Excellence:</strong> Every cup we serve tells a story—from the 
                highlands of Sidamo, Yirgacheffe, and Harar to your hands. We source only the finest beans, roasted to perfection, 
                and crafted by our skilled baristas who honor the Ethiopian coffee ceremony while embracing modern techniques.
              </p>
              <div className="p-4 rounded-xl" style={{background: 'rgba(212, 165, 116, 0.1)', border: '1px solid #D4A574'}}>
                <p className="text-amber-900 italic">
                  "In Ethiopia, coffee is not just a beverage—it's a ceremony, a gathering, a tradition passed down through generations. 
                  We bring this spirit to every cup."
                </p>
              </div>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Our Story <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400"
                alt="Coffee Shop"
                className="rounded-2xl shadow-lg border-4 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400"
                alt="Coffee Beans"
                className="rounded-2xl shadow-lg mt-8 border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-coffee-900">What Our Customers Say</h2>
              <p className="text-amber-700 text-lg">Real experiences from our coffee lovers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl shadow-soft p-6 border border-amber-200 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{color: '#D4A574'}} />
                    ))}
                  </div>
                  <p className="text-amber-900 mb-4 italic">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                      {testimonial.customer_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-coffee-900">{testimonial.customer_name}</p>
                      <p className="text-sm text-amber-700">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-coffee-900 mb-4">
            Ready to Experience Premium Coffee?
          </h2>
          <p className="text-amber-800 text-lg mb-8">
            Visit us today or order online for delivery to your doorstep
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Find Us
            </Link>
            <button className="btn-secondary">
              Order Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
