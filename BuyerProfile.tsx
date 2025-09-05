import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAppState } from './AppStateManager';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Heart,
  Star,
  Eye
} from 'lucide-react';

export function BuyerProfile() {
  const { logout } = useAppState();

  // Mock user profile data
  const userProfile = {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    phone: "+41 76 123 45 67",
    location: "Zürich, Switzerland",
    memberSince: "January 2024",
    preferences: {
      budget: "€40k - €60k",
      bodyType: "SUV, Sedan",
      range: "400+ km",
      brand: "Tesla, BMW, Audi"
    },
    savedVehicles: 8,
    comparisons: 3,
    testDrives: 2
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                  <p className="text-muted-foreground">Member since {userProfile.memberSince}</p>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userProfile.savedVehicles}</div>
                <div className="text-sm text-muted-foreground">Saved Vehicles</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProfile.comparisons}</div>
                <div className="text-sm text-muted-foreground">Active Comparisons</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userProfile.testDrives}</div>
                <div className="text-sm text-muted-foreground">Test Drives Booked</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                <div className="mt-1">
                  <Badge variant="outline">{userProfile.preferences.budget}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Preferred Body Types</label>
                <div className="mt-1">
                  <Badge variant="outline">{userProfile.preferences.bodyType}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Minimum Range</label>
                <div className="mt-1">
                  <Badge variant="outline">{userProfile.preferences.range}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Preferred Brands</label>
                <div className="mt-1">
                  <Badge variant="outline">{userProfile.preferences.brand}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">
                Update Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">New vehicle releases</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Price changes</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Test drive reminders</span>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor authentication</span>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data privacy settings</span>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Download my data</span>
                <Button variant="outline" size="sm">Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing & Payments
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="destructive" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}