import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  MapPin
} from "lucide-react";
import type { CartItem } from "../types/marketplace";

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartScreen({ cart, onBack, onUpdateQuantity, onRemoveItem, onCheckout }: CartScreenProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="p-4 flex items-center space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-foreground">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground text-center mb-6 max-w-sm">
            Start shopping to add fresh farm products to your cart
          </p>
          <button
            type="button"
            onClick={onBack}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-foreground">Shopping Cart</h1>
          </div>
          <span className="inline-block px-3 py-1 rounded bg-muted text-foreground text-sm font-semibold">
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
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.product.sellerName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">
                          KES {item.product.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.unit}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0 border rounded hover:bg-muted transition flex items-center justify-center"
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
                          className="w-8 h-8 p-0 border rounded hover:bg-muted transition flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">
                        KES {item.totalPrice}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.productId)}
                        className="text-destructive hover:text-destructive/80 w-8 h-8 p-0 rounded flex items-center justify-center"
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
            <h3 className="font-semibold text-foreground">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>KES {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>KES {deliveryFee}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">KES {total}</span>
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
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white rounded"
          >
            Proceed to Checkout • KES {total}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full h-12 text-base border rounded hover:bg-muted transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}