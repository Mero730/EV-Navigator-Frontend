import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Car, ShoppingCart, Users, Search, Zap, BarChart3 } from 'lucide-react';

interface PlatformSelectionProps {
  onSelectPlatform: (platform: 'owner' | 'buyer') => void;
}

export function PlatformSelection({ onSelectPlatform }: PlatformSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">EV Management Platform</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your platform to access tailored features for your EV journey
          </p>
        </div>

        {/* Platform Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Owner Platform */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">EV Owner</CardTitle>
              <CardDescription className="text-base">
                Manage your existing electric vehicle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Vehicle health monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Charging optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Trip planning & routes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Personalized dashboard</span>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Perfect for:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Current EV owners</li>
                  <li>• Fleet managers</li>
                  <li>• Maximizing vehicle efficiency</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onSelectPlatform('owner')}
              >
                Access Owner Platform
              </Button>
            </CardContent>
          </Card>

          {/* Buyer Platform */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">EV Buyer</CardTitle>
              <CardDescription className="text-base">
                Find and compare electric vehicles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Comprehensive EV database</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Performance comparisons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Buying recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Personalized matching</span>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Perfect for:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Prospective EV buyers</li>
                  <li>• First-time EV purchasers</li>
                  <li>• Market researchers</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onSelectPlatform('buyer')}
              >
                Access Buyer Platform
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help choosing? Contact our support team for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}