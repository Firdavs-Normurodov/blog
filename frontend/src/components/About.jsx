import { Pen, Users, Globe, Zap, BookOpen, MessageCircle } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Pen,
      title: 'Express Yourself',
      description: 'Write and share your stories, ideas, and expertise with our easy-to-use editor.'
    },
    {
      icon: Users,
      title: 'Connect with Others',
      description: 'Join a vibrant community of writers and readers who share your interests.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Share your content with readers from around the world and make a lasting impact.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience seamless performance with our optimized blogging platform.'
    },
    {
      icon: BookOpen,
      title: 'Rich Content',
      description: 'Create engaging posts with images, formatting, and multimedia support.'
    },
    {
      icon: MessageCircle,
      title: 'Engage Readers',
      description: 'Build meaningful connections through comments and discussions.'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gray-50" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:20px_20px]" />
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-colorT opacity-20 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-purple-500 opacity-20 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building the future of digital storytelling, where every voice matters and every story finds its audience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-colorT/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="mb-6 inline-block">
                    <div className="p-4 bg-colorT/10 rounded-xl group-hover:bg-colorT/20 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-colorT" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '2M+', label: 'Monthly Readers' },
                { value: '150+', label: 'Countries' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To empower voices, inspire creativity, and foster a global community of storytellers and thought leaders. 
              We believe that everyone has a story worth sharing, and we're here to help you tell yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
