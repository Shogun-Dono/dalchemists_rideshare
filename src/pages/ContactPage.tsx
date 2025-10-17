import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
    <NavBar></NavBar>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Have questions about NS Move? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 mb-3">hello@nsmove.ca</p>
            <p className="text-sm text-gray-500">We respond within 24 hours</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600 mb-3">(902) 555-0123</p>
            <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm AST</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Office</h3>
            <p className="text-gray-600 mb-3">Halifax, Nova Scotia</p>
            <p className="text-sm text-gray-500">Downtown Core</p>
          </div>

          <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <MessageCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-3">In-app support</p>
            <p className="text-sm text-gray-500">Instant assistance</p>
          </div>
        </div>

        {/* Contact Form and Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                <p className="text-green-600">We've received your message and will be in touch soon.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-xl transition-all hover:from-indigo-700 hover:to-blue-700 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div>
            {/* Business Hours */}
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl mb-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Business Hours</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">All times Atlantic Standard Time (AST)</p>
            </div>

            {/* Support Categories */}
            <div className="bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">What can we help with?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-xl mr-3">🎯</span>
                  <span className="text-gray-700">General inquiries</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🐛</span>
                  <span className="text-gray-700">Technical support</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🤝</span>
                  <span className="text-gray-700">Partnership opportunities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">📰</span>
                  <span className="text-gray-700">Media & press inquiries</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">💼</span>
                  <span className="text-gray-700">Careers & job opportunities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🆘</span>
                  <span className="text-gray-700">Safety concerns & reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-indigo-600 pl-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">How quickly will I hear back?</h4>
              <p className="text-gray-700">We typically respond to all inquiries within 24 business hours. Urgent matters are prioritized accordingly.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Do you have a mobile app?</h4>
              <p className="text-gray-700">Yes! NS Move is available on iOS and Android. Download it from the App Store or Google Play to get started.</p>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">How do I report a safety issue?</h4>
              <p className="text-gray-700">Use the in-app safety reporting feature or contact our safety team directly at safety@nsmove.ca for immediate assistance.</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Is my personal data safe?</h4>
              <p className="text-gray-700">Absolutely. We use aliases instead of real IDs and encrypt all data. Privacy is built into our core design.</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-12 text-center shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Follow Us</h2>
          <p className="text-gray-700 mb-8">Connect with us on social media for updates, community stories, and announcements.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-indigo-700 transition-all hover:scale-110">
              📘
            </button>
            <button className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-500 transition-all hover:scale-110">
              𝕏
            </button>
            <button className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-pink-700 transition-all hover:scale-110">
              📷
            </button>
            <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-red-700 transition-all hover:scale-110">
              ▶️
            </button>
            <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl hover:bg-gray-800 transition-all hover:scale-110">
              💼
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-indigo-100 border-t border-white border-opacity-20 mt-12">
        <p>© 2025 NS Move. Building a sustainable future together.</p>
      </div>
    </div>
  );
}