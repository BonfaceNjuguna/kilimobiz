import { useState } from "react";
import { 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";

interface FarmerEarningsScreenProps {
  farmerId: number;
  farmerName: string;
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: 'earning' | 'payout' | 'fee' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earning',
    amount: 2500,
    description: 'Order #ORD-001 - Organic Tomatoes',
    date: '2024-01-20',
    status: 'completed',
    orderId: 'ORD-001'
  },
  {
    id: '2',
    type: 'payout',
    amount: -15000,
    description: 'Weekly payout to M-Pesa',
    date: '2024-01-19',
    status: 'completed'
  },
  {
    id: '3',
    type: 'earning',
    amount: 1800,
    description: 'Order #ORD-002 - Fresh Spinach',
    date: '2024-01-18',
    status: 'completed',
    orderId: 'ORD-002'
  },
  {
    id: '4',
    type: 'fee',
    amount: -150,
    description: 'Platform commission (5%)',
    date: '2024-01-18',
    status: 'completed'
  },
  {
    id: '5',
    type: 'earning',
    amount: 4200,
    description: 'Order #ORD-003 - Free Range Eggs',
    date: '2024-01-17',
    status: 'pending',
    orderId: 'ORD-003'
  }
];

const earningsData = [
  { period: 'Week 1', earnings: 12500, orders: 28 },
  { period: 'Week 2', earnings: 15200, orders: 32 },
  { period: 'Week 3', earnings: 11800, orders: 25 },
  { period: 'Week 4', earnings: 18600, orders: 38 }
];

export function FarmerEarningsScreen({ onBack }: FarmerEarningsScreenProps) {
  const screenSize = useScreenSize();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const totalEarnings = 58100;
  const pendingEarnings = 4200;
  const availableBalance = 12450;
  const thisMonthEarnings = 45600;
  const lastMonthEarnings = 38900;
  const earningsGrowth = ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings * 100);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'payout': return <ArrowDownLeft className="w-4 h-4 text-blue-600" />;
      case 'fee': return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
      case 'refund': return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      default: return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-4">
            {screenSize === 'mobile' && (
              <button
                type="button"
                onClick={onBack}
                className="flex items-center space-x-2 rounded hover:bg-gray-100 transition px-3 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            <div>
              <h1 className="text-lg lg:text-2xl font-semibold text-[#1f2937]">Earnings & Payouts</h1>
              <p className="text-sm text-[#6b7280]">Track your revenue and payouts</p>
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
                    ? 'bg-[#10b981] text-white border-[#10b981]'
                    : 'bg-[#f3f4f6] text-[#1f2937] border-[#6b7280]'
                }`}
              >
                <span className="sm:hidden">{period.label}</span>
                <span className="hidden sm:inline">{period.fullLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-semibold">KES {totalEarnings.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{earningsGrowth.toFixed(1)}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-semibold">KES {availableBalance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Ready for payout</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Earnings</p>
                <p className="text-2xl font-semibold">KES {pendingEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Processing orders</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-semibold">KES {thisMonthEarnings.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+17.2%</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Quick Actions</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4">
            <button className="flex items-center justify-center space-x-2 h-12 bg-[#10b981] hover:bg-[#059669] text-white rounded">
              <CreditCard className="w-4 h-4" />
              <span>Request Payout</span>
            </button>
            <button className="flex items-center justify-center space-x-2 h-12 border rounded hover:bg-[#f3f4f6] transition">
              <Download className="w-4 h-4" />
              <span>Download Statement</span>
            </button>
            <button className="flex items-center justify-center space-x-2 h-12 border rounded hover:bg-[#f3f4f6] transition">
              <Calendar className="w-4 h-4" />
              <span>View Payout Schedule</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="grid w-full grid-cols-2 mb-4">
            <button
              type="button"
              className={`py-2 px-4 font-medium border-b-2 text-xs lg:text-sm ${
                true ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              Earnings
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium border-b-2 text-xs lg:text-sm ${
                false ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              Transactions
            </button>
          </div>

          {/* Earnings Tab */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Earnings Trend</div>
            <div className="p-6">
              <div className="h-80 flex items-end space-x-4 pb-4">
                {earningsData.map((data) => (
                  <div key={data.period} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-[#10b981] rounded-t-md transition-all duration-300 hover:bg-[#10b981]/80"
                      style={{ height: `${(data.earnings / 20000) * 100}%` }}
                    />
                    <span className="text-xs text-[#6b7280] mt-2">{data.period}</span>
                    <span className="text-xs font-medium">KES {data.earnings.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{data.orders} orders</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Avg. Weekly Earnings</p>
                  <p className="text-xl font-semibold">KES 14,525</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Best Week</p>
                  <p className="text-xl font-semibold">KES 18,600</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-xl font-semibold text-green-600">+17.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Tab */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Recent Transactions</div>
            <div className="p-6 space-y-4">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#f9fafb] rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{transaction.description}</h3>
                        <div className="flex items-center space-x-2 text-sm text-[#6b7280]">
                        <span>{transaction.date}</span>
                        {transaction.orderId && (
                          <>
                            <span>•</span>
                            <span>{transaction.orderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}KES {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-6">
                <button className="border rounded px-4 py-2 text-sm hover:bg-muted transition">
                  Load More Transactions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payout Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4 font-semibold">Payout Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-4">
            <div>
              <h4 className="font-medium mb-3">Payment Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payout Frequency:</span>
                  <span>Weekly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Payout:</span>
                  <span>Friday, Jan 26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Payout:</span>
                  <span>KES 1,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Fee Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Commission:</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Processing:</span>
                  <span>KES 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payout Fee:</span>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}