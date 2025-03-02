import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown } from "lucide-react";

const products = [
  { id: 1, name: "Advanced Pain Relief Tablets", price: 9.99, image: "/images/pain-relief.jpg", category: "Pain Relief" },
  { id: 2, name: "Digital Blood Pressure Monitor", price: 49.99, image: "/images/bp-monitor.jpg", category: "Devices" },
  { id: 3, name: "Cold & Flu Relief Syrup", price: 12.99, image: "/images/cold-flu-syrup.jpg", category: "Cold & Flu" },
  { id: 4, name: "Daily Multivitamin Tablets", price: 15.99, image: "/images/multivitamins.jpg", category: "Vitamins" },
  { id: 5, name: "Digital Thermometer", price: 19.99, image: "/images/thermometer.jpg", category: "Devices" },
  { id: 6, name: "Allergy Relief Tablets", price: 8.99, image: "/images/allergy-relief.jpg", category: "Allergy" },
  { id: 7, name: "First Aid Kit", price: 24.99, image: "/images/first-aid-kit.jpg", category: "First Aid" },
  { id: 8, name: "Glucose Monitor", price: 39.99, image: "/images/glucose-monitor.jpg", category: "Devices" }
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-teal-900 rounded-lg shadow-md p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter className="h-5 w-5 text-gray-300" />
            </div>
            <button className="w-full bg-primary/10 text-primary font-medium py-2 rounded-md hover:bg-primary/20 transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold mb-2 sm:mb-0">All Products</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <div className="relative">
                <select className="appearance-none bg-teal-950 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
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
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">3</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Next</button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
