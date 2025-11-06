import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Coffee, Award, Heart, Users, Leaf, Target, Eye, Star, Clock, Globe, ArrowRight, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop" 
            alt="Ethiopian Coffee"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/95 via-coffee-800/90 to-coffee-900/95"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-amber-300/30 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="text-amber-200 text-sm font-medium">☕ Established 2014</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Where Coffee
            <span className="block mt-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Tells A Story
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            From the birthplace of coffee to your cup—a journey spanning 3,000 years of Ethiopian heritage, 
            passion, and dedication to the perfect brew.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link to="/contact" className="px-8 py-4 rounded-full font-bold text-coffee-900 transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg inline-flex items-center gap-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
              <MapPin className="w-5 h-5" />
              Visit Our Coffee House
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-amber-300/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full border-2" style={{borderColor: '#D4A574', color: '#D4A574'}}>
                <span className="text-sm font-semibold">OUR JOURNEY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-coffee-900">
                The Woinu Story
              </h2>
              <p className="text-lg text-amber-900 leading-relaxed">
                <strong style={{color: '#D4A574'}}>2014:</strong> Our story began in the heart of Addis Ababa with a simple dream—
                to honor Ethiopia's 3,000-year coffee legacy and share it with the world. Woinu, meaning "gold" in Amharic, 
                perfectly captures what Ethiopian coffee represents: precious, rare, and invaluable.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed">
                From a small coffee ceremony gathering among friends to becoming one of Addis Ababa's most beloved coffee destinations, 
                our journey has been fueled by passion, authenticity, and an unwavering commitment to excellence.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed">
                We work directly with farmers in the highlands of Sidamo, Yirgacheffe, and Harar—regions renowned for producing 
                some of the world's finest coffee. Every bean is hand-selected, every roast is perfected, and every cup is 
                crafted with the reverence it deserves.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{color: '#D4A574'}}>10</div>
                  <div className="text-sm text-coffee-800">Years Excellence</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{color: '#D4A574'}}>15+</div>
                  <div className="text-sm text-coffee-800">Partner Farmers</div>
                </div>
                <div className="h-12 w-px bg-amber-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{color: '#D4A574'}}>50k+</div>
                  <div className="text-sm text-coffee-800">Cups Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop"
                alt="Our Coffee House"
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 px-8 py-6 bg-white rounded-2xl shadow-2xl border-4" style={{borderColor: '#D4A574'}}>
                <p className="text-coffee-900 font-bold text-2xl">5,000+</p>
                <p className="text-sm" style={{color: '#D4A574'}}>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full border-2 mb-4" style={{borderColor: '#D4A574', color: '#D4A574'}}>
              <span className="text-sm font-semibold">OUR PURPOSE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2" style={{borderColor: '#D4A574'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                <Target className="w-8 h-8 text-coffee-900" />
              </div>
              <h3 className="text-3xl font-bold text-coffee-900 mb-4">Our Mission</h3>
              <p className="text-lg text-amber-900 leading-relaxed mb-6">
                To preserve and celebrate Ethiopian coffee heritage while creating exceptional experiences that connect 
                people, honor tradition, and support farming communities. Every cup we serve is a bridge between 
                Ethiopia's ancient coffee culture and the modern world.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Coffee className="w-5 h-5 mr-3 mt-1" style={{color: '#D4A574'}} />
                  <span className="text-amber-900">Source 100% Ethiopian specialty-grade beans</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 mt-1" style={{color: '#D4A574'}} />
                  <span className="text-amber-900">Support fair trade and sustainable farming</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 mr-3 mt-1" style={{color: '#D4A574'}} />
                  <span className="text-amber-900">Craft every cup with excellence and care</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-coffee-900 to-coffee-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2" style={{borderColor: '#D4A574'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                <Eye className="w-8 h-8 text-coffee-900" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-lg text-amber-100 leading-relaxed mb-6">
                To become the world's ambassador for Ethiopian coffee—sharing its unparalleled quality, rich history, 
                and cultural significance with every community we touch. We envision a future where Ethiopian coffee 
                is celebrated globally for its authenticity and excellence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Globe className="w-5 h-5 mr-3 mt-1" style={{color: '#FFD700'}} />
                  <span className="text-amber-100">Expand Ethiopian coffee culture worldwide</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 mr-3 mt-1" style={{color: '#FFD700'}} />
                  <span className="text-amber-100">Build thriving coffee communities</span>
                </li>
                <li className="flex items-start">
                  <Leaf className="w-5 h-5 mr-3 mt-1" style={{color: '#FFD700'}} />
                  <span className="text-amber-100">Pioneer sustainable coffee practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full border-2 mb-4" style={{borderColor: '#D4A574', color: '#D4A574'}}>
              <span className="text-sm font-semibold">WHAT DRIVES US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">The principles that guide every decision, every roast, and every relationship we build</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Coffee, 
                title: 'Authenticity', 
                desc: 'True to our Ethiopian roots, we honor tradition while embracing innovation. No shortcuts, no compromises.',
                color: '#D4A574'
              },
              { 
                icon: Heart, 
                title: 'Passion', 
                desc: 'Coffee is our art, our craft, our love. Every bean tells a story, and we pour our hearts into sharing it.',
                color: '#C19A6B'
              },
              { 
                icon: Users, 
                title: 'Community', 
                desc: 'From farmers to customers, we build meaningful relationships that strengthen everyone in the coffee chain.',
                color: '#B8956A'
              },
              { 
                icon: Award, 
                title: 'Excellence', 
                desc: 'We pursue perfection in every detail—from bean selection to the final pour, quality is non-negotiable.',
                color: '#D4A574'
              },
            ].map((value, idx) => (
              <div 
                key={idx} 
                className="group relative text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-current overflow-hidden"
                style={{'--hover-color': value.color}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{background: `linear-gradient(135deg, ${value.color} 0%, ${value.color} 100%)`}}></div>
                <div className="relative z-10">
                  <div 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" 
                    style={{background: `linear-gradient(135deg, ${value.color} 0%, #FFD700 100%)`}}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-coffee-900 mb-4">{value.title}</h3>
                  <p className="text-amber-800 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-cream-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full border-2 mb-4" style={{borderColor: '#D4A574', color: '#D4A574'}}>
              <span className="text-sm font-semibold">OUR JOURNEY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">A Decade of Excellence</h2>
          </div>

          <div className="space-y-12">
            {[
              { year: '2014', title: 'The Beginning', desc: 'Woinu Coffee opens its doors in Addis Ababa with a small team and big dreams.' },
              { year: '2016', title: 'Direct Trade Partnerships', desc: 'Established direct relationships with 10+ farming families in Yirgacheffe and Sidamo.' },
              { year: '2018', title: 'National Recognition', desc: 'Awarded "Best Ethiopian Coffee Experience" by the National Tourism Board.' },
              { year: '2020', title: 'Community Impact', desc: 'Launched fair trade initiative supporting over 50 farming families and their communities.' },
              { year: '2022', title: 'Expansion & Innovation', desc: 'Introduced specialty roasting techniques while maintaining traditional coffee ceremony.' },
              { year: '2024', title: 'Looking Forward', desc: 'Celebrating 10 years and expanding to share Ethiopian coffee culture globally.' },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="flex-shrink-0 text-right w-24">
                  <div className="inline-block px-4 py-2 rounded-full font-bold text-white" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
                    {milestone.year}
                  </div>
                </div>
                <div className="relative flex-grow">
                  <div className="absolute left-0 top-0 w-1 h-full bg-amber-200"></div>
                  <div className="absolute left-0 top-0 w-1 bg-gradient-to-b from-transparent group-hover:to-amber-400 transition-all duration-500" style={{height: '0%', animation: 'slideDown 0.8s ease-out forwards', animationDelay: `${idx * 0.1}s`}}></div>
                  <div className="ml-8 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 group-hover:border-l-8" style={{borderColor: '#D4A574'}}>
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">{milestone.title}</h3>
                    <p className="text-amber-800">{milestone.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years of Excellence', icon: Clock },
              { number: '50k+', label: 'Cups Served', icon: Coffee },
              { number: '5k+', label: 'Happy Customers', icon: Heart },
              { number: '15+', label: 'Partner Farms', icon: Leaf },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <stat.icon className="w-12 h-12 mx-auto mb-4" style={{color: '#D4A574'}} />
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: '#D4A574'}}>{stat.number}</div>
                <div className="text-sm text-coffee-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-coffee-900 via-coffee-800 to-coffee-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience The Woinu Difference
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            Join us at our coffee house in Addis Ababa and taste the authentic heritage of Ethiopian coffee. 
            Every visit is a journey through 3,000 years of tradition.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 rounded-full font-bold text-coffee-900 transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg inline-flex items-center gap-2" style={{background: 'linear-gradient(135deg, #D4A574 0%, #FFD700 100%)'}}>
              <MapPin className="w-5 h-5" />
              Visit Us Today
            </Link>
            <Link to="/menu" className="px-8 py-4 rounded-full font-bold border-2 border-amber-300 text-white hover:bg-white/10 transition-all duration-300 text-lg inline-flex items-center gap-2">
              Explore Our Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          to {
            height: 100%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
