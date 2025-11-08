import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Coffee, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle, Mail } from 'lucide-react';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    totalCategories: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      console.log('Starting dashboard data fetch...');
      
      // Fetch stats with error handling for each table
      const [
        menuItemsRes, 
        categoriesRes, 
        messagesRes, 
        unreadMessagesRes
      ] = await Promise.allSettled([
        supabase.from('menu_items').select('id'),
        supabase.from('categories').select('id'),
        supabase.from('contact_messages').select('id'),
        supabase.from('contact_messages').select('id').eq('is_read', false),
      ]);

      // Log results for debugging
      console.log('Dashboard fetch results:', {
        menuItems: menuItemsRes.status,
        categories: categoriesRes.status,
        messages: messagesRes.status,
        unreadMessages: unreadMessagesRes.status,
      });

      // Extract data safely
      const menuItemsData = menuItemsRes.status === 'fulfilled' ? menuItemsRes.value : { data: [], error: menuItemsRes.reason };
      const categoriesData = categoriesRes.status === 'fulfilled' ? categoriesRes.value : { data: [], error: categoriesRes.reason };
      const messagesData = messagesRes.status === 'fulfilled' ? messagesRes.value : { data: [], error: messagesRes.reason };
      const unreadMessagesData = unreadMessagesRes.status === 'fulfilled' ? unreadMessagesRes.value : { data: [], error: unreadMessagesRes.reason };

      // Log any errors
      if (menuItemsData.error) console.error('Menu items error:', menuItemsData.error);
      if (categoriesData.error) console.error('Categories error:', categoriesData.error);
      if (messagesData.error) console.error('Messages error:', messagesData.error);
      
      setStats({
        totalMenuItems: menuItemsData.data?.length || 0,
        totalCategories: categoriesData.data?.length || 0,
        totalMessages: messagesData.data?.length || 0,
        unreadMessages: unreadMessagesData.data?.length || 0,
      });

      // Fetch recent messages with error handling
      const recentMessagesResult = await Promise.allSettled([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      const recentMessagesData = recentMessagesResult[0].status === 'fulfilled' 
        ? recentMessagesResult[0].value 
        : { data: [], error: recentMessagesResult[0].reason };

      if (recentMessagesData.error) {
        console.error('Recent messages error:', recentMessagesData.error);
      }

      setRecentMessages(recentMessagesData.data || []);
      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
      fetchDashboardData();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-100">
        <div>
          <h1 className="text-4xl font-bold text-coffee-900 mb-2">Dashboard</h1>
          <p className="text-lg text-amber-700">Welcome back! Here's your coffee shop overview</p>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-white rounded-xl group-hover:shadow-soft transition-all" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
              <Coffee className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-700 mb-1">Menu Items</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalMenuItems}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-coffee-800 rounded-xl group-hover:shadow-soft transition-all border-2 border-amber-400" style={{background: 'linear-gradient(135deg, #FFF8E2 0%, #F5E2D3 100%)'}}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <Mail className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-700 mb-1">Total Messages</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalMessages}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-amber-700 rounded-xl group-hover:shadow-soft transition-all border-2 border-amber-500" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
              <Mail className="w-6 h-6" />
            </div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Unread Messages</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.unreadMessages}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-white rounded-xl group-hover:shadow-soft transition-all" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)'}}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Categories</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalCategories}</p>
        </div>
      </div>

      {/* Recent Messages with Enhanced Design */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-coffee-900">Recent Messages</h2>
            <p className="text-sm text-coffee-600">Latest contact inquiries</p>
          </div>
        </div>
        
        {recentMessages.length > 0 ? (
          <div className="space-y-3">
            {recentMessages.map((message, index) => (
              <div 
                key={message.id} 
                className={`table-row bg-gradient-to-r ${!message.is_read ? 'from-amber-50 to-yellow-50' : 'from-coffee-50 to-white'} rounded-xl p-4 border ${!message.is_read ? 'border-amber-200' : 'border-coffee-100'} hover:shadow-soft animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-lg shadow-soft">
                      <Mail className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-900">{message.name}</p>
                      <p className="text-sm text-coffee-600">{message.email}</p>
                      <p className="text-xs text-coffee-500">{message.subject || 'No subject'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-xs text-coffee-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!message.is_read && (
                        <button 
                          onClick={() => markAsRead(message.id)}
                          className="btn btn-primary py-2 px-4 text-sm inline-flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Read
                        </button>
                      )}
                      {message.is_read && (
                        <span className="text-xs text-green-600 font-semibold inline-flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <p className="text-coffee-600 font-medium">No messages yet</p>
            <p className="text-sm text-coffee-500">Contact form submissions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
