import { useState } from "react";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye,
  Star,
  Calendar,
  Download
} from "lucide-react";

interface FarmerAnalyticsScreenProps {
  farmerId: number;
  farmerName: string;
  onBack: () => void;
}

export function FarmerAnalyticsScreen({ onBack, farmerName }: FarmerAnalyticsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const salesData = [
    { period: 'Week 1', sales: 12500, orders: 28, views: 450 },
    { period: 'Week 2', sales: 15200, orders: 32, views: 520 },
    { period: 'Week 3', sales: 11800, orders: 25, views: 410 },
    { period: 'Week 4', sales: 18600, orders: 38, views: 680 }
  ];

  const productPerformance = [
    { 
      name: 'Organic Tomatoes', 
      sales: 8500, 
      units: 120, 
      views: 890, 
      rating: 4.8, 
      orders: 45,
      trend: 15.2 
    },
    { 
      name: 'Fresh Spinach', 
      sales: 4200, 
      units: 85, 
      views: 650, 
      rating: 4.6, 
      orders: 32,
      trend: 8.5 
    },
    { 
      name: 'Free Range Eggs', 
      sales: 6800, 
      units: 95, 
      views: 720, 
      rating: 4.9, 
      orders: 38,
      trend: -2.1 
    }
  ];

  const customerInsights = {
    totalCustomers: 156,
    repeatCustomers: 89,
    averageOrderValue: 1450,
    customerSatisfaction: 4.7,
    topLocations: [
      { location: 'Nairobi', percentage: 45 },
      { location: 'Kiambu', percentage: 23 },
      { location: 'Nakuru', percentage: 18 },
      { location: 'Nyeri', percentage: 14 }
    ]
  };

  const [activeTab, setActiveTab] = useState<'sales' | 'products' | 'customers'>('sales');

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center space-x-2 rounded hover:bg-gray-100 transition px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-lg lg:text-2xl font-semibold">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Performance insights for {farmerName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="flex items-center space-x-2 text-xs lg:text-sm border rounded px-3 py-2 hover:bg-muted transition"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Date Range</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 text-xs lg:text-sm border rounded px-3 py-2 hover:bg-muted transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 flex flex-wrap gap-2 lg:space-x-2">
            {[
              { value: '7d', label: '7 Days', fullLabel: 'Last 7 Days' },
              { value: '30d', label: '30 Days', fullLabel: 'Last 30 Days' },
              { value: '90d', label: '90 Days', fullLabel: 'Last 90 Days' },
              { value: '1y', label: '1 Year', fullLabel: 'Last Year' }
            ].map((period) => (
              <button
                key={period.value}
                type="button"
                onClick={() => setSelectedPeriod(period.value as '7d' | '30d' | '90d' | '1y')}
                className={`px-3 py-1 rounded text-xs lg:text-sm font-medium border ${
                  selectedPeriod === period.value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-muted text-foreground border-muted-foreground'
                }`}
              >
                <span className="sm:hidden">{period.label}</span>
                <span className="hidden sm:inline">{period.fullLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold">KES 58,100</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+18.2%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-semibold">123</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.4%</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Product Views</p>
                <p className="text-2xl font-semibold">2,560</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+25.1%</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-semibold">4.7</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.2</span>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

          <div className="grid w-full grid-cols-3 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('sales')}
              className={`py-2 px-4 font-medium border-b-2 text-xs lg:text-sm ${
                activeTab === 'sales' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              Sales
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`py-2 px-4 font-medium border-b-2 text-xs lg:text-sm ${
                activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('customers')}
              className={`py-2 px-4 font-medium border-b-2 text-xs lg:text-sm ${
                activeTab === 'customers' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              Customers
            </button>
          {/* Sales Tab */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                  <h2 className="font-semibold mb-4">Sales Trend</h2>
                  <div className="h-80 flex items-end space-x-4 pb-4">
                    {salesData.map((data) => (
                      <div key={data.period} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t-md transition-all duration-300 hover:bg-primary/80"
                          style={{ height: `${(data.sales / 20000) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">{data.period}</span>
                        <span className="text-xs font-medium">KES {data.sales.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                      <p className="text-xl font-semibold">KES 1,450</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-xl font-semibold">4.8%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Revenue Growth</p>
                      <p className="text-xl font-semibold text-green-600">+18.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                  <h2 className="font-semibold mb-4">Product Performance</h2>
                  <div className="space-y-4">
                    {productPerformance.map((product) => (
                      <div key={product.name} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center space-x-1">
                            {product.trend > 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-600" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-600" />
                            )}
                            <span className={`text-xs ${product.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.trend > 0 ? '+' : ''}{product.trend}%
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-semibold">KES {product.sales.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Units Sold</p>
                            <p className="font-semibold">{product.units}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Views</p>
                            <p className="font-semibold">{product.views}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Orders</p>
                            <p className="font-semibold">{product.orders}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 space-y-4">
                    <h2 className="font-semibold mb-4">Customer Overview</h2>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Customers</span>
                      <span className="font-semibold">{customerInsights.totalCustomers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Repeat Customers</span>
                      <span className="font-semibold">{customerInsights.repeatCustomers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Order Value</span>
                      <span className="font-semibold">KES {customerInsights.averageOrderValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{customerInsights.customerSatisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 space-y-4">
                    <h2 className="font-semibold mb-4">Top Customer Locations</h2>
                    {customerInsights.topLocations.map((location) => (
                      <div key={location.location} className="flex items-center justify-between">
                        <span className="text-sm">{location.location}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{location.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}