import { useState } from "react";
import type { Screen } from "../types/marketplace";
import { 
  ArrowLeft, 
  Search, 
  Calendar,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Star,
  Receipt,
  RefreshCw,
  Phone,
  MessageSquare
} from "lucide-react";
import type { Order, User, Product } from "../types/marketplace";

interface OrdersScreenProps {
  user: User | null;
  orders: Order[];
  onBack: () => void;
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
}

export function OrdersScreen({ user, orders, onBack, onNavigateToScreen }: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          <div className="p-8 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-4">
              You need to be logged in to view your orders
            </p>
            <button onClick={onBack} className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders based on active tab and search
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    switch (activeTab) {
      case 'upcoming':
        return matchesSearch && (order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped');
      case 'past':
        return matchesSearch && (order.status === 'delivered' || order.status === 'cancelled');
      default:
        return matchesSearch;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped'
  ).length;
  
  const pastOrders = orders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">My Orders</h1>
                <p className="text-sm text-muted-foreground">
                  Track your purchases and deliveries
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 w-full rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Order Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 text-center bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{upcomingOrders}</p>
            <p className="text-sm text-muted-foreground">Active Orders</p>
          </div>

          <div className="p-4 text-center bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{pastOrders}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="grid w-full grid-cols-3 mb-4">
            <button
              type="button"
              className={`py-2 px-4 rounded-t-lg font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Orders ({orders.length})
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-t-lg font-medium transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Active ({upcomingOrders})
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-t-lg font-medium transition-all ${
                activeTab === 'past'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past ({pastOrders})
            </button>
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">
                  {searchQuery ? 'No matching orders found' : 'No orders yet'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search' : 'Start shopping to see your orders here'}
                </p>
                {!searchQuery && (
                  <button
                    type="button"
                    onClick={() => onNavigateToScreen('home')}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition"
                  >
                    Start Shopping
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="space-y-4">
                        {/* Order Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">Order #{order.id}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>{order.orderDate.toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{order.items.length} items</span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded font-semibold text-sm ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </span>
                        </div>

                        {/* Order Items Preview */}
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.quantity} × KES {item.product.price}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground text-center">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>

                        {/* Delivery Info */}
                        {order.deliveryAddress && (
                          <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                            <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800">Delivery Address</p>
                              <p className="text-sm text-green-700">
                                {typeof order.deliveryAddress === 'string' 
                                  ? order.deliveryAddress 
                                  : `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.county}`
                                }
                              </p>
                              {order.estimatedDelivery && (
                                <p className="text-xs text-green-600 mt-1">
                                  Est. delivery: {order.estimatedDelivery.toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Order Total and Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div>
                            <p className="font-semibold text-lg text-foreground">
                              KES {order.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.paymentMethod} • Total
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            {order.status === 'delivered' && (
                              <button
                                type="button"
                                className="px-3 py-2 rounded border text-sm flex items-center hover:bg-muted transition"
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Rate
                              </button>
                            )}
                            {(order.status === 'pending' || order.status === 'confirmed') && (
                              <button
                                type="button"
                                className="px-3 py-2 rounded border text-sm flex items-center hover:bg-muted transition"
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Call Seller
                              </button>
                            )}
                            <button
                              type="button"
                              className="px-3 py-2 rounded border text-sm flex items-center hover:bg-muted transition"
                            >
                              <Receipt className="w-3 h-3 mr-1" />
                              Details
                            </button>
                          </div>
                        </div>

                        {/* Quick Actions for Active Orders */}
                        {(order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped') && (
                          <div className="flex space-x-2 mt-2">
                            <button
                              type="button"
                              className="flex-1 px-3 py-2 rounded bg-primary hover:bg-primary/90 text-white text-sm font-medium flex items-center justify-center transition"
                              onClick={() => onNavigateToScreen('order-tracking', undefined, order.id)}
                            >
                              <Truck className="w-3 h-3 mr-2" />
                              Track Order
                            </button>
                            <button
                              type="button"
                              className="flex-1 px-3 py-2 rounded border text-sm flex items-center justify-center hover:bg-muted transition"
                            >
                              <MessageSquare className="w-3 h-3 mr-2" />
                              Contact Seller
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}