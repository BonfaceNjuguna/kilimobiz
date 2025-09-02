import { useState } from "react";
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Package,
  TrendingUp,
  DollarSign,
  Star,
  AlertTriangle
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../constants/marketplace";

interface FarmerProductsScreenProps {
  farmerId: number;
  farmerName: string;
  onBack: () => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  status: 'active' | 'inactive' | 'pending' | 'out_of_stock';
  stock: number;
  sales: number;
  views: number;
  rating: number;
  reviews: number;
}

const farmerProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, vine-ripened organic tomatoes grown without pesticides',
    price: 120,
    unit: 'per kg',
    category: 'greens',
    images: ['https://images.unsplash.com/photo-1546470427-227d0ac454a4?w=400&h=300&fit=crop'],
    status: 'active',
    stock: 50,
    sales: 8500,
    views: 890,
    rating: 4.8,
    reviews: 45
  },
  {
    id: '2',
    name: 'Fresh Spinach',
    description: 'Crispy, fresh spinach leaves harvested this morning',
    price: 50,
    unit: 'per bunch',
    category: 'greens',
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop'],
    status: 'active',
    stock: 30,
    sales: 4200,
    views: 650,
    rating: 4.6,
    reviews: 32
  },
  {
    id: '3',
    name: 'Free Range Eggs',
    description: 'Large brown eggs from free-range hens',
    price: 350,
    unit: 'per tray',
    category: 'eggs',
    images: ['https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=300&fit=crop'],
    status: 'out_of_stock',
    stock: 0,
    sales: 6800,
    views: 720,
    rating: 4.9,
    reviews: 38
  }
];

export function FarmerProductsScreen({ onBack }: FarmerProductsScreenProps) {
  const [products] = useState<Product[]>(farmerProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.status === 'out_of_stock').length;
  const totalRevenue = products.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <h1 className="text-2xl font-semibold">My Products</h1>
            <p className="text-muted-foreground">Manage your product listings and inventory</p>
          </div>
        </div>
        {/* Add Product Dialog */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <input
                      placeholder="Enter product name"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select className="w-full h-10 px-3 bg-background border border-border rounded-lg">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Describe your product..."
                    rows={3}
                    className="mt-1 w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Unit</label>
                    <input
                      placeholder="per kg, per bunch, etc."
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Stock Quantity</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Harvest Date</label>
                    <input
                      type="date"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="border rounded px-4 py-2 text-sm hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="bg-primary hover:bg-primary/90 text-white rounded px-4 py-2 text-sm"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowAddProduct(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-semibold">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Products</p>
              <p className="text-2xl font-semibold text-green-600">{activeProducts}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">{outOfStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold">KES {totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-foreground"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <button
            type="button"
            className="border rounded px-4 py-2 text-sm flex items-center hover:bg-muted transition"
          >
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(product.status)}`}>
                {product.status.replace('_', ' ')}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold text-primary">
                    KES {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{product.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="font-semibold">{product.stock}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Sales</p>
                  <p className="font-medium">KES {(product.sales / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-medium">{product.views}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="border rounded px-3 py-1 text-sm flex-1 flex items-center hover:bg-muted transition"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button
                  type="button"
                  className="border rounded px-3 py-1 text-sm flex-1 flex items-center hover:bg-muted transition"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  type="button"
                  className="border rounded px-3 py-1 text-sm text-red-600 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              type="button"
              onClick={() => setShowAddProduct(true)}
              className="bg-primary hover:bg-primary/90 text-white rounded px-4 py-2 text-sm flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}