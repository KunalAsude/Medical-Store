"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, ChevronDown, ChevronRight, Home, Package, Phone, ExternalLink } from "lucide-react"
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

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const categories = [
  {
    name: "Medicines",
    path: "/products/medicines",
    icon: <Package className="h-4 w-4 mr-2" />,
    subcategories: [
      { name: "Pain Relief", path: "/products/medicines/pain-relief" },
      { name: "Cold & Flu", path: "/products/medicines/cold-flu" },
      { name: "Allergy", path: "/products/medicines/allergy" },
      { name: "Digestive Health", path: "/products/medicines/digestive-health" },
      { name: "First Aid", path: "/products/medicines/first-aid" },
    ],
  },
  {
    name: "Devices",
    path: "/products/devices",
    icon: <Package className="h-4 w-4 mr-2" />,
    subcategories: [
      { name: "Blood Pressure Monitors", path: "/products/devices/blood-pressure" },
      { name: "Thermometers", path: "/products/devices/thermometers" },
      { name: "Glucose Monitors", path: "/products/devices/glucose-monitors" },
      { name: "Nebulizers", path: "/products/devices/nebulizers" },
      { name: "Medical Accessories", path: "/products/devices/accessories" },
    ],
  },
  {
    name: "Personal Care",
    path: "/products/personal-care",
    icon: <Package className="h-4 w-4 mr-2" />,
    subcategories: [
      { name: "Skin Care", path: "/products/personal-care/skin-care" },
      { name: "Oral Care", path: "/products/personal-care/oral-care" },
      { name: "Eye Care", path: "/products/personal-care/eye-care" },
    ],
  },
  {
    name: "Vitamins & Supplements",
    path: "/products/vitamins-supplements",
    icon: <Package className="h-4 w-4 mr-2" />,
    subcategories: [
      { name: "Multivitamins", path: "/products/vitamins-supplements/multivitamins" },
      { name: "Minerals", path: "/products/vitamins-supplements/minerals" },
      { name: "Herbal Supplements", path: "/products/vitamins-supplements/herbal" },
    ],
  },
]

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(null)

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }

  return (
    <header className=" sticky top-0 z-50 w-full border-b border-b-gray-900 bg-teal-950 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-18 items-center justify-between mg:flex md:justify-between md:gap-10">
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
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}  text-white hover:bg-teal-900`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem >
              <div className="mt-4 border-0 cursor-pointer">
              <NavigationMenuTrigger >
                <Package className="h-4 w-4 mr-2 text-white" />
                <p className="text-white">Categories</p>
              </NavigationMenuTrigger>
              </div>
              <NavigationMenuContent className="border-0 border-gray-900 bg-teal-900 rounded-lg shadow-lg">
                <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] border-0 bg-teal-900 rounded-xl shadow-lg">
                  {categories.map((category) => (
                    <li key={category.name} className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href={category.path}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md p-5 no-underline outline-none focus:shadow-md hover:shadow-md transition-all duration-200 hover:bg-teal-800"
                        >
                          <div className="mb-2 mt-2 text-lg font-medium text-black">{category.name}</div>
                          <div className="text-sm leading-tight text-white">
                            <ul className="space-y-1.5">
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory.name}>
                                  <Link
                                    href={subcategory.path}
                                    className="text-sm hover:underline  flex items-center"
                                  >
                                    <ChevronRight className="h-3 w-3 mr-1 text-black" />
                                    {subcategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-white hover:bg-teal-900`}
                >
                  <Package className="h-4 w-4 mr-2" />
                  All Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} text-white hover:bg-teal-900`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className=" mt-4 bg-teal-900"
                  >
                    
                    <span>MediNexus</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/medinexus" className="flex items-center w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Go to MediNexus
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative hover:bg-teal-700">
              <ShoppingCart className="h-10 w-10 text-white" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 hover:bg-rose-600">
                0
              </Badge>
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>

          <Link href="/account">
            <Button variant="ghost" size="icon" className="hover:bg-teal-700 lg:mr-5">
              <User className="h-10 w-10  text-white font-bold" />
              <span className="sr-only">Account</span>
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
                    <Collapsible key={category.name} className="w-full">
                      <div className="flex items-center justify-between">
                        <SheetClose asChild>
                          <Link
                            href={category.path}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-teal-800 flex-1 text-white"
                          >
                            {React.cloneElement(category.icon, { className: "h-4 w-4 text-white mr-2" })}
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
                            <SheetClose key={subcategory.name} asChild>
                              <Link
                                href={subcategory.path}
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
    </header>
  )
}

