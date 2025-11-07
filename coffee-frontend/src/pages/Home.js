import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Coffee, Award, Users, Clock, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [happyClients, setHappyClients] = useState(0);
  const [coffeeRecipes, setCoffeeRecipes] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(0);

  useEffect(() => {
    fetchData();
    
    // Animate counters
    const animateCounter = (setValue, target) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setValue(target);
          clearInterval(timer);
        } else {
          setValue(Math.floor(current));
        }
      }, duration / steps);
    };

    // Start animations after a short delay
    const timer = setTimeout(() => {
      animateCounter(setHappyClients, 5000);
      animateCounter(setCoffeeRecipes, 20);
      animateCounter(setDailyOrders, 1000);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
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

  // Mock data for demonstration when database is not connected
  const mockFeaturedItems = [
    { id: 1, name: 'Cappuccino', price: 4.50, description: 'Rich espresso with steamed milk and foam, perfectly balanced.' },
    { id: 2, name: 'Americano', price: 3.50, description: 'Bold espresso with hot water for a smooth, strong flavor.' },
    { id: 3, name: 'Espresso', price: 3.00, description: 'Pure, concentrated coffee shot with intense flavor.' },
  ];

  const mockTestimonials = [
    { id: 1, customer_name: 'Aisha Mohammed', rating: 5, review: 'I love Woinu Coffee! The best Ethiopian blends I\'ve ever tasted. Really amazing service and atmosphere.' },
    { id: 2, customer_name: 'Daniel Tesfaye', rating: 5, review: 'The authentic coffee ceremony experience here is absolutely beautiful. Best coffee in Addis Ababa!' },
    { id: 3, customer_name: 'Nadia Hayden', rating: 5, review: 'Outstanding quality and exceptional baristas. Every visit feels special. Highly recommended!' },
  ];

  const displayItems = featuredItems.length > 0 ? featuredItems : mockFeaturedItems;
  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/coffee.jpg" 
            alt="Ethiopian Coffee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/90 via-coffee-800/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="space-y-6 text-white text-center max-w-4xl">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-amber-300/30 mb-2">
                <span className="text-amber-200 text-sm font-medium">☕ From the Birthplace of Coffee</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Discover The Art Of
                <span className="block mt-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Perfect Coffee
                </span>
              </h1>
              <p className="text-xl text-amber-100 leading-relaxed mx-auto">
                Every bean is ethically sourced and roasted to perfection, delivering an unparalleled experience. 
                From the highlands of Ethiopia to your cup—tradition meets excellence.
              </p>
              <p className="text-lg text-amber-200 italic font-medium">
                "ቡና ቤት የጓደኛ ቤት ነው" - A coffee house is a home of friends
              </p>
              
              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-6 py-6 max-w-2xl mx-auto">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>
                    {happyClients >= 1000 ? `${(happyClients / 1000).toFixed(1)}k+` : `${happyClients}+`}
                  </div>
                  <div className="text-sm text-amber-200 mt-1">Happy Clients</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>{coffeeRecipes}+</div>
                  <div className="text-sm text-amber-200 mt-1">Coffee Recipes</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>
                    {dailyOrders >= 1000 ? `${(dailyOrders / 1000).toFixed(1)}k+` : `${dailyOrders}+`}
                  </div>
                  <div className="text-sm text-amber-200 mt-1">Daily Orders</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/menu" className="px-8 py-4 rounded-full font-bold border-2 border-amber-300 text-white hover:bg-white/10 transition-all duration-300 text-lg inline-flex items-center gap-2">
                  View Menu <ArrowRight className="w-5 h-5" />
                </Link>
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

      {/* Coffee Heaven - Feature Section 1 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image on Left */}
            <div className="relative">
              <img
                src="/coffe cup.jpg"
                alt="Hand-crafted coffee"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl shadow-xl" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                <p className="text-coffee-900 font-bold text-lg">Handcrafted Excellence</p>
              </div>
            </div>
            
            {/* Content on Right */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-coffee-900">
                Perfect Brew Experience
              </h2>
              <p className="text-amber-900 text-lg leading-relaxed">
                The perfect atmosphere for conversation and creation. Our coffee house is designed to be your sanctuary—
                where rich aromas fill the air, soft music sets the mood, and every corner invites you to stay a little longer.
              </p>
              <p className="text-amber-900 text-lg leading-relaxed">
                Hand-crafted excellence in every cup. From the moment you step through our doors, you'll experience the 
                passion and dedication that goes into perfecting each brew. Our baristas are artists, trained in both the 
                traditional Ethiopian coffee ceremony and cutting-edge brewing techniques.
              </p>
              <div className="flex items-center gap-6 py-4">
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>100%</div>
                  <div className="text-sm text-coffee-800">Ethiopian Beans</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>Fresh</div>
                  <div className="text-sm text-coffee-800">Daily Roasting</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>Expert</div>
                  <div className="text-sm text-coffee-800">Baristas</div>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-4" style={{color: '#D4A574', border: '2px solid #D4A574'}}>
                Read More <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Woinu's Signature - Feature Section 2 */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content on Left */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-coffee-900">
                Woinu's Coffee
              </h2>
              <p className="text-amber-900 text-lg leading-relaxed">
                Our founder's favorite blend, delivering rich, complex notes from the legendary Yirgacheffe region. 
                This exclusive offering combines the finest hand-selected beans, carefully roasted to unlock layers of 
                flavor—chocolate, citrus, and delicate floral hints dance on your palate.
              </p>
              <div className="p-6 rounded-2xl bg-white shadow-lg border-l-4" style={{borderLeftColor: '#D4A574'}}>
                <p className="text-coffee-900 font-semibold mb-3">Tasting Notes:</p>
                <ul className="space-y-2 text-amber-900">
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Rich dark chocolate with honey sweetness
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Bright citrus undertones with jasmine aroma
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Smooth, full-bodied finish that lingers
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl" style={{background: 'rgba(212, 165, 116, 0.1)', border: '1px solid #D4A574'}}>
                <p className="text-amber-900 italic text-sm">
                  "In Ethiopia, coffee is not just a beverage—it's a ceremony, a gathering, a tradition passed down through generations. 
                  We bring this spirit to every cup."
                </p>
              </div>
              <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-105" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                Explore Our Blends <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Image on Right */}
            <div className="relative order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop"
                alt="Woinu signature coffee"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
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
              {displayTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gradient-to-br from-coffee-900 to-coffee-800 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-2" style={{borderColor: '#D4A574'}}>
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" style={{color: '#FFD700'}} />
                    ))}
                  </div>
                  <p className="text-amber-100 mb-6 italic text-lg leading-relaxed">"{testimonial.review}"</p>
                  <div className="flex items-center pt-4 border-t" style={{borderColor: '#D4A574'}}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-coffee-900 font-bold text-xl mr-4" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                      {testimonial.customer_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.customer_name}</p>
                      <p className="text-sm" style={{color: '#D4A574'}}>Verified Customer</p>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
