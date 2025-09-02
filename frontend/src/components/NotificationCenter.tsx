import { useState } from 'react';
import { 
  Bell, 
  BellDot, 
  CheckCircle, 
  Clock, 
  Package, 
  DollarSign, 
  AlertTriangle,
  Star,
  Truck,
  X
} from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import type { Notification } from '../hooks/useNotifications';

interface NotificationCenterProps {
  userId?: number;
  userRole?: 'customer' | 'farmer' | 'admin';
  trigger?: React.ReactNode;
}

export function NotificationCenter({ userId, userRole, trigger }: NotificationCenterProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotification 
  } = useNotifications(userId, userRole);
  
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order_placed':
      case 'order_confirmed':
      case 'order_preparing':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'order_shipped':
        return <Truck className="w-4 h-4 text-orange-600" />;
      case 'order_delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'order_cancelled':
        return <X className="w-4 h-4 text-red-600" />;
      case 'payment_received':
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'new_review':
        return <Star className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'order_placed':
      case 'order_confirmed':
      case 'order_preparing':
        return 'bg-blue-50 border-blue-200';
      case 'order_shipped':
        return 'bg-orange-50 border-orange-200';
      case 'order_delivered':
      case 'payment_received':
        return 'bg-green-50 border-green-200';
      case 'order_cancelled':
        return 'bg-red-50 border-red-200';
      case 'low_stock':
        return 'bg-yellow-50 border-yellow-200';
      case 'new_review':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const defaultTrigger = (
    <button
      type="button"
      className="relative w-10 h-10 p-0 rounded-full hover:bg-muted transition flex items-center justify-center"
      onClick={() => setIsOpen(true)}
    >
      {unreadCount > 0 ? (
        <BellDot className="w-5 h-5" />
      ) : (
        <Bell className="w-5 h-5" />
      )}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Trigger Button */}
      <div>
        {trigger || defaultTrigger}
      </div>
      {/* Notification Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full sm:w-96 bg-white border-l border-border shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span className="font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold">
                    {unreadCount}
                  </span>
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs px-2 py-1 rounded hover:bg-muted transition"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No notifications yet</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll see important updates and order status changes here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg ${getNotificationColor(notification.type)} ${!notification.isRead ? 'ring-2 ring-primary/20' : ''} transition-all duration-200`}
                    >
                      <div className="p-4 flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-medium mb-1 ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.isRead && (
                                <button
                                  type="button"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0 flex items-center justify-center rounded hover:bg-green-100 transition"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => clearNotification(notification.id)}
                                className="h-6 w-6 p-0 flex items-center justify-center rounded text-muted-foreground hover:text-red-600 transition"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}