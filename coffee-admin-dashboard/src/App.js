import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MenuItems from './pages/MenuItems';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Gallery from './pages/Gallery';
import BlogPosts from './pages/BlogPosts';
import Promotions from './pages/Promotions';
import Testimonials from './pages/Testimonials';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu-items" element={<MenuItems />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog" element={<BlogPosts />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
