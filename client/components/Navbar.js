"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Package,
  Phone,
  ExternalLink,
  Shield,
  Stethoscope,
  CircleUserRound,
  Package2,
  Settings,
  Heart,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  Search,
} from "lucide-react"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getAllCategories } from "@/lib/actions/categoryActions"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { useCart } from "@/context/CartContext"
import { getCurrentUser, logoutUser } from "@/lib/actions/authActions"

// Data transformation function for categories
const transformCategories = (categories) => {
  const categoryMap = {}

  categories.forEach((category) => {
    if (!category.parentCategory) {
      categoryMap[category._id] = {
        ...category,
        subcategories: [],
      }
    }
  })

  categories.forEach((category) => {
    if (category.parentCategory) {
      if (categoryMap[category.parentCategory]) {
        categoryMap[category.parentCategory].subcategories.push(category)
      }
    }
  })

  return Object.values(categoryMap)
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [openCategory, setOpenCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const { getCartItemCount } = useCart()
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [transcript, setTranscript] = useState("")
  const [activeCategory, setActiveCategory] = useState(null)
  const [speechError, setSpeechError] = useState("")

  // Check if we're on the chat page
  const isOnChatPage = pathname === "/chat"

  useEffect(() => {
    const get = async () => {
      const userData = await getCurrentUser()
      if (userData) {
        setUser(userData)
        setIsAuthenticated(true)
      }

      const data = await getAllCategories()
      const transformedCategories = transformCategories(data)
      setCategories(transformedCategories)
    }
    get()
  }, [])

  useEffect(() => {
    setCartItemCount(getCartItemCount())
  }, [getCartItemCount])

  // Speech recognition setup with mobile optimizations
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false 
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "en-US"

        recognitionInstance.onstart = () => {
          setIsListening(true)
          setSpeechError("")
        }

        recognitionInstance.onresult = (event) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript
          setTranscript(transcriptText)
          
          // Store transcript in sessionStorage for cross-page persistence
          if (transcriptText.trim()) {
            sessionStorage.setItem('speechTranscript', transcriptText)
          }
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
          
          // Handle navigation after recognition completes
          const storedTranscript = sessionStorage.getItem('speechTranscript')
          if (storedTranscript) {
            sessionStorage.removeItem('speechTranscript')
            // Use direct window location for more reliable mobile navigation
            window.location.href = `/chat?message=${encodeURIComponent(storedTranscript)}&source=navbar`
          }
        }

        recognitionInstance.onerror = (event) => {
          setSpeechError(event.error)
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [])

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }

  const handleLogout = () => {
    const logout = async () => {
      const success = await logoutUser()
      if (success) {
        setUser({})
        setIsAuthenticated(false)
      }
    }
    logout()
  }

  // Enhanced toggle listening function with permission handling
  const toggleListening = async () => {
    if (recognition) {
      if (isListening) {
        recognition.stop()
      } else {
        try {
          // Request microphone permission explicitly
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            await navigator.mediaDevices.getUserMedia({ audio: true })
          }
          
          // Clear any previous transcripts
          sessionStorage.removeItem('speechTranscript')
          setTranscript("")
          
          // Start recognition
          recognition.start()
        } catch (error) {
          setSpeechError("Permission denied")
          console.error("Error starting speech recognition:", error)
        }
      }
    } else {
      setSpeechError("Not supported")
    }
  }

  // Float animation for chat button
  const floatAnimation = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `

  // If we're on the chat page, don't render the navbar
  if (isOnChatPage) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-gray-900 bg-teal-950 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <style>{floatAnimation}</style>
      <div className="container flex h-[4.5rem] items-center justify-between mg:flex md:justify-between md:gap-10">
        <div className="flex items-center gap-3 ml-5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://img.icons8.com/arcade/64/hospital.png"
              alt="MediStore Logo"
              width={44}
              height={44}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-teal-400 hidden sm:inline-block">MediStore</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex md:justify-between mx-auto mb-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()}  text-white hover:bg-teal-900`}>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="mt-3.5">
              <NavigationMenuTrigger className="bg-transparent hover:bg-teal-800 text-white data-[state=open]:bg-teal-800">
                <Stethoscope className="h-4 w-4 mr-2" />
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-teal-900 rounded-lg shadow-lg border-0">
                <div className="flex p-1 w-[600px]">
                  {/* Left sidebar with main categories */}
                  <div className="w-1/3 border-r border-teal-800">
                    <ul className="py-2">
                      {categories.map((category) => (
                        <li key={category._id}>
                          <button
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium ${
                              activeCategory === category._id
                                ? "bg-teal-800 text-white"
                                : "text-gray-200 hover:bg-teal-800/50"
                            } transition-colors rounded-l-md`}
                            onMouseEnter={() => setActiveCategory(category._id)}
                            onClick={() => router.push(`/category/${category._id}`)}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right panel with subcategories */}
                  <div className="w-2/3 p-4">
                    {activeCategory ? (
                      <>
                        {categories.find((c) => c._id === activeCategory)?.subcategories.length > 0 ? (
                          <div className="space-y-4">
                            <h3 className="font-medium text-teal-300 mb-3">
                              {categories.find((c) => c._id === activeCategory)?.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {categories
                                .find((c) => c._id === activeCategory)
                                ?.subcategories.map((subcategory) => (
                                  <Link
                                    key={subcategory._id}
                                    href={`/category/${subcategory._id}`}
                                    className="text-sm text-gray-200 hover:text-teal-300 py-1.5 transition-colors"
                                  >
                                    {subcategory.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-sm">No subcategories available</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Search className="h-8 w-8 text-teal-500 mb-2 opacity-50" />
                        <p className="text-gray-300">Hover over a category to see subcategories</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-teal-950/50 p-3 flex justify-between items-center">
                  <Link href="/categories" className="text-xs text-teal-400 hover:text-teal-300 flex items-center">
                    View all categories
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link href="/products" className="text-xs text-teal-400 hover:text-teal-300 flex items-center">
                    Browse all products
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-white hover:bg-teal-900`}>
                  <Package className="h-4 w-4 mr-2" />
                  All Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-white hover:bg-teal-900`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-white hover:bg-teal-900`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Assistant
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full ${isListening ? "bg-red-500/20 text-red-400" : "bg-cyan-900 hover:bg-teal-800/50"} transition-colors`}
            aria-label={isListening ? "Stop listening" : "Start voice assistant"}
          >
            {isListening ? <MicOff size={20} className="text-red-400" /> : <Mic size={20} className="text-teal-300" />}
          </button>
          {isListening && <div className="hidden md:block text-sm italic text-teal-300">Listening...</div>}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative hover:bg-teal-700 cursor-pointer">
              <ShoppingCart className="h-10 w-10 text-white" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 hover:bg-rose-600">
                {cartItemCount}
              </Badge>
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-teal-700 cursor-pointer">
                <User className="h-10 w-10 text-white font-bold" />
                <span className="sr-only">Account</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-teal-950 border-teal-800 text-white mr-5">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center">
                    <Avatar className="h-16 w-16 border-[3px] rounded-full border-gray-900 bg-teal-700  bg-flex items-center justify-center">
                      <AvatarFallback className="text-lg text-gray-800 font-bold flex items-center justify-center w-full h-full">
                        {`${user.firstName[0]}${user.lastName[0]}`}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 flex flex-col gap-1 items-center">
                    <span className="font-semibold text-lg text-white">{`${user.firstName} ${user.lastName}`}</span>
                    <span className="text-sm text-teal-500">{user.email}</span>
                  </div>

                  <Separator className="bg-gray-700/50" />

                  <div className="grid gap-2">
                    <Link href={"/account"}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-teal-200 hover:bg-gray-700/50 transition-colors"
                      >
                        <CircleUserRound className="mr-3 h-4 w-4" />
                        Account Settings
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-teal-200 hover:bg-gray-700/50 transition-colors"
                    >
                      <Package2 className="mr-3 h-4 w-4" />
                      My Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-teal-200 hover:bg-gray-700/50 transition-colors"
                    >
                      <Heart className="mr-3 h-4 w-4" />
                      Wishlist
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-teal-200 hover:bg-gray-700/50 transition-colors"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Preferences
                    </Button>
                  </div>

                  <Separator className="bg-gray-700/50" />

                  <Button
                    variant="ghost"
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-teal-700">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">Welcome</span>
                      <span className="text-sm text-gray-300">Sign in to your account</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Link href="/auth/login">
                      <Button className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/auth/login/register">
                      <Button
                        variant="outline"
                        className="w-full border-teal-700 text-white hover:bg-teal-800 hover:text-white"
                      >
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>

          <Link href="/admin">
            <Button variant="ghost" size="icon" className="hover:bg-teal-700 lg:mr-5">
              <Shield className="h-10 w-10 text-white font-bold" />
              <span className="sr-only">Admin Panel</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-teal-700">
                <Menu className="h-5 w-5 text-white font-bold" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-teal-900">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://img.icons8.com/arcade/64/hospital.png"
                    alt="MediStore Logo"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-white">MediStore</span>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <nav className="flex flex-col gap-3">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-900 text-white"
                    >
                      <Home className="h-4 w-4 text-white" />
                      Home
                    </Link>
                  </SheetClose>

                  {categories.map((category) => (
                    <Collapsible key={category._id} className="w-full">
                      <div className="flex items-center justify-between">
                        <SheetClose asChild>
                          <Link
                            href={`/category/${category._id}`}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 flex-1 text-white"
                          >
                            {category.name}
                          </Link>
                        </SheetClose>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-teal-800">
                            <ChevronDown className="h-4 w-4 text-white" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="pl-8 space-y-1 mt-1">
                          {category.subcategories.map((subcategory) => (
                            <SheetClose key={subcategory._id} asChild>
                              <Link
                                href={`/category/${subcategory._id}`}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-teal-800 text-white"
                              >
                                <ChevronRight className="h-3 w-3 text-cyan-500" />
                                {subcategory.name}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}

                  <SheetClose asChild>
                    <Link
                      href="/products"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 text-white"
                    >
                      <Package className="h-4 w-4 text-white" />
                      All Products
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 text-white"
                    >
                      <Phone className="h-4 w-4 text-white" />
                      Contact
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      href="/chat"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 text-white"
                    >
                      <MessageSquare className="h-4 w-4 text-white" />
                      Chat Assistant
                    </Link>
                  </SheetClose>

                  <Separator className="bg-teal-900" />

                  <SheetClose asChild>
                    <Link
                      href="/medinexus"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 text-white"
                    >
                      <ExternalLink className="h-4 w-4 text-white" />
                      Go to MediNexus
                    </Link>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isListening && <div className="md:hidden bg-teal-900 p-2 text-teal-300 text-sm text-center">Listening...</div>}
    </header>
  )
}

