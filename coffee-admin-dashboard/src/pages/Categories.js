import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Categories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSubmit = {
        ...formData,
        display_order: parseInt(formData.display_order) || 0,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(dataToSubmit)
          .eq('id', editingCategory.id);
        if (error) throw error;
        toast.success('Category updated successfully!');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([dataToSubmit]);
        if (error) throw error;
        toast.success('Category added successfully!');
      }

      setIsModalOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      display_order: category.display_order || 0,
      is_active: category.is_active ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryToDelete.id);
      if (error) throw error;
      toast.success('Category deleted successfully!');
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      display_order: 0,
      is_active: true,
    });
    setEditingCategory(null);
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-800"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-coffee-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organize your menu items</p>
        </div>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-coffee-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{category.slug}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{category.display_order}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="btn-icon btn-icon-secondary"
                      aria-label={`Edit ${category.name}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="btn-icon btn-icon-danger"
                      aria-label={`Delete ${category.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-coffee-900">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} className="input-field" />
              </div>

              <div>
                <label className="label">Slug *</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="input-field" />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" />
              </div>

              <div>
                <label className="label">Display Order</label>
                <input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: e.target.value })} className="input-field" />
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm text-coffee-900">Active</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">{editingCategory ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Delete Category</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this category?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-red-900 text-lg">{categoryToDelete?.name}</p>
                <p className="text-red-700 text-sm mt-1">⚠️ This will also delete all menu items in this category</p>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                This action cannot be undone. The category and all its menu items will be permanently removed.
              </p>
              
              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCategoryToDelete(null);
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
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
