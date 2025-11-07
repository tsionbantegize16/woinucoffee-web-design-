import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home,
  Coffee, 
  Grid3x3,
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
    { path: '/gallery', label: 'Gallery', icon: Image, description: 'Photo management' },
    { path: '/blog', label: 'Blog Posts', icon: FileText, description: 'Content & Articles' },
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
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-white via-amber-50/30 to-white shadow-2xl z-40 transition-all duration-300 border-r-2 ${sidebarOpen ? 'w-72' : 'w-20'}`} style={{borderRightColor: '#D4A574'}}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b-2" style={{borderBottomColor: '#D4A574'}}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                <img 
                  src="/logo.jpg" 
                  alt="Woinu Coffee Logo" 
                  className="h-10 w-10 object-contain rounded-lg"
                />
              </div>
              {sidebarOpen && (
                <div className="animate-fade-in">
                  <h1 className="text-xl font-bold text-coffee-900">Woinu Coffee</h1>
                  <p className="text-xs font-medium" style={{color: '#D4A574'}}>Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto sidebar-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-coffee-700 hover:bg-amber-100 hover:text-coffee-900'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                    transform: 'translateX(4px)'
                  } : {}}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-amber-100/50 group-hover:bg-amber-200'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {sidebarOpen && (
                    <div className="ml-3 animate-fade-in flex-1">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-coffee-500'}`}>{item.description}</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t-2" style={{borderTopColor: '#D4A574'}}>
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-white border border-amber-200">
              <div className="w-10 h-10 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
                <User className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <div className="flex-1 animate-fade-in min-w-0">
                  <p className="text-sm font-semibold text-coffee-900 truncate">
                    {user?.email || 'Admin User'}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1 mt-1"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Enhanced Header */}
        <header className="bg-white/90 backdrop-blur-md border-b-2 shadow-md" style={{borderBottomColor: '#D4A574'}}>
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-coffee-600 hover:bg-amber-100 rounded-xl transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 text-coffee-600 hover:bg-amber-100 rounded-xl transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-coffee-900">Admin Dashboard</h1>
                <p className="text-sm text-coffee-600">Manage your coffee shop</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">System Online</span>
              </div>
              <div className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-md border-2" style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                color: '#FFFFFF',
                borderColor: '#B8956A'
              }}>
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
