import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Settings,
  BarChart3,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockRides = [
  { id: '#12345', customer: 'John Doe', driver: 'Mike Smith', from: '123 Main St', to: '456 Oak Ave', status: 'completed', amount: '$24.50', time: '2:30 PM' },
  { id: '#12346', customer: 'Jane Wilson', driver: 'Sarah Johnson', from: 'Airport Terminal', to: 'Downtown Hotel', status: 'in-progress', amount: '$45.20', time: '3:15 PM' },
  { id: '#12347', customer: 'Bob Brown', driver: 'David Lee', from: 'City Mall', to: 'Residential Area', status: 'pending', amount: '$18.75', time: '3:45 PM' },
];

const mockDrivers = [
  { id: 'D001', name: 'Mike Smith', vehicle: 'Toyota Camry', status: 'available', rating: 4.8, rides: 234 },
  { id: 'D002', name: 'Sarah Johnson', vehicle: 'Honda Accord', status: 'busy', rating: 4.9, rides: 189 },
  { id: 'D003', name: 'David Lee', vehicle: 'Nissan Altima', status: 'offline', rating: 4.7, rides: 167 },
];

const mockStats = [
  { title: 'Total Rides Today', value: '1,234', icon: MapPin, change: '+12%' },
  { title: 'Active Drivers', value: '89', icon: Users, change: '+5%' },
  { title: 'Revenue Today', value: '$12,450', icon: DollarSign, change: '+8%' },
  { title: 'Customer Satisfaction', value: '4.8★', icon: BarChart3, change: '+0.2' },
];

const AdminPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Goovista operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {mockStats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="rides" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rides">Rides</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="rides" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Rides</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search rides..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Ride ID</th>
                          <th className="text-left p-4">Customer</th>
                          <th className="text-left p-4">Driver</th>
                          <th className="text-left p-4">Route</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Amount</th>
                          <th className="text-left p-4">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockRides.map((ride) => (
                          <tr key={ride.id} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{ride.id}</td>
                            <td className="p-4">{ride.customer}</td>
                            <td className="p-4">{ride.driver}</td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{ride.from}</div>
                                <div className="text-muted-foreground">→ {ride.to}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(ride.status)}>
                                {ride.status}
                              </Badge>
                            </td>
                            <td className="p-4 font-medium">{ride.amount}</td>
                            <td className="p-4">{ride.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drivers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Driver Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockDrivers.map((driver) => (
                      <Card key={driver.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Car className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{driver.name}</h3>
                                <p className="text-sm text-muted-foreground">{driver.id}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(driver.status)}>
                              {driver.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Vehicle:</span>
                              <span>{driver.vehicle}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rating:</span>
                              <span>{driver.rating}★</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Rides:</span>
                              <span>{driver.rides}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Contact
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Analytics charts coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Peak Hours</h4>
                        <p className="text-sm text-muted-foreground">5-7 PM, 8-10 AM</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Popular Routes</h4>
                        <p className="text-sm text-muted-foreground">Airport → Downtown</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Customer Retention</h4>
                        <p className="text-sm text-muted-foreground">89% monthly retention</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🚕 Surge Pricing</h4>
                      <p className="text-sm text-muted-foreground mb-2">Currently: Disabled</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">📱 Driver App Settings</h4>
                      <p className="text-sm text-muted-foreground mb-2">Version: 2.1.0</p>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🔔 Notifications</h4>
                      <p className="text-sm text-muted-foreground mb-2">Email & SMS enabled</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">👥 Admin Users</h4>
                      <p className="text-sm text-muted-foreground mb-2">3 active administrators</p>
                      <Button variant="outline" size="sm">Manage Users</Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">🔐 Security</h4>
                      <p className="text-sm text-muted-foreground mb-2">2FA enabled</p>
                      <Button variant="outline" size="sm">Security Settings</Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">📊 Data Export</h4>
                      <p className="text-sm text-muted-foreground mb-2">Last export: Yesterday</p>
                      <Button variant="outline" size="sm">Export Data</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;