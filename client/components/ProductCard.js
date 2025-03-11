import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import { useCart } from "@/context/CartContext"
// import { useWishlist } from "@/context/WishlistContext"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  product, 
  className 
}) {
  const { addToCart, removeFromCart, cart } = useCart()
  // const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)
  
  // Check if product is in cart
  const cartItem = cart.find((item) => item._id === id)
  const quantity = cartItem ? cartItem.quantity : 0
  
  // Check if product is in wishlist
  // const inWishlist = isInWishlist?.(id) || false
  const inWishlist = false

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const cartProduct = {
      _id: id,
      name,
      price,
      image,
      category,
    }

    addToCart(cartProduct)
    toast.success(`${name} added to cart`)
  }

  const handleRemoveFromCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromCart(id)
    toast.success(`Item removed from cart`)
  }
  
  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (inWishlist) {
      // removeFromWishlist(id)
      toast.success("Removed from wishlist")
    } else {
      // addToWishlist({
      //   _id: id,
      //   name,
      //   price,
      //   image,
      //   category,
      // })
      toast.success("Added to wishlist")
    }
  }

  return (
    <Link 
      href={`/products/${id}`} 
      className={cn("block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full relative rounded-lg overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:border-teal-700/50 h-full flex flex-col ">
        <div className="flex flex-col">
          {/* Top part with image and wishlist icon */}
          <div className="relative">
            {/* Image container */}
            <div className="relative overflow-hidden h-[180px] w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover "
                priority={false}
              />
              
              {/* Category badge */}
              <Badge variant="secondary" className="absolute text-xs bg-yellow-600 text-teal-50 top-2 left-2 z-20 border border-teal-800/50">
                {category}
              </Badge>
              
              {/* Wishlist button - more prominent */}
              <Button
                onClick={toggleWishlist}
                size="icon"
                variant="ghost"
                className={cn(
                  "absolute top-2 right-2 z-20 h-8 w-8 rounded-full  p-1 shadow-md border-0 bg-gray-800 cursor-pointer transition-all",
                  inWishlist ? "text-red-400 hover:text-red-300" : "text-white hover:text-white"
                )}
              >
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} className="h-8 w-8"/>
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-3 flex flex-col flex-grow bg-teal-900">
            <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10 text-teal-50">
              {name}
            </h3>
            
            <div className="">
              <span className="font-bold text-base text-green-400">
                ₹{price.toFixed(2)}
              </span>
            </div>
            
            {/* Add to cart button (always visible) */}
            <div className="mt-2">
              {quantity === 0 ? (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full bg-teal-950 py-4  text-white text-xs border border-teal-600/50 cursor-pointer"
                >
                  <ShoppingCart size={14} className="mr-1.5" />
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center justify-between w-full border border-gray-900 rounded-md bg-teal-800">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-8 py-4 rounded-l-md hover:bg-teal-700 text-white" 
                    onClick={handleRemoveFromCart}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="font-medium text-xs px-2 text-teal-50">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-8 py-4 rounded-r-md hover:bg-teal-700 text-teal-200" 
                    onClick={handleAddToCart}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}