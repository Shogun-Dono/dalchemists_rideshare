import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import QRCodePopup from "../components/QRCodePopup";

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
    <div className="min-h-screen bg-[#22477a]">
      <NavBar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#f0ebe1] mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-[#b8ccde] max-w-3xl mx-auto">
            Have questions about NS Move? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#f0ebe1] rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <Mail className="w-12 h-12 text-[#f0a824] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Email</h3>
            <p className="text-[#22477a] mb-3">hello@nsmove.ca</p>
            <p className="text-sm text-[#22477a]">We respond within 24 hours</p>
          </div>

          <div className="bg-[#f0ebe1] rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <Phone className="w-12 h-12 text-[#f0a824] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
            <p className="text-[#22477a] mb-3">(902) 555-0123</p>
            <p className="text-sm text-[#22477a]">Mon-Fri, 9am-5pm AST</p>
          </div>

          <div className="bg-[#f0ebe1] rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <MapPin className="w-12 h-12 text-[#f0a824] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Office</h3>
            <p className="text-[#22477a] mb-3">Halifax, Nova Scotia</p>
            <p className="text-sm text-[#22477a]">Downtown Core</p>
          </div>

          <div className="bg-[#f0ebe1] rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <MessageCircle className="w-12 h-12 text-[#f0a824] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Live Chat</h3>
            <p className="text-[#22477a] mb-3">In-app support</p>
            <p className="text-sm text-[#22477a]">Instant assistance</p>
          </div>
        </div>

        {/* Contact Form and Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-[#f0ebe1] rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-black mb-8">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-[#b8ccde] border-2 border-[#f0a824] rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-black mb-2">Thank You!</h3>
                <p className="text-black">We've received your message and will be in touch soon.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-black font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#b8ccde] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-black font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#b8ccde] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#b8ccde] text-black focus:border-[#f0a824] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#b8ccde] bg-[#b8ccde] text-black focus:border-[#f0a824] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#f0a824] text-black py-3 rounded-lg font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
            <div className="bg-[#f0ebe1] rounded-3xl p-8 shadow-2xl mb-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-[#f0a824] mr-3" />
                <h3 className="text-2xl font-bold text-black">Business Hours</h3>
              </div>
              <div className="space-y-3 text-[#22477a]">
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
              <p className="text-sm text-[#22477a] mt-4">All times Atlantic Standard Time (AST)</p>
            </div>

            {/* Support Categories */}
            <div className="bg-[#f0ebe1] rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-black mb-6">What can we help with?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-xl mr-3">🎯</span>
                  <span className="text-[#22477a]">General inquiries</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🐛</span>
                  <span className="text-[#22477a]">Technical support</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🤝</span>
                  <span className="text-[#22477a]">Partnership opportunities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">📰</span>
                  <span className="text-[#22477a]">Media & press inquiries</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">💼</span>
                  <span className="text-[#22477a]">Careers & job opportunities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xl mr-3">🆘</span>
                  <span className="text-[#22477a]">Safety concerns & reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#f0ebe1] rounded-3xl p-12 shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-[#f0a824] pl-6">
              <h4 className="text-lg font-bold text-black mb-3">How quickly will I hear back?</h4>
              <p className="text-[#22477a]">We typically respond to all inquiries within 24 business hours. Urgent matters are prioritized accordingly.</p>
            </div>
            <div className="border-l-4 border-[#f0a824] pl-6">
              <h4 className="text-lg font-bold text-black mb-3">Do you have a mobile app?</h4>
              <p className="text-[#22477a]">Yes! NS Move is available on iOS and Android. Download it from the App Store or Google Play to get started.</p>
            </div>
            <div className="border-l-4 border-[#f0a824] pl-6">
              <h4 className="text-lg font-bold text-black mb-3">How do I report a safety issue?</h4>
              <p className="text-[#22477a]">Use the in-app safety reporting feature or contact our safety team directly at safety@nsmove.ca for immediate assistance.</p>
            </div>
            <div className="border-l-4 border-[#f0a824] pl-6">
              <h4 className="text-lg font-bold text-black mb-3">Is my personal data safe?</h4>
              <p className="text-[#22477a]">Absolutely. We use aliases instead of real IDs and encrypt all data. Privacy is built into our core design.</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-[#f0ebe1] rounded-3xl p-12 text-center shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-black mb-8">Follow Us</h2>
          <p className="text-[#22477a] mb-8">Connect with us on social media for updates, community stories, and announcements.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-black text-xl hover:opacity-90 transition-all hover:scale-110">
              📘
            </button>
            <button className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-black text-xl hover:opacity-90 transition-all hover:scale-110">
              𝕏
            </button>
            <button className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-black text-xl hover:opacity-90 transition-all hover:scale-110">
              📷
            </button>
            <button className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-black text-xl hover:opacity-90 transition-all hover:scale-110">
              ▶️
            </button>
            <button className="w-12 h-12 bg-[#f0a824] rounded-full flex items-center justify-center text-black text-xl hover:opacity-90 transition-all hover:scale-110">
              💼
            </button>
          </div>
        </div>
      </div>

      <QRCodePopup />

      {/* Footer */}
      <div className="text-center py-8 text-[#f0ebe1] border-t border-[#b8ccde] mt-12">
        <p>© 2025 NS Move. Building a sustainable future together.</p>
      </div>
    </div>
  );
}
