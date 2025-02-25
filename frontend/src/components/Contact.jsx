import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    email: 'hello@yourdomain.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    socials: [
      {
        name: 'GitHub',
        icon: Github,
        url: 'https://github.com/yourusername',
        username: '@yourusername',
        color: 'hover:bg-[#2b3137]'
      },
      {
        name: 'LinkedIn',
        icon: Linkedin,
        url: 'https://linkedin.com/in/yourusername',
        username: 'Your Name',
        color: 'hover:bg-[#0077b5]'
      },
      {
        name: 'Twitter',
        icon: Twitter,
        url: 'https://twitter.com/yourusername',
        username: '@yourusername',
        color: 'hover:bg-[#1DA1F2]'
      }
    ]
  };

  return (
    <section className="relative py-32 overflow-hidden" id="contact">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:20px_20px]" />
      </div>
      
      <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 blur-2xl opacity-20">
        <div className="aspect-square h-96 rounded-full bg-colorT" />
      </div>
      <div className="absolute left-0 bottom-0 translate-y-12 -translate-x-12 blur-2xl opacity-20">
        <div className="aspect-square h-96 rounded-full bg-purple-500" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to work together? I'd love to hear from you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Email Card */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-xl bg-colorT/5 group-hover:bg-colorT/10 transition-colors duration-300">
                  <Mail className="w-7 h-7 text-colorT" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 text-sm break-all group-hover:text-colorT transition-colors duration-300">
                  {contactInfo.email}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-colorT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-xl bg-colorT/5 group-hover:bg-colorT/10 transition-colors duration-300">
                  <Phone className="w-7 h-7 text-colorT" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 text-sm group-hover:text-colorT transition-colors duration-300">
                  {contactInfo.phone}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-colorT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Location Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 overflow-hidden">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-xl bg-colorT/5 group-hover:bg-colorT/10 transition-colors duration-300">
                  <MapPin className="w-7 h-7 text-colorT" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600 text-sm group-hover:text-colorT transition-colors duration-300">
                  {contactInfo.location}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-colorT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Social Links */}
          <div className="relative bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-12 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white rounded-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Connect on Social Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactInfo.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg ${social.color} hover:text-white`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-white/10 transition-colors duration-300">
                      <social.icon className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </h4>
                      <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300 flex items-center gap-1">
                        {social.username}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <p className="text-center text-gray-500 mt-12">
            Looking forward to connecting with you! I typically respond within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
