import { useState } from "react";
import { 
  ArrowLeft, 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Package,
  Star,
  MapPin,
  Clock,
  User,
  Calendar,
  Leaf
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";

interface ProductReviewScreenProps {
  onBack: () => void;
}

interface PendingProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  seller: {
    name: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  submittedDate: Date;
  isOrganic: boolean;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export function ProductReviewScreen({ onBack }: ProductReviewScreenProps) {
  const screenSize = useScreenSize();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<PendingProduct | null>(null);

  // Mock pending products
  const mockProducts: PendingProduct[] = [
    {
      id: 'p1',
      name: 'Organic Tomatoes',
      description: 'Fresh, locally grown organic tomatoes. Perfect for salads and cooking.',
      price: 120,
      unit: 'per kg',
      category: 'Vegetables',
      images: ['https://images.unsplash.com/photo-1546470427-227f2bb0c9b4?w=400'],
      seller: {
        name: 'John Kamau',
        location: 'Kiambu',
        rating: 4.6,
        verified: true
      },
      submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isOrganic: true,
      status: 'pending'
    },
    {
      id: 'p2',
      name: 'Fresh Spinach',
      description: 'Leafy green spinach grown without pesticides.',
      price: 80,
      unit: 'per bunch',
      category: 'Vegetables',
      images: ['https://images.unsplash.com/photo-1576045057625-eec4c4eb6a8d?w=400'],
      seller: {
        name: 'Mary Njeri',
        location: 'Nakuru',
        rating: 4.8,
        verified: false
      },
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isOrganic: false,
      status: 'pending'
    },
    {
      id: 'p3',
      name: 'Avocados',
      description: 'Premium Hass avocados ready for harvest.',
      price: 200,
      unit: 'per kg',
      category: 'Fruits',
      images: ['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'],
      seller: {
        name: 'Peter Mwangi',
        location: 'Murang\'a',
        rating: 4.5,
        verified: true
      },
      submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isOrganic: true,
      status: 'approved'
    }
  ];

  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || product.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleApprove = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'approved' as const } : p
    ));
    setSelectedProduct(null);
  };

  const handleReject = (productId: string, reason: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'rejected' as const, rejectionReason: reason } : p
    ));
    setSelectedProduct(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = products.filter(p => p.status === 'pending').length;
  const approvedCount = products.filter(p => p.status === 'approved').length;
  const rejectedCount = products.filter(p => p.status === 'rejected').length;

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        {/* Header */}
        <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-10 h-10 p-0 rounded-full hover:bg-[#f3f4f6] transition flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-[#1f2937]">Product Review</h1>
                  <p className="text-sm text-[#6b7280]">
                    Review product details and approve or reject
                  </p>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedProduct.status)}`}>
                {selectedProduct.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="aspect-square bg-[#f3f4f6] rounded-lg overflow-hidden mb-4">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1f2937]">
                {selectedProduct.name}
              </h2>
              {selectedProduct.isOrganic && (
                <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Product Information</div>
            <div className="space-y-4 p-6">
              <div>
                <label className="text-sm font-medium text-[#6b7280]">Description</label>
                <p className="text-[#1f2937] mt-1">{selectedProduct.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Price</label>
                  <p className="text-[#1f2937] font-semibold">KES {selectedProduct.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Unit</label>
                  <p className="text-[#1f2937]">{selectedProduct.unit}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#6b7280]">Category</label>
                <p className="text-[#1f2937]">{selectedProduct.category}</p>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 font-semibold">Seller Information</div>
            <div className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1f2937]">{selectedProduct.seller.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#6b7280]">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedProduct.seller.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedProduct.seller.rating}</span>
                    </div>
                  </div>
                </div>
                {selectedProduct.seller.verified && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#6b7280]">
                <Calendar className="w-4 h-4" />
                <span>Submitted {selectedProduct.submittedDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedProduct.status === 'pending' && (
            <div className="flex space-x-4 pb-8">
              <button
                type="button"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded px-4 py-3 font-medium flex items-center justify-center"
                onClick={() => handleApprove(selectedProduct.id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Product
              </button>
              <button
                type="button"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded px-4 py-3 font-medium flex items-center justify-center"
                onClick={() => handleReject(selectedProduct.id, 'Quality standards not met')}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Product
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb] sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {screenSize === 'mobile' && (
                <button
                  type="button"
                  onClick={onBack}
                  className="w-10 h-10 p-0 rounded-full hover:bg-[#f3f4f6] transition flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-lg font-semibold text-[#1f2937]">Product Review</h1>
                <p className="text-sm text-[#6b7280]">
                  Review and approve seller product submissions
                </p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
              {pendingCount} pending
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search products or sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-[#f3f4f6] border-0 rounded-lg w-full text-[#1f2937] placeholder:text-[#6b7280]"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{pendingCount}</p>
            <p className="text-sm text-[#6b7280]">Pending Review</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{approvedCount}</p>
            <p className="text-sm text-[#6b7280]">Approved</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{rejectedCount}</p>
            <p className="text-sm text-[#6b7280]">Rejected</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-[#10b981] text-white'
                : 'bg-[#f3f4f6] text-[#6b7280]'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All ({products.length})
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-all ${
              activeTab === 'pending'
                ? 'bg-[#10b981] text-white'
                : 'bg-[#f3f4f6] text-[#6b7280]'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-all ${
              activeTab === 'approved'
                ? 'bg-[#10b981] text-white'
                : 'bg-[#f3f4f6] text-[#6b7280]'
            }`}
            onClick={() => setActiveTab('approved')}
          >
            Approved ({approvedCount})
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-all ${
              activeTab === 'rejected'
                ? 'bg-[#10b981] text-white'
                : 'bg-[#f3f4f6] text-[#6b7280]'
            }`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Products List */}
        <div className="space-y-4 pb-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-[#6b7280] mx-auto mb-4" />
              <h3 className="font-medium text-[#1f2937] mb-2">No products found</h3>
              <p className="text-sm text-[#6b7280]">
                {searchQuery ? 'Try adjusting your search' : 'No products in this category'}
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-semibold text-[#1f2937] mb-1 truncate">{product.name}</h3>
                          <p className="text-sm text-[#6b7280] line-clamp-2 mb-2">
                            {product.description}
                          </p>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-[#6b7280] mb-3">
                        <span className="font-semibold text-[#10b981]">
                          KES {product.price} {product.unit}
                        </span>
                        <span className="truncate">{product.seller.name}</span>
                        <span className="truncate">{product.seller.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e5e7eb]">
                    <button
                      type="button"
                      className="border rounded px-3 py-1 text-sm flex-shrink-0 flex items-center hover:bg-[#f3f4f6] transition"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </button>
                    {product.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 text-sm flex-shrink-0 flex items-center"
                          onClick={() => handleApprove(product.id)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </button>
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm flex-shrink-0 flex items-center"
                          onClick={() => handleReject(product.id, 'Quality standards not met')}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}