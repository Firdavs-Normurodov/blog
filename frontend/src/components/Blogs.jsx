import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useBlogStore from '../store/blogStore';

const Blogs = () => {
  const { posts, isLoading } = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPost, setHoveredPost] = useState(null);

  useEffect(() => {
    useBlogStore.getState().getPosts();
  }, []);

  const totalPages = Math.ceil((posts?.length || 0) / 9);
  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;
  const currentPosts = posts?.slice(startIndex, endIndex) || [];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-colorT border-t-transparent" />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center space-y-6 px-4">
        <div className="text-gray-300">
          <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">No Posts Yet</h3>
        <p className="text-gray-600 max-w-md">Be the first to share your thoughts! Create a post and inspire the community.</p>
        <Link to="/profile" className="inline-flex items-center px-6 py-2 bg-colorT text-white rounded-lg hover:bg-colorT/90 transition-all duration-200 shadow-md hover:shadow-lg">
          Create a Post
        </Link>
      </div>
    );
  }

  return (
    <div id="blogs" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-12 tracking-tight">Latest Blog Posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Link
            key={post._id}
            to={`/blogs/${post._id}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2"
            onMouseEnter={() => setHoveredPost(post._id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            {/* Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={post.picture || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found')}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            {/* Content Container */}
            <div className="flex-1 p-6 space-y-4">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={post.author?.picture || 'https://via.placeholder.com/40'}
                    alt={post.author?.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  {hoveredPost === post._id && (
                    <div className="absolute inset-0 bg-colorT bg-opacity-20 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{post.author?.username || 'Anonymous'}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-colorT transition-colors duration-300">
                {post.title || 'Untitled Post'}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {post.description || 'No description available'}
              </p>

              {/* Meta Information */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{Math.ceil(post.content?.split(' ').length / 200) || 1} min read</span>
                </div>
                {post.updatedAt !== post.createdAt && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>Updated {formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-10 h-10 rounded-full border ${
                currentPage === index + 1
                  ? 'bg-colorT text-white border-colorT shadow-md'
                  : 'border-gray-300 hover:bg-gray-100 hover:shadow-md'
              } transition-all duration-200 font-medium`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;