'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real app, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="h-6 w-6 text-primary" />,
      title: 'Our Location',
      description: '123 Business District, Riyadh, Saudi Arabia',
    },
    {
      icon: <FaPhoneAlt className="h-6 w-6 text-primary" />,
      title: 'Phone Number',
      description: '+966 12 345 6789',
      link: 'tel:+966123456789',
    },
    {
      icon: <FaEnvelope className="h-6 w-6 text-primary" />,
      title: 'Email Address',
      description: 'info@catchy.sa',
      link: 'mailto:info@catchy.sa',
    },
    {
      icon: <FaClock className="h-6 w-6 text-primary" />,
      title: 'Working Hours',
      description: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-3xl">
            Have questions or ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-primary text-white p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <p className="text-white/90 mb-8 text-lg">
                  Fill out the form and our team will get back to you within 24 hours. Or contact us directly using the information below.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="text-white/80 hover:text-white transition-colors duration-200"
                          >
                            {item.description}
                          </a>
                        ) : (
                          <p className="text-white/80">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'Facebook', icon: 'F', link: '#' },
                      { name: 'Twitter', icon: 'T', link: '#' },
                      { name: 'Instagram', icon: 'I', link: '#' },
                      { name: 'LinkedIn', icon: 'L', link: '#' },
                    ].map((social, index) => (
                      <a 
                        key={index} 
                        href={social.link}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-dark mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Message Sent Successfully!</h4>
                      <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+966 5X XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message <FaPaperPlane className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dark mb-12">Find Us on the Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Our Office Location</h3>
              <p className="text-gray-600 mb-4">123 Business District, Riyadh, Saudi Arabia</p>
              <a 
                href="https://goo.gl/maps/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Open in Google Maps <FaArrowRight className="ml-2" size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
