"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import Image from "next/image";

const categories = [
  {
    name: "Medicines",
    path: "/products/medicines",
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
    subcategories: [
      { name: "Skin Care", path: "/products/personal-care/skin-care" },
      { name: "Oral Care", path: "/products/personal-care/oral-care" },
      { name: "Eye Care", path: "/products/personal-care/eye-care" },
    ],
  },
  {
    name: "Vitamins & Supplements",
    path: "/products/vitamins-supplements",
    subcategories: [
      { name: "Multivitamins", path: "/products/vitamins-supplements/multivitamins" },
      { name: "Minerals", path: "/products/vitamins-supplements/minerals" },
      { name: "Herbal Supplements", path: "/products/vitamins-supplements/herbal" },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <header className="admin-header ">
      <div className="container mx-auto ">
        <div className="flex items-center  justify-between h-16">
          <Link href="/" className="font-bold text-lg text-primary">
            <div className="flex items-center gap-1">
              <Image
                src="https://img.icons8.com/arcade/64/hospital.png"
                alt="MediNexus Logo"
                width={50}   // ✅ Correct (numeric value)
                height={50}  // ✅ Correct (numeric value)
              />

              <div>MediStore</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center text-white hover:text-primary">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-2">
                  {categories.map((category) => (
                    <div key={category.name} className="relative group/subcategory">
                      <Link
                        href={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
                      >
                        {category.name}
                      </Link>
                      <div className="absolute left-full top-0 ml-1 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/subcategory:opacity-100 group-hover/subcategory:visible transition-all duration-300">
                        <div className="p-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.name}
                              href={subcategory.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/products" className="text-white hover:text-primary">
              All Products
            </Link>
            <Link href="/contact" className="text-white hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-primary relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/account" className="text-white hover:text-primary">
              <User className="h-6 w-6" />
            </Link>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {categories.map((category) => (
              <div key={category.name}>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                </button>

                {openCategory === category.name && (
                  <div className="pl-6 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.name}
                        href={subcategory.path}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
