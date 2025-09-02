import { useState } from "react";
import { ProductReviewScreen } from "./ProductReviewScreen";
import { CategoryManagementScreen } from "./CategoryManagementScreen";
import { FarmerApprovalScreen } from "./FarmerApprovalScreen";
import { AdminSettings } from "./AdminSettings";
import type { User } from "../types/marketplace";
import { 
  Users, 
  ShoppingBag, 
  DollarSign,
  Search,
  Edit,
  Eye,
  Shield,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Package,
  Settings,
  Grid3X3,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from "../constants/marketplace";

interface AdminDashboardProps {
  user: User;
  viewMode: 'customer' | 'farmer' | 'admin';
  onSwitchViewMode: (mode: 'customer' | 'farmer' | 'admin') => void;
  onBack: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ user, viewMode, onSwitchViewMode, onLogout, onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'product-review' | 'category-management' | 'farmer-approval' | 'settings'>('dashboard');

  // Mock admin data
  const totalUsers = 1250;
  const totalFarmers = 85;
  const totalProducts = 340;
  const totalSales = 2450000;
  const pendingApprovals = 12;

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', joinDate: '2024-01-15' },
    { id: '2', name: 'Grace Wanjiku', email: 'grace@farm.com', role: 'farmer', status: 'active', joinDate: '2024-01-10' },
    { id: '3', name: 'Mary Smith', email: 'mary@example.com', role: 'customer', status: 'suspended', joinDate: '2024-01-12' },
    { id: '4', name: 'Peter Mwangi', email: 'peter@farm.com', role: 'farmer', status: 'pending', joinDate: '2024-01-18' },
  ];

  const mockOrders = [
    { id: '1001', customer: 'John Doe', farmer: 'Grace Wanjiku', amount: 1500, status: 'delivered', date: '2024-01-18' },
    { id: '1002', customer: 'Mary Smith', farmer: 'Peter Mwangi', amount: 800, status: 'pending', date: '2024-01-19' },
    { id: '1003', customer: 'David Wilson', farmer: 'Grace Wanjiku', amount: 2200, status: 'shipped', date: '2024-01-19' },
  ];

  const salesData = [
    { month: 'Jan', sales: 180000 },
    { month: 'Feb', sales: 220000 },
    { month: 'Mar', sales: 280000 },
    { month: 'Apr', sales: 320000 },
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Handle different screens
  if (currentScreen === 'product-review') {
    return <ProductReviewScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  if (currentScreen === 'category-management') {
    return <CategoryManagementScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  if (currentScreen === 'farmer-approval') {
    return <FarmerApprovalScreen onBack={() => setCurrentScreen('dashboard')} />;
  }

  if (currentScreen === 'settings') {
    return <AdminSettings user={user} onBack={() => setCurrentScreen('dashboard')} onLogout={onLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage users, products, and platform operations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold">
                {pendingApprovals} pending
              </span>
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
      </div>

      <div className="p-4">
        {/* View Mode Banner */}
        {user && user.role === 'admin' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">
                    {viewMode === 'customer' ? 'Viewing as Customer' : 
                     viewMode === 'farmer' ? 'Viewing as Farmer' : 'Admin Panel'}
                  </p>
                  <p className="text-sm text-blue-700">
                    {viewMode === 'customer' ? "You're browsing the marketplace as customers see it" :
                     viewMode === 'farmer' ? "You're viewing the farmer dashboard" :
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
                    Customer View
                  </button>
                )}
                {viewMode !== 'farmer' && (
                  <button
                    type="button"
                    onClick={() => onSwitchViewMode('farmer')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Farmer View
                  </button>
                )}
                {viewMode !== 'admin' && (
                  <button
                    type="button"
                    onClick={() => onSwitchViewMode('admin')}
                    className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Admin Panel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div>
          <div className="grid w-full grid-cols-4 mb-4">
            {['overview', 'users', 'products', 'reports'].map(tab => (
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
            <div className="space-y-6 mt-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Total Users */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {totalUsers.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                {/* Total Sales */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                      <p className="text-2xl font-semibold text-primary">
                        KES {(totalSales / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                {/* Active Farmers */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Farmers</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {totalFarmers}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                {/* Products */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Products</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {totalProducts}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 font-semibold">Quick Actions</div>
                <div className="space-y-3 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('product-review')}
                    className="w-full flex items-center justify-start h-14 border rounded-lg hover:bg-muted transition px-4"
                  >
                    <Package className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Review Products</p>
                      <p className="text-sm text-muted-foreground">7 products pending approval</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('category-management')}
                    className="w-full flex items-center justify-start h-14 border rounded-lg hover:bg-muted transition px-4"
                  >
                    <Grid3X3 className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Manage Categories</p>
                      <p className="text-sm text-muted-foreground">Add or edit product categories</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen('farmer-approval')}
                    className="w-full flex items-center justify-start h-14 border rounded-lg hover:bg-muted transition px-4"
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Approve Farmers</p>
                      <p className="text-sm text-muted-foreground">Review and approve farmer applications</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 flex items-center justify-between font-semibold">
                  <span>Pending Approvals</span>
                  <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold">
                    {pendingApprovals}
                  </span>
                </div>
                <div className="space-y-4 px-6 py-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">New Farmer Applications</p>
                        <p className="text-sm text-yellow-700">5 farmers waiting for approval</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => setCurrentScreen('farmer-approval')}
                    >
                      Review
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Product Approvals</p>
                        <p className="text-sm text-blue-700">7 products pending review</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm"
                      onClick={() => setCurrentScreen('product-review')}
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 font-semibold">Recent Activity</div>
                <div className="space-y-3 px-6 py-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer} → {order.farmer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">KES {order.amount}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6 mt-6">
              {/* Search and Filters */}
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 w-full border rounded-lg bg-white"
                  />
                </div>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  className="w-32 h-12 border rounded-lg bg-white px-2"
                >
                  <option value="all">All Roles</option>
                  <option value="customer">Customers</option>
                  <option value="farmer">Farmers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              {/* Users List */}
              <div className="space-y-4 pb-8">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-primary">
                            {user.name[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground mb-1 truncate">{user.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 truncate">{user.email}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block px-2 py-1 rounded border text-xs capitalize">
                              {user.role}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' :
                              user.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Joined: {user.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                        <button className="border px-3 py-1 rounded text-sm flex items-center hover:bg-muted transition">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button className="border px-3 py-1 rounded text-sm flex items-center hover:bg-muted transition">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        {user.status === 'pending' && (
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </button>
                        )}
                        {user.status === 'active' && (
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                            Suspend
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Product Management</h2>
                <button 
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm flex items-center"
                  onClick={() => setCurrentScreen('category-management')}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Manage Categories
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {PRODUCT_CATEGORIES.map((category) => {
                  const categoryProducts = MOCK_PRODUCTS.filter(p => p.category.id === category.id);
                  return (
                    <div key={category.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                            <span className="text-xl">{category.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {categoryProducts.length} products
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="border px-3 py-1 rounded text-sm flex items-center hover:bg-muted transition">
                            <Eye className="w-3 h-3 mr-1" />
                            View All
                          </button>
                          <button className="border px-3 py-1 rounded text-sm flex items-center hover:bg-muted transition">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6 mt-6">
              {/* Sales Chart */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 flex items-center font-semibold">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Sales Overview
                </div>
                <div className="px-6 py-4 space-y-4">
                  {salesData.map((data) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{data.month}</span>
                      <div className="flex items-center space-x-3 flex-1 mx-4">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(data.sales / 320000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-20 text-right">
                          KES {(data.sales / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Platform Metrics */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b px-6 py-4 font-semibold">Platform Metrics</div>
                <div className="grid grid-cols-2 gap-4 px-6 py-4">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-primary">94%</p>
                    <p className="text-sm text-muted-foreground mt-1">Order Success Rate</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-green-600">4.8</p>
                    <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-blue-600">2.3d</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg Delivery Time</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-2xl font-semibold text-orange-600">KES 890</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg Order Value</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pb-8" /> {/* Bottom padding */}
      </div>
    </div>
  );
}