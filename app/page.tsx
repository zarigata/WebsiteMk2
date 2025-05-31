import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaChartLine, FaGlobe, FaMobileAlt, FaRocket } from 'react-icons/fa';

export default function Home() {
  const services = [
    {
      icon: <FaGlobe className="h-8 w-8 text-primary" />,
      title: 'Web Development',
      description: 'Custom websites that drive results and engage your audience.',
      link: '/services#web',
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-primary" />,
      title: 'Digital Marketing',
      description: 'Data-driven strategies to grow your online presence.',
      link: '/services#marketing',
    },
    {
      icon: <FaMobileAlt className="h-8 w-8 text-primary" />,
      title: 'Mobile Solutions',
      description: 'Reach your customers on any device with our mobile solutions.',
      link: '/services#mobile',
    },
    {
      icon: <FaRocket className="h-8 w-8 text-primary" />,
      title: 'SEO & Growth',
      description: 'Improve your search rankings and drive organic traffic.',
      link: '/services#seo',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Elevate Your Digital Presence in Saudi Arabia
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                We help businesses grow with innovative digital solutions tailored for the Saudi market.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                  Get Started <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/services" className="btn-secondary inline-flex items-center justify-center bg-white text-primary hover:bg-primary hover:text-white">
                  Our Services
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white/30">Your Brand Here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions designed to help your business thrive in the digital landscape of Saudi Arabia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={service.link} 
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Learn more <FaArrowRight className="ml-1" size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-dark mb-6">Why Choose Catchy?</h2>
              <p className="text-gray-600 mb-6">
                At Catchy, we combine creativity with data-driven strategies to deliver exceptional results for our clients in Saudi Arabia. Our team of experts is dedicated to helping your business succeed in the digital world.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3">
                    <FaArrowRight className="text-primary" size={14} />
                  </div>
                  <span className="text-gray-700">Local market expertise in Saudi Arabia</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3">
                    <FaArrowRight className="text-primary" size={14} />
                  </div>
                  <span className="text-gray-700">Customized solutions for your business</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3">
                    <FaArrowRight className="text-primary" size={14} />
                  </div>
                  <span className="text-gray-700">Proven track record of success</span>
                </li>
              </ul>
              <Link href="/about" className="btn-primary inline-flex items-center">
                Learn More About Us <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">About Us Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing for your business in Saudi Arabia.
          </p>
          <Link href="/contact" className="btn-secondary inline-flex items-center bg-white text-primary hover:bg-gray-100">
            Get In Touch <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
