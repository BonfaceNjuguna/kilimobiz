import { useState } from "react";
import { 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Users,
  UserPlus,
  Mail,
  Phone,
  ArrowLeft
} from "lucide-react";

interface UserManagementScreenProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'farmer' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  joinedDate: string;
  lastActive: string;
  orders: number;
  totalSpent?: number;
  products?: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254701234567',
    role: 'customer',
    status: 'active',
    joinedDate: '2024-01-15',
    lastActive: '2024-01-20',
    orders: 15,
    totalSpent: 45000
  },
  {
    id: '2',
    name: 'Grace Wanjiku',
    email: 'grace@farm.com',
    phone: '+254701234568',
    role: 'farmer',
    status: 'active',
    joinedDate: '2024-01-10',
    lastActive: '2024-01-19',
    orders: 0,
    products: 12
  },
  {
    id: '3',
    name: 'Peter Mwangi',
    email: 'peter@example.com',
    phone: '+254701234569',
    role: 'customer',
    status: 'inactive',
    joinedDate: '2024-01-05',
    lastActive: '2024-01-10',
    orders: 3,
    totalSpent: 8500
  }
];

export function UserManagementScreen({ onBack }: UserManagementScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'customer' | 'farmer' | 'admin'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'banned'>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 rounded px-3 py-2 hover:bg-muted transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-muted-foreground">Manage customers, farmers, and admin users</p>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center space-x-2 rounded bg-primary text-white px-4 py-2 font-medium hover:bg-primary/90 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-lg shadow bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="rounded-lg shadow bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Farmers</p>
              <p className="text-2xl font-semibold text-green-600">89</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="rounded-lg shadow bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Customers</p>
              <p className="text-2xl font-semibold text-blue-600">1,120</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="rounded-lg shadow bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-semibold text-purple-600">25</p>
            </div>
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg shadow bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 w-full rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as 'all' | 'customer' | 'farmer' | 'admin')}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="farmer">Farmers</option>
            <option value="admin">Admins</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive' | 'banned')}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <button
            type="button"
            className="flex items-center space-x-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 px-4 py-2 font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg shadow bg-white">
        <div className="border-b px-6 py-4 font-semibold flex items-center">Users ({filteredUsers.length})</div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Activity</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stats</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p>Joined: {user.joinedDate}</p>
                        <p className="text-muted-foreground">Last: {user.lastActive}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {user.role === 'customer' ? (
                          <>
                            <p>{user.orders} orders</p>
                            <p className="text-muted-foreground">KES {user.totalSpent?.toLocaleString()}</p>
                          </>
                        ) : user.role === 'farmer' ? (
                          <>
                            <p>{user.products} products</p>
                            <p className="text-muted-foreground">Active seller</p>
                          </>
                        ) : (
                          <p className="text-muted-foreground">Admin user</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="rounded transition font-medium flex items-center justify-center bg-transparent text-gray-700 hover:bg-gray-100 h-10 px-3 text-sm"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button
                            type="button"
                            className="rounded transition font-medium flex items-center justify-center bg-transparent text-yellow-600 hover:bg-yellow-100 h-10 px-3 text-sm"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="rounded transition font-medium flex items-center justify-center bg-transparent text-green-600 hover:bg-green-100 h-10 px-3 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded transition font-medium flex items-center justify-center bg-transparent text-red-600 hover:bg-red-100 h-10 px-3 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}