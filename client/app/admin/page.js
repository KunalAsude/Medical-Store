"use client"

import { useState } from "react"
import Image from "next/image"
import { Package, Users, DollarSign, ShoppingCart, Plus, Search, Edit, Trash2 } from "lucide-react"

// Mock data for the admin dashboard
const products = [
  {
    id: 1,
    name: "Advanced Pain Relief Tablets",
    price: 9.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Pain Relief",
    stock: 45,
  },
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    price: 49.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Devices",
    stock: 18,
  },
  {
    id: 3,
    name: "Cold & Flu Relief Syrup",
    price: 12.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Cold & Flu",
    stock: 32,
  },
  {
    id: 4,
    name: "Daily Multivitamin Tablets",
    price: 15.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Vitamins",
    stock: 56,
  },
  {
    id: 5,
    name: "Digital Thermometer",
    price: 19.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Devices",
    stock: 24,
  },
]

const orders = [
  { id: "ORD-1234", customer: "John Doe", date: "2023-03-15", status: "Delivered", total: 78.95 },
  { id: "ORD-1235", customer: "Jane Smith", date: "2023-03-16", status: "Processing", total: 124.5 },
  { id: "ORD-1236", customer: "Robert Johnson", date: "2023-03-16", status: "Shipped", total: 45.99 },
  { id: "ORD-1237", customer: "Emily Davis", date: "2023-03-17", status: "Processing", total: 89.99 },
  { id: "ORD-1238", customer: "Michael Wilson", date: "2023-03-17", status: "Pending", total: 32.5 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="container mx-auto px-4 py-8 overflow-y-hidden">
      {/* Horizontal Admin Panel */}
      <div className="bg-teal-950 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex justify-between items-center">
          <div className="p-4 bg-primary text-white">
            <h2 className="font-semibold">Admin Panel</h2>
          </div>
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 m-2 ${activeTab === "dashboard" ? "bg-primary/10 text-primary font-medium" : "hover:bg-teal-900 rounded-lg"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 m-2 ${activeTab === "products" ? "bg-primary/10 text-primary font-medium" : "hover:bg-teal-900 rounded-lg"}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 m-2 ${activeTab === "orders" ? "bg-primary/10 text-primary font-medium" : "hover:bg-teal-900 rounded-lg"}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 m-2 ${activeTab === "customers" ? "bg-primary/10 text-primary font-medium" : "hover:bg-teal-900 rounded-lg"}`}
              onClick={() => setActiveTab("customers")}
            >
              Customers
            </button>
            <button
              className={`px-4 py-2 m-2 ${activeTab === "settings" ? "bg-primary/10 text-primary font-medium" : "hover:bg-teal-900 rounded-lg"}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {activeTab === "dashboard" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-teal-950 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <h3 className="text-2xl font-bold">125</h3>
                  </div>
                </div>
              </div>

              <div className="bg-teal-950 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold">84</h3>
                  </div>
                </div>
              </div>

              <div className="bg-teal-950 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customers</p>
                    <h3 className="text-2xl font-bold">42</h3>
                  </div>
                </div>
              </div>

              <div className="bg-teal-950 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <h3 className="text-2xl font-bold">$12,426</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-teal-950 rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <button className="text-primary hover:underline text-sm" onClick={() => setActiveTab("orders")}>
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-b-gray-900">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-b-gray-900 hover:bg-teal-900">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-teal-950 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Low Stock Products</h2>
                <button className="text-primary hover:underline text-sm" onClick={() => setActiveTab("products")}>
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-b-gray-900">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((p) => p.stock < 25)
                      .map((product) => (
                        <tr key={product.id} className="border-b border-b-gray-900 hover:bg-teal-900">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="relative h-10 w-10 mr-3">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={""}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`${product.stock < 20 ? "text-red-600" : "text-yellow-600"}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className=" rounded-lg shadow-md p-6 bg-teal-950">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-lg font-semibold mb-2 sm:mb-0">Products</h2>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-b-gray-900">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-b-gray-900 hover:bg-teal-900">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 mr-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={"no img"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`${product.stock < 20 ? "text-red-600" : product.stock < 50 ? "text-yellow-600" : "text-green-600"}`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-md">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded-md">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 1 to {products.length} of {products.length} products
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border-0 text-gray-500 hover:bg-teal-900">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
                <button className="px-3 py-1 rounded-md border-0 text-gray-500 hover:bg-teal-900">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-teal-950 rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-lg font-semibold mb-2 sm:mb-0">Orders</h2>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-b-gray-900">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-b-gray-900 hover:bg-teal-900">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-md">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 1 to {orders.length} of {orders.length} orders
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border-0 text-gray-500 hover:bg-teal-900">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
                <button className="px-3 py-1 rounded-md border-0 text-gray-500 hover:bg-teal-900">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="bg-teal-950 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Customers</h2>
            <p className="text-gray-500">Customer management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-teal-950 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <p className="text-gray-500">Store settings and configuration will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  )
}