import { 
  CheckCircle, 
  Calendar, 
  Package,
  ArrowRight
} from "lucide-react";

interface OrderConfirmationScreenProps {
  orderNumber: string;
  estimatedDelivery: Date;
  total: number;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export function OrderConfirmationScreen({ 
  orderNumber, 
  estimatedDelivery, 
  total, 
  onContinueShopping, 
  onViewOrders 
}: OrderConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Success Animation Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-sm">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll start preparing your fresh products right away.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-mono text-lg font-semibold">{orderNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-semibold text-primary">KES {total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Estimated Delivery</h3>
                <p className="text-sm text-blue-700">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h3 className="font-medium text-foreground mb-3">What's Next?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium">Order Preparation</p>
                  <p className="text-muted-foreground">Farmers will prepare your fresh products</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-xs font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium">Quality Check</p>
                  <p className="text-muted-foreground">Products are inspected for quality</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-xs font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-muted-foreground">Fresh products delivered to your door</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3 bg-white border-t border-border">
        <button
          type="button"
          onClick={onViewOrders}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded flex items-center justify-center font-medium"
        >
          <Package className="w-5 h-5 mr-2" />
          Track Your Order
        </button>
        
        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full h-12 border border-border rounded flex items-center justify-center font-medium text-foreground hover:bg-muted transition"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}