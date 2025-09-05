import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Search,
  Star,
  Clock,
  TrendingUp,
  Zap,
  Users,
  MapPin,
  Car,
  BarChart3,
  Calendar,
  Calculator
} from 'lucide-react';

interface BuyerHomeProps {
  onNavigateToDatabase: () => void;
}

export function BuyerHome({ onNavigateToDatabase }: BuyerHomeProps) {
  const recentlyViewed = [
    { id: 1, name: "Tesla Model Y", price: "€55,000", range: "515 km", saved: true },
    { id: 2, name: "BMW iX", price: "€84,000", range: "510 km", saved: false },
    { id: 3, name: "Hyundai IONIQ 5", price: "€52,000", range: "481 km", saved: true }
  ];

  const popularVehicles = [
    { id: 1, name: "Tesla Model 3", viewCount: "2.1k", trend: "+12%" },
    { id: 2, name: "VW ID.4", viewCount: "1.8k", trend: "+8%" },
    { id: 3, name: "BMW i4", viewCount: "1.6k", trend: "+15%" }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl">Welcome to the EV Database</h1>
          <p className="text-muted-foreground text-lg">
            Discover, compare, and find your perfect electric vehicle
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Car className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-sm text-muted-foreground">Vehicle Models</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm text-muted-foreground">Comparison Metrics</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-sm text-muted-foreground">User Reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Search className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">Real-time</div>
                  <div className="text-sm text-muted-foreground">Price Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Search */}
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Find Your Perfect EV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Use our advanced filters to find the perfect electric vehicle for your needs
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={onNavigateToDatabase} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4 mr-2" />
                      Browse Database
                    </Button>
                    <Button variant="outline" onClick={onNavigateToDatabase}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Compare Vehicles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recently Viewed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentlyViewed.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gray-200 rounded"></div>
                        <div>
                          <div className="font-medium">{vehicle.name}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.price} • {vehicle.range}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {vehicle.saved && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Saved
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Compare */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Vehicle Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <Car className="h-5 w-5" />
                    <span className="text-xs">Budget EVs</span>
                    <span className="text-xs text-muted-foreground">€20k-40k</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <Zap className="h-5 w-5" />
                    <span className="text-xs">Long Range</span>
                    <span className="text-xs text-muted-foreground">500+ km</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Family SUVs</span>
                    <span className="text-xs text-muted-foreground">5+ seats</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <MapPin className="h-5 w-5" />
                    <span className="text-xs">Fast Charging</span>
                    <span className="text-xs text-muted-foreground">150+ kW</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-xs">Performance</span>
                    <span className="text-xs text-muted-foreground">0-100 &lt;6s</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-1" onClick={onNavigateToDatabase}>
                    <Star className="h-5 w-5" />
                    <span className="text-xs">Luxury</span>
                    <span className="text-xs text-muted-foreground">Premium</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trending & Tools */}
          <div className="space-y-6">
            {/* Trending Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularVehicles.map((vehicle, index) => (
                    <div key={vehicle.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{vehicle.name}</div>
                          <div className="text-xs text-muted-foreground">{vehicle.viewCount} views</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {vehicle.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Average EV Price</span>
                    <span className="font-medium">€52,000</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">+3% vs last quarter</div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Average Range</span>
                    <span className="font-medium">420 km</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">+8% vs last year</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Charging Speed</span>
                    <span className="font-medium">165 kW avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">+12% vs last year</div>
                </div>
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Helpful Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    Cost Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Test Drive Booking
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Charging Station Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}