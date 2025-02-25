import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const handleScrollToBlog = (e) => {
    e.preventDefault();
    const blogsSection = document.getElementById('blogs');
    if (blogsSection) {
      blogsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden" id="hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-colorT to-purple-600 opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600 to-colorT opacity-20 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Share Your Stories,
                <span className="block mt-2 bg-gradient-to-r from-colorT to-purple-400 bg-clip-text text-transparent">
                  Inspire the World
                </span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Welcome to our blogging community where ideas flourish and stories come to life. Express yourself, connect with others, and make your voice heard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/#blogs"
                  onClick={handleScrollToBlog}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  Explore Blogs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Start Writing
                </Link>
              </div>
            </div>

            {/* Image/Visual Section */}
            <div className="relative lg:ml-12">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-colorT/20 to-purple-500/20 rounded-[2rem] blur-2xl" />
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-tr from-gray-900 to-gray-800 p-1 rounded-[2rem] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-colorT/20 to-purple-500/20 rounded-[2rem]" />
                <div className="relative bg-gray-900 rounded-[calc(2rem-2px)] overflow-hidden">
                  <div className="aspect-[4/3]">
                    {/* Blog Preview Cards */}
                    <div className="absolute top-4 left-4 right-4 grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-800 rounded-xl p-3 transform hover:-translate-y-1 transition-transform duration-300"
                        >
                          <div className="w-full h-24 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-lg mb-2" />
                          <div className="h-2 w-3/4 bg-gray-700 rounded mb-1" />
                          <div className="h-2 w-1/2 bg-gray-700 rounded" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-gradient-to-r from-colorT to-purple-500 p-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-white/20" />
                          <div>
                            <div className="h-2 w-24 bg-white/20 rounded" />
                            <div className="h-2 w-16 bg-white/20 rounded mt-1" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 w-full bg-white/20 rounded" />
                          <div className="h-2 w-3/4 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Writers', value: '2,000+' },
              { label: 'Blog Posts', value: '10,000+' },
              { label: 'Daily Readers', value: '50,000+' },
              { label: 'Topics Covered', value: '100+' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
