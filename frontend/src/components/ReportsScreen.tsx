import { useState } from "react";
import { 
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";

interface ReportsScreenProps {
  onBack: () => void;
}

export function ReportsScreen({ onBack }: ReportsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  const screenSize = useScreenSize();

  const salesData = [
    { period: 'Jan', sales: 45000, orders: 120, customers: 89 },
    { period: 'Feb', sales: 52000, orders: 145, customers: 102 },
    { period: 'Mar', sales: 48000, orders: 132, customers: 95 },
    { period: 'Apr', sales: 61000, orders: 168, customers: 115 },
    { period: 'May', sales: 58000, orders: 156, customers: 108 },
    { period: 'Jun', sales: 67000, orders: 189, customers: 128 }
  ];

  const topProducts = [
    { name: 'Organic Tomatoes', sales: 12500, units: 450, growth: 15.2 },
    { name: 'Free Range Eggs', sales: 10800, units: 320, growth: 12.8 },
    { name: 'Fresh Spinach', sales: 8900, units: 680, growth: -2.1 },
    { name: 'Pure Honey', sales: 15600, units: 120, growth: 28.5 },
    { name: 'Free Range Chicken', sales: 22100, units: 89, growth: 18.9 }
  ];

  const topFarmers = [
    { name: 'Grace Wanjiku', sales: 45600, products: 12, orders: 156, growth: 22.1 },
    { name: 'John Kimani', sales: 38900, products: 8, orders: 134, growth: 18.5 },
    { name: 'Peter Mwangi', sales: 32100, products: 15, orders: 98, growth: -5.2 },
    { name: 'Mary Nyongo', sales: 28500, products: 6, orders: 89, growth: 31.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {screenSize === 'mobile' && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center space-x-2 rounded hover:bg-[#f3f4f6] transition px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <div>
            <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
            <p className="text-[#6b7280]">Detailed insights and performance metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="flex items-center space-x-2 rounded hover:bg-[#f3f4f6] transition px-3 py-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 bg-[#10b981] text-white rounded px-3 py-2 hover:bg-[#059669] transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
              { value: '1y', label: 'Last Year' }
            ].map((period) => (
              <button
                key={period.value}
                type="button"
                className={`px-4 py-2 rounded font-medium transition ${
                  selectedPeriod === period.value
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#f3f4f6] text-[#6b7280]'
                }`}
                onClick={() => setSelectedPeriod(period.value as '7d' | '30d' | '90d' | '1y')}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Total Revenue</p>
              <p className="text-2xl font-semibold">KES 2.4M</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Total Orders</p>
              <p className="text-2xl font-semibold">1,426</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+8.2%</span>
              </div>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Active Users</p>
              <p className="text-2xl font-semibold">1,234</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+15.1%</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6b7280]">Products Sold</p>
              <p className="text-2xl font-semibold">3,567</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-xs text-red-600">-2.1%</span>
              </div>
            </div>
            <Package className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="grid w-full grid-cols-4 mb-4">
          <button
            type="button"
            className={`py-2 px-4 rounded-t-lg font-medium transition-all ${
              true ? 'bg-[#10b981] text-white' : 'bg-[#f3f4f6] text-[#6b7280]'
            }`}
          >
            Sales Analytics
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-t-lg font-medium transition-all bg-[#f3f4f6] text-[#6b7280]`}
          >
            Product Performance
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-t-lg font-medium transition-all bg-[#f3f4f6] text-[#6b7280]`}
          >
            Farmer Performance
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-t-lg font-medium transition-all bg-[#f3f4f6] text-[#6b7280]`}
          >
            Customer Insights
          </button>
        </div>

        {/* Sales Analytics */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Sales Trend</div>
          <div className="p-6">
            <div className="h-80 flex items-end space-x-2 pb-4">
              {salesData.map((data) => (
                <div key={data.period} className="flex-1 flex flex-col items-center">
                  <div 
                      className="w-full bg-[#10b981] rounded-t-md transition-all duration-300 hover:bg-[#10b981]/80"
                    style={{ height: `${(data.sales / 70000) * 100}%` }}
                  />
                  <span className="text-xs text-[#6b7280] mt-2">{data.period}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#e5e7eb]">
              <div className="text-center">
                <p className="text-sm text-[#6b7280]">Avg. Order Value</p>
                <p className="text-xl font-semibold">KES 1,680</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b7280]">Conversion Rate</p>
                <p className="text-xl font-semibold">3.2%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b7280]">Customer Retention</p>
                <p className="text-xl font-semibold">68%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Top Performing Products</div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-[#f3f4f6] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-[#10b981]">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-[#6b7280]">{product.units} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KES {product.sales.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {product.growth > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-600" />
                    )}
                    <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Top Performing Farmers</div>
          <div className="p-6 space-y-4">
            {topFarmers.map((farmer) => (
              <div key={farmer.name} className="flex items-center justify-between p-4 bg-[#f3f4f6] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <span className="font-medium text-[#10b981]">
                      {farmer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{farmer.name}</h3>
                    <p className="text-sm text-[#6b7280]">
                      {farmer.products} products • {farmer.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KES {farmer.sales.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {farmer.growth > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-600" />
                    )}
                    <span className={`text-xs ${farmer.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {farmer.growth > 0 ? '+' : ''}{farmer.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Customer Demographics</div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 18-25</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-[#f3f4f6] rounded-full">
                    <div className="w-1/4 h-2 bg-[#10b981] rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 26-35</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-[#f3f4f6] rounded-full">
                    <div className="w-2/5 h-2 bg-[#10b981] rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 36-45</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-[#f3f4f6] rounded-full">
                    <div className="w-1/5 h-2 bg-[#10b981] rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age 45+</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-[#f3f4f6] rounded-full">
                    <div className="w-3/20 h-2 bg-[#10b981] rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Purchase Behavior</div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-[#6b7280]">Repeat Customers</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6b7280]">Avg. Orders/Month</span>
                <span className="font-medium">2.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6b7280]">Customer Lifetime Value</span>
                <span className="font-medium">KES 15,600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6b7280]">Churn Rate</span>
                <span className="font-medium text-red-600">12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}