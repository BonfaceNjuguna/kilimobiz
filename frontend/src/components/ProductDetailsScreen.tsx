import { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Shield, 
  Leaf,
  Plus,
  Minus,
  ShoppingCart,
  Heart
} from "lucide-react";
import type { Product } from "../types/marketplace";

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetailsScreen({ product, onBack, onAddToCart }: ProductDetailsScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const totalPrice = product.price * quantity;

  const getFreshnessBadge = () => {
    if (!product.harvestDate || !product.freshnessDays) return null;
    
    const daysSinceHarvest = Math.floor(
      (Date.now() - product.harvestDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceHarvest <= 1) {
      return (
        <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
          Fresh Today
        </span>
      );
    } else if (daysSinceHarvest <= product.freshnessDays) {
      return (
        <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">
          {product.freshnessDays - daysSinceHarvest} days fresh
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
        <div className="p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="font-semibold text-foreground">Product Details</h1>
          
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Product Image */}
        <div className="aspect-square bg-[#e5e7eb] relative rounded-2xl overflow-hidden shadow-md">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isOrganic && (
              <span className="inline-flex items-center px-2 py-1 rounded bg-green-600 text-white text-xs font-semibold">
                <Leaf className="w-3 h-3 mr-1" />
                Organic
              </span>
            )}
            {product.isFeatured && (
              <span className="inline-block px-2 py-1 rounded bg-primary text-white text-xs font-semibold">
                Featured
              </span>
            )}
            {getFreshnessBadge()}
          </div>

          {/* Stock Status */}
          <div className="absolute top-4 right-4">
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${product.inStock ? "bg-muted text-foreground" : "bg-red-100 text-red-800"}`}>
              {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-primary">
                  KES {product.price}
                </p>
                <span className="text-muted-foreground">
                  {product.unit}
                </span>
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.rating > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Seller Info */}
            <div className="p-4 bg-[#ffffff] rounded-2xl shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {product.sellerName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{product.sellerName}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {product.sellerLocation}
                  </div>
                </div>
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Product Details</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category.name}</span>
              </div>
              
              {product.harvestDate && (
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Harvest Date</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {product.harvestDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Organic</span>
                <span className="font-medium">
                  {product.isOrganic ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">
                  {product.stockQuantity} {product.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selector and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 p-0 rounded-md border-2 border-[#10b981] text-[#10b981] font-semibold hover:bg-[#10b981] hover:text-[#ffffff] transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockQuantity}
                    className="w-8 h-8 p-0 rounded-md border-2 border-[#10b981] text-[#10b981] font-semibold hover:bg-[#10b981] hover:text-[#ffffff] transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="text-xl font-bold text-primary">
                    KES {totalPrice}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-12 text-base font-bold bg-[#10b981] hover:bg-[#059669] text-[#ffffff] rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          )}

          {!product.inStock && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Out of Stock</h3>
              <p className="text-sm text-muted-foreground">
                This product is currently unavailable
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}