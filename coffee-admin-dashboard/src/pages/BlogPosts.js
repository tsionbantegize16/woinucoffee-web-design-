import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Edit, Trash2, FileText, Calendar, User, CheckCircle, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BlogPostForm from '../components/BlogPostForm';

const BlogPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', postToDelete.id);
      if (error) throw error;
      toast.success('Post deleted!');
      setShowDeleteModal(false);
      setPostToDelete(null);
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setShowForm(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPost(null);
  };

  const handleFormSuccess = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-coffee-900 mb-2">Blog Posts</h1>
          <p className="text-lg text-coffee-600">Create and manage your blog content</p>
        </div>
        <button onClick={handleNewPost} className="btn-primary flex items-center gap-2 text-lg px-6 py-3 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Published</p>
              <p className="text-3xl font-bold text-green-900">
                {posts.filter(p => p.is_published).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-3 rounded-full">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-700 font-medium">Drafts</p>
              <p className="text-3xl font-bold text-amber-900">
                {posts.filter(p => !p.is_published).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Posts</p>
              <p className="text-3xl font-bold text-blue-900">{posts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
              post.is_published ? 'border-green-200' : 'border-amber-200'
            } animate-slide-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Featured Image */}
            {post.featured_image ? (
              <div className="h-48 relative overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {post.is_published && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Published
                  </div>
                )}
                {!post.is_published && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Draft
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-coffee-100 to-amber-100 flex items-center justify-center relative">
                <FileText className="w-16 h-16 text-coffee-300" />
                {post.is_published ? (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Published
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Draft
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-coffee-900 line-clamp-2 hover:text-amber-600 transition-colors">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => handleEditPost(post)}
                  className="btn-icon btn-icon-secondary"
                  aria-label={`Edit ${post.title}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  className="btn-icon btn-icon-danger"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold text-coffee-800 mb-2">No blog posts yet</h3>
          <p className="text-coffee-600 mb-6">Start creating content for your audience</p>
          <button onClick={handleNewPost} className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-5 h-5" /> Create First Post
          </button>
        </div>
      )}

      {showForm && (
        <BlogPostForm
          post={selectedPost}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <div className="text-center">
              {/* Animated Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Delete Blog Post</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this blog post?
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-amber-900 text-lg">{postToDelete?.title}</p>
                {postToDelete?.created_at && (
                  <p className="text-amber-700 text-sm mt-1">
                    Published: {new Date(postToDelete.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-8">
                This action cannot be undone. The blog post will be permanently removed from your website.
              </p>
              
              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setPostToDelete(null);
                  }}
                  className="btn btn-outline flex-1 py-3 px-4"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger flex-1 py-3 px-4 inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
