import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Upload, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const TestimonialForm = ({ testimonial = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    review: '',
    rating: 5,
    is_approved: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        customer_name: testimonial.customer_name || '',
        review: testimonial.review || '',
        rating: testimonial.rating || 5,
        is_approved: testimonial.is_approved ?? true,
      });
      setImagePreview(testimonial.customer_image || '');
    }
  }, [testimonial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image (JPG, PNG, or WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `customers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.review) {
      toast.error('Customer name and review are required');
      return;
    }

    setLoading(true);
    try {
      let customerImage = testimonial?.customer_image || '';

      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          customerImage = uploadedUrl;
        }
      }

      const dataToSave = {
        ...formData,
        rating: parseInt(formData.rating),
        customer_image: customerImage,
      };

      let error;
      if (testimonial) {
        ({ error } = await supabase
          .from('testimonials')
          .update(dataToSave)
          .eq('id', testimonial.id));
      } else {
        ({ error } = await supabase
          .from('testimonials')
          .insert([dataToSave]));
      }

      if (error) throw error;

      toast.success(testimonial ? 'Testimonial updated!' : 'Testimonial added!');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {testimonial ? 'Edit Testimonial' : 'New Testimonial'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-amber-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Customer Photo (Optional)
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full border-4 border-amber-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">{imagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-gray-500">
                  JPG, PNG, or WEBP (max 5MB)
                </span>
              </div>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Aisha Mohammed"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-lg font-semibold text-amber-600">
                {formData.rating} {formData.rating === 1 ? 'Star' : 'Stars'}
              </span>
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Review *
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="What did the customer say about your coffee shop?"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.review.length} characters
            </p>
          </div>

          {/* Approve Status */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_approved"
                checked={formData.is_approved}
                onChange={handleChange}
                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
              />
              <div>
                <span className="font-semibold text-gray-800">Approve & Display</span>
                <p className="text-xs text-gray-600">
                  Show this testimonial on the website
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              disabled={loading || uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={loading || uploading}
            >
              {loading ? 'Saving...' : uploading ? 'Uploading...' : testimonial ? 'Update' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
