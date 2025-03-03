import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, TrendingUp, Award, Truck, Phone, Shield, Clock, Users } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  // Featured categories
  const featuredCategories = [
    { name: 'Pain Relief Tablets', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', path: '/products' },
    { name: 'Baby Products', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', path: '/products' },
    { name: 'B-P Monitors', image: 'https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', path: '/products' },
    { name: 'First Aid Kits', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', path: '/products' },
  ];

  // Featured products
  const featuredProducts = [
    { id: 1, name: 'Advanced Pain Relief Tablets', price: 190.00, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Pain Relief', rating: 4.8, reviews: 124 },
    { id: 2, name: 'Digital Blood Pressure Monitor', price: 2000.00, image: 'https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Devices', rating: 4.7, reviews: 89 },
    { id: 3, name: 'Cold & Flu Relief Syrup', price: 120.00, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Cold & Flu', rating: 4.5, reviews: 76 },
    { id: 4, name: 'Daily Multivitamin Tablets', price: 300.00, image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Vitamins', rating: 4.9, reviews: 152 },
  ];

  // Best selling products
  const bestSellers = [
    { id: 5, name: 'Immunity Booster Capsules', price: 450.00, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Immunity', rating: 4.9, reviews: 203 },
    { id: 6, name: 'Digital Thermometer', price: 350.00, image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Devices', rating: 4.6, reviews: 118 },
    { id: 7, name: 'Herbal Digestive Tablets', price: 180.00, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'Digestive Health', rating: 4.7, reviews: 95 },
    { id: 8, name: 'Antiseptic Liquid', price: 120.00, image: 'https://images.unsplash.com/photo-1584308666989-a68c6d494eca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'First Aid', rating: 4.8, reviews: 87 },
  ];

  // Health tips
  const healthTips = [
    { title: 'Managing Seasonal Allergies', content: 'Learn effective ways to manage seasonal allergies with proper medication and lifestyle changes.', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Importance of Hydration', content: 'Discover why staying hydrated is crucial for your overall health and how to maintain proper hydration.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Sleep and Immunity', content: 'Understand the connection between quality sleep and a strong immune system.', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];

  // Testimonials
  const testimonials = [
    { name: 'Priya Sharma', role: 'Regular Customer', content: 'The quality of medicines and the prompt delivery service have made this my go-to pharmacy for all health needs.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Rahul Mehta', role: 'Healthcare Professional', content: 'As a doctor, I appreciate the authenticity of products and the professional service provided by this pharmacy.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Ananya Patel', role: 'Mother of Two', content: 'Finding reliable baby products has never been easier. The detailed product information helps me make informed choices.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-primary rounded-lg text-white p-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-transparent opacity-90"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg mb-6">
            Discover a wide range of premium medicines, healthcare products, and expert advice for your family's wellbeing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="inline-block bg-teal-800 text-white font-medium px-6 py-3 rounded-md hover:bg-teal-900 transition-colors">
              Shop Now
            </Link>
            <Link href="" className="inline-block bg-white text-teal-800 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
              Consult a Pharmacist
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-teal-950 rounded-lg p-4 text-center text-white">
            <div className="bg-teal-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Free Delivery</h3>
            <p className="text-sm text-gray-300">On orders above ₹500</p>
          </div>
          <div className="bg-teal-950 rounded-lg p-4 text-center text-white">
            <div className="bg-teal-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm text-gray-300">Healthcare assistance</p>
          </div>
          <div className="bg-teal-950 rounded-lg p-4 text-center text-white">
            <div className="bg-teal-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Genuine Products</h3>
            <p className="text-sm text-gray-300">100% authentic items</p>
          </div>
          <div className="bg-teal-950 rounded-lg p-4 text-center text-white">
            <div className="bg-teal-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Quality Assured</h3>
            <p className="text-sm text-gray-300">Certified products</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCategories.map((category, index) => (
            <Link key={index} href={category.path} className="group">
              <div className="bg-teal-950 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-40 md:h-48 lg:h-56">
                  <Image
                    src={category?.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="rounded-t-lg object-cover p-2"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-teal-600 hover:underline flex items-center">
            View All <TrendingUp className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-teal-950 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 lg:h-56">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover p-2"
                  />
                  <div className="absolute top-2 right-2 bg-teal-800 text-white text-xs px-2 py-1 rounded-full">
                    {product.rating} ★ ({product.reviews})
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-300 bg-teal-800/50 px-2 py-1 rounded-full">{product.category}</span>
                  <h3 className="font-medium text-white text-lg mt-2 mb-2">{product.name}</h3>
                  <p className="text-green-400 font-bold">₹ {product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex gap-2">
                <Button className="flex-1 bg-teal-800 text-white py-2 rounded-md hover:bg-teal-700 transition-colors">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="p-2 border-teal-700 text-teal-500">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-teal-900 to-teal-700 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Special Health Package</h2>
              <p className="mb-4">Get 15% off on our comprehensive health checkup packages</p>
              <Button className="bg-white text-teal-800 hover:bg-gray-100">
                Book Now
              </Button>
            </div>
            <div className="text-5xl font-bold">
              15% OFF
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link href="/products/best-sellers" className="text-teal-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-teal-950 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 lg:h-56">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover p-2"
                  />
                  <div className="absolute top-2 right-2 bg-teal-800 text-white text-xs px-2 py-1 rounded-full">
                    {product.rating} ★ ({product.reviews})
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-300 bg-teal-800/50 px-2 py-1 rounded-full">{product.category}</span>
                  <h3 className="font-medium text-white text-lg mt-2 mb-2">{product.name}</h3>
                  <p className="text-green-400 font-bold">₹ {product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="px-4 pb-4 flex gap-2">
                <Button className="flex-1 bg-teal-800 text-white py-2 rounded-md hover:bg-teal-700 transition-colors">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="p-2 border-teal-700 text-teal-500">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips & Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Health Tips & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthTips.map((tip, index) => (
            <div key={index} className="bg-teal-950 rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-2">{tip.title}</h3>
                <p className="text-gray-300 mb-4">{tip.content}</p>
                <Link href="/health-tips" className="text-teal-400 hover:underline inline-flex items-center">
                  Read More <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-teal-950 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold mb-2 text-white">Quality Products</h3>
            <p className="text-gray-300">All our products are sourced from trusted manufacturers and meet strict quality standards.</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold mb-2 text-white">Fast Delivery</h3>
            <p className="text-gray-300">Get your health essentials delivered to your doorstep within 24-48 hours.</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold mb-2 text-white">Expert Support</h3>
            <p className="text-gray-300">Our team of healthcare professionals is available to answer your questions.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-teal-950 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">"{testimonial.content}"</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12 bg-teal-900 rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-6">Stay updated with the latest health tips, product launches, and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button className="bg-teal-700 hover:bg-teal-800 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
        <div className="bg-teal-950 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-2 text-teal-500" />
            <h3 className="font-bold text-white">Our Community Standards</h3>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>At MediPharm, we're committed to creating a safe and supportive environment for all our customers. Our community is built on respect, trust, and a shared commitment to health and wellbeing.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">For Customers</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always consult healthcare professionals for medical advice</li>
                  <li>Share your honest feedback to help us improve</li>
                  <li>Respect the privacy and opinions of other community members</li>
                  <li>Report any adverse reactions to medications promptly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Our Commitment</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide accurate information about all products</li>
                  <li>Ensure the highest standards of quality and safety</li>
                  <li>Protect your personal and health information</li>
                  <li>Respond promptly to all queries and concerns</li>
                </ul>
              </div>
            </div>
            <p>For more detailed information, please visit our <Link href="/community-guidelines" className="text-teal-400 hover:underline">Community Guidelines</Link> page.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-950 rounded-lg p-8 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">MediPharm</h3>
            <p className="mb-4">Your trusted partner for all healthcare needs. We provide quality medicines and healthcare products with expert guidance.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-teal-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-teal-400">About Us</Link></li>
              <li><Link href="/products" className="hover:text-teal-400">Products</Link></li>
              <li><Link href="/services" className="hover:text-teal-400">Services</Link></li>
              <li><Link href="/blog" className="hover:text-teal-400">Health Blog</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/products/medicines" className="hover:text-teal-400">Medicines</Link></li>
              <li><Link href="/products/devices" className="hover:text-teal-400">Medical Devices</Link></li>
              <li><Link href="/products/personal-care" className="hover:text-teal-400">Personal Care</Link></li>
              <li><Link href="/products/baby-care" className="hover:text-teal-400">Baby Care</Link></li>
              <li><Link href="/products/nutrition" className="hover:text-teal-400">Nutrition & Supplements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Health Street, Medical District, City - 123456</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@medipharm.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 MediPharm. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-teal-400">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-teal-400">Privacy Policy</Link>
              <Link href="/shipping" className="hover:text-teal-400">Shipping Policy</Link>
              <Link href="/refund" className="hover:text-teal-400">Refund Policy</Link>
            </div>
          </div>
          <p className="text-sm mt-4 text-center">
            Disclaimer: The information provided on this website is for general informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}