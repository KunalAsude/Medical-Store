'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa';
import Loader from '@/components/Loader';

export default function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10 text-red-600">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 ">
    <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 sm:h-155 ">
      <div className="relative w-full sm:h-130 aspect-square rounded-xl shadow-md hover:shadow-lg bg-gray-100">
        <Image
          src={product.images?.[0]?.url || '/fallback.jpg'}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl h-16"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>

        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < Math.round(product.averageRating) ? 'text-amber-400' : 'text-gray-300'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
        </div>

        <p className="text-lg sm:text-xl font-semibold text-green-600">₹ {product.price.toFixed(2)}</p>

        <div className="flex items-center">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
            className="h-8 w-8"
          >
            -
          </Button>
          <span className="mx-4 text-lg">{quantity}</span>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity === maxQuantity}
            className="h-8 w-8"
          >
            +
          </Button>
        </div>

        <Button 
          className="w-full bg-teal-800 hover:bg-teal-900 text-white mt-4"
          size="lg"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
  );
}
