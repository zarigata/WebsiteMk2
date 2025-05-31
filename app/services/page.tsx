import { FaArrowRight, FaChartLine, FaCode, FaMobileAlt, FaSearch, FaBullhorn, FaPenFancy, FaVideo, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: <FaCode className="h-8 w-8 text-primary" />,
      title: 'Web Development',
      description: 'Custom, responsive websites that look great on any device and drive results for your business.',
      features: [
        'Custom Website Design',
        'E-commerce Solutions',
        'CMS Integration',
        'Website Maintenance'
      ],
      id: 'web'
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-primary" />,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies to grow your online presence and reach your target audience.',
      features: [
        'Social Media Marketing',
        'Email Marketing',
        'Content Marketing',
        'Influencer Marketing'
      ],
      id: 'marketing'
    },
    {
      icon: <FaSearch className="h-8 w-8 text-primary" />,
      title: 'SEO & Content',
      description: 'Improve your search engine rankings and drive organic traffic to your website.',
      features: [
        'Keyword Research',
        'On-Page & Off-Page SEO',
        'Content Creation',
        'Link Building'
      ],
      id: 'seo'
    },
    {
      icon: <FaMobileAlt className="h-8 w-8 text-primary" />,
      title: 'Mobile App Development',
      description: 'Engaging mobile applications that provide seamless user experiences across all devices.',
      features: [
        'iOS & Android Apps',
        'Cross-Platform Development',
        'UI/UX Design',
        'App Store Optimization'
      ],
      id: 'mobile'
    },
    {
      icon: <FaBullhorn className="h-8 w-8 text-primary" />,
      title: 'Social Media Management',
      description: 'Build and maintain a strong social media presence across all major platforms.',
      features: [
        'Content Creation',
        'Community Management',
        'Paid Advertising',
        'Analytics & Reporting'
      ],
      id: 'social-media'
    },
    {
      icon: <FaShoppingCart className="h-8 w-8 text-primary" />,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce solutions to help you sell products and services online.',
      features: [
        'Online Store Setup',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Processing'
      ],
      id: 'ecommerce'
    },
    {
      icon: <FaPenFancy className="h-8 w-8 text-primary" />,
      title: 'Graphic Design',
      description: 'Eye-catching designs that effectively communicate your brand message.',
      features: [
        'Logo Design',
        'Brand Identity',
        'Print Materials',
        'Digital Graphics'
      ],
      id: 'design'
    },
    {
      icon: <FaVideo className="h-8 w-8 text-primary" />,
      title: 'Video Production',
      description: 'High-quality video content that tells your brand story and engages your audience.',
      features: [
        'Commercial Videos',
        'Animation',
        'Product Demos',
        'Social Media Videos'
      ],
      id: 'video'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl">
            Comprehensive digital solutions designed to help your business thrive in the digital landscape of Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                id={service.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="p-6 flex-grow">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link 
                    href="/contact" 
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Get Started <FaArrowRight className="ml-2" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital goals in Saudi Arabia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="btn-secondary inline-flex items-center justify-center bg-white text-primary hover:bg-gray-100 px-8 py-3"
            >
              Get a Free Consultation
            </Link>
            <Link 
              href="tel:+966123456789" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Call Us: +966 12 345 6789
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven process to ensure the success of every project we undertake.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Discovery',
                description: 'We learn about your business, goals, and target audience.'
              },
              {
                number: '02',
                title: 'Strategy',
                description: 'We develop a customized strategy to achieve your objectives.'
              },
              {
                number: '03',
                title: 'Execution',
                description: 'Our team brings the strategy to life with precision and creativity.'
              },
              {
                number: '04',
                title: 'Results',
                description: 'We measure success and optimize for continuous improvement.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold rounded-full mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
