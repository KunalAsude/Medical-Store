import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  // Featured categories
  const featuredCategories = [
    { name: 'Pain Relief Tablets', image: '/images/pain-relif.webp', path: '/products' },
    { name: 'Baby Products', image: '/images/baby-products.jpg', path: '/products' },
    { name: 'B-P Monitors', image: '/images/blood-pressure-monitor.webp', path: '/products' },
    { name: 'First Aid Kits', image: '/images/first-aid-kit.webp', path: '/products' },
  ];

  // Featured products
  const featuredProducts = [
    { id: 1, name: 'Advanced Pain Relief Tablets', price: 190.00, image: '/placeholder.svg?height=300&width=300', category: 'Pain Relief' },
    { id: 2, name: 'Digital Blood Pressure Monitor', price: 2000.00, image: '/placeholder.svg?height=300&width=300', category: 'Devices' },
    { id: 3, name: 'Cold & Flu Relief Syrup', price: 120.00, image: '/placeholder.svg?height=300&width=300', category: 'Cold & Flu' },
    { id: 4, name: 'Daily Multivitamin Tablets', price: 300.00, image: '/placeholder.svg?height=300&width=300', category: 'Vitamins' },
  ];

  return (
    <div className="container mx-auto px-0 py-0 sm:px-0 sm:py-0 md:w-full lg:px-4 lg:py-8 lg:w-full">
      {/* Hero Section */}
      <section className="bg-primary rounded-lg text-white p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg mb-6">
            Discover a wide range of over-the-counter medicines and medical devices for your everyday health needs.
          </p>
          <Link href="/products" className="inline-block bg-teal-800 text-primary font-medium px-6 py-3 rounded-md hover:bg-teal-900 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-12 m-3 lg:m-1">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCategories.map((category, index) => (
            <Link key={index} href={category.path} className="group">
              <div className="bg-teal-950 rounded-lg shadow-md overflow-hidden ">
                <div className="relative h-38 lg:h-74">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className=" rounded-2xl object-cover p-2"
                  />
                </div>
                <div className="m-3 text-center">
                  <h3 className="font-medium text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12  m-3 lg:m-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl mt-5 font-bold">Featured Products</h2>
          <Link href="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-teal-950 rounded-lg shadow-md overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-54 lg:h-64">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  {/* <span className="text-sm text-">{product.category}</span> */}
                  <h3 className="font-medium text-gray-300 mb-2">{product.name}</h3>
                  <p className="text-green-600 font-bold">₹ {product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <Button className="w-full bg-teal-800 text-white py-2 rounded-md hover:bg-teal-900 cursor-pointer">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-teal-950 mt-5 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Quality Products</h3>
            <p className="text-gray-200">All our products are sourced from trusted manufacturers and meet strict quality standards.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-200">Get your health essentials delivered to your doorstep within 24-48 hours.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Expert Support</h3>
            <p className="text-gray-200">Our team of healthcare professionals is available to answer your questions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
