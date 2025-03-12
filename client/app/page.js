"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Heart,
  TrendingUp,
  Award,
  Truck,
  Phone,
  Shield,
  Clock,
  Users,
  ChevronRight,
  Star,
  Search,
  Menu,
  CreditCard,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Send,
  Linkedin,
  Youtube,
  ChevronUp
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getAllCategories } from "@/lib/actions/categoryActions"
import { getAllProducts } from "@/lib/actions/productActions"
import ProductCard from "@/components/ProductCard"
import { Input } from "@/components/ui/input"


export default function Home() {
  // State for dynamic elements
  const [activeSlide, setActiveSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  // Featured Brands section
  const featuredBrands = [


    { name: "Himalaya", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809750/b677a49f-bc99-4483-a52d-91c99a6a67bc_background_eez96a.webp" },
    { name: "Johnson & Johnson", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809838/images_jxpgbj.png" },
    { name: "Cetaphil", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809910/4bc71be1e103635a2f5d1ca0299e42a8_hu0euk.jpg" },
    { name: "Dr. Reddy's", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809691/42c02569982197.Y3JvcCwxMzMyLDEwNDIsOTcyLDA_gzq3ug.jpg" },
    { name: "FoxTele", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809990/Logo_-_New_Orange-01_dmtnil.jpg" },
    // { name: "Mankind Pharma", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741810801/mankind_logo__1__kgciwc.png" },
    { name: "Hindustan Unilever", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741810936/hindustan-unilever-limited1422_xscdjv.jpg" },
    { name: "Cipla", logo: "https://res.cloudinary.com/dcfwiwdd9/image/upload/v1741809559/images_pxfcxa.png" },
  ];


  // Payment Methods
  const paymentMethods = [
    { name: "Visa", icon: "visa.svg" },
    { name: "Mastercard", icon: "mastercard.svg" },
    { name: "American Express", icon: "amex.svg" },
    { name: "PayPal", icon: "paypal.svg" },
    { name: "UPI", icon: "upi.svg" },
    { name: "Net Banking", icon: "netbanking.svg" }
  ]

  // Health tips
  const healthTips = [
    {
      title: "Managing Seasonal Allergies",
      content: "Learn effective ways to manage seasonal allergies with proper medication and lifestyle changes.",
      image:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Importance of Hydration",
      content: "Discover why staying hydrated is crucial for your overall health and how to maintain proper hydration.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sleep and Immunity",
      content: "Understand the connection between quality sleep and a strong immune system.",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Regular Customer",
      content:
        "The quality of medicines and the prompt delivery service have made this my go-to pharmacy for all health needs.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Rahul Mehta",
      role: "Healthcare Professional",
      content:
        "As a doctor, I appreciate the authenticity of products and the professional service provided by this pharmacy.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ananya Patel",
      role: "Mother of Two",
      content:
        "Finding reliable baby products has never been easier. The detailed product information helps me make informed choices.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]

  // Hero slides
  const heroSlides = [
    {
      title: "Your Health, Our Priority",
      subtitle:
        "Discover a wide range of premium medicines, healthcare products, and expert advice for your family's wellbeing.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      cta: "Shop Now",
    },
    {
      title: "New Arrivals in Health Tech",
      subtitle: "Explore our latest collection of advanced health monitoring devices for better health management.",
      image:
        "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      cta: "Discover Now",
    },
    {
      title: "Seasonal Health Essentials",
      subtitle: "Stock up on immunity boosters and preventive care products for the changing season.",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      cta: "View Collection",
    },
  ]

  // Check if on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])


  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    e.currentTarget.classList.add("animate-pulse")
    setTimeout(() => {
      e.currentTarget.classList.remove("animate-pulse")
    }, 1000)
    console.log(`Added product ${productId} to cart`)
  }

  useEffect(() => {
    Promise.all([
      getAllCategories().then((data) => setCategories(data)),
      getAllProducts().then((data) => {
        setProducts(data);


        const filteredBestSellers = data.filter(product => product.isBestSeller);
        setBestSellers(filteredBestSellers);
      })
    ]);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }


  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Carousel */}
        <section className="relative h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 to-transparent z-10"></div>
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
                sizes="(max-width: 768px) 100vw, 100vw"
                placeholder="blur"
                blurDataURL={slide.image || "/placeholder.svg"}
              />
              <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{slide.title}</h1>
                <p className="text-lg mb-8 text-white/90">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="inline-block bg-teal-600 text-white font-medium px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/consult"
                    className="inline-block bg-white/20 backdrop-blur-sm text-white border border-white/30 font-medium px-6 py-3 rounded-md hover:bg-white/30 transition-colors"
                  >
                    Consult a Pharmacist
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? "bg-white w-6" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Quick Services */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-teal-950 rounded-lg p-4 text-center text-white hover:shadow-xl transition-all duration-300 border border-teal-900">
              <div className="bg-teal-800 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-300">On orders above ₹500</p>
            </div>
            <div className="bg-teal-950 rounded-lg p-4 text-center text-white hover:shadow-xl transition-all duration-300 border border-teal-900">
              <div className="bg-teal-800 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-gray-300">Healthcare assistance</p>
            </div>
            <div className="bg-teal-950 rounded-lg p-4 text-center text-white hover:shadow-xl transition-all duration-300 border border-teal-900">
              <div className="bg-teal-800 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Genuine Products</h3>
              <p className="text-sm text-gray-300">100% authentic items</p>
            </div>
            <div className="bg-teal-950 rounded-lg p-4 text-center text-white hover:shadow-xl transition-all duration-300 border border-teal-900">
              <div className="bg-teal-800 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Quality Assured</h3>
              <p className="text-sm text-gray-300">Certified products</p>
            </div>
          </div>
        </section>

        {/* Featured Categories - Responsive: show only 4 on mobile */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link
              href="/category"
              className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
            >
              All Categories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories
              .filter(category => category?.parentCategory === null)
              .slice(0, isMobile ? 4 : 6)
              .map((category, index) => (
                <Link key={index} href={`/category/${category?._id}`} className="group">
                  <div className="bg-teal-950 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-teal-900/50">
                    <div className="relative h-28 md:h-32">
                      <Image
                        src={category?.image || "/placeholder.svg"}
                        alt={category?.name}
                        fill
                        className="rounded-t-lg object-cover p-2"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="font-medium text-sm text-white group-hover:text-teal-300 transition-colors">
                        {category?.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}

          </div>
        </section>

        {/* Featured Brands - Responsive: show only 4 on mobile */}
        <section className="mb-12 bg-teal-950/30 rounded-xl p-6 border border-teal-900/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Brands</h2>
            <Link
              href="/brands"
              className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-0 lg:gap-2">
            {featuredBrands.slice(0, isMobile ? 4 : 7).map((brand, index) => (
              <Link key={index} href={`/brands/${brand.name.toLowerCase()}`} className="group">
                <div className="flex items-center justify-center h-30 w-40 hover:shadow-md transition-all ">
                  <div className="relative h-full w-full">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={96}  // Width in pixels (adjust as needed)
                      height={96} // Height in pixels (adjust as needed)
                      className="object-cover w-full h-full max-h-full rounded-2xl"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>


        </section>


        {/* Rest of the code remains unchanged */}

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium">
              View All <TrendingUp className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product?.images[0]?.url || "/placeholder.svg"}
                category={product?.brand}
                onAddToCart={(e) => handleAddToCart(e, product._id)}
                extraContent={
                  <div className="absolute top-2 right-2 bg-teal-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-gray-300">({product?.averageRating})</span>
                  </div>
                }
                additionalActions={
                  <Button
                    variant="outline"
                    className="p-2 border-teal-700 text-teal-500 hover:bg-teal-900 hover:text-teal-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                }
              />
            ))}
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-teal-950 to-teal-800 rounded-lg p-6 text-white relative overflow-hidden shadow-lg border border-teal-900/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-700 rounded-full -translate-y-1/2 translate-x-1/4 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-700 rounded-full translate-y-1/2 -translate-x-1/4 opacity-30"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Special Health Package</h2>
                <p className="mb-4 max-w-md">
                  Get 15% off on our comprehensive health checkup packages. Limited time offer!
                </p>
                <Button className="bg-white text-teal-800 hover:bg-gray-100 transition-all hover:shadow-lg">
                  Book Now
                </Button>
              </div>
              <div className="text-4xl font-bold bg-amber-400 text-teal-950 px-6 py-3 rounded-lg shadow-lg">
                15% OFF
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Best Sellers</h2>
            <Link
              href="/products"
              className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product?.images[0]?.url || "/placeholder.svg"}
                category={product?.brand}
                onAddToCart={(e) => handleAddToCart(e, product._id)}
                extraContent={
                  <div className="absolute top-2 right-2 bg-teal-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-gray-300">({product?.averageRating})</span>
                  </div>
                }
                additionalActions={
                  <Button
                    variant="outline"
                    className="p-2 border-teal-700 text-teal-500 hover:bg-teal-900 hover:text-teal-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                }
              />
            ))}
          </div>
        </section>

        {/* Health Tips & Articles */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Health Tips & Articles</h2>
            <Link
              href="/health-tips"
              className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthTips.map((tip, index) => (
              <div
                key={index}
                className="bg-teal-950 rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-teal-900/50"
              >
                <div className="relative h-48">
                  <Image
                    src={tip.image || "/placeholder.svg"}
                    alt={tip.title}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-transparent opacity-60"></div>
                </div>
                <div className="p-4 relative">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{tip.content}</p>
                  <Link
                    href="/health-tips"
                    className="text-teal-400 hover:text-teal-300 inline-flex items-center transition-colors"
                  >
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-teal-950 rounded-lg p-8 mb-12 shadow-lg border border-teal-900/50">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white">Quality Products</h3>
              <p className="text-gray-300">
                All our products are sourced from trusted manufacturers and meet strict quality standards.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white">Fast Delivery</h3>
              <p className="text-gray-300">Get your health essentials delivered to your doorstep within 24-48 hours.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold mb-2 text-white">Expert Support</h3>
              <p className="text-gray-300">
                Our team of healthcare professionals is available to answer your questions.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-teal-950 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-teal-900/50"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover border-2 border-teal-600"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
                <div className="mt-4 text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-12 bg-gradient-to-r from-teal-950 to-teal-800 rounded-lg p-8 relative overflow-hidden shadow-lg border border-teal-900/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-700 rounded-full -translate-y-1/2 translate-x-1/4 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-700 rounded-full translate-y-1/2 -translate-x-1/4 opacity-30"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300 mb-6">
              Stay updated with the latest health tips, product launches, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/10 backdrop-blur-sm text-white border border-white/20"
              />
              <Button className="bg-amber-400 h-10 hover:bg-amber-500 text-teal-950 font-medium transition-all hover:shadow-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
          <div className="bg-teal-950 rounded-lg p-6 shadow-lg border border-teal-900/50">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 mr-2 text-teal-500" />
              <h3 className="font-bold text-white">Our Community Standards</h3>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                At MediStore, we're committed to creating a safe and supportive environment for all our customers. Our
                community is built on respect, trust, and a shared commitment to health and wellbeing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-teal-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">For Customers</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Always consult healthcare professionals for medical advice</li>
                    <li>Share your honest feedback to help us improve</li>
                    <li>Respect the privacy and opinions of other community members</li>
                    <li>Report any adverse reactions to medications promptly</li>
                  </ul>
                </div>
                <div className="bg-teal-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Our Commitment</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide accurate information about all products</li>
                    <li>Ensure the highest standards of quality and safety</li>
                    <li>Protect your personal and health information</li>
                    <li>Respond promptly to all queries and concerns</li>
                  </ul>
                </div>
              </div>
              <p>
                For more detailed information, please visit our{" "}
                <Link href="/community-guidelines" className="text-teal-400 hover:underline">
                  Community Guidelines
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-950 text-gray-300 w-full relative">


        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://img.icons8.com/arcade/64/hospital.png"
                  alt="MediStore Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <h3 className="font-bold text-white text-xl">MediStore</h3>
              </div>
              <p className="mb-6 text-gray-300 leading-relaxed">
                Your trusted partner for all healthcare needs. We provide quality medicines and healthcare products with
                expert guidance, serving millions of customers since 2020.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors p-2 bg-teal-900 hover:bg-teal-800 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors p-2 bg-teal-900 hover:bg-teal-800 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors p-2 bg-teal-900 hover:bg-teal-800 rounded-full"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors p-2 bg-teal-900 hover:bg-teal-800 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors p-2 bg-teal-900 hover:bg-teal-800 rounded-full"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white text-lg mb-6 relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-teal-500 after:left-0 after:-bottom-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Health Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-white text-lg mb-6 relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-teal-500 after:left-0 after:-bottom-2">
                Categories
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products/medicines" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Medicines
                  </Link>
                </li>
                <li>
                  <Link href="/products/devices" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Medical Devices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/personal-care"
                    className="hover:text-teal-400 transition-colors flex items-center"
                  >
                    <span className="text-teal-500 mr-2">›</span>
                    Personal Care
                  </Link>
                </li>
                <li>
                  <Link href="/products/baby-care" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Baby Care
                  </Link>
                </li>
                <li>
                  <Link href="/products/nutrition" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Nutrition & Supplements
                  </Link>
                </li>
                <li>
                  <Link href="/products/wellness" className="hover:text-teal-400 transition-colors flex items-center">
                    <span className="text-teal-500 mr-2">›</span>
                    Wellness
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-white text-lg mb-6 relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-teal-500 after:left-0 after:-bottom-2">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>123 Health Street, Medical District, City - 123456</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-teal-500 flex-shrink-0" />
                  <a href="tel:+911234567890" className="hover:text-teal-400 transition-colors">
                    +91 1234567890
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-teal-500 flex-shrink-0" />
                  <a href="mailto:support@medistore.com" className="hover:text-teal-400 transition-colors">
                    support@medistore.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-teal-500 flex-shrink-0" />
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges & Certifications */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <h4 className="text-center text-lg font-semibold mb-6 text-white">Why Choose MediStore</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-teal-900/30 hover:bg-teal-900/50 transition-colors">
                <Shield className="h-10 w-10 text-teal-500 mb-1" />
                <span className="text-white font-medium">Licensed Pharmacy</span>
                <p className="text-xs text-gray-400">Fully compliant with regulations</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-teal-900/30 hover:bg-teal-900/50 transition-colors">
                <Award className="h-10 w-10 text-teal-500 mb-1" />
                <span className="text-white font-medium">ISO 9001 Certified</span>
                <p className="text-xs text-gray-400">Quality management system</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-teal-900/30 hover:bg-teal-900/50 transition-colors">
                <Truck className="h-10 w-10 text-teal-500 mb-1" />
                <span className="text-white font-medium">Express Delivery</span>
                <p className="text-xs text-gray-400">Fast & reliable shipping</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-teal-900/30 hover:bg-teal-900/50 transition-colors">
                <CreditCard className="h-10 w-10 text-teal-500 mb-1" />
                <span className="text-white font-medium">Secure Payments</span>
                <p className="text-xs text-gray-400">Multiple payment options</p>
              </div>
            </div>
          </div>

          {/* Payment Partners */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <h4 className="text-center text-lg font-semibold mb-6 text-white">Payment Partners</h4>
            <div className="flex justify-center space-x-4 sm:space-x-6 flex-wrap gap-y-4">
              <div className="bg-white p-2 rounded-md hover:shadow-md transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-6 sm:h-8"
                />
              </div>
              <div className="bg-white p-2 rounded-md hover:shadow-md transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-6 sm:h-8"
                />
              </div>
              <div className="bg-white p-2 rounded-md hover:shadow-md transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-6 sm:h-8"
                />
              </div>
              <div className="bg-white p-2 rounded-md hover:shadow-md transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg"
                  alt="Apple Pay"
                  className="h-6 sm:h-8"
                />
              </div>
              <div className="bg-white p-2 rounded-md hover:shadow-md transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Google_Pay_logo.svg"
                  alt="Google Pay"
                  className="h-6 sm:h-8"
                />
              </div>
            </div>
          </div>

          {/* App Download Section */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-2">Download Our Mobile App</h4>
                <p className="text-gray-400 max-w-md">Get exclusive app-only offers and manage your orders on the go</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className="transition-transform hover:scale-105">
                  <Image
                    src="/placeholder.svg?height=50&width=150"
                    alt="Download on App Store"
                    width={150}
                    height={50}
                    className="rounded-md"
                  />
                </a>
                <a href="#" className="transition-transform hover:scale-105">
                  <Image
                    src="/placeholder.svg?height=50&width=150"
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="rounded-md"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} MediStore. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/shipping" className="hover:text-teal-400 transition-colors">
                  Shipping Policy
                </Link>
                <Link href="/refund" className="hover:text-teal-400 transition-colors">
                  Refund Policy
                </Link>
              </div>
            </div>
            <p className="text-sm text-center text-gray-400 mt-6">
              Disclaimer: The information provided on this website is for general informational purposes only and is not
              intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
              your physician or other qualified health provider with any questions you may have regarding a medical
              condition.
            </p>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-500 text-white p-3 rounded-full shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-950 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </footer>
    </div>
  )
}

