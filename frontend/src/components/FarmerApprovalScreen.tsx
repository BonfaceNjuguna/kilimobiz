import { useState } from "react";
import { 
  ArrowLeft, 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building,
  FileText,
  Clock,
  UserPlus
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";

interface FarmerApprovalScreenProps {
  onBack: () => void;
}

interface PendingFarmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  farmName: string;
  farmSize: string;
  experience: string;
  crops: string[];
  certification: string;
  submittedDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  documents: {
    nationalId: boolean;
    farmLicense: boolean;
    taxPin: boolean;
    bankStatement: boolean;
  };
}

export function FarmerApprovalScreen({ onBack }: FarmerApprovalScreenProps) {
  const screenSize = useScreenSize();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<PendingFarmer | null>(null);

  // Mock pending farmers
  const mockFarmers: PendingFarmer[] = [
    {
      id: 'f1',
      name: 'John Kamau',
      email: 'john.kamau@example.com',
      phone: '+254712345678',
      location: 'Kiambu County',
      farmName: 'Kamau Family Farm',
      farmSize: '5 acres',
      experience: '8 years',
      crops: ['Tomatoes', 'Spinach', 'Kale', 'Carrots'],
      certification: 'Organic',
      submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      documents: {
        nationalId: true,
        farmLicense: true,
        taxPin: true,
        bankStatement: false
      }
    },
    {
      id: 'f2',
      name: 'Mary Njeri',
      email: 'mary.njeri@example.com',
      phone: '+254723456789',
      location: 'Nakuru County',
      farmName: 'Green Valley Farm',
      farmSize: '12 acres',
      experience: '15 years',
      crops: ['Maize', 'Beans', 'Potatoes', 'Onions'],
      certification: 'GAP Certified',
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending',
      documents: {
        nationalId: true,
        farmLicense: true,
        taxPin: true,
        bankStatement: true
      }
    },
    {
      id: 'f3',
      name: 'Peter Mwangi',
      email: 'peter.mwangi@example.com',
      phone: '+254734567890',
      location: 'Murang\'a County',
      farmName: 'Mwangi Avocado Farm',
      farmSize: '8 acres',
      experience: '12 years',
      crops: ['Avocados', 'Macadamia', 'Coffee'],
      certification: 'Rainforest Alliance',
      submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'approved',
      documents: {
        nationalId: true,
        farmLicense: true,
        taxPin: true,
        bankStatement: true
      }
    }
  ];

  const [farmers, setFarmers] = useState(mockFarmers);

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || farmer.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleApprove = (farmerId: string) => {
    setFarmers(prev => prev.map(f => 
      f.id === farmerId ? { ...f, status: 'approved' as const } : f
    ));
    setSelectedFarmer(null);
  };

  const handleReject = (farmerId: string, reason: string) => {
    setFarmers(prev => prev.map(f => 
      f.id === farmerId ? { ...f, status: 'rejected' as const, rejectionReason: reason } : f
    ));
    setSelectedFarmer(null);
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

  const getDocumentCompletionRate = (documents: PendingFarmer['documents']) => {
    const completed = Object.values(documents).filter(Boolean).length;
    const total = Object.keys(documents).length;
    return Math.round((completed / total) * 100);
  };

  const pendingCount = farmers.filter(f => f.status === 'pending').length;
  const approvedCount = farmers.filter(f => f.status === 'approved').length;
  const rejectedCount = farmers.filter(f => f.status === 'rejected').length;

  if (selectedFarmer) {
    const completionRate = getDocumentCompletionRate(selectedFarmer.documents);
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        {/* Header */}
        <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedFarmer(null)}
                  className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-[#1f2937]">Farmer Application Review</h1>
                  <span className="text-sm text-[#6b7280]">
                    Review farmer details and approve application
                  </span>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedFarmer.status)}`}>
                {selectedFarmer.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Farmer Profile */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#1f2937] mb-1">{selectedFarmer.name}</h2>
                <p className="text-sm text-[#6b7280] mb-2">{selectedFarmer.farmName}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#6b7280]" />
                    <span>{selectedFarmer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#6b7280]" />
                    <span>{selectedFarmer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#6b7280]" />
                    <span>{selectedFarmer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#6b7280]" />
                    <span>Applied {selectedFarmer.submittedDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 flex items-center space-x-2 border-b">
              <Building className="w-5 h-5" />
              <span className="font-semibold">Farm Information</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Farm Size</label>
                  <p className="text-[#1f2937]">{selectedFarmer.farmSize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6b7280]">Experience</label>
                  <p className="text-[#1f2937]">{selectedFarmer.experience}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#6b7280]">Certification</label>
                <p className="text-[#1f2937]">{selectedFarmer.certification}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#6b7280]">Primary Crops</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedFarmer.crops.map((crop, index) => (
                    <span key={index} className="inline-block px-2 py-1 rounded border border-green-200 bg-green-50 text-green-700 text-xs font-semibold">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Document Verification</span>
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${completionRate === 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {completionRate}% Complete
              </span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm font-medium">National ID</span>
                {selectedFarmer.documents.nationalId ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm font-medium">Farm License</span>
                {selectedFarmer.documents.farmLicense ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm font-medium">Tax PIN</span>
                {selectedFarmer.documents.taxPin ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f3f4f6] rounded-lg">
                <span className="text-sm font-medium">Bank Statement</span>
                {selectedFarmer.documents.bankStatement ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedFarmer.status === 'pending' && (
            <div className="flex space-x-4 pb-8">
              <button
                type="button"
                onClick={() => handleApprove(selectedFarmer.id)}
                disabled={completionRate < 100}
                className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white rounded px-4 py-2 font-medium flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Farmer
              </button>
              <button
                type="button"
                onClick={() => handleReject(selectedFarmer.id, 'Incomplete documentation')}
                className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded px-4 py-2 font-medium flex items-center justify-center"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Application
              </button>
            </div>
          )}

          {completionRate < 100 && selectedFarmer.status === 'pending' && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Incomplete Documentation
                  </p>
                  <p className="text-sm text-yellow-700">
                    All required documents must be submitted before approval can be granted.
                  </p>
                </div>
              </div>
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
                  className="w-10 h-10 p-0 rounded hover:bg-gray-100 transition flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-lg font-semibold text-[#1f2937]">Farmer Applications</h1>
                <p className="text-sm text-[#6b7280]">
                  Review and approve farmer registration applications
                </p>
              </div>
            </div>
            <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">
              {pendingCount} pending
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search farmers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-[#f3f4f6] border-0 rounded-lg w-full"
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
        <div className="space-y-4">
          <div className="grid w-full grid-cols-4 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`py-2 px-4 font-medium border-b-2 ${activeTab === 'all' ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'} focus:outline-none`}
            >
              All ({farmers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-4 font-medium border-b-2 ${activeTab === 'pending' ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'} focus:outline-none`}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('approved')}
              className={`py-2 px-4 font-medium border-b-2 ${activeTab === 'approved' ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'} focus:outline-none`}
            >
              Approved ({approvedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rejected')}
              className={`py-2 px-4 font-medium border-b-2 ${activeTab === 'rejected' ? 'border-[#10b981] text-[#10b981]' : 'border-transparent text-[#6b7280]'} focus:outline-none`}
            >
              Rejected ({rejectedCount})
            </button>
          </div>

          <div className="space-y-4 mt-6">
            {filteredFarmers.length === 0 ? (
              <div className="text-center py-12">
              <UserPlus className="w-16 h-16 text-[#6b7280] mx-auto mb-4" />
              <h3 className="font-medium text-[#1f2937] mb-2">No farmers found</h3>
              <p className="text-sm text-[#6b7280]">
                  {searchQuery ? 'Try adjusting your search' : 'No farmers in this category'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 pb-8">
                {filteredFarmers.map((farmer) => {
                  const completionRate = getDocumentCompletionRate(farmer.documents);
                  return (
                    <div key={farmer.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0 pr-4">
                            <h3 className="font-semibold text-[#1f2937] truncate">{farmer.name}</h3>
                            <p className="text-sm text-[#6b7280] truncate">{farmer.farmName}</p>
                            <p className="text-sm text-[#6b7280]">{farmer.location}</p>
                              </div>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${getStatusColor(farmer.status)}`}>
                                {farmer.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-[#6b7280] mb-2">
                              <span>{farmer.farmSize}</span>
                              <span>{farmer.experience} experience</span>
                              <span>{farmer.certification}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${completionRate === 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                {completionRate}% documents
                              </span>
                              <span className="text-xs text-[#6b7280]">
                                Applied {farmer.submittedDate.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e5e7eb]">
                          <button
                            type="button"
                            onClick={() => setSelectedFarmer(farmer)}
                            className="border px-3 py-1 rounded text-sm flex items-center hover:bg-[#f3f4f6] transition flex-shrink-0"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Review
                          </button>
                          {farmer.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(farmer.id)}
                                disabled={completionRate < 100}
                              className="bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1 rounded text-sm flex-shrink-0 flex items-center"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(farmer.id, 'Requirements not met')}
                                className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 py-1 rounded text-sm flex-shrink-0 flex items-center"
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}