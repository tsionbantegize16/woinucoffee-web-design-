import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Calendar, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    setPost(data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.featured_image && (
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
          />
        )}
        
        <h1 className="text-5xl font-bold text-coffee-900 mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
