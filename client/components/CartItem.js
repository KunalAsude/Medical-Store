import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center py-4 border-b">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>

        {/* Price & Quantity Controls */}
        <div className="mt-1 flex items-center justify-between">
          <p className="font-bold text-primary">${item.price.toFixed(2)}</p>

          <div className="flex items-center">
            {/* Decrease Quantity */}
            <button
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            {/* Quantity Display */}
            <span className="mx-2 w-8 text-center">{item.quantity}</span>

            {/* Increase Quantity */}
            <button
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>

            {/* Remove Item */}
            <button
              className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-md"
              onClick={() => onRemove(item.id)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
