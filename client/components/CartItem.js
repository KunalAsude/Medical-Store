import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1)
    } else {
      removeFromCart(item._id)
    }
  }

  const handleIncreaseQuantity = () => {
    updateQuantity(item._id, item.quantity + 1)
  }

  const handleRemoveItem = () => {
    removeFromCart(item._id)
  }

  return (
    <div className="flex items-center py-4 border-b border-b-gray-700">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="font-medium text-gray-300">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>

        {/* Price & Quantity Controls */}
        <div className="mt-1 flex items-center justify-between">
          <p className="font-bold text-green-700">₹ {item.price.toFixed(2)}</p>

          <div className="flex items-center">
            {/* Decrease Quantity */}
            <button
              className="p-1 rounded-md cursor-pointer hover:bg-teal-700"
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            {/* Quantity Display */}
            <span className="mx-2 w-8 text-center">{item.quantity}</span>

            {/* Increase Quantity */}
            <button
              className="p-1 rounded-md cursor-pointer hover:bg-teal-700"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>

            {/* Remove Item */}
            <button
              className="ml-4 p-1 text-red-500 cursor-pointer hover:bg-red-200 rounded-md"
              onClick={handleRemoveItem}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}