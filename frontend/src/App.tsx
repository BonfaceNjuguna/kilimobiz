import { LoginScreen } from "./components/LoginScreen";
import { OTPScreen } from "./components/OTPScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ResponsiveHomeScreen } from "./components/ResponsiveHomeScreen";
import { ProductDetailsScreen } from "./components/ProductDetailsScreen";
import { ResponsiveProductDetails } from "./components/ResponsiveProductDetails";
import { CartScreen } from "./components/CartScreen";
import { CheckoutScreen } from "./components/CheckoutScreen";
import { OrderConfirmationScreen } from "./components/OrderConfirmationScreen";
import { CategoriesScreen } from "./components/CategoriesScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { OrdersScreen } from "./components/OrdersScreen";
import { OrderTrackingScreen } from "./components/OrderTrackingScreen";
import { FarmerDashboard } from "./components/FarmerDashboard";
import { ResponsiveFarmerDashboard } from "./components/ResponsiveFarmerDashboard";
import { FarmerAnalyticsScreen } from "./components/FarmerAnalyticsScreen";
import { FarmerEarningsScreen } from "./components/FarmerEarningsScreen";
import { AdminDashboard } from "./components/AdminDashboard";
import { ResponsiveAdminDashboard } from "./components/ResponsiveAdminDashboard";
import { useMarketplaceState } from "./hooks/useMarketplaceState";
import { useScreenSize } from "./components/ResponsiveLayout";
import { Toaster } from 'sonner';

