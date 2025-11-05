import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home,
  Coffee, 
  Grid3x3,
  ShoppingCart,
  Image, 
  FileText, 
  Tag,
  MessageSquare, 
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Stats' },
    { path: '/menu-items', label: 'Menu Items', icon: Coffee, description: 'Manage products' },
    { path: '/categories', label: 'Categories', icon: Grid3x3, description: 'Organize menu' },
    { path: '/orders', label: 'Orders', icon: ShoppingCart, description: 'Customer orders' },
    { path: '/gallery', label: 'Gallery', icon: Image, description: 'Photo management' },
    { path: '/blog', label: 'Blog Posts', icon: FileText, description: 'Content & Articles' },
    { path: '/promotions', label: 'Promotions', icon: Tag, description: 'Special offers' },
    { path: '/testimonials', label: 'Testimonials', icon: MessageSquare, description: 'Customer reviews' },
    { path: '/messages', label: 'Messages', icon: MessageSquare, description: 'Contact inquiries' },
    { path: '/settings', label: 'Settings', icon: Settings, description: 'Configuration' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-amber-200">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Woinu Coffee Logo" 
                className="h-12 w-auto object-contain"
              />
              {sidebarOpen && (
                <div className="animate-fade-in">
                  <h1 className="text-xl font-bold text-coffee-900">Woinu Coffee</h1>
                  <p className="text-xs text-amber-700">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto sidebar-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item group ${isActive ? 'sidebar-item-active' : ''}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <div className="ml-3 animate-fade-in">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 text-white rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #D4A574 0%, # c19A6B 100%)'}}>
                <User className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <div className="flex-1 animate-fade-in">
                  <p className="text-sm font-medium text-coffee-900">
                    {user?.email || 'Admin User'}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}`}>
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-coffee-100 shadow-soft">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-coffee-600 hover:bg-coffee-100 rounded-xl transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-coffee-900">Admin Dashboard</h1>
                <p className="text-sm text-coffee-600">Manage your coffee shop</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-coffee-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="bg-gradient-amber text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-soft">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
