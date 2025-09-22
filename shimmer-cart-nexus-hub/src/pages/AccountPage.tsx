
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data for orders
const orders = [
  {
    id: 'ORD-123456',
    date: '2023-05-15',
    total: 149.98,
    status: 'Delivered',
    items: [
      { name: 'Premium Wireless Headphones', price: 199.99, quantity: 1 },
      { name: 'Organic Cotton T-Shirt', price: 29.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-123457',
    date: '2023-04-20',
    total: 39.99,
    status: 'Processing',
    items: [
      { name: 'Wireless Charging Pad', price: 39.99, quantity: 1 }
    ]
  }
];

const AccountPage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password updated successfully!');
    setPassword('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium text-lg mb-4">Welcome, {name}</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-shop-primary text-white' : 'hover:bg-gray-100'}`}
                  >
                    Profile
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
                    Inquiries
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Personal Information</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info">
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      
                      <Button type="submit" className="bg-shop-primary hover:bg-shop-primary-dark">
                        Update Profile
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <Button type="submit" className="bg-shop-primary hover:bg-shop-primary-dark">
                        Update Password
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <a href="/products">Start Shopping</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-gray-500 text-sm">Placed on {order.date}</p>
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-500 ml-2">x{item.quantity}</span>
                              </div>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t mt-4 pt-4 flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-semibold">${order.total.toFixed(2)}</span>
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Submit Inquiry
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Support Inquiries</h2>
                
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="order-id">Order ID (optional)</Label>
                    <Input id="order-id" placeholder="e.g. ORD-123456" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is your inquiry about?" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message" 
                      className="w-full min-h-[150px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-shop-primary" 
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>
                  
                  <Button 
                    className="bg-shop-primary hover:bg-shop-primary-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success('Your inquiry has been submitted!');
                    }}
                  >
                    Submit Inquiry
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
