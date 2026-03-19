import { useState } from "react";
import { 
  ArrowLeft, 
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  Grid3X3,
  Eye,
  AlertCircle
} from "lucide-react";
import { useScreenSize } from "./ResponsiveLayout";
import { PRODUCT_CATEGORIES, MOCK_PRODUCTS } from "../constants/marketplace";

interface CategoryManagementScreenProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  isActive: boolean;
}

export function CategoryManagementScreen({ onBack }: CategoryManagementScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  
  const screenSize = useScreenSize();

  // Convert existing categories to our format and add product counts
  const [categories, setCategories] = useState<Category[]>(
    PRODUCT_CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      description: `Fresh ${cat.name.toLowerCase()} from verified farmers`,
      productCount: MOCK_PRODUCTS.filter(p => p.category.id === cat.id).length,
      isActive: true
    }))
  );

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || !newCategoryIcon.trim()) return;

    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: newCategoryName,
      icon: newCategoryIcon,
      description: newCategoryDescription || `Fresh ${newCategoryName.toLowerCase()} from verified farmers`,
      productCount: 0,
      isActive: true
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryIcon('');
    setNewCategoryDescription('');
    setIsAddDialogOpen(false);
  };

  const handleToggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
  const activeCategories = categories.filter(cat => cat.isActive).length;

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#ffffff] shadow-sm sticky top-0 z-10">
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
                <h1 className="text-lg font-semibold text-[#1f2937]">Category Management</h1>
                <p className="text-sm text-[#6b7280]">
                  Manage product categories and organize the marketplace
                </p>
              </div>
            </div>
            {/* Add Category Dialog */}
            {isAddDialogOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#1f2937]">Category Name</label>
                      <input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g., Dairy Products"
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1f2937]">Icon (Emoji)</label>
                      <input
                        value={newCategoryIcon}
                        onChange={(e) => setNewCategoryIcon(e.target.value)}
                        placeholder="e.g., 🥛"
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1f2937]">Description</label>
                      <input
                        value={newCategoryDescription}
                        onChange={(e) => setNewCategoryDescription(e.target.value)}
                        placeholder="Brief description of the category"
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        disabled={!newCategoryName.trim() || !newCategoryIcon.trim()}
                        className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white rounded px-4 py-2 font-medium"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddDialogOpen(false)}
                        className="flex-1 border rounded px-4 py-2 font-medium hover:bg-[#f3f4f6]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded font-medium flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-[#f3f4f6] border-0 rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Grid3X3 className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{categories.length}</p>
            <p className="text-sm text-[#6b7280]">Total Categories</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{totalProducts}</p>
            <p className="text-sm text-[#6b7280]">Total Products</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-semibold text-[#1f2937]">{activeCategories}</p>
            <p className="text-sm text-[#6b7280]">Active Categories</p>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#1f2937]">
            Categories ({filteredCategories.length})
          </h2>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Grid3X3 className="w-16 h-16 text-[#6b7280] mx-auto mb-4" />
              <h3 className="font-medium text-[#1f2937] mb-2">No categories found</h3>
              <p className="text-sm text-[#6b7280]">
                {searchQuery ? 'Try adjusting your search' : 'Start by adding your first category'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 pb-8">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#f3f4f6] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-[#1f2937] truncate">{category.name}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                {category.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-sm text-[#6b7280] mb-2 line-clamp-2">
                              {category.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-[#6b7280]">
                              <span className="flex items-center space-x-1">
                                <Package className="w-3 h-3" />
                                <span>{category.productCount} products</span>
                              </span>
                              <span className="text-xs opacity-75">ID: {category.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e5e7eb]">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className="border px-3 py-1 rounded text-sm flex items-center hover:bg-[#f3f4f6] transition flex-shrink-0"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Products
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleCategory(category.id)}
                        className="border px-3 py-1 rounded text-sm flex-shrink-0 hover:bg-[#f3f4f6] transition"
                      >
                        {category.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        className="border px-3 py-1 rounded text-sm flex-shrink-0 hover:bg-[#f3f4f6] transition"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      {category.productCount === 0 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex-shrink-0 flex items-center"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      )}
                    </div>

                    {category.productCount > 0 && !category.isActive && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-yellow-800">
                              Category is inactive
                            </p>
                            <p className="text-sm text-yellow-700">
                              Products in this category won't appear in customer searches. 
                              Consider activating or moving products to another category.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Products View */}
        {selectedCategory && (
          <div className="bg-white rounded-lg shadow mt-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedCategory.icon}</span>
                <span className="font-semibold">Products in {selectedCategory.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="border px-3 py-1 rounded text-sm flex-shrink-0 hover:bg-muted transition"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              {selectedCategory.productCount === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-[#6b7280] mx-auto mb-3" />
                  <p className="text-[#6b7280]">No products in this category yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {MOCK_PRODUCTS
                    .filter(product => product.category.id === selectedCategory.id)
                    .map(product => (
                      <div key={product.id} className="flex items-center space-x-4 p-3 bg-[#f3f4f6] rounded-lg">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-[#1f2937]">{product.name}</h4>
                          <p className="text-sm text-[#6b7280]">
                            KES {product.price} • {product.sellerLocation}
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                          Active
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pb-8" /> {/* Bottom padding */}
      </div>
    </div>
  );
}