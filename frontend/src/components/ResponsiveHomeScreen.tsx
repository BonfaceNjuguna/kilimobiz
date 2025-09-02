import { useState } from "react";
import { ResponsiveLayout, useScreenSize } from "./ResponsiveLayout";
import { ResponsiveSidebar } from "./ResponsiveSidebar";
import type { Screen } from "../types/marketplace";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Clock,
  Leaf,
  Filter,
  Grid,
  List,
  Heart,
  Share2,
  Plus,
  Bell,
  Menu,
  X,
  Shield,
  Store,
  ArrowRight
} from "lucide-react";
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from "../constants/marketplace";
import type { Product, User } from "../types/marketplace";


interface ResponsiveHomeScreenProps {
  user: User | null;
  cartItemCount: number;
  viewMode: 'customer' | 'farmer' | 'admin';
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
  onAddToCart: (product: Product) => void;
  onSwitchViewMode: (mode: 'customer' | 'farmer' | 'admin') => void;
}

export function ResponsiveHomeScreen({
  user,
  cartItemCount,
  viewMode,
  onNavigateToScreen,
  onAddToCart,
  onSwitchViewMode
}: ResponsiveHomeScreenProps) {
  const screenSize = useScreenSize();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.id === selectedCategory;
    return matchesSearch && matchesCategory && product.inStock;
  });

  const featuredProducts = MOCK_PRODUCTS.filter(product => product.rating >= 4.5).slice(0, 6);
  const trendingCategories = PRODUCT_CATEGORIES.slice(0, 4);

  const handleSidebarNavigation = (section: string) => {
    setShowMobileSidebar(false);
    switch (section) {
      case 'home':
        break; // Already on home
      case 'categories':
        onNavigateToScreen('categories');
        break;
      case 'cart':
        onNavigateToScreen('cart');
        break;
      case 'orders':
        onNavigateToScreen('orders');
        break;
      case 'profile':
        onNavigateToScreen('profile');
        break;
      case 'settings':
        onNavigateToScreen('profile');
        break;
      case 'customer-view':
        onSwitchViewMode('customer');
        break;
      case 'farmer-view':
        onSwitchViewMode('farmer');
        break;
      case 'admin-view':
        onSwitchViewMode('admin');
        break;
      default:
        break;
    }
  };

  const renderMobileHeader = () => (
    <div className="bg-white border-b border-border sticky top-0 z-20 lg:hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Replace Button for sidebar open */}
            <button
              type="button"
              onClick={() => setShowMobileSidebar(true)}
              className="w-10 h-10 p-0 lg:hidden rounded transition font-medium flex items-center justify-center bg-transparent hover:bg-gray-100 text-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg text-foreground">Kilimobiz</h1>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Replace Button for notifications */}
            <button
              type="button"
              className="w-10 h-10 p-0 rounded transition flex items-center justify-center bg-transparent hover:bg-gray-100 text-gray-700"
            >
              <Bell className="w-5 h-5" />
            </button>
            {/* Replace Button for cart */}
            <button
              type="button"
              onClick={() => onNavigateToScreen('cart')}
              className="w-10 h-10 p-0 relative rounded transition flex items-center justify-center bg-transparent hover:bg-gray-100 text-gray-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center bg-primary text-white rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          {/* Replace Input for search */}
          <input
            type="text"
            placeholder="Search fresh products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-muted border-0 rounded-lg w-full text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderDesktopHeader = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome back, {user?.name || 'Guest'}!
          </h1>
          <p className="text-muted-foreground">
            Discover fresh products from local farmers
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`w-10 h-10 p-0 rounded transition flex items-center justify-center ${viewType === 'grid' ? 'bg-primary text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setViewType('grid')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={`w-10 h-10 p-0 rounded transition flex items-center justify-center ${viewType === 'list' ? 'bg-primary text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setViewType('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-transparent border border-border text-foreground hover:bg-muted transition-all"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            {/* Replace Input for search */}
            <input
              type="text"
              placeholder="Search fresh products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-muted border-0 rounded-lg w-full text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-12 px-3 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderProductCard = (product: Product, isListView = false) => (
    <div
      key={product.id}
      className={`bg-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 group ${isListView ? 'w-full' : ''}`}
      onClick={() => onNavigateToScreen('product-details', product)}
    >
      <div className={`p-0 ${isListView ? 'flex' : ''}`}>
        <div className={`${isListView ? 'w-48 flex-shrink-0' : 'w-full h-48'} relative overflow-hidden ${isListView ? '' : 'rounded-t-lg'}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              type="button"
              className="w-8 h-8 p-0 rounded bg-white/80 hover:bg-white flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 p-0 rounded bg-white/80 hover:bg-white flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          {product.isOrganic && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              Organic
            </span>
          )}
        </div>
        <div className={`${isListView ? 'flex-1 p-4' : 'p-4'}`}>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{product.sellerLocation}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Same day delivery</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg text-primary">
                  KES {product.price}
                </p>
                <p className="text-sm text-muted-foreground">{product.unit}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sidebar = screenSize !== 'mobile' ? (
    <ResponsiveSidebar
      userRole={viewMode}
      userName={user?.name || 'Guest'}
      activeSection="home"
      onNavigate={handleSidebarNavigation}
      onLogout={() => onNavigateToScreen('login')}
      cartItemCount={cartItemCount}
      pendingOrdersCount={3}
      notificationsCount={2}
      actualUserRole={user?.role}
      viewMode={viewMode}
    />
  ) : null;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && screenSize === 'mobile' && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold">Menu</h2>
              <button
                type="button"
                onClick={() => setShowMobileSidebar(false)}
                className="w-8 h-8 p-0 rounded transition flex items-center justify-center bg-transparent hover:bg-gray-100 text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ResponsiveSidebar
              userRole={viewMode}
              userName={user?.name || 'Guest'}
              activeSection="home"
              onNavigate={handleSidebarNavigation}
              onLogout={() => onNavigateToScreen('login')}
              cartItemCount={cartItemCount}
              pendingOrdersCount={3}
              notificationsCount={2}
              actualUserRole={user?.role}
              viewMode={viewMode}
            />
          </div>
        </div>
      )}

      <ResponsiveLayout
        sidebar={sidebar}
        header={screenSize === 'mobile' ? renderMobileHeader() : renderDesktopHeader()}
        showSidebar={screenSize !== 'mobile'}
        className="space-y-8"
      >
        {/* View Mode Banner */}
        {user && (user.role === 'admin' || user.role === 'farmer') && viewMode === 'customer' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user.role === 'admin' ? (
                    <Shield className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Store className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium text-blue-900">
                      Viewing as Customer
                    </p>
                    <p className="text-sm text-blue-700">
                      You're browsing the marketplace as customers see it
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSwitchViewMode(user.role)}
                  className="px-3 py-2 text-sm rounded-lg border border-blue-300 text-blue-700 bg-transparent hover:bg-blue-100 transition-all flex items-center"
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  {user.role === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Categories - Desktop/Tablet Only */}
        {screenSize !== 'mobile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingCategories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    // Scroll to products section
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {MOCK_PRODUCTS.filter(p => p.category.id === category.id && p.inStock).length} products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products - Mobile Only */}
        {screenSize === 'mobile' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Featured Products</h2>
              <button
                type="button"
                className="text-sm text-primary font-medium"
              >
                View All
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  {renderProductCard(product)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid - Mobile Only */}
        {screenSize === 'mobile' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    // Scroll to products section  
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div id="products-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'all' ? 'All Products' : 
               PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Products'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">No products found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or browse different categories
              </p>
            </div>
          ) : (
            <div className={
              screenSize === 'mobile' 
                ? "space-y-4"
                : viewType === 'grid' 
                  ? "responsive-grid"
                  : "space-y-4"
            }>
              {filteredProducts.map((product) => 
                renderProductCard(product, screenSize !== 'mobile' && viewType === 'list')
              )}
            </div>
          )}
        </div>
      </ResponsiveLayout>
    </>
  );
}