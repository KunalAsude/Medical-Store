"use client"

import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import CartItem from "@/components/CartItem"
import { useCart } from "@/context/CartContext"
import { Suspense } from "react"

// Loading component
const CartLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
      <div className="animate-pulse">
        <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
        <div className="h-6 sm:h-8 bg-gray-200 max-w-md mx-auto mb-4 rounded"></div>
        <div className="h-3 sm:h-4 bg-gray-200 max-w-sm mx-auto mb-6 sm:mb-8 rounded"></div>
        <div className="h-10 sm:h-12 bg-gray-200 max-w-xs mx-auto rounded"></div>
      </div>
    </div>
  )
}

// Cart content component that uses the context
const CartContent = () => {
  const {
    cart: items,
    removeFromCart,
    updateQuantity,
    getCartItemCount: totalItems,
    getCartTotal: totalPrice,
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="container min-h-[50vh] sm:min-h-[70vh] mx-auto px-4 py-8 sm:py-16 text-center flex flex-col items-center justify-center">
        <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Your cart is empty</h1>
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
          Looks like you haven&apos;t added any products to your cart yet.
        </p>
        <Link
          href="/products"
          className="inline-block bg-primary text-white font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  // Calculate tax and total with improved precision
  const taxRate = 0.1
  const shippingCost = 0
  const tax = Number((totalPrice() * taxRate).toFixed(2))
  const total = Number((totalPrice() + tax + shippingCost).toFixed(2))

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4.5rem)] max-h-full overflow-auto">
      <div className="container mx-auto px-4 py-4 sm:py-8 w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-hidden mb-4 lg:mb-0">
            <div className="rounded-lg shadow-md p-3 sm:p-6 flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Cart Items ({totalItems()})</h2>

              <div className="overflow-y-auto max-h-[50vh] lg:max-h-[60vh] mb-3 sm:mb-5 pr-2 -mr-2 flex-grow">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item._id} className="py-4 sm:py-6 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Link href={`/products/${item._id}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          </Link>
                          <div className="flex-1">
                            <Link href={`/products/${item._id}`} className="font-medium hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">
                              ₹{item.price.toFixed(2)}
                            </div>
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="text-xs text-red-500 hover:text-red-700 transition-colors mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="flex items-center justify-center w-8 h-8 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="flex items-center justify-center w-8 h-8 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-teal-950 rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Order Summary</h2>

              <div className="space-y-3 sm:space-y-5 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-teal-400">Subtotal</span>
                  <span>₹{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-teal-400">Shipping</span>
                  <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-teal-400">Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-t-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-base sm:text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary text-white font-medium py-2.5 rounded-md hover:bg-teal-900 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <div className="mt-4 text-center">
                <Link href="/products" className="text-primary hover:underline text-xs sm:text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component that uses Suspense
const CartPage = () => {
  return (
    <Suspense fallback={<CartLoading />}>
      <CartContent />
    </Suspense>
  )
}

export { CartPage, CartContent, CartLoading }
export default CartPage