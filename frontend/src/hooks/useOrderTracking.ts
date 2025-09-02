import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: Date;
  message: string;
  location?: string;
}

export interface TrackedOrder {
  id: string;
  customerId: string;
  customerName: string;
  farmerId: string;
  farmerName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  currentStatus: OrderStatus['status'];
  statusHistory: OrderStatus[];
  estimatedDelivery: Date;
  trackingNumber: string;
  deliveryAddress: {
    street: string;
    city: string;
    county: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  specialInstructions?: string;
  createdAt: Date;
}

export function useOrderTracking() {
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  
  // Initialize with some mock orders
  useEffect(() => {
    const mockOrders: TrackedOrder[] = [
      {
        id: 'ORD-001',
        customerId: '1',
        customerName: 'John Doe',
        farmerId: 'farmer1',
        farmerName: 'Grace Wanjiku',
        items: [
          { productId: 'p1', productName: 'Free Range Chicken', quantity: 1, price: 1600 },
          { productId: 'p2', productName: 'Farm Fresh Eggs', quantity: 2, price: 350 }
        ],
        total: 2300,
        currentStatus: 'preparing',
        statusHistory: [
          {
            status: 'pending',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            message: 'Order placed and waiting for farmer confirmation',
          },
          {
            status: 'confirmed',
            timestamp: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
            message: 'Order confirmed by Grace Wanjiku',
            location: 'Kiambu Farm'
          },
          {
            status: 'preparing',
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            message: 'Order is being prepared for delivery',
            location: 'Kiambu Farm'
          }
        ],
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        trackingNumber: 'KM-' + Date.now().toString().slice(-6),
        deliveryAddress: {
          street: '123 Kimathi Street',
          city: 'Nairobi',
          county: 'Nairobi'
        },
        paymentMethod: 'M-Pesa',
        paymentStatus: 'paid',
        specialInstructions: 'Please call when you arrive',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'ORD-002',
        customerId: '1',
        customerName: 'John Doe',
        farmerId: 'farmer1',
        farmerName: 'Grace Wanjiku',
        items: [
          { productId: 'p3', productName: 'Organic Tomatoes', quantity: 3, price: 200 }
        ],
        total: 750,
        currentStatus: 'shipped',
        statusHistory: [
          {
            status: 'pending',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            message: 'Order placed and waiting for farmer confirmation',
          },
          {
            status: 'confirmed',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            message: 'Order confirmed by Grace Wanjiku',
            location: 'Kiambu Farm'
          },
          {
            status: 'preparing',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            message: 'Order is being prepared for delivery',
            location: 'Kiambu Farm'
          },
          {
            status: 'ready',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            message: 'Order is ready and packaged for delivery',
            location: 'Kiambu Farm'
          },
          {
            status: 'shipped',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            message: 'Order is out for delivery',
            location: 'En route to Nairobi'
          }
        ],
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000), // In 2 hours
        trackingNumber: 'KM-' + (Date.now() - 10000).toString().slice(-6),
        deliveryAddress: {
          street: '123 Kimathi Street',
          city: 'Nairobi',
          county: 'Nairobi'
        },
        paymentMethod: 'M-Pesa',
        paymentStatus: 'paid',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ];
    
    setOrders(mockOrders);
  }, []);

  // Simulate real-time order status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          // Only update orders that are not delivered or cancelled
          if (order.currentStatus === 'delivered' || order.currentStatus === 'cancelled') {
            return order;
          }

          // Small chance to update order status
          if (Math.random() < 0.1) {
            const statusProgression: OrderStatus['status'][] = [
              'pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered'
            ];
            
            const currentIndex = statusProgression.indexOf(order.currentStatus);
            const nextStatus = statusProgression[currentIndex + 1];
            
            if (nextStatus) {
              const statusMessages: Record<string, string> = {
                confirmed: 'Order confirmed by farmer',
                preparing: 'Order is being prepared',
                ready: 'Order is ready for pickup/delivery',
                shipped: 'Order is out for delivery',
                delivered: 'Order has been delivered successfully'
              };

              const message =
                nextStatus in statusMessages
                  ? statusMessages[nextStatus]
                  : 'Status updated';

              const newStatus: OrderStatus = {
                status: nextStatus,
                timestamp: new Date(),
                message,
                location:
                  nextStatus === 'shipped'
                    ? 'En route'
                    : order.statusHistory[order.statusHistory.length - 1]?.location
              };

              return {
                ...order,
                currentStatus: nextStatus,
                statusHistory: [...order.statusHistory, newStatus]
              };
            }
          }
          
          return order;
        });
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = useCallback((
    orderId: string, 
    newStatus: OrderStatus['status'], 
    message?: string,
    location?: string
  ) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          const statusUpdate: OrderStatus = {
            status: newStatus,
            timestamp: new Date(),
            message: message || `Order status updated to ${newStatus}`,
            location
          };

          // Show notification based on user role
          toast.success('Order Status Updated', {
            description: statusUpdate.message,
          });

          return {
            ...order,
            currentStatus: newStatus,
            statusHistory: [...order.statusHistory, statusUpdate]
          };
        }
        return order;
      });
    });
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const getOrdersByCustomer = useCallback((customerId: string) => {
    return orders.filter(order => order.customerId === customerId);
  }, [orders]);

  const getOrdersByFarmer = useCallback((farmerId: string) => {
    return orders.filter(order => order.farmerId === farmerId);
  }, [orders]);

  const getPendingOrdersForFarmer = useCallback((farmerId: string) => {
    return orders.filter(order => 
      order.farmerId === farmerId && 
      ['pending', 'confirmed', 'preparing', 'ready'].includes(order.currentStatus)
    );
  }, [orders]);

  const getStatusProgress = useCallback((currentStatus: OrderStatus['status']) => {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return {
      currentStep: currentIndex + 1,
      totalSteps: statusOrder.length,
      percentage: ((currentIndex + 1) / statusOrder.length) * 100,
      isCompleted: currentStatus === 'delivered',
      isCancelled: currentStatus === 'cancelled'
    };
  }, []);

  const estimateDeliveryTime = useCallback((order: TrackedOrder) => {
    const now = new Date();
    const estimated = order.estimatedDelivery;
    const diffMs = estimated.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    if (diffHours <= 0) {
      return 'Delivery expected now';
    } else if (diffHours <= 2) {
      return `Expected in ${diffHours} hour${diffHours === 1 ? '' : 's'}`;
    } else if (diffHours <= 24) {
      return `Expected in ${diffHours} hours`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `Expected in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    }
  }, []);

  return {
    orders,
    updateOrderStatus,
    getOrderById,
    getOrdersByCustomer,
    getOrdersByFarmer,
    getPendingOrdersForFarmer,
    getStatusProgress,
    estimateDeliveryTime,
  };
}