import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAppState } from '../AppStateManager';
import { 
  Battery, 
  MapPin, 
  Calendar, 
  Shield, 
  Wrench,
  Navigation as NavigationIcon,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingDown,
  Search
} from 'lucide-react';

export function CarefreeSpeedDashboard() {
  const { state } = useAppState();
  const { userData } = state;

  // Mock data for costs and SOH
  const monthlyElectricityCost = 127;
  const currentSOH = 94.2;
  const projectedSOH12Months = 91.8;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-2xl">Good morning, {userData.name}</h1>
        <p className="text-muted-foreground">
          Your {userData.carYear} {userData.carMake} {userData.carModel} is ready for today's adventures.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Cost Card */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Current Monthly Cost</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-medium">${monthlyElectricityCost}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Home Charging</div>
                    <div className="font-medium">$89 (70%)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Public Charging</div>
                    <div className="font-medium">$38 (30%)</div>
                  </div>
                </div>
                <div className="text-sm text-blue-700">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    12% lower than last month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SOH Estimation Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Battery Health (SOH)</CardTitle>
              <Battery className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current SOH</div>
                    <div className="text-2xl font-medium">{currentSOH}%</div>
                    <div className="text-xs text-green-600">Excellent condition</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">In 12 Months</div>
                    <div className="text-2xl font-medium">{projectedSOH12Months}%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -2.4% degradation
                    </div>
                  </div>
                </div>
                <Progress value={currentSOH} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Range: ~285 miles • Projected: ~270 miles in 12 months
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Service Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Next Service</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Annual Inspection</span>
                  <Badge variant="outline">In 2 months</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>March 15, 2024</span>
                  </div>
                  <div className="mt-1">
                    Estimated mileage: {(userData.mileage + 2000).toLocaleString()} miles
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Smart Route & Quick Actions */}
        <div className="space-y-6">
          {/* Smart Route Card */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Smart Route</CardTitle>
              <NavigationIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Best route to work</div>
                  <div className="text-muted-foreground flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>24 min • 18.5 miles</span>
                  </div>
                </div>
                <div className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-1">
                  Premium: Avoids construction on I-95
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Navigation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* EV Database */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">EV Database</CardTitle>
              <Search className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Explore New EVs</div>
                  <div className="text-muted-foreground">
                    Browse latest models and compare features
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-white rounded">
                    <div className="font-medium">150+</div>
                    <div className="text-muted-foreground">Models</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded">
                    <div className="font-medium">€25k+</div>
                    <div className="text-muted-foreground">Starting</div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  Browse EVs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Find Chargers</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Roadside</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">Plan Trip</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-1">
                  <Wrench className="h-4 w-4" />
                  <span className="text-xs">Maintenance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}