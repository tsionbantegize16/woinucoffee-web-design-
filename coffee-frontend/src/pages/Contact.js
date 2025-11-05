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
                  <p className="text-amber-800">info@woinucoffee.com</p>
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
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
