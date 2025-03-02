import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export default function ProductCard({ id, name, price, image, category, onAddToCart }) {
  return (
    <div className="bg-teal-950  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${id}`}>
        <div className="relative h-64">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain p-4" />
        </div>
        <div className="p-4">
          {/* <span className="text-sm text-gray-300">{category}</span> */}
          <h3 className="font-medium text-white mb-2">{name}</h3>
          <p className="text-green-600 font-bold">₹ {price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button
          className="w-full bg-teal-800 text-white py-2 rounded-md hover:bg-teal-900 flex items-center justify-center"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
