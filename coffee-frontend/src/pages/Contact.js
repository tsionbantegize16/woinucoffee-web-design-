import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
      <Navbar />
      <Toaster />

      <div className="relative py-20" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-amber-100">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-coffee-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-soft border border-amber-200">
                <div className="p-3 rounded-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-coffee-900">Address</h3>
                  <p className="text-amber-800">Nefas Silke, Woreda 01</p>
                  <p className="text-amber-800">Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-soft border border-amber-200">
                <div className="p-3 rounded-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-coffee-900">Phone</h3>
                  <p className="text-amber-800">+251-XXX-XXX-XXX</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-soft border border-amber-200">
                <div className="p-3 rounded-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-coffee-900">Email</h3>
                  <p className="text-amber-800">contact@woinucoffee.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-soft border border-amber-200">
                <div className="p-3 rounded-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-coffee-900">Opening Hours</h3>
                  <p className="text-amber-800">Mon-Sat: 7:00 AM - 10:00 PM</p>
                  <p className="text-amber-800">Sun: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-coffee-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 bg-white"
                  style={{transition: 'all 0.3s'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 bg-white"
                  style={{transition: 'all 0.3s'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 bg-white"
                  style={{transition: 'all 0.3s'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 bg-white"
                  style={{transition: 'all 0.3s'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">Message *</label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-500 bg-white"
                  style={{transition: 'all 0.3s'}}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-amber-200">
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-coffee-900 mb-3">Visit Our Location</h2>
              <p className="text-amber-800 mb-8">Find us at Nefas Silke, Woreda 01, Addis Ababa</p>
            </div>
            <div className="relative w-full h-[450px] lg:h-[500px]">
              <iframe
                title="Woinu Coffee Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.4897!2d38.7525!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNTUuMiJOIDM4wrA0NScwOS4wIkU!5e0!3m2!1sen!2set!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.3] contrast-[1.1]"
              ></iframe>
            </div>
            <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-t border-amber-200">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span className="font-medium">Easy to Find</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-amber-300"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="font-medium">Open Daily</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-amber-300"></div>
                <a 
                  href="https://www.google.com/maps/search/Nefas+Silke+Woreda+01+Addis+Ababa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
