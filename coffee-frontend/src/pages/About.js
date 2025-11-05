import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Coffee, Award, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
      <Navbar />

      <div className="relative py-20" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-xl text-amber-100">Our Story, Our Passion, Our Coffee</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-coffee-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-amber-900">
              <p>
                Woinu Coffee was born from a deep love for Ethiopian coffee and a desire to share 
                its rich heritage with the world. Founded in 2024, our journey began in the highlands 
                of Ethiopia, where coffee first originated thousands of years ago.
              </p>
              <p>
                Every cup we serve is a tribute to the farmers, the land, and the centuries-old 
                tradition of Ethiopian coffee culture. We believe that great coffee is more than 
                just a beverage—it's an experience, a connection, and a celebration of life.
              </p>
              <p>
                From sourcing the finest beans to perfecting our roasting process, we're committed 
                to excellence at every step. Our skilled baristas treat each cup as a work of art, 
                ensuring that every sip delivers the authentic taste of Ethiopia.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" 
              alt="Coffee Shop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Coffee, title: 'Premium Quality', desc: '100% Ethiopian beans, sourced directly from farmers' },
            { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in coffee craftsmanship' },
            { icon: Heart, title: 'Made with Love', desc: 'Every cup crafted with passion and care' },
            { icon: Users, title: 'Community Focus', desc: 'Supporting local farmers and communities' },
          ].map((value, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-coffee-900 mb-2">{value.title}</h3>
              <p className="text-amber-800 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-12 text-center shadow-lg" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
          <h2 className="text-3xl font-bold mb-4 text-white">Visit Us Today</h2>
          <p className="text-xl text-amber-100 mb-8">
            Experience the authentic taste of Ethiopian coffee at Woinu Coffee
          </p>
          <button className="btn-secondary text-lg">Get Directions</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
