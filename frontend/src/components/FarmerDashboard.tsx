import { useState } from "react";
import { FarmerSettings } from "./FarmerSettings";
import type { Product, User } from "../types/marketplace";
import type { Screen } from "../types/marketplace";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Settings,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  X,
  Store,
  Shield,
  ArrowRight
} from "lucide-react";
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from "../constants/marketplace";

interface FarmerDashboardProps {
  farmerId: number;
  farmerName: string;
  user: User;
  viewMode: 'customer' | 'farmer' | 'admin';
  onSwitchViewMode: (mode: 'customer' | 'farmer' | 'admin') => void;
  onLogout: () => void;
  onBack: () => void;
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
}

export function FarmerDashboard({ farmerId, farmerName, user, viewMode, onSwitchViewMode, onLogout, onNavigateToScreen }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'settings'>('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    category: '',
    stockQuantity: '',
    isOrganic: false
  });

  // Mock data for farmer
  const farmerProducts = MOCK_PRODUCTS.filter(product => product.sellerId === farmerId);
  const totalSales = 45000;
  const totalOrders = 123;
  const activeProducts = farmerProducts.filter(p => p.inStock).length;

  const recentOrders = [
    { id: '1', customer: 'John Doe', product: 'Free Range Chicken', amount: 800, status: 'pending' },
    { id: '2', customer: 'Mary Smith', product: 'Farm Fresh Eggs', amount: 350, status: 'confirmed' },
    { id: '3', customer: 'Peter Wilson', product: 'Free Range Chicken', amount: 1600, status: 'delivered' },
  ];

  // Handle tab changes and navigation
  const handleTabChange = (tab: string) => {
    if (tab === 'analytics') {
      onNavigateToScreen?.('farmer-analytics');
    } else if (tab === 'earnings') {
      onNavigateToScreen?.('farmer-earnings');
    } else {
      setActiveTab(tab);
    }
  };

  // Handle settings screen
  if (currentScreen === 'settings') {
    return <FarmerSettings user={user} onBack={() => setCurrentScreen('dashboard')} onLogout={onLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome back, {farmerName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your products and orders
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('settings')}
              className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* View Mode Banner */}
        {user && (user.role === 'admin' || user.role === 'farmer') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg mb-4">
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
                    onClick={() => onSwitchViewMode('customer')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Customer
                  </button>
                )}
                {user.role === 'admin' && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    onClick={() => onSwitchViewMode('farmer')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Farmer
                  </button>
                )}
                {user.role === 'admin' && viewMode !== 'admin' && (
                  <button
                    type="button"
                    onClick={() => onSwitchViewMode('admin')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Admin
                  </button>
                )}
                {user.role === 'farmer' && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    onClick={() => onSwitchViewMode('farmer')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div>
          <div className="grid w-full grid-cols-5 mb-4">
            {['overview', 'products', 'orders', 'analytics', 'earnings'].map(tab => (
              <button
                key={tab}
                type="button"
                className={`py-2 px-4 font-medium border-b-2 ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'} focus:outline-none`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sales</p>
                      <p className="text-2xl font-semibold text-primary">
                        KES {totalSales.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {totalOrders}
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Products</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {activeProducts}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-semibold text-foreground">
                        KES 18K
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  className="h-16 flex flex-col items-center justify-center space-y-1 border rounded hover:bg-muted transition"
                  onClick={() => onNavigateToScreen?.('farmer-analytics')}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">View Analytics</span>
                </button>
                <button 
                  type="button"
                  className="h-16 flex flex-col items-center justify-center space-y-1 border rounded hover:bg-muted transition"
                  onClick={() => onNavigateToScreen?.('farmer-earnings')}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">View Earnings</span>
                </button>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                  <span className="font-semibold">Recent Orders</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                    {recentOrders.length} orders
                  </span>
                </div>
                <div className="space-y-3 px-6 py-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground truncate">{order.product}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">KES {order.amount.toLocaleString()}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <button 
                    type="button"
                    className="w-full border rounded py-2 text-sm hover:bg-muted transition"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All Orders
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Products</h2>
                <button 
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm flex items-center"
                  onClick={() => setShowAddProduct(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <div className="border border-primary/20 bg-green-light/50 rounded-lg shadow mb-4">
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <span className="font-semibold">Add New Product</span>
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="w-8 h-8 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Product Name</label>
                        <input
                          id="name"
                          placeholder="e.g., Fresh Tomatoes"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium text-foreground">Category</label>
                        <select
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="">Select category</option>
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.icon} {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
                      <textarea
                        id="description"
                        placeholder="Describe your product..."
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium text-foreground">Price (KES)</label>
                        <input
                          id="price"
                          type="number"
                          placeholder="100"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="unit" className="text-sm font-medium text-foreground">Unit</label>
                        <input
                          id="unit"
                          placeholder="per kg"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="stock" className="text-sm font-medium text-foreground">Stock Quantity</label>
                        <input
                          id="stock"
                          type="number"
                          placeholder="50"
                          value={newProduct.stockQuantity}
                          onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="organic"
                          checked={newProduct.isOrganic}
                          onChange={(e) => setNewProduct({...newProduct, isOrganic: e.target.checked})}
                          className="rounded"
                        />
                        <label htmlFor="organic" className="text-sm font-medium text-foreground">Organic Product</label>
                      </div>
                      <div className="space-x-2">
                        <button
                          type="button"
                          className="border rounded px-4 py-2 text-sm hover:bg-muted transition"
                          onClick={() => setShowAddProduct(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-primary hover:bg-primary/90 text-white rounded px-4 py-2 text-sm"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 pb-8">
                {farmerProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 pr-4">
                              <h3 className="font-semibold text-foreground mb-1 truncate">{product.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {product.description}
                              </p>
                              <p className="font-semibold text-primary text-lg">
                                KES {product.price} {product.unit}
                              </p>
                            </div>
                            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {product.stockQuantity} units available
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-border">
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition flex-shrink-0"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </button>
                          <button
                            type="button"
                            className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition flex-shrink-0"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit Product
                          </button>
                          <button
                            type="button"
                            className={`border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition ${
                              !product.inStock ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                          >
                            {product.inStock ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Product Stats */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Views</p>
                            <p className="font-semibold text-sm">234</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Orders</p>
                            <p className="font-semibold text-sm">12</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Rating</p>
                            <span className="font-semibold text-sm flex items-center justify-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>4.8</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order Management</h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                  {recentOrders.length} orders
                </span>
              </div>
              
              <div className="space-y-4 pb-8">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 pr-4">
                              <h3 className="font-semibold text-foreground mb-1">Order #{order.id}</h3>
                              <p className="text-sm text-muted-foreground mb-1 truncate">
                                Customer: {order.customer}
                              </p>
                              <p className="text-sm text-muted-foreground mb-2 truncate">
                                Product: {order.product}
                              </p>
                              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>2 hours ago</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>Nairobi</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold text-lg text-primary mb-2">
                                KES {order.amount.toLocaleString()}
                              </p>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-border">
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition flex-shrink-0"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </button>
                          
                          {order.status === 'pending' && (
                            <>
                              <button 
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 text-sm flex-shrink-0 flex items-center"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Accept Order
                              </button>
                              <button 
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm flex-shrink-0 flex items-center"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Decline
                              </button>
                            </>
                          )}
                          
                          {order.status === 'confirmed' && (
                            <>
                              <button 
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm flex-shrink-0 flex items-center"
                              >
                                <Package className="w-3 h-3 mr-1" />
                                Mark Ready
                              </button>
                              <button 
                                type="button"
                                className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition"
                              >
                                <Users className="w-3 h-3 mr-1" />
                                Contact Customer
                              </button>
                            </>
                          )}
                          
                          {order.status === 'delivered' && (
                            <div className="flex items-center space-x-2">
                              <span className="bg-green-100 text-green-800 flex items-center space-x-1 px-3 py-1 rounded text-xs font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                <span>Completed</span>
                              </span>
                              <button 
                                type="button"
                                className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition"
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Rate Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}