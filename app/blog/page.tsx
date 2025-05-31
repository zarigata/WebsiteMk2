import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in Saudi Arabia',
    excerpt: 'Exploring the latest trends and opportunities in the Saudi digital marketing landscape for 2025.',
    date: 'May 28, 2025',
    author: 'Ahmed Al-Saud',
    category: 'Digital Marketing',
    readTime: '5 min read',
    image: '/images/blog/digital-marketing-saudi.jpg',
    slug: 'future-of-digital-marketing-saudi-arabia'
  },
  {
    id: 2,
    title: 'How to Optimize Your Website for Saudi Audiences',
    excerpt: 'Key strategies to make your website more appealing and effective for the Saudi market.',
    date: 'May 21, 2025',
    author: 'Sarah Al-Ghamdi',
    category: 'Web Development',
    readTime: '4 min read',
    image: '/images/blog/website-optimization.jpg',
    slug: 'optimize-website-saudi-audiences'
  },
  {
    id: 3,
    title: 'The Rise of E-commerce in Saudi Arabia',
    excerpt: 'Understanding the rapid growth of online shopping in the Kingdom and how businesses can capitalize on it.',
    date: 'May 14, 2025',
    author: 'Khalid Al-Rashid',
    category: 'E-commerce',
    readTime: '6 min read',
    image: '/images/blog/ecommerce-saudi.jpg',
    slug: 'rise-of-ecommerce-saudi-arabia'
  },
  {
    id: 4,
    title: 'Social Media Trends in Saudi Arabia 2025',
    excerpt: 'A deep dive into the social media platforms and content that are dominating the Saudi market.',
    date: 'May 7, 2025',
    author: 'Noura Al-Faisal',
    category: 'Social Media',
    readTime: '7 min read',
    image: '/images/blog/social-media-trends.jpg',
    slug: 'social-media-trends-saudi-2025'
  },
  {
    id: 5,
    title: 'Local SEO Strategies for Saudi Businesses',
    excerpt: 'How to optimize your online presence to attract more local customers in Saudi cities.',
    date: 'April 30, 2025',
    author: 'Faisal Al-Qahtani',
    category: 'SEO',
    readTime: '5 min read',
    image: '/images/blog/local-seo-saudi.jpg',
    slug: 'local-seo-strategies-saudi-businesses'
  },
  {
    id: 6,
    title: 'The Power of Video Marketing in the Middle East',
    excerpt: 'Why video content is dominating the digital landscape in Saudi Arabia and the broader Middle East.',
    date: 'April 23, 2025',
    author: 'Layla Al-Mansour',
    category: 'Video Marketing',
    readTime: '6 min read',
    image: '/images/blog/video-marketing-me.jpg',
    slug: 'video-marketing-middle-east'
  },
];

// Categories for filtering
const categories = [
  'All',
  'Digital Marketing',
  'Web Development',
  'E-commerce',
  'Social Media',
  'SEO',
  'Content Marketing',
  'Video Marketing'
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl">
            Insights, trends, and strategies to help your business thrive in the digital landscape of Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  index === 0 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-3 pl-12 pr-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Featured Post */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2 bg-gray-200 h-64 md:h-auto">
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  Featured Image
                </div>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">
                  {blogPosts[0].category}
                </div>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  <Link href={`/blog/${blogPosts[0].slug}`} className="hover:text-primary transition-colors duration-200">
                    {blogPosts[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-6">
                    <FaUser className="mr-1" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Link 
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read more <FaArrowRight className="ml-1" size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  Blog Image
                </div>
                <div className="p-6">
                  <div className="uppercase tracking-wide text-xs text-primary font-semibold mb-1">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button 
                  key={page} 
                  className={`px-4 py-2 rounded-lg ${
                    page === 1 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest digital marketing insights and updates straight to your inbox.
          </p>
          <div className="max-w-lg mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-white/80 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
