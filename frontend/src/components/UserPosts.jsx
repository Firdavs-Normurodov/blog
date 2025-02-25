import { Link } from 'react-router-dom';
import { Trash2, Edit2, Clock, RefreshCw, Plus } from 'lucide-react';

const UserPosts = ({ 
  isLoading, 
  userPosts, 
  handleDeletePost, 
  setIsCreatingPost,
  setEditingPost
}) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
     

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-colorT border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : userPosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">No Posts Yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your thoughts with the world by creating your first blog post.</p>
            <button
              onClick={() => setIsCreatingPost(true)}
              className="px-6 py-3 bg-colorT text-white rounded-xl hover:bg-colorT/90 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg shadow-colorT/20"
            >
              <Plus size={20} />
              Create Your First Post
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPosts.map(post => (
            <div key={post._id} className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={post.picture}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/png?text=Blog+Image';
                    console.log(`Failed to load image: ${post.picture}`);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Created: {formatDate(post.createdAt)}</span>
                  </div>
                  {post.updatedAt !== post.createdAt && (
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} />
                      <span>Updated: {formatDate(post.updatedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/blogs/${post._id}`}
                    className="text-colorT hover:text-colorT/80 font-medium transition-colors duration-300"
                  >
                    Read More
                  </Link>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      title="Edit post"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                      title="Delete post"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;