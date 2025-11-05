import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit, Trash2, Search, Filter, Coffee, Star, DollarSign } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_available: true,
    featured: false
  });

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id);
        if (error) throw error;
        toast.success('Menu item updated!');
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert(itemData);
        if (error) throw error;
        toast.success('Menu item added!');
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        is_available: true,
        featured: false
      });
      fetchItems();
    } catch (error) {
      toast.error('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category_id: item.category_id,
      image_url: item.image_url,
      is_available: item.is_available,
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) throw error;
      toast.success('Menu item deleted!');
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-coffee-900 mb-2">Menu Items</h1>
          <p className="text-lg text-coffee-600">Manage your coffee shop products</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 text-lg px-6 py-3"
        >
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 pr-4 py-3 text-lg"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field pl-12 pr-8 py-3 text-lg appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="card group hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {item.image_url ? (
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold">Unavailable</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 mb-4 bg-gradient-to-br from-coffee-100 to-amber-100 rounded-xl flex items-center justify-center">
                <Coffee className="w-16 h-16 text-coffee-300" />
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-coffee-900 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-bold">{item.price}</span>
                </div>
              </div>
              
              <p className="text-coffee-600 text-sm line-clamp-2">{item.description || 'No description available'}</p>
              
              <div className="flex items-center justify-between">
                <span className="badge-info">
                  {item.categories?.name || 'Uncategorized'}
                </span>
                {item.is_available && (
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium">Available</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-danger text-sm py-2 px-3"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-10 h-10 text-coffee-400" />
          </div>
          <p className="text-xl font-semibold text-coffee-600 mb-2">No menu items found</p>
          <p className="text-coffee-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Enhanced Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-coffee-900">
                  {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category_id: '',
                      image_url: '',
                      is_available: true,
                      featured: false
                    });
                  }}
                  className="text-coffee-400 hover:text-coffee-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Category</label>
                    <select
                      required
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="input-field"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="input-field"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_available}
                        onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
                        className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                      />
                      <span className="font-medium text-coffee-700">Available</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                      />
                      <span className="font-medium text-coffee-700">Featured</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        category_id: '',
                        image_url: '',
                        is_available: true,
                        featured: false
                      });
                    }}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
