import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  MapPin
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";
import type { CartItem } from "../types/marketplace";

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartScreen({ cart, onBack, onUpdateQuantity, onRemoveItem, onCheckout }: CartScreenProps) {
  const screenSize = useScreenSize();
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        {/* Header */}
        <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
          <div className="p-4 flex items-center space-x-4">
            {screenSize === 'mobile' && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-semibold text-[#1f2937]">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-24 h-24 bg-[#f3f4f6] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-[#6b7280]" />
          </div>
          <h2 className="text-xl font-semibold text-[#1f2937] mb-2">
            Your cart is empty
          </h2>
          <p className="text-[#6b7280] text-center mb-6 max-w-sm">
            Start shopping to add fresh farm products to your cart
          </p>
          <button
            type="button"
            onClick={onBack}
            className="bg-[#10b981] hover:bg-[#059669] text-[#ffffff] px-6 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {screenSize === 'mobile' && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="font-semibold text-[#1f2937]">Shopping Cart</h1>
          </div>
          <span className="inline-block px-3 py-1 rounded bg-[#e5e7eb] text-[#1f2937] text-sm font-semibold">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.productId} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-[#f3f4f6] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-medium text-[#1f2937] line-clamp-1">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center text-sm text-[#6b7280]">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.product.sellerName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#e5e7eb]">
                      <div>
                        <p className="text-xs text-[#6b7280] mb-1">Price</p>
                        <p className="font-semibold text-[#10b981]">
                          KES {item.product.price}
                        </p>
                        <p className="text-xs text-[#6b7280]">
                          {item.product.unit}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0 border-2 border-[#10b981] text-[#10b981] rounded-md hover:bg-[#10b981] hover:text-[#ffffff] transition-all font-semibold disabled:opacity-50 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                          className="w-8 h-8 p-0 border-2 border-[#10b981] text-[#10b981] rounded-md hover:bg-[#10b981] hover:text-[#ffffff] transition-all font-semibold disabled:opacity-50 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#1f2937]">
                        KES {item.totalPrice}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.productId)}
                        className="text-[#ef4444] hover:text-[#ffffff] hover:bg-[#ef4444] w-8 h-8 p-0 rounded-md flex items-center justify-center transition-all font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-[#1f2937]">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#6b7280]">Subtotal</span>
                <span>KES {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6b7280]">Delivery Fee</span>
                <span>KES {deliveryFee}</span>
              </div>
              <div className="border-t border-[#e5e7eb] pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-[#10b981]">KES {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-green-light border-green-200 rounded-lg shadow">
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-dark">Delivery Information</h4>
                <p className="text-sm text-green-dark/80">
                  Standard delivery within Nairobi takes 1-2 business days. 
                  Free delivery on orders above KES 1,000.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="space-y-3 pt-4">
          <button
            type="button"
            onClick={onCheckout}
            className="w-full h-12 text-base font-bold bg-[#10b981] hover:bg-[#059669] text-[#ffffff] rounded-md shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Proceed to Checkout • KES {total}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full h-12 text-base font-semibold border-2 border-[#10b981] text-[#10b981] rounded-md hover:bg-[#10b981] hover:text-[#ffffff] transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}