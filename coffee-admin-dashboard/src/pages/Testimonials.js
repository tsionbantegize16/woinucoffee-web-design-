import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit, Trash2, Star, User, CheckCircle, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TestimonialForm from '../components/TestimonialForm';

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', testimonialToDelete.id);
      if (error) throw error;
      toast.success('Testimonial deleted!');
      setShowDeleteModal(false);
      setTestimonialToDelete(null);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleToggleApproval = async (testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: !testimonial.is_approved })
        .eq('id', testimonial.id);
      if (error) throw error;
      toast.success(testimonial.is_approved ? 'Testimonial hidden' : 'Testimonial approved!');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleNewTestimonial = () => {
    setSelectedTestimonial(null);
    setShowForm(true);
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTestimonial(null);
  };

  const handleFormSuccess = () => {
    fetchTestimonials();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-coffee-900 mb-2">Customer Testimonials</h1>
          <p className="text-lg text-coffee-600">Manage customer reviews and feedback</p>
        </div>
        <button
          onClick={handleNewTestimonial}
          className="flex items-center gap-2 text-lg px-6 py-3 font-bold shadow-md border-2 rounded-xl transition-all hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
            color: '#FFFFFF',
            borderColor: '#B8956A'
          }}
        >
          <Plus className="w-5 h-5" /> Add Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-900">
                {testimonials.filter(t => t.is_approved).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-3 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-700 font-medium">Average Rating</p>
              <p className="text-3xl font-bold text-amber-900">
                {testimonials.length > 0
                  ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                  : '0'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Reviews</p>
              <p className="text-3xl font-bold text-blue-900">{testimonials.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
              testimonial.is_approved ? 'border-green-200' : 'border-gray-200'
            } animate-slide-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header with Image */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 pb-16 relative">
              <div className="absolute -bottom-12 left-6">
                {testimonial.customer_image ? (
                  <img
                    src={testimonial.customer_image}
                    alt={testimonial.customer_name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              {testimonial.is_approved && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Approved
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 pt-16 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-coffee-900 mb-1">
                  {testimonial.customer_name}
                </h3>
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-700 leading-relaxed line-clamp-4">
                "{testimonial.review}"
              </p>

              <div className="text-xs text-gray-500">
                {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => handleToggleApproval(testimonial)}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                    testimonial.is_approved
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {testimonial.is_approved ? 'Hide' : 'Approve'}
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(testimonial)}
                  className="btn-icon btn-icon-secondary"
                  aria-label={`Edit testimonial from ${testimonial.customer_name}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(testimonial)}
                  className="btn-icon btn-icon-danger"
                  aria-label={`Delete testimonial from ${testimonial.customer_name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {testimonials.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold text-coffee-800 mb-2">No testimonials yet</h3>
          <p className="text-coffee-600 mb-6">Start collecting customer reviews</p>
          <button onClick={handleNewTestimonial} className="inline-flex items-center gap-2 px-6 py-3 font-bold shadow-md border-2 rounded-xl transition-all hover:shadow-lg" style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
            color: '#FFFFFF',
            borderColor: '#B8956A'
          }}>
            <Plus className="w-5 h-5" /> Add First Testimonial
          </button>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showForm && (
        <TestimonialForm
          testimonial={selectedTestimonial}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <div className="text-center">
              {/* Animated Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Delete Testimonial</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this customer testimonial?
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-amber-900 text-lg">{testimonialToDelete?.customer_name}</p>
                {testimonialToDelete?.rating && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonialToDelete.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-8">
                This action cannot be undone. The testimonial will be permanently removed from your website.
              </p>
              
              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setTestimonialToDelete(null);
                  }}
                  className="btn btn-outline flex-1 py-3 px-4"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger flex-1 py-3 px-4 inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Testimonial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
