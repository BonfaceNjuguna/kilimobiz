import { useState } from 'react';
import { toast } from 'sonner';
import type { User, Product, CartItem, Order, Screen, Address } from '../types/marketplace';
import { useNotifications } from './useNotifications';
import { useOrderTracking } from './useOrderTracking';

export function useMarketplaceState() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    // Mock initial orders for demonstration
    {
      id: 'ORD-12345',
      customerId: '1',
      customerName: 'John Doe',
      items: [{
        productId: 'p1',
        product: {
          id: 'p1',
          name: 'Free Range Chicken',
          description: 'Fresh chicken from local farm',
          price: 1600,
          unit: 'kg',
          category: { id: 'meat', name: 'Meat & Poultry', icon: '🍗', color: 'red' },
          images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300'],
          sellerId: 123,
          sellerName: 'Grace Wanjiku',
          sellerLocation: 'Kiambu',
          inStock: true,
          stockQuantity: 50,
          rating: 4.8,
          reviewCount: 23,
          isOrganic: true,
          isFeatured: true,
          createdAt: new Date()
        },
        quantity: 1,
        totalPrice: 1600
      }],
      subtotal: 1600,
      deliveryFee: 150,
      total: 1750,
      status: 'shipped',
      deliveryAddress: {
        street: '123 Kimathi Street',
        city: 'Nairobi',
        county: 'Nairobi',
        postalCode: '00100'
      },
      paymentMethod: 'mpesa',
      paymentStatus: 'paid',
      orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      estimatedDelivery: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      trackingNumber: 'KM-123456'
    }
  ]);
  const [otpData, setOtpData] = useState<{ contact: string; contactType: 'phone' | 'email' } | null>(null);
  const [viewMode, setViewMode] = useState<'customer' | 'farmer' | 'admin'>('customer'); // For role switching
  const [subScreen, setSubScreen] = useState<string | null>(null); // For maintaining sub-screen state across device changes
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // For order tracking
  
  // Initialize notifications and order tracking
  const notifications = useNotifications(user?.id, user?.role);
  const orderTracking = useOrderTracking();

  // Mock authentication
  const handleSendOTP = (contact: string, contactType: 'phone' | 'email') => {
    setOtpData({ contact, contactType });
    setCurrentScreen('otp');
  };

  const handleOTPVerification = (code: string) => {
    // Mock OTP verification - different codes for different roles
    let role: 'customer' | 'farmer' | 'admin' = 'customer';
    
    if (code === '1234') {
      role = 'customer';
    } else if (code === '5678') {
      role = 'farmer';
    } else if (code === '9999') {
      role = 'admin';
    } else {
      toast.error('Invalid OTP code');
      return;
    }

    setUser({
      id: role === 'customer' ? 1 : role === 'farmer' ? 2 : 3,
      name: role === 'customer' ? 'John Doe' : role === 'farmer' ? 'Grace Wanjiku' : 'Admin User',
      email: otpData?.contactType === 'email' ? otpData.contact : undefined,
      phone: otpData?.contactType === 'phone' ? otpData.contact : undefined,
      role,
      location: 'Nairobi',
      isVerified: true,
      createdAt: new Date(),
    });
    
    // Set view mode to match user role
    setViewMode(role);
    
    // Navigate based on role
    if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else if (role === 'farmer') {
      setCurrentScreen('farmer-dashboard');
    } else {
      setCurrentScreen('home');
    }
    
    setOtpData(null);
    
    toast.success(`Welcome ${role === 'customer' ? 'John' : role === 'farmer' ? 'Grace' : 'Admin'}!`, {
      description: `Logged in as ${role}`
    });
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setOtpData(null);
  };

  const handleNavigateToScreen = (screen: Screen, product?: Product, orderId?: string) => {
    if (product) {
      setSelectedProduct(product);
    }
    if (orderId) {
      setSelectedOrderId(orderId);
    }
    setCurrentScreen(screen);
    // Store sub-screen state for analytics and earnings
    if (screen === 'farmer-analytics' || screen === 'farmer-earnings') {
      setSubScreen(screen);
    } else {
      setSubScreen(null);
    }
  };

  const handleBackToHome = () => {
    // Navigate to appropriate home screen based on user role
    if (user?.role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else if (user?.role === 'farmer') {
      setCurrentScreen('farmer-dashboard');
    } else {
      setCurrentScreen('home');
    }
    setSelectedProduct(null);
  };

  // Cart management
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Show update notification
        toast.success(`Updated ${product.name} quantity`, {
          description: `Now ${existingItem.quantity + quantity} in cart`,
          action: {
            label: "View Cart",
            onClick: () => setCurrentScreen('cart')
          }
        });
        
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * product.price }
            : item
        );
      } else {
        // Show add notification
        toast.success(`Added ${product.name} to cart`, {
          description: `${quantity} × KES ${product.price}`,
          action: {
            label: "View Cart",
            onClick: () => setCurrentScreen('cart')
          }
        });
        
        return [...prevCart, {
          productId: product.id,
          product,
          quantity,
          totalPrice: quantity * product.price
        }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity, totalPrice: quantity * item.product.price }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order management
  const createOrder = (deliveryAddress: Address, paymentMethod: string) => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = 150; // Mock delivery fee
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      customerId: user?.id ? String(user.id) : '',
      customerName: user?.name || '',
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
      deliveryAddress,
      paymentMethod: paymentMethod as 'mpesa' | 'card',
      paymentStatus: 'pending',
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
    setCurrentScreen('order-confirmation');
    
    // Send notification to farmer(s) about new order
    if (cart.length > 0) {
      const farmerIds = [...new Set(cart.map(item => item.product.sellerId))];
      farmerIds.forEach(farmerId => {
        // In a real app, you'd send notifications to specific farmers
        if (user?.role === 'farmer' || user?.role === 'admin') {
          notifications.addNotification(
            'order_placed',
            'New Order Received!',
            `New order ${newOrder.id} from ${user?.name || 'Customer'} - KES ${total.toLocaleString()}`,
            { orderId: newOrder.id, farmerId }
          );
        }
      });
    }
    
    // Send confirmation notification to customer
    notifications.addNotification(
      'order_placed',
      'Order Placed Successfully!',
      `Your order ${newOrder.id} has been placed and is waiting for farmer confirmation`,
      { orderId: newOrder.id }
    );
    
    return newOrder;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setCurrentScreen('login');
    setViewMode('customer');
  };

  // Role switching functionality
  const switchViewMode = (mode: 'customer' | 'farmer' | 'admin') => {
    setViewMode(mode);
    
    // Navigate to appropriate screen based on mode
    if (mode === 'customer') {
      setCurrentScreen('home');
    } else if (mode === 'farmer') {
      setCurrentScreen('farmer-dashboard');
    } else if (mode === 'admin') {
      setCurrentScreen('admin-dashboard');
    }
  };

  // Calculate cart totals
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    // State
    currentScreen,
    user,
    selectedProduct,
    cart,
    orders,
    otpData,
    cartItemCount,
    cartTotal,
    viewMode,
    subScreen,
    selectedOrderId,
    
    // Navigation
    handleSendOTP,
    handleOTPVerification,
    handleBackToLogin,
    handleNavigateToScreen,
    handleBackToHome,
    
    // Cart actions
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    
    // Order actions
    createOrder,
    
    // Auth actions
    logout,
    switchViewMode,
    
    // Notifications and tracking
    notifications,
    orderTracking,
  };
}