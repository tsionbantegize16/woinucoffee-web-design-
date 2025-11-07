import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Coffee, Award, Users, Globe, Leaf, ArrowRight, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [partnerFarmers, setPartnerFarmers] = useState(0);
  const [originProfiles, setOriginProfiles] = useState(0);
  const [annualShipments, setAnnualShipments] = useState(0);

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
      animateCounter(setPartnerFarmers, 2000);
      animateCounter(setOriginProfiles, 18);
      animateCounter(setAnnualShipments, 120);
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
    { id: 1, name: 'Guji Halo Natural Lot 12', price: 6.25, description: 'Grade 1 natural process with blueberry sweetness, vanilla, and silky body. FOB Djibouti.' },
    { id: 2, name: 'Sidama Bensa Honey Lot 04', price: 5.90, description: 'Honey process with candied orange, florals, and caramelized sugar notes. Fully traceable.' },
    { id: 3, name: 'Yirgacheffe Chelelektu Washed', price: 6.50, description: 'Washed heirloom with bergamot, jasmine, and crisp citrus acidity. Ready for Q-certified export.' },
  ];

  const mockTestimonials = [
    { id: 1, customer_name: 'Selam Export Co-op', rating: 5, review: 'WoinuCoffee gave us the transparency and agronomy support our farmers needed. Our buyers now ask specifically for their traceable lots.' },
    { id: 2, customer_name: 'Blue Horizon Roastery', rating: 5, review: 'Their cupping notes are spot-on and logistics are seamless. Ethiopian coffees arrive fresh and consistent every shipment.' },
    { id: 3, customer_name: 'Origin Collective', rating: 5, review: 'A trusted partner who balances quality and community impact—we proudly feature WoinuCoffee lots each season.' },
  ];

  const displayItems = featuredItems.length > 0 ? featuredItems : mockFeaturedItems;
  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials;

  // Carousel navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (displayTestimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [displayTestimonials.length]);

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
                <span className="text-amber-200 text-sm font-medium">☕ Established 2025 • Export Vision</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Elevating Ethiopia's Coffee Legacy
                <span className="block mt-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  From Origin To Global Markets
                </span>
              </h1>
              <p className="text-xl text-amber-100 leading-relaxed mx-auto">
                WoinuCoffee partners with Ethiopian growers to deliver traceable, specialty-grade lots to roasters and retailers worldwide—
                empowering farming communities, protecting our land, and showcasing the birthplace of coffee with every shipment.
              </p>
              <p className="text-lg text-amber-200 italic font-medium">
                "ቡና ለኢትዮጵያ ምርቃት ነው" – Coffee is Ethiopia’s signature
              </p>
              
              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-6 py-6 max-w-2xl mx-auto">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>
                    {partnerFarmers >= 1000 ? `${(partnerFarmers / 1000).toFixed(1)}k+` : `${partnerFarmers}+`}
                  </div>
                  <div className="text-sm text-amber-200 mt-1">Partner Farmers</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>{originProfiles}+</div>
                  <div className="text-sm text-amber-200 mt-1">Origin Profiles</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-300/20">
                  <div className="text-3xl md:text-4xl font-bold" style={{color: '#FFD700'}}>
                    {annualShipments >= 1000 ? `${(annualShipments / 1000).toFixed(1)}k+` : `${annualShipments}+`}
                  </div>
                  <div className="text-sm text-amber-200 mt-1">Annual Shipments</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/menu" className="px-8 py-4 rounded-full font-bold border-2 border-amber-300 text-white hover:bg-white/10 transition-all duration-300 text-lg inline-flex items-center gap-2">
                  View Catalog <ArrowRight className="w-5 h-5" />
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
              { icon: Users, title: 'Farmer Partnerships', desc: 'Long-term relationships with Ethiopian smallholders' },
              { icon: Leaf, title: 'Sustainable Practices', desc: 'Climate-smart agronomy and regenerative programs' },
              { icon: Award, title: 'Quality Assurance', desc: 'Cupping labs and origin traceability in every lot' },
              { icon: Globe, title: 'Global Logistics', desc: 'Reliable export routes to roasters worldwide' },
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
            <h2 className="text-4xl font-bold text-coffee-900 mb-4">Featured Lots</h2>
            <p className="text-amber-700 text-lg">Explore seasonal Ethiopian coffees ready for global partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item) => (
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
                    {typeof item.price === 'number' ? `$${item.price.toFixed(2)}/lb` : item.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-coffee-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <button className="btn-primary w-full">Request Sample</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-secondary inline-flex items-center gap-2">
              View Full Portfolio <ArrowRight className="w-5 h-5" />
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
                Farm-Level Excellence, Export-Ready
              </h2>
              <p className="text-amber-900 text-lg leading-relaxed">
                We collaborate directly with farmer cooperatives across Sidama, Guji, Yirgacheffe, and Kaffa—co-designing harvest plans,
                providing agronomy support, and ensuring every cherry is hand-selected for export quality.
              </p>
              <p className="text-amber-900 text-lg leading-relaxed">
                Our processing partners operate solar-powered washing stations, water recycling systems, and on-site cupping labs.
                Each lot is profiled, documented, and traceable so buyers receive consistent flavor, complete transparency, and impact data.
              </p>
              <div className="flex items-center gap-6 py-4">
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>100%</div>
                  <div className="text-sm text-coffee-800">Traceable Lots</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>87+</div>
                  <div className="text-sm text-coffee-800">SCA Cupping Scores</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div>
                  <div className="text-3xl font-bold" style={{color: '#D4A574'}}>12</div>
                  <div className="text-sm text-coffee-800">Sustainability Programs</div>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-4" style={{color: '#D4A574', border: '2px solid #D4A574'}}>
                Learn About Our Origin Work <ArrowRight className="w-5 h-5" />
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
                Signature Export Programs
              </h2>
              <p className="text-amber-900 text-lg leading-relaxed">
                Curated microlots and scalable offerings sourced from Ethiopia’s most celebrated origins—each with full
                traceability, impact reporting, and tailored logistics support for your roasting schedule.
              </p>
              <div className="p-6 rounded-2xl bg-white shadow-lg border-l-4" style={{borderLeftColor: '#D4A574'}}>
                <p className="text-coffee-900 font-semibold mb-3">Sample Profiles:</p>
                <ul className="space-y-2 text-amber-900">
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Guji Natural: nectar sweetness, blueberry jam, cocoa nib finish
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Yirgacheffe Washed: bergamot, apricot, jasmine florals
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-5 h-5 mr-3" style={{color: '#D4A574'}} />
                    Sidama Honey: candied orange, panela, silky body
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl" style={{background: 'rgba(212, 165, 116, 0.1)', border: '1px solid #D4A574'}}>
                <p className="text-amber-900 italic text-sm">
                  "We export more than coffee—we export Ethiopia’s stories, steward livelihoods, and safeguard the forests that birthed coffee."
                </p>
              </div>
              <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-105" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                Review Our Catalog <ArrowRight className="w-5 h-5" />
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

      {/* Testimonials Carousel */}
      {displayTestimonials.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-amber-50 via-white to-amber-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4 shadow-md">
                <Quote className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-coffee-900">What Our Partners Say</h2>
              <p className="text-amber-700 text-base">Roasters and importers who trust our Ethiopian exports</p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Main Testimonial Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mx-auto max-w-3xl border-2" style={{borderColor: '#D4A574'}}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Customer Image */}
                  <div className="flex-shrink-0">
                    {displayTestimonials[currentTestimonial].customer_image ? (
                      <img
                        src={displayTestimonials[currentTestimonial].customer_image}
                        alt={displayTestimonials[currentTestimonial].customer_name}
                        className="w-20 h-20 rounded-full border-4 border-amber-100 shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-amber-100 shadow-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {displayTestimonials[currentTestimonial].customer_name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < (displayTestimonials[currentTestimonial].rating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">
                      {displayTestimonials[currentTestimonial].customer_name}
                    </h3>

                    {/* Review */}
                    <p className="text-gray-700 leading-relaxed italic text-base mb-3">
                      "{displayTestimonials[currentTestimonial].review}"
                    </p>

                    {/* Verified Badge */}
                    <p className="text-amber-600 font-medium text-sm">Verified Customer</p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {displayTestimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors group"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors group"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {displayTestimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial
                          ? 'bg-amber-500 w-6'
                          : 'bg-amber-200 hover:bg-amber-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-coffee-900 mb-4">
            Ready to Partner with WoinuCoffee?
          </h2>
          <p className="text-amber-800 text-lg mb-8">
            Tell us about your sourcing needs and receive curated Ethiopian lots, cupping notes, and logistics support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Start A Conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
