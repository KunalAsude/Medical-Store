"use client"

import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import CartItem from "@/components/CartItem"
import { useCart } from "@/context/CartContext"
import { Suspense } from "react"

// Loading component
const CartLoading = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="animate-pulse">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
        <div className="h-8 bg-gray-200 max-w-md mx-auto mb-4 rounded"></div>
        <div className="h-4 bg-gray-200 max-w-sm mx-auto mb-8 rounded"></div>
        <div className="h-12 bg-gray-200 max-w-xs mx-auto rounded"></div>
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
    getCartTotal: totalPrice 
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="container h-screen mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any products to your cart yet.</p>
        <Link
          href="/products"
          className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4.5rem)] overflow-hidden">
      <div className="container mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Cart Items - Now Scrollable */}
          <div className="flex-1 overflow-hidden">
            <div className="rounded-lg shadow-md p-6 h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Cart Items ({totalItems()})</h2>

              <div className="overflow-y-auto mb-5 pr-2 -mr-2 flex-grow">
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem 
                      key={item._id} 
                      item={item} 
                      onUpdateQuantity={updateQuantity} 
                      onRemove={removeFromCart} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Now Sticky and Fixed */}
          <div className="lg:w-80 ">
            <div className="bg-teal-950 rounded-lg shadow-md p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-5 mb-6">
                <div className="flex justify-between">
                  <span className="text-teal-400">Subtotal</span>
                  <span>₹{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-400">Shipping</span>
                  <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-400">Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-t-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-teal-900 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <div className="mt-4 text-center">
                <Link href="/products" className="text-primary hover:underline text-sm">
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