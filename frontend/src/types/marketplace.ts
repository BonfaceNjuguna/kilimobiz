export interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  role: 'customer' | 'farmer' | 'admin';
  location?: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // kg, pieces, liters, etc.
  category: ProductCategory;
  images: string[];
  sellerId: number;
  sellerName: string;
  sellerLocation: string;
  inStock: boolean;
  stockQuantity: number;
  harvestDate?: Date;
  freshnessDays?: number;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  deliveryTime?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  paymentMethod: 'mpesa' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface Address {
  street: string;
  city: string;
  county: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Product[];
  salesByCategory: {
    category: string;
    sales: number;
  }[];
  salesOverTime: {
    date: string;
    sales: number;
  }[];
}

export type Screen = 
  | 'login' 
  | 'otp' 
  | 'home' 
  | 'categories'
  | 'product-details' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation'
  | 'farmer-dashboard' 
  | 'admin-dashboard'
  | 'farmer-analytics'
  | 'farmer-earnings'
  | 'farmer-products'
  | 'profile'
  | 'orders'
  | 'order-tracking'
  | 'favorites'
  | 'addresses'
  | 'payment-methods'
  | 'privacy'
  | 'settings';