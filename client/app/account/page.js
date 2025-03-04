"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, User, MapPin, Phone, Save, LogOut, CreditCard, Package, Heart, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Avenue, Health City, HC 12345",
    avatar: "https://github.com/shadcn.png",
  })

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

    // Simulate saving profile
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Profile updated successfully")
    }, 1500)
  }

  const handleLogout = () => {
    // Simulate logout
    router.push("/login")
  }

  return (
    <div className="container max-w-7xl mx-auto py-12">
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Account Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 border-teal-800 text-white hover:bg-teal-800">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Profile sidebar */}
          <aside>
            <Card className="border-teal-800 bg-teal-950/50 sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <Avatar className="h-24 w-24 border-2 border-teal-700">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-teal-700 text-xl font-semibold">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                    <p className="text-sm text-gray-300">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-teal-800 text-white hover:bg-teal-800">
                    Change Avatar
                  </Button>
                </div>

                <Separator className="my-6 bg-teal-800/70" />

                <nav className="space-y-1.5">
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-800 text-white">
                    <User className="h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-800 text-white">
                    <Package className="h-4 w-4" />
                    My Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-800 text-white">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-800 text-white">
                    <Home className="h-4 w-4" />
                    Saved Addresses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-teal-800 text-white">
                    <CreditCard className="h-4 w-4" />
                    Payment Methods
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <main>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-teal-900/80 text-white mb-6 w-full justify-start">
                <TabsTrigger value="profile" className="data-[state=active]:bg-teal-800">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-teal-800">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="addresses" className="data-[state=active]:bg-teal-800">
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-teal-800">
                  Payment Methods
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="border-teal-800 bg-teal-950/50">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Personal Information</CardTitle>
                    <CardDescription className="text-gray-300">
                      Update your profile details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={user.name}
                              onChange={handleChange}
                              className="pl-10 bg-teal-900/50 border-teal-800 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={user.email}
                              onChange={handleChange}
                              className="pl-10 bg-teal-900/50 border-teal-800 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={user.phone}
                              onChange={handleChange}
                              className="pl-10 bg-teal-900/50 border-teal-800 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-white">
                          Primary Address
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea
                            id="address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="pl-10 bg-teal-900/50 border-teal-800 text-white min-h-[100px] resize-none"
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="border-t border-teal-800/50 px-6 py-4">
                    <Button 
                      type="submit" 
                      onClick={handleSubmit}
                      className="gap-2 bg-teal-700 hover:bg-teal-600" 
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4" />
                      {isLoading ? "Saving Changes..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="border-teal-800 bg-teal-950/50">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Order History</CardTitle>
                    <CardDescription className="text-gray-300">
                      View and track your recent orders and purchase history
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Package className="h-12 w-12 text-teal-700 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No orders yet</h3>
                      <p className="text-gray-400 max-w-md mb-6">
                        You haven't placed any orders yet. Start shopping to see your order history here.
                      </p>
                      <Button className="bg-teal-700 hover:bg-teal-600">
                        Browse Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card className="border-teal-800 bg-teal-950/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">Saved Addresses</CardTitle>
                        <CardDescription className="text-gray-300">
                          Manage your delivery and billing addresses
                        </CardDescription>
                      </div>
                      <Button size="sm" className="bg-teal-700 hover:bg-teal-600">
                        Add New Address
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Home className="h-12 w-12 text-teal-700 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No saved addresses</h3>
                      <p className="text-gray-400 max-w-md">
                        Add a new address to make checkout faster and easier.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="border-teal-800 bg-teal-950/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">Payment Methods</CardTitle>
                        <CardDescription className="text-gray-300">
                          Manage your payment options and preferences
                        </CardDescription>
                      </div>
                      <Button size="sm" className="bg-teal-700 hover:bg-teal-600">
                        Add Payment Method
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CreditCard className="h-12 w-12 text-teal-700 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No payment methods</h3>
                      <p className="text-gray-400 max-w-md">
                        Add a payment method to make checkout faster and more secure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}