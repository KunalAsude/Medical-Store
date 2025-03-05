import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"

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

  // Find the current product in the cart
  const cartItem = cart.find((item) => item._id === id)
  const quantity = cartItem ? cartItem.quantity : 0

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
    toast.success(`${name} removed from cart`)
  }

  return (
    <Link href={`/products/${id}`} className={cn("block group", className)}>
      <div className="relative rounded-xl overflow-hidden border bg-teal-950 border-gray-900 transition-all duration-300 hover:shadow-md hover:border-primary/20 h-full flex flex-col">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted/20 h-[250px]"> {/* Reduced height */}
          <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors z-10"></div>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          
          {/* Category badge */}
          <Badge variant="secondary" className="absolute text-gray-900 top-1 font-bold left-0 z-20 opacity-90">
            {category}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          
          <div className="mt-auto space-y-3">
            <span className="font-bold text-xl block text-green-700">
              ₹{price.toFixed(2)}
            </span>
            
            <div className="h-10"> {/* Fixed height container */}
              {quantity === 0 ? (
                <Button
                  onClick={handleAddToCart}
                  size="default"
                  className="w-full flex border-0 items-center cursor-pointer bg-teal-800 hover:bg-teal-900 justify-center gap-1.5"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </Button>
              ) : (
                <div className="flex items-center justify-between w-full bg-muted/50 rounded-md border-0 border-border">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-md cursor-pointer" 
                    onClick={handleRemoveFromCart}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="font-medium text-sm">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-md cursor-pointer" 
                    onClick={handleAddToCart}
                  >
                    <Plus size={16} />
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