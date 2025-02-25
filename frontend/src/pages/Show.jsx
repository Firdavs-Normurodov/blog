import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useBlogStore from '../store/blogStore';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, isLoading, getPost, getPosts } = useBlogStore();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
        await getPosts();
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (posts && post) {
      const otherPosts = posts.filter(p => p._id !== post._id);
      const randomCount = Math.random() < 0.5 ? 3 : 4;
      const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
      setRelatedPosts(shuffled.slice(0, randomCount));
    }
  }, [posts, post]);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / (articleHeight - windowHeight)) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading || !post) {
    return (
      <div className="min-h-screen pt-[80px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-colorT border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src={post.picture || 'https://via.placeholder.com/1200x600?text=Blog+Image'}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x600?text=Image+Not+Found';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-colorT transition-colors duration-300 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Post Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={post.author?.picture || 'https://via.placeholder.com/40'}
                alt={post.author?.username}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
              />
              <div>
                <h3 className="font-medium text-lg">{post.author?.username || 'Anonymous'}</h3>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  <span className="mx-2">•</span>
                  <Clock size={14} />
                  {Math.ceil(post.content?.length / 300)} min read
                </p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">{post.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative w-full mx-auto">
          {/* Decorative Elements */}
          <div className="absolute -left-20 top-20 w-40 h-40 bg-purple-500/20 rounded-lg blur-3xl" />
          <div className="absolute -right-20 bottom-20 w-40 h-40 bg-colorT/20 rounded-lg blur-3xl" />
          
          <article className="relative bg-[rgba(0,0,0,0.97)] backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
            {/* Top Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
            
            {/* Content Container */}
            <div className="px-6 py-16 md:px-12 md:py-20">
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="relative text-gray-200 leading-relaxed">
                  {/* Decorative Quote */}
                  <div className="absolute -left-8 -top-8 text-8xl text-gray-700/20 font-serif">"</div>
                  
                  {/* Main Content */}
                  <div className="space-y-6">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="relative z-10">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Border */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
            </div>
          </article>

          {/* Reading Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-1 bg-black/20">
            <div className="h-full bg-gradient-to-r from-colorT to-purple-500 w-0" 
                 style={{ width: `${readingProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold mb-12 text-center">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost._id}
                onClick={() => {
                  navigate(`/blogs/${relatedPost._id}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={relatedPost.picture || 'https://via.placeholder.com/400x300?text=Blog+Image'}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={relatedPost.author?.picture || 'https://via.placeholder.com/32'}
                      alt={relatedPost.author?.username}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {relatedPost.author?.username || 'Anonymous'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(relatedPost.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-colorT transition-colors duration-300">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {relatedPost.description}
                  </p>

                  {/* Read Time */}
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{Math.ceil(relatedPost.content?.length / 300)} min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Show;