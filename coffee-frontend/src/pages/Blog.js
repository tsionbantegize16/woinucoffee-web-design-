import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Calendar, User } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    setPosts(data || []);
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FDF8F3 0%, #F0DCC7 100%)'}}>
      <Navbar />

      <div className="relative py-20" style={{background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 50%, #B8956A 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Origin Dispatches</h1>
          <p className="text-xl text-amber-100">Insights on Ethiopian producers, sustainability, and global partnerships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              {post.featured_image && (
                <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-coffee-900 mb-3 transition-colors" style={{transition: 'color 0.3s'}} onMouseEnter={(e) => e.target.style.color = '#D4A574'} onMouseLeave={(e) => e.target.style.color = '#6B5B45'}>
                  {post.title}
                </h2>
                <p className="text-amber-900 mb-4 line-clamp-3">{post.excerpt || post.content.substring(0, 150)}...</p>
                <div className="flex items-center justify-between text-sm text-amber-700">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{color: '#D4A574'}} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{color: '#D4A574'}} />
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
