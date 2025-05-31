import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaGlobe, FaUsers, FaRocket } from 'react-icons/fa';

export default function AboutPage() {
  const team = [
    {
      name: 'Founder 1',
      role: 'CEO & Marketing Expert',
      bio: 'With over 10 years of experience in digital marketing, Founder 1 leads our team with vision and expertise.',
      image: '/images/team/placeholder-1.jpg',
    },
    {
      name: 'Founder 2',
      role: 'CTO & Web Developer',
      bio: 'A tech enthusiast with a passion for creating seamless digital experiences across all platforms.',
      image: '/images/team/placeholder-2.jpg',
    },
    {
      name: 'Founder 3',
      role: 'Creative Director',
      bio: 'Bringing creative visions to life with innovative design and compelling storytelling.',
      image: '/images/team/placeholder-3.jpg',
    },
    {
      name: 'Founder 4',
      role: 'Head of Operations',
      bio: 'Ensuring smooth operations and client satisfaction across all our projects.',
      image: '/images/team/placeholder-4.jpg',
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '150+', icon: <FaCheckCircle className="h-8 w-8 text-primary" /> },
    { label: 'Happy Clients', value: '100+', icon: <FaUsers className="h-8 w-8 text-primary" /> },
    { label: 'Years Experience', value: '5+', icon: <FaGlobe className="h-8 w-8 text-primary" /> },
    { label: 'Ongoing Projects', value: '25+', icon: <FaRocket className="h-8 w-8 text-primary" /> },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Catchy</h1>
          <p className="text-xl max-w-3xl">
            Empowering businesses in Saudi Arabia with innovative digital solutions that drive growth and success.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Founded in 2020, Catchy began as a small team of passionate digital experts with a vision to transform the digital landscape in Saudi Arabia. Our founders recognized the growing need for businesses to establish a strong online presence in the rapidly evolving digital world.
                </p>
                <p className="mb-6">
                  What started as a modest operation has grown into a full-service digital marketing and web development agency, serving clients across various industries throughout the Kingdom. Our commitment to excellence, innovation, and client satisfaction has been the driving force behind our success.
                </p>
                <Link href="/contact" className="btn-primary inline-flex items-center">
                  Get In Touch <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">Our Office</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Meet Our Founders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Catchy who work tirelessly to deliver exceptional results for our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">Team Member Photo</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing List of Happy Clients</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing for your business in Saudi Arabia.
          </p>
          <Link href="/contact" className="btn-secondary inline-flex items-center bg-white text-primary hover:bg-gray-100">
            Get Started Today <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
