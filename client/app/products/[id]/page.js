'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaStar } from 'react-icons/fa';

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;
  const product = {
    name: 'Pain Reliever',
    description: 'Effective pain relief medication.',
    price: 15.99,
    imageUrl: '/images/pain-reliever.jpg',
    rating: 4.5,
    reviews: 120,
  };

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-96">
        <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" className="rounded-lg" />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-${i < Math.round(product.rating) ? 'yellow' : 'gray'}-400`} />
          ))}
          <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
        </div>
        <p className="text-xl font-semibold text-green-600">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-4">
          <Button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
          >
            -
          </Button>
          <span className="mx-4 text-lg">{quantity}</span>
          <Button
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity === maxQuantity}
          >
            +
          </Button>
        </div>
        <Button className="mt-4 w-full bg-blue-600 text-white">Add to Cart</Button>
      </div>
    </div>
  );
}
