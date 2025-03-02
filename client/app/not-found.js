"use client"

import { Suspense } from 'react'
import Link from 'next/link'

// Main component
export default function NotFoundPage() {
  return (
    <Suspense fallback={<Loading404 />}>
      <NotFoundContent />
    </Suspense>
  )
}

// Loading component
function Loading404() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="animate-pulse">
        <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
        <div className="h-8 bg-gray-200 max-w-md mx-auto mb-4 rounded"></div>
        <div className="h-4 bg-gray-200 max-w-sm mx-auto mb-8 rounded"></div>
      </div>
    </div>
  )
}

// Content component
function NotFoundContent() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}