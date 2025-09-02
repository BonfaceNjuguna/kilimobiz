import { useState } from "react";
import type { Screen } from "../types/marketplace";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus,
  MapPin,
  Leaf,
  TrendingUp,
  Shield,
  Store,
  ArrowRight
} from "lucide-react";
import { PRODUCT_CATEGORIES, MOCK_PRODUCTS } from "../constants/marketplace";
import type { Product, User } from "../types/marketplace";

interface HomeScreenProps {
  user: User | null;
  cartItemCount: number;
  viewMode?: 'customer' | 'farmer' | 'admin';
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
  onAddToCart: (product: Product) => void;
  onSwitchViewMode?: (mode: 'customer' | 'farmer' | 'admin') => void;
}

export function HomeScreen({ user, cartItemCount, viewMode = 'customer', onNavigateToScreen, onAddToCart, onSwitchViewMode }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = MOCK_PRODUCTS.filter(product => product.isFeatured);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Kilimobiz</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {user?.location || 'Select location'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => onNavigateToScreen('cart')}
                className="relative w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-primary text-white rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => onNavigateToScreen('profile')}
                className="w-10 h-10 p-0 rounded-full bg-muted flex items-center justify-center"
              >
                {user?.name?.[0] || 'U'}
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agriproducts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 w-full rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* View Mode Banner */}
        {user && (user.role === 'admin' || user.role === 'farmer') && viewMode === 'customer' && onSwitchViewMode && (
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
                className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded flex items-center"
              >
                <ArrowRight className="w-3 h-3 mr-1" />
                {user.role === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}
              </button>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Categories</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                !selectedCategory
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <span>All</span>
            </button>
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        {featuredProducts.length > 0 && !selectedCategory && (
          <div className="bg-gradient-to-r from-green-light to-beige border-0 rounded-lg mb-4">
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-dark" />
                  <span className="text-sm font-medium text-green-dark">Featured</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Fresh Farm Products
                </h3>
                <p className="text-sm text-muted-foreground">
                  Handpicked quality products from verified farmers
                </p>
              </div>
              <div className="text-4xl">🌱</div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {selectedCategory 
                ? PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.name 
                : 'All Products'
              }
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigateToScreen('product-details', product)}
              >
                <div className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isOrganic && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-3 space-y-2">
                    <div>
                      <h3 className="font-medium text-sm text-foreground line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{product.sellerLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">
                          KES {product.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.unit}
                        </p>
                      </div>
                      
                      {product.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full h-8 text-xs bg-primary hover:bg-primary/90 text-white rounded flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">No products found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="grid grid-cols-5 p-2">
          <button
            type="button"
            className="flex flex-col items-center justify-center h-12 p-1 text-primary hover:bg-muted transition"
          >
            <span className="w-5 h-5 mb-1 text-xl">🏠</span>
            <span className="text-xs">Home</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToScreen('categories')}
            className="flex flex-col items-center justify-center h-12 p-1 hover:bg-muted transition"
          >
            <span className="w-5 h-5 mb-1 text-xl">📂</span>
            <span className="text-xs">Categories</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToScreen('cart')}
            className="flex flex-col items-center justify-center h-12 p-1 relative hover:bg-muted transition"
          >
            <span className="w-5 h-5 mb-1 relative text-xl">
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs p-0 flex items-center justify-center bg-primary text-white rounded-full">
                  {cartItemCount}
                </span>
              )}
            </span>
            <span className="text-xs">Cart</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToScreen('orders')}
            className="flex flex-col items-center justify-center h-12 p-1 hover:bg-muted transition"
          >
            <span className="w-5 h-5 mb-1 text-xl">📦</span>
            <span className="text-xs">Orders</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToScreen('profile')}
            className="flex flex-col items-center justify-center h-12 p-1 hover:bg-muted transition"
          >
            <span className="w-5 h-5 mb-1 text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}