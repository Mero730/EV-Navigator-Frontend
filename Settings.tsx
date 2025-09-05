import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Lock, 
  Car, 
  Route, 
  DollarSign, 
  Shield, 
  Globe,
  Bell,
  MapPin,
  Zap,
  Save
} from 'lucide-react';

export function Settings() {
  const [activeSection, setActiveSection] = useState('account');
  const [language, setLanguage] = useState('EN');

  const menuItems = [
    { id: 'account', icon: User, label: 'Account Information' },
    { id: 'security', icon: Lock, label: 'Security & Privacy' },
    { id: 'vehicle', icon: Car, label: 'Vehicle Information' },
    { id: 'preferences', icon: Route, label: 'Route Planning' },
    { id: 'financial', icon: DollarSign, label: 'Financial Information' },
    { id: 'warranty', icon: Shield, label: 'Warranty & Support' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'language', icon: Globe, label: 'Language & Region' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Max" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Mustermann" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="max.mustermann@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+41 76 123 45 67" />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" defaultValue="8001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Zürich" />
                  </div>
                </div>
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Password & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="outline">Change Password</Button>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">SMS Authentication</p>
                      <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Receive codes via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'vehicle':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Vehicle Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Select defaultValue="volkswagen">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volkswagen">Volkswagen</SelectItem>
                        <SelectItem value="tesla">Tesla</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" defaultValue="ID.4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" defaultValue="2022" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Current Mileage (km)</Label>
                    <Input id="mileage" type="number" defaultValue="25000" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Charging Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="homeCharger">Home Charger</Label>
                      <Select defaultValue="11kw">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No home charger</SelectItem>
                          <SelectItem value="3.7kw">3.7kW AC</SelectItem>
                          <SelectItem value="7kw">7kW AC</SelectItem>
                          <SelectItem value="11kw">11kW AC</SelectItem>
                          <SelectItem value="22kw">22kW AC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chargingBehavior">Charging Preference</Label>
                      <Select defaultValue="overnight">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overnight">Overnight charging</SelectItem>
                          <SelectItem value="fast">Fast charging when needed</SelectItem>
                          <SelectItem value="mixed">Mixed approach</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Update Vehicle Info</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="h-5 w-5" />
                  <span>Route Planning Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Prioritize Charging Stations</p>
                      <p className="text-sm text-muted-foreground">Include charging stops in route planning</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Avoid Highways</p>
                      <p className="text-sm text-muted-foreground">Prefer scenic routes over highways</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Real-time Traffic</p>
                      <p className="text-sm text-muted-foreground">Use live traffic data for routing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bufferCharge">Safety Charge Buffer (%)</Label>
                    <Input id="bufferCharge" type="number" defaultValue="20" />
                    <p className="text-xs text-muted-foreground">Minimum charge to maintain during trips</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxDetour">Max Detour for Charging (km)</Label>
                    <Input id="maxDetour" type="number" defaultValue="15" />
                    <p className="text-xs text-muted-foreground">Maximum acceptable detour for preferred stations</p>
                  </div>
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Preferences</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'financial':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Financial Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Vehicle Purchase Price (CHF)</Label>
                    <Input id="purchasePrice" type="number" defaultValue="45000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Purchase Date</Label>
                    <Input id="purchaseDate" type="date" defaultValue="2022-03-15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="homeElectricity">Home Electricity Rate (CHF/kWh)</Label>
                    <Input id="homeElectricity" type="number" step="0.01" defaultValue="0.21" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select defaultValue="chf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chf">Swiss Franc (CHF)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Insurance & Financing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Annual Insurance (CHF)</Label>
                      <Input id="insurance" type="number" defaultValue="1200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="financing">Monthly Loan Payment (CHF)</Label>
                      <Input id="financing" type="number" defaultValue="650" />
                    </div>
                  </div>
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Update Financial Info</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'warranty':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Warranty & Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Vehicle Warranty</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expires:</span>
                          <span>March 15, 2025</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Mileage Limit:</span>
                          <span>100,000 km</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Battery Warranty</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expires:</span>
                          <span>March 15, 2030</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">SOH Threshold:</span>
                          <span>70%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Support Contacts</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Dealer:</span>
                          <p>VW Center Zürich</p>
                          <p>+41 44 123 45 67</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Roadside Assistance:</span>
                          <p>24/7 Emergency</p>
                          <p>+41 800 123 456</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Download Warranty Certificate
                      </Button>
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Charging Notifications</p>
                      <p className="text-sm text-muted-foreground">Alerts when charging is complete</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Battery Health Alerts</p>
                      <p className="text-sm text-muted-foreground">Notifications about SOH changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Maintenance Reminders</p>
                      <p className="text-sm text-muted-foreground">Service and maintenance scheduling</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Trip Planning Updates</p>
                      <p className="text-sm text-muted-foreground">Route and charging station updates</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Product updates and promotions</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-xs text-muted-foreground">Primary method</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">SMS</p>
                        <p className="text-xs text-muted-foreground">Urgent only</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Push</p>
                        <p className="text-xs text-muted-foreground">Mobile app</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Notification Settings</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'language':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Language & Region</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Display Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EN">English</SelectItem>
                        <SelectItem value="DE">Deutsch</SelectItem>
                        <SelectItem value="FR">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select defaultValue="ch">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ch">Switzerland</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="at">Austria</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="units">Unit System</Label>
                    <Select defaultValue="metric">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (km, kWh)</SelectItem>
                        <SelectItem value="imperial">Imperial (mi, kWh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Location Services</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Auto-detect Location</p>
                      <p className="text-sm text-muted-foreground">For weather and local charging stations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Apply Language Settings</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <div>Select a section from the menu</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, vehicle, and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1 p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}