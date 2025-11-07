import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Coffee, ShoppingCart, MessageSquare, TrendingUp, Star, Image as ImageIcon, Clock, CheckCircle, AlertCircle, Package, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0,
    totalCategories: 0,
    pendingOrders: 0,
    todayOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch stats
      const [ordersRes, menuItemsRes, categoriesRes, todayOrdersRes, pendingOrdersRes] = await Promise.all([
        supabase.from('orders').select('total_amount').eq('status', 'completed'),
        supabase.from('menu_items').select('id'),
        supabase.from('categories').select('id'),
        supabase.from('orders').select('*').gte('created_at', today),
        supabase.from('orders').select('*').eq('status', 'pending'),
      ]);

      // Calculate stats
      const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      
      setStats({
        totalOrders: ordersRes.data?.length || 0,
        totalRevenue,
        totalMenuItems: menuItemsRes.data?.length || 0,
        totalCategories: categoriesRes.data?.length || 0,
        pendingOrders: pendingOrdersRes.data?.length || 0,
        todayOrders: todayOrdersRes.data?.length || 0,
      });

      // Fetch recent orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-amber-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-coffee-800" />;
      default:
        return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'badge-success',
      pending: 'badge-warning',
      cancelled: 'badge-danger',
      confirmed: 'badge-info',
      preparing: 'badge-warning',
      ready: 'badge-success',
    };
    return badges[status] || 'badge-info';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-white rounded-xl group-hover:shadow-soft Transition-all" style={{background: 'linear-gradient(135deg, #D4A574 0%, # c19A6B 100%)'}}>
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-700 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalOrders}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-coffee-800 rounded-xl group-hover:shadow-soft Transition-all border-2 border-amber-400" style={{background: 'linear-gradient(135deg, #FFF8E2 0%, #F5E2D3 100%)'}}>
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-700 mb-1">Revenue</p>
          <p className="text-2xl font-bold text-coffee-900">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-white rounded-xl group-hover:shadow-soft Transition-all" style={{background: 'linear-gradient(135deg, #D4A574 0%, # c19A6B 100%)'}}>
              <Coffee className="w-6 h-6" />
            </div>
            <Package className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Menu Items</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalMenuItems}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-coffee-800 rounded-xl Group-hover:shadow-soft Transition-all border-2 border-amber-500" style={{background: 'linear-gradient(135deg, #FFF8E2 0%, #F5E2D$ 100%)'}}>
              <Package className="w-6 h-6" />
            </div>
            <div className="w-4 h-4 rounded-full bg-amber-600"></div>
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Categories</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.totalCategories}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-amber-700 rounded-xl Group-hover:shadow-soft Transition-all border-2 border-amber-500" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Pending</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.pendingOrders}</p>
        </div>

        <div className="stat-card group hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 text-white rounded-xl Group-hover:shadow-soft Transition-all" style={{background: 'linear-gradient(135deg, #D4A574 0%, # c19A6B 100%)'}}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-coffee-900 mb-1">Today</p>
          <p className="text-2xl font-bold text-coffee-900">{stats.todayOrders}</p>
        </div>
      </div>

      {/* Recent Orders with Enhanced Design */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-coffee-900">Recent Orders</h2>
            <p className="text-sm text-coffee-600">Latest customer orders</p>
          </div>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div 
                key={order.id} 
                className="table-row bg-gradient-to-r from-coffee-50 to-white rounded-xl p-4 border border-coffee-100 hover:shadow-soft animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-lg shadow-soft">
                      <ShoppingCart className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-coffee-900">Order #{order.order_number}</p>
                      <p className="text-sm text-coffee-600">{order.customer_name}</p>
                      <p className="text-xs text-coffee-500">{order.customer_phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-lg text-coffee-900">${order.total_amount}</p>
                      <p className="text-xs text-coffee-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-xs font-semibold ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-coffee-400" />
            </div>
            <p className="text-coffee-600 font-medium">No orders yet</p>
            <p className="text-sm text-coffee-500 mt-1">Your first order will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
