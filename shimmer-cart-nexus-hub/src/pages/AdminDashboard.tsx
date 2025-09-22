import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  
  // Check if admin is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct({ ...product });
    setIsAddingProduct(false);
  };

  const handleAddNewProduct = () => {
    setSelectedProduct({
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: '',
      inStock: true,
      featured: false,
      syncedTo: []
    });
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;
    
    if (isAddingProduct) {
      setProducts([...products, selectedProduct]);
      toast.success('Product added successfully!');
    } else {
      setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
      toast.success('Product updated successfully!');
    }
    
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">ShopVerse Admin</h1>
          <Button variant="outline" onClick={handleLogout}>Log Out</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-4">
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setActiveTab('products')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'products' ? 'bg-shop-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      Products
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-shop-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      Orders
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('inquiries')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'inquiries' ? 'bg-shop-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      Customer Inquiries
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-sm rounded-lg p-6">
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Product Management</h2>
                    <Button 
                      onClick={handleAddNewProduct}
                      className="bg-shop-primary hover:bg-shop-primary-dark"
                    >
                      Add New Product
                    </Button>
                  </div>
                  
                  {selectedProduct ? (
                    <form onSubmit={handleSaveProduct} className="space-y-4">
                      <h3 className="text-lg font-medium mb-4">
                        {isAddingProduct ? 'Add New Product' : 'Edit Product'}
                      </h3>
                      
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                          id="name" 
                          value={selectedProduct.name}
                          onChange={(e) => setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price ($)</Label>
                          <Input 
                            id="price" 
                            type="number"
                            step="0.01"
                            value={selectedProduct.price}
                            onChange={(e) => setSelectedProduct({
                              ...selectedProduct,
                              price: parseFloat(e.target.value)
                            })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="comparePrice">Compare At Price ($)</Label>
                          <Input 
                            id="comparePrice" 
                            type="number"
                            step="0.01"
                            value={selectedProduct.compareAtPrice || ''}
                            onChange={(e) => setSelectedProduct({
                              ...selectedProduct,
                              compareAtPrice: e.target.value ? parseFloat(e.target.value) : undefined
                            })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea 
                          id="description"
                          className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary"
                          value={selectedProduct.description}
                          onChange={(e) => setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input 
                          id="imageUrl" 
                          value={selectedProduct.imageUrl}
                          onChange={(e) => setSelectedProduct({
                            ...selectedProduct,
                            imageUrl: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input 
                          id="category" 
                          value={selectedProduct.category}
                          onChange={(e) => setSelectedProduct({
                            ...selectedProduct,
                            category: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input 
                            id="inStock" 
                            type="checkbox"
                            className="mr-2"
                            checked={selectedProduct.inStock}
                            onChange={(e) => setSelectedProduct({
                              ...selectedProduct,
                              inStock: e.target.checked
                            })}
                          />
                          <Label htmlFor="inStock">In Stock</Label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            id="featured" 
                            type="checkbox"
                            className="mr-2"
                            checked={selectedProduct.featured}
                            onChange={(e) => setSelectedProduct({
                              ...selectedProduct,
                              featured: e.target.checked
                            })}
                          />
                          <Label htmlFor="featured">Featured</Label>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Sync to Marketplaces</Label>
                        <div className="flex space-x-4 mt-2">
                          <div className="flex items-center">
                            <input 
                              id="syncEbay" 
                              type="checkbox"
                              className="mr-2"
                              checked={selectedProduct.syncedTo.includes('ebay')}
                              onChange={(e) => {
                                const syncedTo = [...selectedProduct.syncedTo];
                                if (e.target.checked) {
                                  if (!syncedTo.includes('ebay')) {
                                    syncedTo.push('ebay');
                                  }
                                } else {
                                  const index = syncedTo.indexOf('ebay');
                                  if (index !== -1) {
                                    syncedTo.splice(index, 1);
                                  }
                                }
                                setSelectedProduct({
                                  ...selectedProduct,
                                  syncedTo
                                });
                              }}
                            />
                            <Label htmlFor="syncEbay">eBay</Label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              id="syncAmazon" 
                              type="checkbox"
                              className="mr-2"
                              checked={selectedProduct.syncedTo.includes('amazon')}
                              onChange={(e) => {
                                const syncedTo = [...selectedProduct.syncedTo];
                                if (e.target.checked) {
                                  if (!syncedTo.includes('amazon')) {
                                    syncedTo.push('amazon');
                                  }
                                } else {
                                  const index = syncedTo.indexOf('amazon');
                                  if (index !== -1) {
                                    syncedTo.splice(index, 1);
                                  }
                                }
                                setSelectedProduct({
                                  ...selectedProduct,
                                  syncedTo
                                });
                              }}
                            />
                            <Label htmlFor="syncAmazon">Amazon</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setSelectedProduct(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-shop-primary hover:bg-shop-primary-dark"
                        >
                          {isAddingProduct ? 'Add Product' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Product</th>
                          <th className="text-left py-2">Price</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-right py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b">
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 mr-3">
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded" 
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.category}</div>
                                </div>
                              </div>
                            </td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                product.inStock 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Order Management</h2>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Orders</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="processing">Processing</TabsTrigger>
                      <TabsTrigger value="shipped">Shipped</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Order ID</th>
                            <th className="text-left py-2">Customer</th>
                            <th className="text-left py-2">Date</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-right py-2">Total</th>
                            <th className="text-right py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">ORD-123456</td>
                            <td>John Doe</td>
                            <td>May 15, 2023</td>
                            <td>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                Delivered
                              </span>
                            </td>
                            <td className="text-right">$149.98</td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">ORD-123457</td>
                            <td>Jane Smith</td>
                            <td>May 14, 2023</td>
                            <td>
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                Processing
                              </span>
                            </td>
                            <td className="text-right">$39.99</td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">ORD-123458</td>
                            <td>Robert Johnson</td>
                            <td>May 13, 2023</td>
                            <td>
                              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                Shipped
                              </span>
                            </td>
                            <td className="text-right">$89.97</td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TabsContent>
                    
                    {/* Other tabs would display filtered lists */}
                    <TabsContent value="pending">
                      <p className="text-center py-4 text-gray-500">No pending orders</p>
                    </TabsContent>
                    
                    <TabsContent value="processing">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Order ID</th>
                            <th className="text-left py-2">Customer</th>
                            <th className="text-left py-2">Date</th>
                            <th className="text-right py-2">Total</th>
                            <th className="text-right py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">ORD-123457</td>
                            <td>Jane Smith</td>
                            <td>May 14, 2023</td>
                            <td className="text-right">$39.99</td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TabsContent>
                    
                    <TabsContent value="shipped">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Order ID</th>
                            <th className="text-left py-2">Customer</th>
                            <th className="text-left py-2">Date</th>
                            <th className="text-right py-2">Total</th>
                            <th className="text-right py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">ORD-123458</td>
                            <td>Robert Johnson</td>
                            <td>May 13, 2023</td>
                            <td className="text-right">$89.97</td>
                            <td>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Customer Inquiries</h2>
                  
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Inquiry ID</th>
                        <th className="text-left py-2">Customer</th>
                        <th className="text-left py-2">Subject</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-right py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">INQ-001</td>
                        <td>John Doe</td>
                        <td>Order delivery issue</td>
                        <td>May 16, 2023</td>
                        <td>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            Open
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast.success('Response sent to customer!')}
                            >
                              Respond
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">INQ-002</td>
                        <td>Jane Smith</td>
                        <td>Product return request</td>
                        <td>May 15, 2023</td>
                        <td>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Resolved
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
