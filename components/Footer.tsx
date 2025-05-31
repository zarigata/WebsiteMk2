import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: FaFacebook,
      },
      {
        name: 'Twitter',
        href: '#',
        icon: FaTwitter,
      },
      {
        name: 'Instagram',
        href: '#',
        icon: FaInstagram,
      },
      {
        name: 'LinkedIn',
        href: '#',
        icon: FaLinkedin,
      },
    ],
  };

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Catchy</h3>
            <p className="text-gray-300">
              Your trusted partner for digital marketing and web solutions in Saudi Arabia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services#marketing" className="text-gray-300 hover:text-white transition-colors duration-200">Digital Marketing</Link></li>
              <li><Link href="/services#web" className="text-gray-300 hover:text-white transition-colors duration-200">Web Development</Link></li>
              <li><Link href="/services#seo" className="text-gray-300 hover:text-white transition-colors duration-200">SEO & Content</Link></li>
              <li><Link href="/services#branding" className="text-gray-300 hover:text-white transition-colors duration-200">Branding</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300">
              <p>123 Business District</p>
              <p>Riyadh, Saudi Arabia</p>
              <p className="mt-2">Email: info@catchy.sa</p>
              <p>Phone: +966 12 345 6789</p>
            </address>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            <p className="text-gray-300">
              &copy; {currentYear} Catchy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
