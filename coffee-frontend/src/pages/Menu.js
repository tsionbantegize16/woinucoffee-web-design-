import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Coffee } from 'lucide-react';

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        supabase.from('categories').select('*').eq('is_active', true).order('display_order'),
        supabase.from('menu_items').select('*, categories(name)').eq('is_available', true).order('display_order'),
      ]);
      setCategories(categoriesRes.data || []);
      setMenuItems(itemsRes.data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category_id === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="relative py-20" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Export Catalog</h1>
          <p className="text-xl text-amber-100">Discover Ethiopian green coffee lots prepared for global partners</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === 'all' ? 'text-white shadow-lg' : 'bg-white text-coffee-800 hover:shadow-md border-2 border-amber-200'
            }`}
            style={selectedCategory === 'all' ? {background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'} : {}}
          >
            All Lots
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === cat.id ? 'text-white shadow-lg' : 'bg-white text-coffee-800 hover:shadow-md border-2 border-amber-200'
              }`}
              style={selectedCategory === cat.id ? {background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'} : {}}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              <div className="h-56 bg-amber-50 relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                    <Coffee className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-coffee-900">{item.name}</h3>
                    <p className="text-sm text-amber-700">{item.categories?.name}</p>
                  </div>
                  {item.price && (
                    <span className="text-2xl font-bold" style={{color: '#D4A574'}}>
                      {typeof item.price === 'number' ? `$${Number(item.price).toFixed(2)}/lb` : item.price}
                    </span>
                  )}
                </div>
                <p className="text-amber-900 mb-4">{item.description}</p>
                {item.ingredients && item.ingredients.length > 0 && (
                  <p className="text-xs text-amber-700 mb-3">
                    <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-center text-sm text-amber-700 font-medium">
                    Available for booking this harvest
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No lots available in this category right now
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
