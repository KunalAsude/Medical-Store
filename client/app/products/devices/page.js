import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import { Filter, ChevronDown } from "lucide-react"

// This would normally come from your API
const products = [
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Blood Pressure",
  },
  {
    id: 5,
    name: "Digital Thermometer",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Thermometers",
  },
  {
    id: 8,
    name: "Glucose Monitor",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Glucose Monitors",
  },
  {
    id: 12,
    name: "Portable Nebulizer",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Nebulizers",
  },
  {
    id: 13,
    name: "Pulse Oximeter",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Medical Accessories",
  },
  {
    id: 14,
    name: "Infrared Thermometer",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Thermometers",
  },
]

export default function DevicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-teal-900 rounded-lg shadow-md p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>

            {/* Subcategory Filter */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Subcategories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Blood Pressure Monitors</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Thermometers</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Glucose Monitors</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Nebulizers</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Medical Accessories</span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Under $25</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>$25 - $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>Over $50</span>
                </label>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>MediTech</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>HealthPlus</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                  <span>MediCare</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-primary/10 text-primary font-medium py-2 rounded-md hover:bg-primary/20 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
                <span>/</span>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
                <span>/</span>
                <span className="text-gray-700">Devices</span>
              </div>
              <h1 className="text-2xl font-bold">Medical Devices</h1>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-300 mr-2">Sort by:</span>
              <div className="relative">
                <select className="appearance-none bg-teal-900 border-0 rounded-md py-2 pl-3 pr-10 hover:bg-teal-900 text-sm focus:ring-0 focus:outline-none">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <Suspense fallback={<div>Loading products...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </Suspense>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

