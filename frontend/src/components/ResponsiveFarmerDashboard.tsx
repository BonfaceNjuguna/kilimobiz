import { useState, useEffect } from "react";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { ResponsiveSidebar } from "./ResponsiveSidebar";
import { FarmerDashboard } from "./FarmerDashboard";
import { FarmerAnalyticsScreen } from "./FarmerAnalyticsScreen";
import { FarmerProductsScreen } from "./FarmerProductsScreen";
import { FarmerEarningsScreen } from "./FarmerEarningsScreen";
import { FarmerSettings } from "./FarmerSettings";
import type { User, Product, Screen } from "../types/marketplace";
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  ShoppingCart,
  Star,
  AlertTriangle,
  CheckCircle,
  Shield,
  Store,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  X,
  Users
} from "lucide-react";

interface ResponsiveFarmerDashboardProps {
  farmerId: number;
  farmerName: string;
  user: User;
  viewMode: 'customer' | 'farmer' | 'admin';
  onBack: () => void;
  onSwitchViewMode: (mode: 'customer' | 'farmer' | 'admin') => void;
  onLogout: () => void;
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
  orderTracking?: unknown;
  notifications?: unknown;
}

export function ResponsiveFarmerDashboard({
  farmerId,
  farmerName,
  user,
  viewMode,
  onBack,
  onSwitchViewMode,
  onLogout
}: ResponsiveFarmerDashboardProps) {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [currentScreen, setCurrentScreen] = useState<'overview' | 'products' | 'orders' | 'analytics' | 'earnings' | 'settings'>('overview');

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1025) {
        setScreenSize('desktop');
      } else if (window.innerWidth >= 481) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSidebarNavigation = (section: string) => {
    switch (section) {
      case 'overview':
        setCurrentScreen('overview');
        break;
      case 'products':
        setCurrentScreen('products');
        break;
      case 'orders':
        setCurrentScreen('orders');
        break;
      case 'analytics':
        setCurrentScreen('analytics');
        break;
      case 'earnings':
        setCurrentScreen('earnings');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'customer-view':
        onSwitchViewMode('customer');
        break;
      case 'farmer-view':
        break;
      default:
        setCurrentScreen('overview');
        break;
    }
  };

  const sidebar = (
    <ResponsiveSidebar
      userRole={viewMode}
      userName={user?.name || 'Farmer'}
      activeSection={currentScreen}
      onNavigate={handleSidebarNavigation}
      onLogout={onLogout}
      pendingOrdersCount={5}
      notificationsCount={3}
      actualUserRole={user?.role}
      viewMode={viewMode}
      userId={user?.id}
    />
  );

  if (currentScreen === 'analytics') {
    return <FarmerAnalyticsScreen farmerId={Number(farmerId)} farmerName={farmerName} onBack={() => setCurrentScreen('overview')} />;
  }
  if (currentScreen === 'products') {
    return <FarmerProductsScreen farmerId={Number(farmerId)} farmerName={farmerName} onBack={() => setCurrentScreen('overview')} />;
  }
  if (currentScreen === 'earnings') {
    return <FarmerEarningsScreen farmerId={Number(farmerId)} farmerName={farmerName} onBack={() => setCurrentScreen('overview')} />;
  }
  if (currentScreen === 'settings') {
    return <FarmerSettings user={user} onBack={() => setCurrentScreen('overview')} onLogout={onLogout} />;
  }

  // Orders screen (replace Card/Button/Badge with Tailwind)
  if (currentScreen === 'orders') {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        {/* View Mode Banner */}
        {user && (user.role === 'admin' || user.role === 'farmer') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {user.role === 'admin' ? (
                  <Shield className="w-5 h-5 text-blue-600" />
                ) : (
                  <Store className="w-5 h-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium text-blue-900">
                    {viewMode === 'customer' ? 'Viewing as Customer' : 
                     viewMode === 'farmer' ? 'Farmer Dashboard' : 'Admin Panel'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {viewMode === 'customer' ? "You're browsing the marketplace as customers see it" :
                     viewMode === 'farmer' ? "Manage your products and orders" :
                     'Full administrative access to the platform'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {viewMode !== 'customer' && (
                  <button
                    type="button"
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                    onClick={() => onSwitchViewMode('customer')}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Customer View
                  </button>
                )}
                {user.role === 'admin' && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                    onClick={() => onSwitchViewMode('farmer')}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Farmer View
                  </button>
                )}
                {user.role === 'admin' && viewMode !== 'admin' && (
                  <button
                    type="button"
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                    onClick={() => onSwitchViewMode('admin')}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Admin Panel
                  </button>
                )}
                {user.role === 'farmer' && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                    onClick={() => onSwitchViewMode('farmer')}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Seller Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Order Management
              </h1>
              <p className="text-muted-foreground">
                Track and manage all your customer orders
              </p>
            </div>
            <button
              type="button"
              className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition"
              onClick={() => setCurrentScreen('overview')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-semibold text-foreground">156</p>
                <p className="text-sm text-green-600 mt-1">+12 this week</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-semibold text-foreground">8</p>
                <p className="text-sm text-orange-600 mt-1">Needs attention</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-3xl font-semibold text-foreground">23</p>
                <p className="text-sm text-blue-600 mt-1">Being prepared</p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-semibold text-foreground">125</p>
                <p className="text-sm text-green-600 mt-1">Successfully delivered</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow mt-8">
          <div className="border-b px-6 py-4 font-semibold">Recent Orders</div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { id: 'ORD-001', customer: 'John Doe', product: 'Free Range Chicken', amount: 1600, status: 'pending', date: '2024-01-20', time: '10:30 AM' },
                { id: 'ORD-002', customer: 'Mary Smith', product: 'Farm Fresh Eggs', amount: 350, status: 'processing', date: '2024-01-20', time: '09:15 AM' },
                { id: 'ORD-003', customer: 'Peter Wilson', product: 'Organic Tomatoes', amount: 800, status: 'completed', date: '2024-01-19', time: '4:45 PM' },
                { id: 'ORD-004', customer: 'Sarah Johnson', product: 'Fresh Spinach', amount: 250, status: 'processing', date: '2024-01-19', time: '2:20 PM' },
                { id: 'ORD-005', customer: 'David Brown', product: 'Free Range Chicken', amount: 1600, status: 'completed', date: '2024-01-19', time: '11:30 AM' },
                { id: 'ORD-006', customer: 'Lisa Anderson', product: 'Organic Carrots', amount: 450, status: 'pending', date: '2024-01-18', time: '5:10 PM' },
              ].map((order) => (
                <div key={order.id} className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{order.id}</h3>
                            <p className="text-sm text-muted-foreground mb-1">Customer: {order.customer}</p>
                            <p className="text-sm text-muted-foreground mb-2">Product: {order.product}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{order.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{order.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg text-primary mb-2">
                              KES {order.amount.toLocaleString()}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            type="button"
                            className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </button>
                          {order.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 text-sm flex items-center"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Accept Order
                              </button>
                              <button
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm flex items-center"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Decline
                              </button>
                            </>
                          )}
                          {order.status === 'processing' && (
                            <>
                              <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm flex items-center"
                              >
                                <Package className="w-3 h-3 mr-1" />
                                Mark Ready
                              </button>
                              <button
                                type="button"
                                className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition"
                              >
                                <Users className="w-3 h-3 mr-1" />
                                Contact Customer
                              </button>
                            </>
                          )}
                          {order.status === 'completed' && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded font-semibold flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Delivered</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ResponsiveLayout>
    );
  }

  if (screenSize === 'mobile') {
    return (
      <FarmerDashboard
        farmerId={farmerId}
        farmerName={farmerName}
        user={user}
        viewMode={viewMode}
        onSwitchViewMode={onSwitchViewMode}
        onBack={onBack}
        onLogout={onLogout}
        onNavigateToScreen={(screen) => {
          if (screen === 'farmer-analytics') {
            setCurrentScreen('analytics');
          } else if (screen === 'farmer-earnings') {
            setCurrentScreen('earnings');
          } else if (screen === 'farmer-products') {
            setCurrentScreen('products');
          } else if (screen === 'settings') {
            setCurrentScreen('settings');
          } else {
            setCurrentScreen('overview');
          }
        }}
      />
    );
  }

  return (
    <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
      {/* View Mode Banner */}
      {user && (user.role === 'admin' || user.role === 'farmer') && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.role === 'admin' ? (
                <Shield className="w-5 h-5 text-blue-600" />
              ) : (
                <Store className="w-5 h-5 text-blue-600" />
              )}
              <div>
                <p className="font-medium text-blue-900">
                  {viewMode === 'customer' ? 'Viewing as Customer' : 
                   viewMode === 'farmer' ? 'Farmer Dashboard' : 'Admin Panel'}
                </p>
                <p className="text-sm text-blue-700">
                  {viewMode === 'customer' ? "You're browsing the marketplace as customers see it" :
                   viewMode === 'farmer' ? "Manage your products and orders" :
                   'Full administrative access to the platform'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {viewMode !== 'customer' && (
                <button
                  type="button"
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  onClick={() => onSwitchViewMode('customer')}
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Customer View
                </button>
              )}
              {user.role === 'admin' && viewMode !== 'farmer' && (
                <button
                  type="button"
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  onClick={() => onSwitchViewMode('farmer')}
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Farmer View
                </button>
              )}
              {user.role === 'admin' && viewMode !== 'admin' && (
                <button
                  type="button"
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  onClick={() => onSwitchViewMode('admin')}
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Admin Panel
                </button>
              )}
              {user.role === 'farmer' && viewMode !== 'farmer' && (
                <button
                  type="button"
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  onClick={() => onSwitchViewMode('farmer')}
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Seller Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Farmer Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your products, orders, and earnings
        </p>
      </div>

      {/* Stats Overview */}
      <div className="desktop-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-semibold text-foreground">
                KES 58.1K
              </p>
              <p className="text-sm text-green-600 mt-1">
                +18% from last month
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Products</p>
              <p className="text-3xl font-semibold text-foreground">
                12
              </p>
              <p className="text-sm text-blue-600 mt-1">
                3 out of stock
              </p>
            </div>
            <Package className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-3xl font-semibold text-foreground">
                156
              </p>
              <p className="text-sm text-green-600 mt-1">
                5 pending
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <p className="text-3xl font-semibold text-foreground">
                4.7
              </p>
              <p className="text-sm text-green-600 mt-1">
                Based on 89 reviews
              </p>
            </div>
            <Star className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm lg:text-base">View Analytics</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">Track your performance</p>
                </div>
              </div>
              <button
                type="button"
                className="border rounded px-3 py-1 text-sm flex-shrink-0 hover:bg-muted transition"
                onClick={() => setCurrentScreen('analytics')}
              >
                View
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm lg:text-base">Manage Products</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">12 active products</p>
                </div>
              </div>
              <button
                type="button"
                className="border rounded px-3 py-1 text-sm flex-shrink-0 hover:bg-muted transition"
                onClick={() => setCurrentScreen('products')}
              >
                Manage
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 lg:p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm lg:text-base">View Earnings</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">KES 12.4K available</p>
                </div>
              </div>
              <button
                type="button"
                className="border rounded px-3 py-1 text-sm flex-shrink-0 hover:bg-muted transition"
                onClick={() => setCurrentScreen('earnings')}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Recent Orders</div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">#{order}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Order #{order.toString().padStart(3, '0')}</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">KES 1,200</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Product Alerts</div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 text-sm">Low Stock Alert</p>
                  <p className="text-xs text-red-700">Free Range Eggs - Only 2 units left</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 text-sm">Expiring Soon</p>
                  <p className="text-xs text-yellow-700">Fresh Spinach expires in 2 days</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 text-sm">High Demand</p>
                  <p className="text-xs text-green-700">Organic Tomatoes - 15 views today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4 font-semibold">Sales Performance (Last 4 Weeks)</div>
        <div className="p-6">
          <div className="h-80 flex items-end space-x-4 pb-4">
            {[
              { week: 'Week 1', sales: 12500 },
              { week: 'Week 2', sales: 15200 },
              { week: 'Week 3', sales: 11800 },
              { week: 'Week 4', sales: 18600 }
            ].map((data) => (
              <div key={data.week} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-md transition-all duration-300 hover:bg-primary/80"
                  style={{ height: `${(data.sales / 20000) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2">{data.week}</span>
                <span className="text-xs font-medium">KES {(data.sales / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Best Week</p>
              <p className="text-xl font-semibold">KES 18.6K</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average</p>
              <p className="text-xl font-semibold">KES 14.5K</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-xl font-semibold text-green-600">+18.2%</p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}