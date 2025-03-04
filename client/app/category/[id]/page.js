"use client"

import { useEffect, useState } from "react"
import { Filter, X, SlidersHorizontal } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { useParams } from "next/navigation"
import { getCategoryById, getProductsByCategory } from "@/lib/actions/categoryActions"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function CategoryPage({ params }) {
  const { id } = useParams() // Get category ID from URL
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({})
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("popularity")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [result, setResult] = useState(products)

  useEffect(() => {
    if (id) {
      getProductsByCategory(id).then(setProducts)
      getCategoryById(id).then(setCategory)
    }
  }, [id])

  const [filters, setFilters] = useState({
    subcategories: [],
    priceRanges: [],
    brands: [],
  })

  

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const currentValues = [...prev[type]]
      const valueIndex = currentValues.indexOf(value)

      if (valueIndex === -1) {
        currentValues.push(value)
      } else {
        currentValues.splice(valueIndex, 1)
      }

      return { ...prev, [type]: currentValues }
    })
  }

  const sortProducts = (products, option) => {
    const sortedProducts = [...products]

    switch (option) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price)
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price)
      case "newest":
        // In a real app, you would sort by date
        return sortedProducts
      default: // popularity
        return sortedProducts
    }
  }

  // Filter content component to reuse in both desktop and mobile views
  const FilterContent = ({ onApply }) => (
    <>
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Brand Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Brand</h3>
        <div className="space-y-2">
          <select
            className="w-full bg-teal-950 border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none"
            onChange={(e) => {
              if (e.target.value) {
                setFilters((prev) => ({ ...prev, brands: [e.target.value] }))
              } else {
                setFilters((prev) => ({ ...prev, brands: [] }))
              }
            }}
            value={filters.brands[0] || ""}
          >
            <option value="">All Brands</option>
            {products?.map((product) => (
              <option key={product?.brand} value={products?.brand}>
                {products?.brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          <select
            className="w-full bg-teal-950 border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none"
            onChange={(e) => {
              if (e.target.value) {
                setFilters((prev) => ({ ...prev, priceRanges: [e.target.value] }))
              } else {
                setFilters((prev) => ({ ...prev, priceRanges: [] }))
              }
            }}
            value={filters.priceRanges[0] || ""}
          >
            <option value="">Any Price</option>
            {products?.priceRanges?.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Sort By</h3>
        <select
          className="w-full bg-teal-950 border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        className="w-full mt-4 bg-primary/10 text-primary font-medium py-2 px-4 rounded-md hover:bg-primary/20 transition-colors"
        onClick={() => {
          setFilters({ subcategories: [], priceRanges: [], brands: [] })
          if (onApply) onApply()
        }}
      >
        Clear Filters
      </button>
    </>
  )

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4.5rem)] overflow-hidden">
      {/* Mobile Filter Button */}
      <div className="md:hidden sticky top-0 z-10 bg-teal-950 p-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">{category?.name || "Category"}</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-teal-900 border-gray-700">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="sr-only">Open filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px] bg-teal-950 border-gray-800">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-teal-900">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
              <div className="flex-1 overflow-y-auto px-1">
                <FilterContent onApply={() => {}} />
              </div>
              <div className="mt-auto pt-4 border-t border-gray-800">
                <SheetClose asChild>
                  <Button className="w-full">Apply Filters</Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:flex md:w-1/4 lg:w-1/5 bg-teal-950 border-r border-gray-900 flex-col h-full">
        {/* Category name at top of sidebar */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">{category?.name || "Category"}</h1>
        </div>

        {/* Filters section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <FilterContent />
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="w-full md:w-3/4 lg:w-4/5 h-full overflow-y-auto p-4 md:p-6">
        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product?.images[0]?.url}
                category={product.categoryName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">No products found matching your criteria.</p>
            <button
              className="mt-4 bg-primary/10 text-primary font-medium py-2 px-4 rounded-md hover:bg-primary/20 transition-colors"
              onClick={() => setFilters({ subcategories: [], priceRanges: [], brands: [] })}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts && filteredProducts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

