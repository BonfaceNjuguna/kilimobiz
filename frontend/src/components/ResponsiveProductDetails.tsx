import { useState } from "react";
import { ResponsiveLayout, useScreenSize } from "./ResponsiveLayout";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Truck,
  Heart,
  Share2,
  Plus,
  Minus,
  MessageCircle,
  Phone,
  Store,
  Leaf,
  Award,
  Users,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";

import type { Product } from "../types/marketplace";

interface ResponsiveProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export function ResponsiveProductDetails({ 
  product, 
  onBack, 
  onAddToCart 
}: ResponsiveProductDetailsProps) {
  const screenSize = useScreenSize();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const renderMobileLayout = () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <button type="button" className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
              <button type="button" className="w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {product.images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 rounded-full flex items-center justify-center"
              onClick={() => setSelectedImageIndex(prev => 
                prev === 0 ? product.images.length - 1 : prev - 1
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 rounded-full flex items-center justify-center"
              onClick={() => setSelectedImageIndex(prev => 
                prev === product.images.length - 1 ? 0 : prev + 1
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {product.isOrganic && (
          <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded flex items-center text-xs font-semibold">
            <Leaf className="w-3 h-3 mr-1" />
            Organic
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{product.sellerLocation}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-2xl font-semibold text-primary">
              KES {product.price}
            </p>
            <p className="text-sm text-muted-foreground">{product.unit}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 p-0 rounded border flex items-center justify-center hover:bg-muted transition"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-medium text-lg w-8 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 p-0 rounded border flex items-center justify-center hover:bg-muted transition"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Delivery</p>
              <p className="text-xs text-muted-foreground">{product.deliveryTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-sm">Fresh Guarantee</p>
              <p className="text-xs text-muted-foreground">Quality assured</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{product.sellerName}</h3>
              <p className="text-sm text-muted-foreground">{product.sellerLocation}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{product.rating}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">5+ products</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button type="button" className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition">
                <MessageCircle className="w-3 h-3 mr-1" />
                Chat
              </button>
              <button type="button" className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition">
                <Phone className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border">
        <button
          type="button"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded font-medium text-lg flex items-center justify-center"
          onClick={handleAddToCart}
        >
          Add {quantity} to Cart - KES {(product.price * quantity).toLocaleString()}
        </button>
      </div>

      {/* Bottom padding for fixed button */}
      <div className="h-20" />
    </div>
  );

  const renderDesktopLayout = () => (
    <ResponsiveLayout className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 rounded px-3 py-2 hover:bg-muted transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
        <div className="flex items-center space-x-2">
          <button type="button" className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition">
            <Heart className="w-4 h-4 mr-2" />
            Save
          </button>
          <button type="button" className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      <div className="desktop-split">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    index === selectedImageIndex 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{product.sellerLocation}</span>
                  </div>
                </div>
              </div>
              {product.isOrganic && (
                <span className="bg-green-600 text-white px-2 py-1 rounded flex items-center text-xs font-semibold">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic Certified
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Price and Quantity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-3xl font-semibold text-primary">
                  KES {product.price}
                </p>
                <p className="text-muted-foreground">{product.unit}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-xl w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border rounded px-3 py-1 text-sm flex items-center hover:bg-muted transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              type="button"
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white rounded font-medium flex items-center justify-center"
              onClick={handleAddToCart}
            >
              Add to Cart - KES {(product.price * quantity).toLocaleString()}
            </button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Fast Delivery</p>
                <p className="text-sm text-muted-foreground">{product.deliveryTime}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium">Fresh Guarantee</p>
                <p className="text-sm text-muted-foreground">Quality assured</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-muted-foreground">Orders over KES 500</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <Award className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-medium">Premium Quality</p>
                <p className="text-sm text-muted-foreground">Farm fresh</p>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.sellerName}</h3>
                <p className="text-muted-foreground">{product.sellerLocation}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">5+ products</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button type="button" className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Farmer
                </button>
                <button type="button" className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-muted transition">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </button>
              </div>
            </div>
            <div className="my-4 border-border" />
            <div className="text-sm text-muted-foreground">
              <p>
                {product.sellerName} has been farming for over 10 years, specializing in organic produce. 
                All products are grown using sustainable farming practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((review) => (
            <div key={review} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">John Doe</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Excellent quality tomatoes! Fresh and delivered on time. Will definitely order again."
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );

  return screenSize === 'mobile' ? renderMobileLayout() : renderDesktopLayout();
}