export default function App() {
  const {
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
    handleSendOTP,
    handleOTPVerification,
    handleBackToLogin,
    handleNavigateToScreen,
    handleBackToHome,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    createOrder,
    logout,
    switchViewMode,
    notifications,
    orderTracking,
  } = useMarketplaceState();
  
  const screenSize = useScreenSize();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onSendOTP={handleSendOTP}
          />
        );
      
      case 'otp':
        return otpData ? (
          <OTPScreen 
            contact={otpData.contact}
            contactType={otpData.contactType}
            onVerify={handleOTPVerification}
            onBack={handleBackToLogin}
            onResend={() => handleSendOTP(otpData.contact, otpData.contactType)}
          />
        ) : null;
      
      case 'home':
        return screenSize === 'mobile' ? (
          <HomeScreen 
            user={user}
            cartItemCount={cartItemCount}
            viewMode={viewMode}
            onNavigateToScreen={handleNavigateToScreen}
            onAddToCart={addToCart}
            onSwitchViewMode={switchViewMode}
          />
        ) : (
          <ResponsiveHomeScreen 
            user={user}
            cartItemCount={cartItemCount}
            viewMode={viewMode}
            onNavigateToScreen={handleNavigateToScreen}
            onAddToCart={addToCart}
            onSwitchViewMode={switchViewMode}
          />
        );
      
      case 'product-details':
        return selectedProduct ? (
          screenSize === 'mobile' ? (
            <ProductDetailsScreen 
              product={selectedProduct}
              onBack={handleBackToHome}
              onAddToCart={addToCart}
            />
          ) : (
            <ResponsiveProductDetails 
              product={selectedProduct}
              onBack={handleBackToHome}
              onAddToCart={addToCart}
            />
          )
        ) : null;
      
      case 'cart':
        return (
          <CartScreen 
            cart={cart}
            onBack={handleBackToHome}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => handleNavigateToScreen('checkout')}
          />
        );
      
      case 'checkout':
        return (
          <CheckoutScreen 
            cart={cart}
            onBack={() => handleNavigateToScreen('cart')}
            onPlaceOrder={(address, paymentMethod) => {
              const order = createOrder(address, paymentMethod);
              handleNavigateToScreen('order-confirmation');
            }}
          />
        );
      
      case 'order-confirmation':
        const lastOrder = orders[orders.length - 1];
        return lastOrder ? (
          <OrderConfirmationScreen 
            orderNumber={lastOrder.id}
            estimatedDelivery={lastOrder.estimatedDelivery || new Date()}
            total={lastOrder.total}
            onContinueShopping={handleBackToHome}
            onViewOrders={() => handleNavigateToScreen('profile')}
          />
        ) : null;
      
      case 'categories':
        return (
          <CategoriesScreen 
            user={user}
            cartItemCount={cartItemCount}
            onBack={handleBackToHome}
            onNavigateToScreen={handleNavigateToScreen}
            onAddToCart={addToCart}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen 
            user={user}
            orders={orders}
            onBack={handleBackToHome}
            onNavigateToScreen={handleNavigateToScreen}
            onLogout={logout}
          />
        );
      
      case 'orders':
        return (
          <OrdersScreen 
            user={user}
            orders={orders}
            onBack={handleBackToHome}
            onNavigateToScreen={handleNavigateToScreen}
          />
        );
      
      case 'order-tracking':
        return selectedOrderId ? (
          <OrderTrackingScreen
            orderId={selectedOrderId}
            onBack={() => handleNavigateToScreen('orders')}
          />
        ) : null;
      
      case 'farmer-dashboard':
        return user?.role === 'farmer' || user?.role === 'admin' ? (
          screenSize === 'mobile' ? (
            <FarmerDashboard 
              farmerId={user.id}
              farmerName={user.name}
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
              onNavigateToScreen={handleNavigateToScreen}
            />
          ) : (
            <ResponsiveFarmerDashboard 
              farmerId={user.id}
              farmerName={user.name}
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
              onNavigateToScreen={handleNavigateToScreen}
              orderTracking={orderTracking}
              notifications={notifications}
            />
          )
        ) : screenSize === 'mobile' ? (
          <HomeScreen user={user} cartItemCount={cartItemCount} viewMode={viewMode} onNavigateToScreen={handleNavigateToScreen} onAddToCart={addToCart} onSwitchViewMode={switchViewMode} />
        ) : (
          <ResponsiveHomeScreen user={user} cartItemCount={cartItemCount} viewMode={viewMode} onNavigateToScreen={handleNavigateToScreen} onAddToCart={addToCart} onSwitchViewMode={switchViewMode} />
        );
      
      case 'farmer-analytics':
        return user?.role === 'farmer' || user?.role === 'admin' ? (
          <FarmerAnalyticsScreen 
            farmerId={user.id}
            farmerName={user.name}
            onBack={() => handleNavigateToScreen('farmer-dashboard')}
          />
        ) : null;
      
      case 'farmer-earnings':
        return user?.role === 'farmer' || user?.role === 'admin' ? (
          <FarmerEarningsScreen 
            farmerId={user.id}
            farmerName={user.name}
            onBack={() => handleNavigateToScreen('farmer-dashboard')}
          />
        ) : null;
      
      case 'admin-dashboard':
        return user?.role === 'admin' ? (
          screenSize === 'mobile' ? (
            <AdminDashboard 
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
            />
          ) : (
            <ResponsiveAdminDashboard 
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
            />
          )
        ) : screenSize === 'mobile' ? (
          <HomeScreen user={user} cartItemCount={cartItemCount} viewMode={viewMode} onNavigateToScreen={handleNavigateToScreen} onAddToCart={addToCart} onSwitchViewMode={switchViewMode} />
        ) : (
          <ResponsiveHomeScreen user={user} cartItemCount={cartItemCount} viewMode={viewMode} onNavigateToScreen={handleNavigateToScreen} onAddToCart={addToCart} onSwitchViewMode={switchViewMode} />
        );
      
      default:
        // Route users to their appropriate home screen based on role
        if (user?.role === 'admin') {
          return screenSize === 'mobile' ? (
            <AdminDashboard 
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
            />
          ) : (
            <ResponsiveAdminDashboard 
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
            />
          );
        } else if (user?.role === 'farmer') {
          return screenSize === 'mobile' ? (
            <FarmerDashboard 
              farmerId={user.id}
              farmerName={user.name}
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
              onNavigateToScreen={handleNavigateToScreen}
            />
          ) : (
            <ResponsiveFarmerDashboard 
              farmerId={user.id}
              farmerName={user.name}
              user={user}
              viewMode={viewMode}
              onBack={handleBackToHome}
              onSwitchViewMode={switchViewMode}
              onLogout={logout}
              onNavigateToScreen={handleNavigateToScreen}
              orderTracking={orderTracking}
              notifications={notifications}
            />
          );
        } else {
          return screenSize === 'mobile' ? (
            <HomeScreen 
              user={user}
              cartItemCount={cartItemCount}
              viewMode={viewMode}
              onNavigateToScreen={handleNavigateToScreen}
              onAddToCart={addToCart}
              onSwitchViewMode={switchViewMode}
            />
          ) : (
            <ResponsiveHomeScreen 
              user={user}
              cartItemCount={cartItemCount}
              viewMode={viewMode}
              onNavigateToScreen={handleNavigateToScreen}
              onAddToCart={addToCart}
              onSwitchViewMode={switchViewMode}
            />
          );
        }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          },
        }}
      />
    </div>
  );
}