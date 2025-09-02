import { useState } from "react";
import type { Screen } from "../types/marketplace";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Bell, 
  Shield, 
  Heart,
  Package,
  CreditCard,
  Settings,
  LogOut,
  Edit,
  Calendar,
  UserIcon
} from "lucide-react";
import type { User, Order, Product } from "../types/marketplace";

interface ProfileScreenProps {
  user: User | null;
  orders: Order[];
  onBack: () => void;
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
  onLogout: () => void;
}

export function ProfileScreen({ user, orders, onBack, onNavigateToScreen, onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-4">
              You need to be logged in to view your profile
            </p>
            <button 
              onClick={onBack} 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          </div>
          <button
            type="button"
            className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                {user.name[0]}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                {user.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span>{user.location}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{orders.length}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-foreground">KES {totalSpent.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </div>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold flex items-center justify-between">
              <span>Recent Orders</span>
              <button
                type="button"
                className="text-sm px-2 py-1 rounded hover:bg-muted transition"
                onClick={() => onNavigateToScreen('orders')}
              >
                View All
              </button>
            </div>
            <div className="space-y-3 px-6 py-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{order.orderDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">KES {order.total}</p>
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
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Quick Actions</div>
          <div className="space-y-3 px-6 py-4">
            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('orders')}
            >
              <Package className="w-5 h-5 mr-3" />
              My Orders
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('favorites')}
            >
              <Heart className="w-5 h-5 mr-3" />
              Favorites
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('addresses')}
            >
              <MapPin className="w-5 h-5 mr-3" />
              Delivery Addresses
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('payment-methods')}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Payment Methods
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Settings</div>
          <div className="space-y-4 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Order updates and offers</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                className="w-5 h-5 accent-primary"
              />
            </div>

            <div className="border-t border-border my-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Special offers and promotions</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={e => setMarketingEmails(e.target.checked)}
                className="w-5 h-5 accent-primary"
              />
            </div>

            <div className="border-t border-border my-2" />

            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('privacy')}
            >
              <Shield className="w-5 h-5 mr-3" />
              Privacy & Security
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-start h-12 rounded hover:bg-muted transition text-foreground"
              onClick={() => onNavigateToScreen('settings')}
            >
              <Settings className="w-5 h-5 mr-3" />
              App Settings
            </button>
          </div>
        </div>

        {/* Role-specific Actions */}
        {user.role === 'farmer' && (
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Seller Tools</div>
            <div className="px-6 py-4">
              <button
                type="button"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded font-medium flex items-center justify-center"
                onClick={() => onNavigateToScreen('farmer-dashboard')}
              >
                Go to Seller Dashboard
              </button>
            </div>
          </div>
        )}

        {user.role === 'admin' && (
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Admin Tools</div>
            <div className="px-6 py-4">
              <button
                type="button"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded font-medium flex items-center justify-center"
                onClick={() => onNavigateToScreen('admin-dashboard')}
              >
                Go to Admin Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="bg-white rounded-lg shadow p-4">
          <button
            type="button"
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded font-medium flex items-center justify-center"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>

        {/* Account Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Member since {user.createdAt.toLocaleDateString()}</p>
          <p className="mt-1">Kilimobiz v1.0</p>
        </div>
      </div>
    </div>
  );
}