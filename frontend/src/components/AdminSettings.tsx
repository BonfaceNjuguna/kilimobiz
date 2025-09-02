import { useState } from "react";
import { 
  ArrowLeft, 
  Settings,
  LogOut,
  Shield,
  Eye,
  Database,
  Users,
  Package,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import type { User } from "../types/marketplace";

interface AdminSettingsProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

export function AdminSettings({ user, onBack, onLogout }: AdminSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);

  // Simple Switch component using Tailwind
  function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
    return (
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
        onClick={() => onCheckedChange(!checked)}
        aria-checked={checked}
        role="switch"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    );
  }

  // Simple Badge component using Tailwind
  function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${className}`}>
        {children}
      </span>
    );
  }

  // Simple Card components using Tailwind
  function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`rounded-lg shadow bg-white ${className}`}>{children}</div>;
  }
  function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`border-b px-6 py-4 ${className}`}>{children}</div>;
  }
  function CardTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`font-semibold flex items-center ${className}`}>{children}</div>;
  }
  function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
  }

  // Simple Button component using Tailwind
  function Button({
    variant = "default",
    size = "md",
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
  }) {
    const base =
      "rounded transition font-medium flex items-center justify-center focus:outline-none";
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };
    const sizes = {
      sm: "h-10 px-3 text-sm",
      md: "h-12 px-4 text-base",
      lg: "h-14 px-6 text-lg",
    };
    return (
      <button
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }

  const settingsSections = [
    {
      title: "Account & Security",
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          action: <Button variant="outline" size="sm">Enable</Button>
        },
        {
          label: "Password",
          description: "Last changed 30 days ago",
          action: <Button variant="outline" size="sm">Change</Button>
        },
        {
          label: "Admin Session Timeout",
          description: "Automatically logout after inactivity",
          action: <Button variant="outline" size="sm">30 min</Button>
        }
      ]
    },
    {
      title: "Platform Settings",
      icon: <Database className="w-5 h-5" />,
      items: [
        {
          label: "Auto-approve Products",
          description: "Automatically approve products from verified sellers",
          action: <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
        },
        {
          label: "Email Notifications",
          description: "Receive alerts for important platform events",
          action: <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
        },
        {
          label: "Data Export",
          description: "Download platform analytics and reports",
          action: <Button variant="outline" size="sm">Export</Button>
        }
      ]
    },
    {
      title: "Appearance",
      icon: <Eye className="w-5 h-5" />,
      items: [
        {
          label: "Dark Mode",
          description: "Switch to dark theme",
          action: <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        },
        {
          label: "Push Notifications",
          description: "Receive browser notifications",
          action: <Switch checked={notifications} onCheckedChange={setNotifications} />
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="w-10 h-10 p-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Admin Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your admin preferences and platform settings
                </p>
              </div>
            </div>
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Admin Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">{user.name}</h3>
                  <p className="text-sm text-blue-700">{user.email || user.phone}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Administrator
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                {section.icon}
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <div className="ml-4">
                    {item.action}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Users className="w-4 h-4 mr-3" />
              Manage Administrators
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Package className="w-4 h-4 mr-3" />
              Platform Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Database className="w-4 h-4 mr-3" />
              System Backup
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>Account Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800">Sign Out</h4>
                  <p className="text-sm text-red-600 mt-1">
                    Securely log out of your admin account
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pb-8" /> {/* Bottom padding */}
      </div>
    </div>
  );
}