import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'order_placed' | 'order_confirmed' | 'order_preparing' | 'order_shipped' | 'order_delivered' | 'order_cancelled' | 'payment_received' | 'low_stock' | 'new_review';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  data?: Record<string, unknown>; // Additional data for the notification
  userId: number;
  userRole: 'customer' | 'farmer' | 'admin';
}

export function useNotifications(userId?: number, userRole?: 'customer' | 'farmer' | 'admin') {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((
    type: Notification['type'],
    title: string,
    message: string,
    data?: any
  ) => {
    if (!userId || !userRole) return;

    const newNotification: Notification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      timestamp: new Date(),
      isRead: false,
      data,
      userId,
      userRole,
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only last 50 notifications

    // Show toast notification
    toast.success(title, {
      description: message,
      duration: 5000,
    });
  }, [userId, userRole]);

  // Mock real-time notifications (in a real app, this would be websockets/SSE)
  useEffect(() => {
    if (!userId || !userRole) return;

    // Simulate periodic notifications for different user types
    const interval = setInterval(() => {
      // Randomly generate notifications based on user role
      const random = Math.random();
      
      if (userRole === 'farmer' && random < 0.3) {
        // Farmers get order notifications
        const orderNotifications = [
          {
            type: 'order_placed' as const,
            title: 'New Order Received!',
            message: 'You have a new order for Fresh Tomatoes from John Doe',
          },
          {
            type: 'payment_received' as const,
            title: 'Payment Received',
            message: 'Payment of KES 1,200 received for Order #ORD-001',
          },
          {
            type: 'low_stock' as const,
            title: 'Low Stock Alert',
            message: 'Free Range Eggs is running low (2 units left)',
          },
        ];
        
        const notification = orderNotifications[Math.floor(Math.random() * orderNotifications.length)];
        addNotification(notification.type, notification.title, notification.message);
      }
      
      if (userRole === 'customer' && random < 0.2) {
        // Customers get order status updates
        const statusNotifications = [
          {
            type: 'order_confirmed' as const,
            title: 'Order Confirmed',
            message: 'Your order has been confirmed and is being prepared',
          },
          {
            type: 'order_shipped' as const,
            title: 'Order Shipped',
            message: 'Your order is on its way! Expected delivery today',
          },
          {
            type: 'order_delivered' as const,
            title: 'Order Delivered',
            message: 'Your order has been successfully delivered',
          },
        ];
        
        const notification = statusNotifications[Math.floor(Math.random() * statusNotifications.length)];
        addNotification(notification.type, notification.title, notification.message);
      }
      
      if (userRole === 'admin' && random < 0.1) {
        // Admins get platform notifications
        const adminNotifications = [
          {
            type: 'new_review' as const,
            title: 'New Review Posted',
            message: 'A customer posted a 5-star review for Organic Carrots',
          },
          {
            type: 'order_placed' as const,
            title: 'High Order Volume',
            message: '25 orders placed in the last hour - platform is busy!',
          },
        ];
        
        const notification = adminNotifications[Math.floor(Math.random() * adminNotifications.length)];
        addNotification(notification.type, notification.title, notification.message);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [userId, userRole, addNotification]);

  // Update unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(n => !n.isRead && n.userId === userId).length;
    setUnreadCount(count);
  }, [notifications, userId]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.userId === userId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, [userId]);

  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications(prev => prev.filter(notification => notification.userId !== userId));
  }, [userId]);

  // Get notifications for current user
  const userNotifications = notifications.filter(n => n.userId === userId);

  return {
    notifications: userNotifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  };
}