import { useState } from "react";
import type { Screen, User } from "../types/marketplace";
import { useScreenSize } from "./ResponsiveLayout";
import { 
  ArrowLeft, 
  Search, 
  ShoppingCart,
  MapPin,
  Star,
  Plus
} from "lucide-react";
import { PRODUCT_CATEGORIES, MOCK_PRODUCTS } from "../constants/marketplace";
import type { Product, ProductCategory } from "../types/marketplace";

interface CategoriesScreenProps {
  user: User | null;
  cartItemCount: number;
  onBack: () => void;
  onNavigateToScreen: (screen: Screen, product?: Product, orderId?: string) => void;
  onAddToCart: (product: Product) => void;
}

export function CategoriesScreen({ 
  cartItemCount, 
  onBack, 
  onNavigateToScreen, 
  onAddToCart 
}: CategoriesScreenProps) {  const screenSize = useScreenSize();  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.id === selectedCategory.id;
    return matchesSearch && matchesCategory;
  });

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {screenSize === 'mobile' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h1 className="text-lg font-semibold text-[#1f2937]">
                    {selectedCategory.name}
                  </h1>
                  <p className="text-sm text-[#6b7280]">
                    Fresh {selectedCategory.name.toLowerCase()} from local farmers
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToScreen('cart')}
                className="relative w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-[#10b981] text-white rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${selectedCategory.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 w-full bg-[#f3f4f6] border-0 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Category Stats */}
          <div className="mb-4 bg-white rounded-lg shadow">
            <div className="p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{selectedCategory.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{selectedCategory.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products available
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${selectedCategory.color}`}>
                Fresh
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow bg-white rounded-lg"
                onClick={() => onNavigateToScreen('product-details', product)}
              >
                <div className="aspect-square bg-muted rounded-t-lg relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isOrganic && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
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
                    className="w-full h-8 text-xs bg-primary hover:bg-primary/90 text-white rounded flex items-center justify-center mt-2"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{selectedCategory.icon}</span>
              </div>
              <h3 className="font-medium text-foreground mb-2">No {selectedCategory.name.toLowerCase()} found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or check back later
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {screenSize === 'mobile' && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-[#1f2937]">Categories</h1>
              <p className="text-sm text-[#6b7280]">
                Browse by product type
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToScreen('cart')}
            className="relative w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-[#10b981] text-white rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PRODUCT_CATEGORIES.map((category) => {
            const categoryProducts = MOCK_PRODUCTS.filter(p => p.category.id === category.id);
            const inStockCount = categoryProducts.filter(p => p.inStock).length;
            
            return (
              <div 
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white rounded-lg"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {inStockCount} products
                    </p>
                  </div>

                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${category.color}`}>
                    Available
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Popular Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Popular This Week</h2>
          <div className="space-y-2">
            {PRODUCT_CATEGORIES.slice(0, 3).map((category) => {
              const categoryProducts = MOCK_PRODUCTS.filter(p => p.category.id === category.id);
              const totalSales = categoryProducts.length * 50; // Mock sales data
              
              return (
                <div 
                  key={category.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-white rounded-lg"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {totalSales}+ orders this week
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                      Trending
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}