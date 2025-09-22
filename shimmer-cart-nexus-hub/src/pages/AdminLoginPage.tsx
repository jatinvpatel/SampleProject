
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in a real app this would validate against a backend
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('adminLoggedIn', 'true');
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8 border">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-shop-primary hover:bg-shop-primary-dark"
            >
              Log In
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">For demo purposes, use:</p>
            <p className="text-gray-600">Username: admin</p>
            <p className="text-gray-600">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
