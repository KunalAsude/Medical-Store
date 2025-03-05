"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Mail,
  User,
  MapPin,
  Phone,
  Save,
  LogOut,
  CreditCard,
  Package,
  Heart,
  Home,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isMobile, setIsMobile] = useState(false)

  const [user, setUser] = useState({
    name: "Abc Xyz",
    email: "abcxyz@example.com",
    phone: "8888899999",
    address: "123 Medical City, Banglore, 12345",
    avatar: "",
  })

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    router.push("/login")
  }

  const renderSidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-900 bg-teal-950">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-16 w-16 lg:h-20 lg:w-20 bg-teal-700">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-teal-800 hover:bg-teal-900 border-0">
            Edit Profile
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-teal-950">
        <div className="py-4">
          <div className="px-4 mb-2">
            <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Account</h3>
          </div>
          <nav className="space-y-1 px-2">
            {[
              { id: "profile", icon: User, label: "Profile" },
              { id: "orders", icon: Package, label: "Orders" },
              { id: "addresses", icon: Home, label: "Addresses" },
              { id: "payment", icon: CreditCard, label: "Payment Methods" },
              { id: "wishlist", icon: Heart, label: "Wishlist" },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 border-0 ${
                  activeTab === item.id ? "bg-teal-800 hover:bg-teal-900" : "hover:bg-teal-900"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <Separator className="my-4 mx-2" />

          <div className="px-4 mb-2">
            <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">Settings</h3>
          </div>
          <nav className="space-y-1 px-2">
            {[
              { icon: Settings, label: "Preferences" },
              { icon: Bell, label: "Notifications" },
              { icon: Shield, label: "Security" },
            ].map((item, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                className="w-full justify-start gap-3 hover:bg-teal-900 border-0"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-900 bg-teal-950">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-900 border-0">
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleLogout} 
            className="w-full justify-start gap-3 bg-teal-800 hover:bg-teal-900 border-0"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-900">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="border-0">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 border-gray-900 bg-teal-700">
            {renderSidebar()}
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold">Account</h1>
        <Avatar className="h-8 w-8 bg-teal-700">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <aside className="hidden lg:block w-[280px] border-r border-gray-900">
        {renderSidebar()}
      </aside>

      <main className="flex-1">
        <div className="h-full p-4 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
          </header>

          {activeTab === "profile" && (
            <Card className="border border-gray-900 bg-teal-950">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="pl-10 border-gray-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleChange}
                          className="pl-10 border-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={user.phone}
                          onChange={handleChange}
                          className="pl-10 border-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Primary Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        className="pl-10 min-h-[100px] resize-none border-gray-900"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t border-gray-900">
                <Button 
                  type="submit" 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="gap-2 bg-teal-800 hover:bg-teal-900 border-0 mt-5"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving Changes..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card className="border border-gray-900 bg-teal-950">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your recent orders</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    You haven't placed any orders yet. Start shopping to see your order history here.
                  </p>
                  <Button className="bg-teal-800 hover:bg-teal-900 border-0">Browse Products</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "addresses" && (
            <Card className="border border-gray-900 bg-teal-950">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses</CardDescription>
                  </div>
                  <Button size="sm" className="bg-teal-800 hover:bg-teal-900 border-0">Add New Address</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Home className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved addresses</h3>
                  <p className="text-muted-foreground max-w-md">
                    Add a new address to make checkout faster and easier.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="border border-gray-900 bg-teal-950">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </div>
                  <Button size="sm" className="bg-teal-800 hover:bg-teal-900 border-0">Add Payment Method</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                  <p className="text-muted-foreground max-w-md">
                    Add a payment method to make checkout faster and more secure.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "wishlist" && (
            <Card className="border border-gray-900 bg-teal-950">
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Save items you're interested in for later.
                  </p>
                  <Button className="bg-teal-800 hover:bg-teal-900 border-0">Explore Products</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}