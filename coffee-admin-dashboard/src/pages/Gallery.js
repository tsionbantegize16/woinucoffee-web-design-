import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Trash2, Upload, X, Image as ImageIcon, Heart, Edit } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageToDelete, setImageToDelete] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Ambiance',
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.title) {
      toast.error('Please select an image and provide a title');
      return;
    }

    setUploading(true);
    try {
      // Create unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      // Save to database
      const { data, error: dbError } = await supabase
        .from('gallery_images')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: publicUrl,
          is_active: formData.is_active,
          display_order: formData.display_order,
          likes: 0,
        })
        .select();
      
      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }
      
      toast.success('Image uploaded successfully!');
      setShowModal(false);
      setSelectedFile(null);
      setPreviewUrl('');
      setFormData({
        title: '',
        description: '',
        category: 'Ambiance',
        is_active: true,
        display_order: 0,
      });
      fetchImages();
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error(`Failed to add image: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      toast.success('Image status updated!');
      fetchImages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openDeleteModal = (image) => {
    setImageToDelete(image);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', imageToDelete.id);
      if (error) throw error;
      toast.success('Image deleted successfully!');
      setShowDeleteModal(false);
      setImageToDelete(null);
      fetchImages();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const openEditModal = (image) => {
    setImageToEdit(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      category: image.category,
      is_active: image.is_active,
      display_order: image.display_order,
    });
    setPreviewUrl(image.image_url);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!imageToEdit) return;

    try {
      let imageUrl = imageToEdit.image_url;

      // If new file selected, upload it
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(filePath, selectedFile);

        if (uploadError) throw new Error('Failed to upload new image');

        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from('gallery_images')
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          is_active: formData.is_active,
          display_order: formData.display_order,
          image_url: imageUrl,
        })
        .eq('id', imageToEdit.id);

      if (error) throw error;

      toast.success('Image updated successfully!');
      setShowEditModal(false);
      setImageToEdit(null);
      setSelectedFile(null);
      setPreviewUrl('');
      fetchImages();
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error('Failed to update image');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-coffee-900">Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage your coffee gallery images</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Images</p>
              <p className="text-3xl font-bold text-coffee-800">{images.length}</p>
            </div>
            <ImageIcon className="w-12 h-12 text-coffee-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Images</p>
              <p className="text-3xl font-bold text-green-600">{images.filter(i => i.is_active).length}</p>
            </div>
            <ImageIcon className="w-12 h-12 text-green-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Likes</p>
              <p className="text-3xl font-bold text-red-600">{images.reduce((acc, img) => acc + (img.likes || 0), 0)}</p>
            </div>
            <Heart className="w-12 h-12 text-red-400" />
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative h-48">
              <img 
                src={img.image_url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center gap-2">
                <button 
                  type="button"
                  onClick={() => openEditModal(img)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity btn-icon btn-icon-primary"
                  aria-label="Edit image"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => toggleActive(img.id, img.is_active)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity btn btn-secondary btn-compact inline-flex items-center gap-2"
                  title={img.is_active ? 'Deactivate' : 'Activate'}
                >
                  {img.is_active ? 'Hide' : 'Show'}
                </button>
                <button 
                  type="button"
                  onClick={() => openDeleteModal(img)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity btn-icon btn-icon-danger"
                  aria-label="Delete image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {!img.is_active && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  Hidden
                </div>
              )}
              {img.likes > 0 && (
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span className="text-xs font-bold">{img.likes}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-coffee-900 mb-1 truncate">{img.title}</h3>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{img.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-coffee-100 text-coffee-800 px-2 py-1 rounded">{img.category}</span>
                <span className="text-xs text-gray-400">Order: {img.display_order}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No images yet. Add your first gallery image!</p>
        </div>
      )}

      {/* Add Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-coffee-900">Add New Image</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter image description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-coffee-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {selectedFile.name}
                  </p>
                )}
              </div>

              {previewUrl && (
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  >
                    <option value="Ambiance">Ambiance</option>
                    <option value="Coffee Art">Coffee Art</option>
                    <option value="Products">Products</option>
                    <option value="Experience">Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-coffee-600 rounded focus:ring-coffee-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Adding...' : 'Add Image'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && imageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center space-y-5">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-inner">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-coffee-900">Delete Image</h3>
                <p className="text-sm text-gray-600">
                  Are you sure you want to remove <span className="font-semibold text-coffee-800">"{imageToDelete.title}"</span> from the gallery?
                </p>
              </div>
              {imageToDelete.image_url && (
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={imageToDelete.image_url}
                    alt={imageToDelete.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500">
                This action cannot be undone. The image will be permanently removed from your website gallery.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setImageToDelete(null);
                  }}
                  className="btn btn-outline flex-1 py-3"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="btn btn-danger flex-1 py-3 inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {showEditModal && imageToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-coffee-900">Edit Image</h2>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setImageToEdit(null);
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter image description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Change Image (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-coffee-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label 
                    htmlFor="image-upload-edit" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Click to upload new image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {selectedFile.name}
                  </p>
                )}
              </div>

              {previewUrl && (
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                  >
                    <option value="Ambiance">Ambiance</option>
                    <option value="Coffee Art">Coffee Art</option>
                    <option value="Products">Products</option>
                    <option value="Experience">Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-coffee-500 focus:outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active_edit"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-coffee-600 rounded focus:ring-coffee-500"
                />
                <label htmlFor="is_active_edit" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3"
                >
                  Update Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setImageToEdit(null);
                    setSelectedFile(null);
                    setPreviewUrl('');
                  }}
                  className="btn btn-outline inline-flex items-center gap-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
