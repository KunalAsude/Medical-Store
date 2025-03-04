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
    <div className="container mx-auto p-6">
    <div className="overflow-hidden mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* ✅ Product Image */}
      <div className="relative  w-full h-150  overflow-hidden rounded-xl  shadow-md hover:shadow-lg bg-gray-400">
        <Image src={product.images?.[0]?.url || '/fallback.jpg'} alt={product.name} layout="fill" objectFit="cover" className="rounded-2xl p-2 h-16" />
      </div>

      {/* ✅ Product Details */}
      <div className='flex flex-col justify-start space-y-3'>
        <h1 className="text-2xl font-bold mb-5">{product.name}</h1>
        <p className="text-gray-400 mb-5">{product.description}</p>

        {/* ✅ Star Rating */}
        <div className="flex items-center mb-5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-${i < Math.round(product.averageRating) ? 'bg-amber-400' : 'gray'}-400`} />
          ))}
          <span className="ml-2 text-amber-300">({product.reviewCount} reviews)</span>
        </div>

        {/* ✅ Price */}
        <p className="text-xl font-semibold text-green-600">₹ {product.price.toFixed(2)}</p>

        {/* ✅ Quantity Selector */}
        <div className="flex items-center mt-4 ">
          <Button className='cursor-pointer' onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity === 1}>-</Button>
          <span className="mx-4 text-lg cursor-default">{quantity}</span>
          <Button className='cursor-pointer' onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} disabled={quantity === maxQuantity} >+</Button>
        </div>

        {/* ✅ Add to Cart Button */}
        <Button className="mt-4 w-full bg-teal-800 hover:bg-teal-900 text-white cursor-pointer">Add to Cart</Button>
      </div>
    </div>
    </div>
  );
}
