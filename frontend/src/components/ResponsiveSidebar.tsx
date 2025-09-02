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
        className={`w-full h-12 text-left transition-all duration-200 flex items-center ${
          sidebarCollapsed ? "justify-center px-0" : "justify-start"
        } ${activeSection === item.id ? "bg-primary text-white" : "bg-transparent hover:bg-muted text-foreground"}`}
        onClick={() => onNavigate(item.id)}
      >
        <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
        {!sidebarCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded font-semibold">
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
            className={`w-full h-12 flex items-center justify-center transition-all duration-200 ${
              activeSection === item.id ? "bg-primary text-white" : "bg-transparent hover:bg-muted text-foreground"
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="w-5 h-5" />
            {item.badge && item.badge > 0 && (
              <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded font-semibold">
                {item.badge}
              </span>
            )}
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-card border border-border rounded px-2 py-1 text-xs shadow">
            <p>{item.label}</p>
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
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">Kilimobiz</h1>
              <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Logo */}
      {sidebarCollapsed && (
        <div className="p-4 border-b border-border flex justify-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* User Info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-medium text-primary">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{userName}</p>
              <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
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
        <div className="p-4 border-b border-border flex flex-col items-center space-y-2">
          <div className="relative group">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-medium text-primary text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-card border border-border rounded px-2 py-1 text-xs shadow z-50">
              <p>{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <NotificationCenter 
            userId={userId}
            userRole={actualUserRole || userRole}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => renderNavButton(item))}
        </div>

        {!sidebarCollapsed && (
          <>
            <hr className="my-6 border-border" />

            {/* Quick Stats for Farmers/Admins */}
            {(userRole === 'farmer' || userRole === 'admin') && (
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-sm text-muted-foreground">Quick Stats</h4>
                <div className="space-y-3">
                  {userRole === 'farmer' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active Products</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">This Month</span>
                        <span className="font-medium text-primary">KES 45K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pending Orders</span>
                        <span className="font-medium text-yellow-600">{pendingOrdersCount}</span>
                      </div>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Users</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active Farmers</span>
                        <span className="font-medium text-green-600">89</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pending Reviews</span>
                        <span className="font-medium text-yellow-600">15</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Role Switch - Show when user can switch views */}
            {((actualUserRole === 'admin' || actualUserRole === 'farmer') || (userRole === 'admin' || userRole === 'farmer')) && (
              <div className="space-y-2 mb-6">
                <h4 className="font-medium text-sm text-muted-foreground">Switch View</h4>
                
                {/* If currently in customer view but user is admin/farmer, show switch back */}
                {(actualUserRole === 'admin' || actualUserRole === 'farmer') && viewMode === 'customer' && (
                  <button
                    type="button"
                    className="w-full justify-start h-10 border border-border rounded bg-transparent text-foreground hover:bg-muted transition flex items-center text-sm"
                    onClick={() => onNavigate(actualUserRole === 'admin' ? 'admin-view' : 'farmer-view')}
                  >
                    {actualUserRole === 'admin' ? (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Back to Admin Panel
                      </>
                    ) : (
                      <>
                        <Store className="w-4 h-4 mr-2" />
                        Back to Seller Dashboard
                      </>
                    )}
                  </button>
                )}

                {/* If in admin/farmer view, show customer view option */}
                {(userRole === 'admin' || userRole === 'farmer') && viewMode !== 'customer' && (
                  <button
                    type="button"
                    className="w-full justify-start h-10 border border-border rounded bg-transparent text-foreground hover:bg-muted transition flex items-center text-sm"
                    onClick={() => onNavigate('customer-view')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Shop as Customer
                  </button>
                )}

                {/* Admin can also view as farmer */}
                {(actualUserRole === 'admin' || userRole === 'admin') && viewMode !== 'farmer' && (
                  <button
                    type="button"
                    className="w-full justify-start h-10 border border-border rounded bg-transparent text-foreground hover:bg-muted transition flex items-center text-sm"
                    onClick={() => onNavigate('farmer-view')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    View as Farmer
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          {sidebarCollapsed ? (
            <div className="flex flex-col space-y-2">
              {/* Settings Button with tooltip */}
              <div className="relative group">
                <button
                  type="button"
                  className="w-full justify-center h-10 px-0 rounded bg-transparent text-foreground hover:bg-muted transition flex items-center"
                  onClick={() => onNavigate('settings')}
                >
                  <Settings className="w-4 h-4" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-card border border-border rounded px-2 py-1 text-xs shadow z-50">
                  <p>Settings</p>
                </div>
              </div>
              {/* Logout Button with tooltip */}
              <div className="relative group">
                <button
                  type="button"
                  className="w-full justify-center h-10 px-0 rounded bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50 transition flex items-center"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-card border border-border rounded px-2 py-1 text-xs shadow z-50">
                  <p>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="w-full justify-start h-10 rounded bg-transparent text-foreground hover:bg-muted transition flex items-center"
                onClick={() => onNavigate('settings')}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
              <button
                type="button"
                className="w-full justify-start h-10 rounded bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50 transition flex items-center"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}