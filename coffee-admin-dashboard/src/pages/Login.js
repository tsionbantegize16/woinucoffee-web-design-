import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Coffee, Lock, Mail, Shield, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email.trim(), password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-900 via-coffee-800 to-amber-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
         style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #5C4033 0%, #6F4E37 50%, #78350F 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Toaster position="top-right" />
      <div className="max-w-md w-full relative z-10">
        <div className="card-glass shadow-strong animate-bounce-soft"
             style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 bg-gradient-amber rounded-2xl flex items-center justify-center shadow-soft mb-6 group-hover:scale-110 transition-transform"
                 style={{ background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-coffee-900 mb-2"
                style={{ color: '#5C4033', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Woinu Coffee
            </h2>
            <p className="text-lg text-coffee-600 flex items-center justify-center gap-2"
               style={{ color: '#8B5530', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Shield className="w-4 h-4" />
              Admin Dashboard
              <Shield className="w-4 h-4" />
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="label flex items-center gap-2"
                       style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#5C4033', marginBottom: '0.5rem' }}>
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="admin@woinucoffee.com"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #FCD34D', borderRadius: '0.75rem', outline: 'none', fontSize: '1rem' }}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="label flex items-center gap-2"
                       style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#5C4033', marginBottom: '0.5rem' }}>
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #FCD34D', borderRadius: '0.75rem', outline: 'none', fontSize: '1rem' }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.125rem', padding: '1rem', background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-coffee-200 text-center">
            <p className="text-xs text-coffee-500">© 2024 Woinu Coffee. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
