import { useState } from 'react';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  MessageCircle,
  Calendar,
  DollarSign,
  User,
  RotateCcw
} from 'lucide-react';
import { useOrderTracking } from '../hooks/useOrderTracking';

interface OrderTrackingScreenProps {
  orderId: string;
  onBack: () => void;
}

export function OrderTrackingScreen({ orderId, onBack }: OrderTrackingScreenProps) {
  const { getOrderById, getStatusProgress, estimateDeliveryTime } = useOrderTracking();
  const [refreshing, setRefreshing] = useState(false);
  
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold">Order Not Found</h1>
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const statusProgress = getStatusProgress(order.currentStatus);
  const deliveryEstimate = estimateDeliveryTime(order);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusIcon = (status: string, isActive: boolean, isCompleted: boolean) => {
    const iconClass = `w-5 h-5 ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'}`;
    switch (status) {
      case 'pending':
        return <Clock className={iconClass} />;
      case 'confirmed':
      case 'preparing':
      case 'ready':
        return <Package className={iconClass} />;
      case 'shipped':
        return <Truck className={iconClass} />;
      case 'delivered':
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">Track Order</h1>
                <p className="text-sm text-muted-foreground">{order.id}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
            >
              <RotateCcw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Order Status Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order Status</h2>
                <p className="text-sm text-muted-foreground">{deliveryEstimate}</p>
              </div>
              <span
                className={`text-sm px-3 py-1 rounded font-semibold ${
                  order.currentStatus === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.currentStatus === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : ['shipped', 'ready'].includes(order.currentStatus)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {order.currentStatus.charAt(0).toUpperCase() + order.currentStatus.slice(1)}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{statusProgress.currentStep} of {statusProgress.totalSteps} steps</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${statusProgress.percentage}%` }}
                />
              </div>
            </div>
            {order.currentStatus === 'shipped' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Out for Delivery</p>
                    <p className="text-sm text-blue-700">
                      Your order is on its way. Track: {order.trackingNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Order Timeline</div>
          <div className="p-6">
            <div className="space-y-4">
              {order.statusHistory.map((status, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(status.status, false, true)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">
                        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {status.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {status.message}
                    </p>
                    {status.location && (
                      <div className="flex items-center space-x-1 mt-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {status.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Order Details</div>
          <div className="p-6 space-y-4">
            {/* Items */}
            <div>
              <h4 className="font-medium mb-3">Items Ordered</h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Info */}
            <div>
              <h4 className="font-medium mb-3">Farmer</h4>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.farmerName}</p>
                    <p className="text-xs text-muted-foreground">Farmer</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded border text-sm flex items-center hover:bg-muted transition"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded border text-sm flex items-center hover:bg-muted transition"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h4 className="font-medium mb-3">Delivery Information</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">
                      {order.deliveryAddress.street}<br />
                      {order.deliveryAddress.city}, {order.deliveryAddress.county}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {order.estimatedDelivery.toLocaleDateString()} at{' '}
                      {order.estimatedDelivery.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>

                {order.specialInstructions && (
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Special Instructions</p>
                      <p className="text-sm text-muted-foreground">
                        {order.specialInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h4 className="font-medium mb-3">Payment Information</h4>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Total: KES {order.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Payment via {order.paymentMethod}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                    order.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}