import { useResponsiveLayout } from './ResponsiveLayout';
import { NotificationCenter } from "./NotificationCenter";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Grid3X3,
  UserPlus,
  FileText,
  LogOut,
  Store,
  User,
  ListOrdered,
  TrendingUp,
  DollarSign,
  Leaf,
  Shield
} from "lucide-react";

interface ResponsiveSidebarProps {
  userRole: 'customer' | 'farmer' | 'admin';
  userName: string;
  activeSection?: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
  cartItemCount?: number;
  pendingOrdersCount?: number;
  notificationsCount?: number;
  actualUserRole?: 'customer' | 'farmer' | 'admin';
  viewMode?: 'customer' | 'farmer' | 'admin';
  userId?: number;
}

export function ResponsiveSidebar({
  userRole,
  userName,
  activeSection,
  onNavigate,
  onLogout,
  cartItemCount = 0,
  pendingOrdersCount = 0,
  actualUserRole,
  viewMode,
  userId
}: ResponsiveSidebarProps) {
  const { sidebarCollapsed } = useResponsiveLayout();
  const customerNavItems = [
    { id: 'home', label: 'Browse Products', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'cart', label: 'Shopping Cart', icon: ShoppingCart, badge: cartItemCount },
    { id: 'orders', label: 'My Orders', icon: ListOrdered },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const farmerNavItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: pendingOrdersCount },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'product-review', label: 'Product Review', icon: Package },
    { id: 'farmer-approval', label: 'Farmer Approval', icon: UserPlus },
    { id: 'category-management', label: 'Categories', icon: Grid3X3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case 'farmer':
        return farmerNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return customerNavItems;
    }
  };

  const navItems = getNavItems();

  const renderNavButton = (item: { id: string; label: string; icon: React.ElementType; badge?: number }) => {
    const button = (
      <button
        key={item.id}
        type="button"
        className={`w-full px-3 py-2 text-left transition-all duration-200 flex items-center gap-3 rounded-lg text-sm ${
          activeSection === item.id 
            ? "bg-[#10b981] text-[#ffffff] shadow-sm" 
            : "bg-transparent text-[#1f2937] hover:bg-[#f3f4f6]"
        }`}
        onClick={() => onNavigate(item.id)}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!sidebarCollapsed && (
          <>
            <span className="flex-1 truncate font-medium">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="bg-[#ef4444] text-[#ffffff] text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                {item.badge}
              </span>
            )}
          </>
        )}
      </button>
    );

    if (sidebarCollapsed) {
      return (
        <div key={item.id} className="relative group">
          <button
            type="button"
            className={`w-full h-10 flex items-center justify-center transition-all duration-200 rounded-lg ${
              activeSection === item.id 
                ? "bg-[#10b981] text-[#ffffff] shadow-sm" 
                : "bg-transparent text-[#1f2937] hover:bg-[#f3f4f6]"
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {item.badge && item.badge > 0 && (
              <span className="absolute top-1 right-1 bg-[#ef4444] text-[#ffffff] text-xs px-1.5 py-0.5 rounded-full font-bold min-w-5 text-center">
                {item.badge}
              </span>
            )}
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block bg-[#ffffff] rounded-lg px-3 py-2 text-xs shadow-md z-50 whitespace-nowrap">
            <p className="font-medium text-[#1f2937]">{item.label}</p>
          </div>
        </div>
      );
    }

    return button;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo and Brand */}
      {!sidebarCollapsed && (
        <div className="px-4 py-5 bg-[#ffffff]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-[#ffffff]" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base text-[#1f2937]">Kilimobiz</h1>
              <p className="text-xs text-[#6b7280] capitalize">{userRole} Portal</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Logo */}
      {sidebarCollapsed && (
        <div className="px-4 py-5 flex justify-center bg-[#ffffff]">
          <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-[#ffffff]" />
          </div>
        </div>
      )}

      {/* User Info */}
      {!sidebarCollapsed && (
        <div className="px-4 py-4 bg-[#ffffff] border-b border-[#e5e7eb]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#f0fdf4] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-[#10b981] text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1f2937] truncate text-sm">{userName}</p>
              <p className="text-xs text-[#6b7280] capitalize">{userRole}</p>
            </div>
            <NotificationCenter 
              userId={userId}
              userRole={actualUserRole || userRole}
            />
          </div>
        </div>
      )}

      {/* Collapsed User Avatar */}
      {sidebarCollapsed && (
        <div className="px-4 py-4 flex flex-col items-center space-y-2 bg-[#ffffff] border-b border-[#e5e7eb]">
          <div className="relative group">
            <div className="w-8 h-8 bg-[#f0fdf4] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-[#10b981] text-xs">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-[#ffffff] rounded-lg px-2 py-1 text-xs shadow-lg z-50">
              <p className="font-medium text-[#1f2937]">{userName}</p>
              <p className="text-xs text-[#6b7280] capitalize">{userRole}</p>
            </div>
          </div>
          <NotificationCenter 
            userId={userId}
            userRole={actualUserRole || userRole}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => renderNavButton(item))}
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="my-4 border-t border-[#e5e7eb]"></div>

            {/* Quick Stats for Farmers/Admins */}
            {(userRole === 'farmer' || userRole === 'admin') && (
              <div className="space-y-3 mb-6 px-1">
                <h4 className="font-semibold text-xs text-[#6b7280] uppercase tracking-wide">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  {userRole === 'farmer' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">Active Products</span>
                        <span className="font-bold text-[#1f2937]">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">This Month</span>
                        <span className="font-bold text-[#10b981]">KES 45K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">Pending Orders</span>
                        <span className="font-bold text-[#f59e0b]">{pendingOrdersCount}</span>
                      </div>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">Total Users</span>
                        <span className="font-bold text-[#1f2937]">1,234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">Active Farmers</span>
                        <span className="font-bold text-[#10b981]">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b7280]">Pending Reviews</span>
                        <span className="font-bold text-[#f59e0b]">15</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="my-4 border-t border-[#e5e7eb]"></div>

            {/* Role Switch - Show when user can switch views */}
            {((actualUserRole === 'admin' || actualUserRole === 'farmer') || (userRole === 'admin' || userRole === 'farmer')) && (
              <div className="space-y-2 mb-6 px-1">
                <h4 className="font-semibold text-xs text-[#6b7280] uppercase tracking-wide">Switch View</h4>
                
                {/* If currently in customer view but user is admin/farmer, show switch back */}
                {(actualUserRole === 'admin' || actualUserRole === 'farmer') && viewMode === 'customer' && (
                  <button
                    type="button"
                    className="w-full justify-start px-3 py-2 rounded-lg bg-[#f3f4f6] text-[#1f2937] hover:bg-[#e5e7eb] transition flex items-center gap-3 text-sm font-medium shadow-sm"
                    onClick={() => onNavigate(actualUserRole === 'admin' ? 'admin-view' : 'farmer-view')}
                  >
                    {actualUserRole === 'admin' ? (
                      <>
                        <Shield className="w-4 h-4 flex-shrink-0" />
                        Admin Panel
                      </>
                    ) : (
                      <>
                        <Store className="w-4 h-4 flex-shrink-0" />
                        Seller Dashboard
                      </>
                    )}
                  </button>
                )}

                {/* If in admin/farmer view, show customer view option */}
                {(userRole === 'admin' || userRole === 'farmer') && viewMode !== 'customer' && (
                  <button
                    type="button"
                    className="w-full justify-start px-3 py-2 rounded-lg bg-[#f3f4f6] text-[#1f2937] hover:bg-[#e5e7eb] transition flex items-center gap-3 text-sm font-medium shadow-sm"
                    onClick={() => onNavigate('customer-view')}
                  >
                    <Home className="w-4 h-4 flex-shrink-0" />
                    Shop as Customer
                  </button>
                )}

                {/* Admin can also view as farmer */}
                {(actualUserRole === 'admin' || userRole === 'admin') && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    className="w-full justify-start px-3 py-2 rounded-lg bg-[#f3f4f6] text-[#1f2937] hover:bg-[#e5e7eb] transition flex items-center gap-3 text-sm font-medium shadow-sm"
                    onClick={() => onNavigate('farmer-view')}
                  >
                    <Package className="w-4 h-4 flex-shrink-0" />
                    View as Farmer
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-4 bg-[#ffffff] border-t border-[#e5e7eb]">
        <div className="space-y-1">
          {sidebarCollapsed ? (
            <div className="flex flex-col space-y-1">
              {/* Settings Button with tooltip */}
              <div className="relative group">
                <button
                  type="button"
                  className="w-full justify-center h-10 px-0 rounded-lg bg-transparent text-[#1f2937] hover:bg-[#f3f4f6] transition flex items-center"
                  onClick={() => onNavigate('settings')}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block bg-[#ffffff] rounded-lg px-3 py-2 text-xs shadow-md z-50 whitespace-nowrap">
                  <p className="font-medium text-[#1f2937]">Settings</p>
                </div>
              </div>
              {/* Logout Button with tooltip */}
              <div className="relative group">
                <button
                  type="button"
                  className="w-full justify-center h-10 px-0 rounded-lg bg-transparent text-[#6b7280] hover:text-[#ef4444] hover:bg-[#fef2f2] transition flex items-center"
                  onClick={onLogout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block bg-[#ffffff] rounded-lg px-3 py-2 text-xs shadow-md z-50 whitespace-nowrap">
                  <p className="font-medium text-[#ef4444]">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="w-full justify-start px-3 py-2 rounded-lg bg-transparent text-[#1f2937] hover:bg-[#f3f4f6] transition flex items-center gap-3 text-sm font-medium"
                onClick={() => onNavigate('settings')}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                Settings
              </button>
              <button
                type="button"
                className="w-full justify-start px-3 py-2 rounded-lg bg-transparent text-[#ef4444] hover:bg-[#fef2f2] transition flex items-center gap-3 text-sm font-medium"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}