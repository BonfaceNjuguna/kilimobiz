import { useState } from "react";
import { 
  ArrowLeft, 
  Settings,
  LogOut,
  Store,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Star,
  Package,
  DollarSign,
  Edit
} from "lucide-react";
import type { User } from "../types/marketplace";

interface FarmerSettingsProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

export function FarmerSettings({ user, onBack, onLogout }: FarmerSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Seller Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your seller profile and preferences
                </p>
              </div>
            </div>
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Seller Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-lg mb-4">
            <div className="p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">{user.name}</h3>
                <p className="text-sm text-green-700">{user.email || user.phone}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                    Verified Seller
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-green-700">4.8 Rating</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="border border-green-300 text-green-700 hover:bg-green-100 px-3 py-1 rounded text-sm flex items-center"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 flex items-center">
            <Store className="w-5 h-5 mr-2" />
            <span className="font-semibold">Business Profile</span>
          </div>
          <div className="p-6 space-y-4">
            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Business Name</label>
                  <input defaultValue={user.name} className="mt-1 w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea 
                    defaultValue="Organic farm producing fresh vegetables and fruits in Nairobi region." 
                    className="mt-1 w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <input defaultValue={user.location} className="mt-1 w-full border rounded px-3 py-2" />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    className="border rounded px-4 py-2 text-sm hover:bg-muted transition"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{user.location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">{user.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            <span className="font-semibold">Business Settings</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <h4 className="font-medium text-foreground">Auto-accept Orders</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically accept orders under KES 5,000
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoAcceptOrders}
                onChange={(e) => setAutoAcceptOrders(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <h4 className="font-medium text-foreground">Email Notifications</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive email alerts for new orders and messages
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-foreground">Push Notifications</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get instant notifications in your browser
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Business Analytics */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            <span className="font-semibold">Business Overview</span>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-semibold text-green-800">156</p>
              <p className="text-sm text-green-600">Total Products</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-semibold text-blue-800">432</p>
              <p className="text-sm text-blue-600">Orders Completed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-semibold text-yellow-800">4.8</p>
              <p className="text-sm text-yellow-600">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-semibold text-purple-800">95%</p>
              <p className="text-sm text-purple-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-red-50 border border-red-200 rounded-lg">
          <div className="border-b px-6 py-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-800" />
            <span className="font-semibold text-red-800">Account Actions</span>
          </div>
          <div className="p-6 bg-white rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-800">Sign Out</h4>
                <p className="text-sm text-red-600 mt-1">
                  Securely log out of your seller account
                </p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="pb-8" /> {/* Bottom padding */}
      </div>
    </div>
  );
}