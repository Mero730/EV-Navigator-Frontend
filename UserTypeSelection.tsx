import React from 'react';
import { useAppState } from './AppStateManager';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Car, Search, Zap, TrendingUp, Shield, BarChart3 } from 'lucide-react';

export function UserTypeSelection() {
  const { selectUserType } = useAppState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2">Welcome to EV Manager</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your path to get started with comprehensive EV management and insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* EV Owner */}
          <Card className="relative overflow-hidden transition-all hover:shadow-lg cursor-pointer group" 
                onClick={() => selectUserType('owner')}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>EV Owner</CardTitle>
              </div>
              <CardDescription>
                Manage your existing electric vehicle with comprehensive tracking and optimization tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Vehicle health monitoring & SOH tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Cost optimization & financial insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Warranty tracking & maintenance alerts</span>
                </div>
              </div>
              <Button className="w-full group-hover:bg-blue-700 transition-colors">
                Access Owner Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Prospective Buyer */}
          <Card className="relative overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
                onClick={() => selectUserType('buyer')}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-16 translate-x-16" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Prospective Buyer</CardTitle>
              </div>
              <CardDescription>
                Explore and compare electric vehicles to find the perfect match for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Advanced filtering & vehicle comparison</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Personalized recommendations wizard</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Detailed specs & performance analysis</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                Browse Vehicle Database
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            You can always switch between modes later from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}