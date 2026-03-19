import { useState } from "react";
import { ResponsiveLayout, useScreenSize } from "./ResponsiveLayout";
import { ResponsiveSidebar } from "./ResponsiveSidebar";
import { AdminDashboard } from "./AdminDashboard";
import { ProductReviewScreen } from "./ProductReviewScreen";
import { CategoryManagementScreen } from "./CategoryManagementScreen";
import { FarmerApprovalScreen } from "./FarmerApprovalScreen";
import { UserManagementScreen } from "./UserManagementScreen";
import { ReportsScreen } from "./ReportsScreen";
import { AdminSettings } from "./AdminSettings";
import type { User } from "../types/marketplace";
import {
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Grid3X3,
  UserPlus,
  DollarSign,
  Shield,
  ArrowRight,
} from "lucide-react";

interface ResponsiveAdminDashboardProps {
  user: User;
  viewMode: "customer" | "farmer" | "admin";
  onBack: () => void;
  onSwitchViewMode: (mode: "customer" | "farmer" | "admin") => void;
  onLogout: () => void;
}

export function ResponsiveAdminDashboard({
  user,
  viewMode,
  onBack,
  onSwitchViewMode,
  onLogout,
}: ResponsiveAdminDashboardProps) {
  const screenSize = useScreenSize();
  const [currentScreen, setCurrentScreen] = useState<
    | "dashboard"
    | "product-review"
    | "category-management"
    | "farmer-approval"
    | "users"
    | "reports"
    | "settings"
  >("dashboard");

  // -------- Normalize ONCE at the top --------
  const allowedRoles = ["customer", "farmer", "admin"] as const;
  const safeRole: "customer" | "farmer" | "admin" = allowedRoles.includes(
    user.role as any
  )
    ? (user.role as "customer" | "farmer" | "admin")
    : "admin";

  const normalizedUser: User = {
    ...user,
    // harden required/optional fields
    id: user.id ?? "",
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    role: safeRole,
    location: user.location ?? "",
    profileImage: user.profileImage ?? "",
    isVerified: user.isVerified ?? false,
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt
        : new Date((user as any).createdAt ?? Date.now()),
  };
  // -------------------------------------------

  const handleSidebarNavigation = (section: string) => {
    switch (section) {
      case "dashboard":
        setCurrentScreen("dashboard");
        break;
      case "product-review":
        setCurrentScreen("product-review");
        break;
      case "farmer-approval":
        setCurrentScreen("farmer-approval");
        break;
      case "category-management":
        setCurrentScreen("category-management");
        break;
      case "users":
        setCurrentScreen("users");
        break;
      case "reports":
        setCurrentScreen("reports");
        break;
      case "settings":
        setCurrentScreen("settings");
        break;
      case "customer-view":
        onSwitchViewMode("customer");
        break;
      case "farmer-view":
        onSwitchViewMode("farmer");
        break;
      case "admin-view":
        onSwitchViewMode("admin");
        break;
      default:
        setCurrentScreen("dashboard");
        break;
    }
  };

  // Define sidebar before using it in conditional returns
  const sidebar = (
    <ResponsiveSidebar
      userRole={viewMode}
      userName={user?.name || 'Admin'}
      activeSection={currentScreen}
      onNavigate={handleSidebarNavigation}
      onLogout={onLogout}
      pendingOrdersCount={3}
      actualUserRole={user?.role}
      viewMode={viewMode}
      userId={user?.id}
    />
  );

  // If mobile, use the original AdminDashboard with normalized user
  if (screenSize === "mobile") {
    return (
      <AdminDashboard
        user={normalizedUser}
        viewMode={viewMode}
        onSwitchViewMode={onSwitchViewMode}
        onBack={onBack}
        onLogout={onLogout}
      />
    );
  }

  // Render specific screens
  if (currentScreen === "product-review") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <ProductReviewScreen onBack={() => setCurrentScreen("dashboard")} />
      </ResponsiveLayout>
    );
  }

  if (currentScreen === "category-management") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <CategoryManagementScreen onBack={() => setCurrentScreen("dashboard")} />
      </ResponsiveLayout>
    );
  }

  if (currentScreen === "farmer-approval") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <FarmerApprovalScreen onBack={() => setCurrentScreen("dashboard")} />
      </ResponsiveLayout>
    );
  }

  if (currentScreen === "settings") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <AdminSettings
          user={normalizedUser}
          onBack={() => setCurrentScreen("dashboard")}
          onLogout={onLogout}
        />
      </ResponsiveLayout>
    );
  }

  if (currentScreen === "users") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <UserManagementScreen onBack={() => setCurrentScreen("dashboard")} />
      </ResponsiveLayout>
    );
  }

  if (currentScreen === "reports") {
    return (
      <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
        <ReportsScreen onBack={() => setCurrentScreen("dashboard")} />
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout sidebar={sidebar} showSidebar={true} className="space-y-8">
      {/* View Mode Banner - Always visible for admin users for easier navigation */}
      {normalizedUser.role === "admin" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  {viewMode === "customer"
                    ? "Viewing as Customer"
                    : viewMode === "farmer"
                    ? "Viewing as Farmer"
                    : "Admin Panel"}
                </p>
                <p className="text-sm text-blue-700">
                  {viewMode === "customer"
                    ? "You're browsing the marketplace as customers see it"
                    : viewMode === "farmer"
                    ? "You're viewing the farmer dashboard"
                    : "Full administrative access to the platform"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {viewMode !== "customer" && (
                <button
                  type="button"
                  onClick={() => onSwitchViewMode("customer")}
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Customer View
                </button>
              )}
              {viewMode !== "farmer" && (
                <button
                  type="button"
                  onClick={() => onSwitchViewMode("farmer")}
                  className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm flex items-center"
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Farmer View
                </button>
              )}
              {viewMode !== "admin" && (
                <button
                  type="button"
                  onClick={() => onSwitchViewMode("admin")}
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#1f2937] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#6b7280]">Monitor and manage your marketplace</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Total Revenue</p>
              <p className="text-3xl font-semibold text-[#1f2937]">KES 2.4M</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <DollarSign className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Active Users</p>
              <p className="text-3xl font-semibold text-[#1f2937]">1,234</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </div>
            <Users className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Total Products</p>
              <p className="text-3xl font-semibold text-[#1f2937]">456</p>
              <p className="text-sm text-green-600 mt-1">+15 new this week</p>
            </div>
            <Package className="w-12 h-12" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Orders Today</p>
              <p className="text-3xl font-semibold text-[#1f2937]">89</p>
              <p className="text-sm text-green-600 mt-1">+23% vs yesterday</p>
            </div>
            <TrendingUp className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Review Products</h3>
                <p className="text-sm text-[#6b7280]">
                  15 pending approval
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentScreen("product-review")}
                className="px-3 py-2 rounded bg-[#10b981] text-white hover:bg-[#059669] text-sm font-medium"
              >
                Review
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Approve Farmers</h3>
                <p className="text-sm text-[#6b7280]">
                  5 applications waiting
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentScreen("farmer-approval")}
                className="px-3 py-2 rounded bg-[#10b981] text-white hover:bg-[#059669] text-sm font-medium"
              >
                Review
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Grid3X3 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Manage Categories</h3>
                <p className="text-sm text-[#6b7280]">12 active categories</p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentScreen("category-management")}
                className="px-3 py-2 rounded border border-[#10b981] text-[#10b981] hover:bg-[#f0fdf4] text-sm font-medium"
              >
                Manage
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
                <div
                  key={order}
                  className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#d1fae5] rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-[#10b981]">
                        #{order}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Customer {order}</p>
                      <p className="text-xs text-[#6b7280]">
                        2 minutes ago
                      </p>
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
          <div className="border-b px-6 py-4 font-semibold">System Alerts</div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 text-sm">
                    Low Stock Alert
                  </p>
                  <p className="text-xs text-yellow-700">
                    5 products running low on inventory
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 text-sm">
                    System Update
                  </p>
                  <p className="text-xs text-green-700">
                    Platform updated successfully
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 text-sm">
                    Payment Issue
                  </p>
                  <p className="text-xs text-red-700">
                    3 failed payment attempts detected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
