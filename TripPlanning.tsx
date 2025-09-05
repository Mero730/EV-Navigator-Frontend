import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { 
  Map, 
  MapPin, 
  Zap, 
  Clock, 
  Battery,
  Route,
  Navigation as NavigationIcon,
  Car,
  Fuel,
  ExternalLink,
  Filter,
  Euro,
  CreditCard
} from 'lucide-react';

export function TripPlanning() {
  const [fromLocation, setFromLocation] = useState('Zürich, Switzerland');
  const [toLocation, setToLocation] = useState('Geneva, Switzerland');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  
  // Charging filters
  const [filters, setFilters] = useState({
    provider: 'all',
    authType: 'all',
    plugType: 'all',
    minPower: 'all',
    freeOnly: false
  });

  const handleCalculateRoute = () => {
    setIsCalculating(true);
    setShowRouteDetails(false);
    setCalculationProgress(0);

    const interval = setInterval(() => {
      setCalculationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCalculating(false);
          setShowRouteDetails(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateMapsLink = (service: 'apple' | 'google') => {
    const origin = encodeURIComponent(fromLocation);
    const destination = encodeURIComponent(toLocation);
    
    if (service === 'apple') {
      return `maps://maps.apple.com/?saddr=${origin}&daddr=${destination}&dirflg=d`;
    } else {
      return `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&dirflg=`;
    }
  };

  // Mock route data for ID.3 Zürich to Geneva (metric units)
  const routeData = {
    vehicle: 'Volkswagen ID.3',
    totalDistance: 279,
    startSOC: 85,
    endSOC: 30,
    totalConsumption: 45.2,
    chargingStop: {
      location: 'Bern Charging Hub',
      arrivalSOC: 16,
      departureSOC: 80,
      chargingTime: 36,
      chargingPower: 150
    },
    estimatedTime: '3h 42min',
    energyCost: 18.50
  };

  // Mock Swiss charging providers
  const providers = [
    {
      name: 'IONITY',
      locations: 25,
      avgPrice: 0.79,
      maxPower: 350,
      subscription: { monthly: 17.99, pricePerKwh: 0.35 },
      authTypes: ['RFID', 'App', 'Plug&Charge']
    },
    {
      name: 'Swisscharge',
      locations: 180,
      avgPrice: 0.42,
      maxPower: 150,
      subscription: { monthly: 12.00, pricePerKwh: 0.32 },
      authTypes: ['RFID', 'App']
    },
    {
      name: 'Tesla Supercharger',
      locations: 45,
      avgPrice: 0.52,
      maxPower: 250,
      subscription: null,
      authTypes: ['Tesla App', 'Plug&Charge']
    },
    {
      name: 'Fastned',
      locations: 12,
      avgPrice: 0.69,
      maxPower: 300,
      subscription: { monthly: 11.99, pricePerKwh: 0.45 },
      authTypes: ['RFID', 'App', 'Contactless']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Route & Charging Planning</h1>
        <p className="text-muted-foreground">
          Plan your route with optimal charging stops and compare charging networks
        </p>
      </div>

      <Tabs defaultValue="planning" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planning">Route Planning</TabsTrigger>
          <TabsTrigger value="charging-map">Charging Map</TabsTrigger>
          <TabsTrigger value="providers">Provider Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Route Input and Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Route className="h-5 w-5" />
                    <span>Route Planning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">From</Label>
                      <Input
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        placeholder="Start location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">To</Label>
                      <Input
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        placeholder="Destination"
                      />
                    </div>
                  </div>
                  
                  {isCalculating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Calculating optimal route...</span>
                      </div>
                      <Progress value={calculationProgress} className="h-2" />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleCalculateRoute} 
                      className="flex-1"
                      disabled={isCalculating}
                    >
                      {isCalculating ? 'Calculating...' : 'Calculate Route'}
                    </Button>
                  </div>

                  {showRouteDetails && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(generateMapsLink('apple'), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Apple Maps
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(generateMapsLink('google'), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Google Maps
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Map className="h-5 w-5" />
                    <span>Route Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center relative">
                    <div className="text-center text-muted-foreground">
                      <Map className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive route map will display here</p>
                      <p className="text-sm">Showing charging stations and route alternatives</p>
                    </div>
                    
                    {/* Mock charging stations */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Fast Charger (150kW+)
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Rapid Charger (50-150kW)
                      </Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        Destination Charger (22kW)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Route Details */}
            <div className="space-y-6">
              {/* Route Details */}
              {showRouteDetails && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Car className="h-5 w-5" />
                      <span>Route Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vehicle Image Placeholder */}
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Car className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm font-medium text-blue-800">{routeData.vehicle}</div>
                      </div>
                    </div>

                    {/* Trip Summary */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Distance</div>
                          <div className="font-medium">{routeData.totalDistance} km</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Time</div>
                          <div className="font-medium">{routeData.estimatedTime}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Start SOC</div>
                          <div className="font-medium flex items-center">
                            <Battery className="h-3 w-3 mr-1 text-green-600" />
                            {routeData.startSOC}%
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">End SOC</div>
                          <div className="font-medium flex items-center">
                            <Battery className="h-3 w-3 mr-1 text-orange-600" />
                            {routeData.endSOC}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Consumption</div>
                          <div className="font-medium">{routeData.totalConsumption} kWh</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Energy Cost</div>
                          <div className="font-medium">CHF {routeData.energyCost}</div>
                        </div>
                      </div>
                    </div>

                    {/* Charging Stop */}
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">Charging Stop</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="font-medium">{routeData.chargingStop.location}</div>
                        <div className="text-muted-foreground">
                          {routeData.chargingStop.arrivalSOC}% → {routeData.chargingStop.departureSOC}% 
                          • {routeData.chargingStop.chargingTime} min
                        </div>
                        <div className="text-muted-foreground">
                          {routeData.chargingStop.chargingPower} kW charging
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <NavigationIcon className="h-3 w-3 mr-1" />
                        Start Trip
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Save Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="charging-map" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select value={filters.provider} onValueChange={(value) => setFilters(prev => ({ ...prev, provider: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      <SelectItem value="ionity">IONITY</SelectItem>
                      <SelectItem value="swisscharge">Swisscharge</SelectItem>
                      <SelectItem value="tesla">Tesla</SelectItem>
                      <SelectItem value="fastned">Fastned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Authentication</Label>
                  <Select value={filters.authType} onValueChange={(value) => setFilters(prev => ({ ...prev, authType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="app">App Only</SelectItem>
                      <SelectItem value="rfid">RFID Card</SelectItem>
                      <SelectItem value="contactless">Contactless</SelectItem>
                      <SelectItem value="plug-charge">Plug & Charge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Plug Type</Label>
                  <Select value={filters.plugType} onValueChange={(value) => setFilters(prev => ({ ...prev, plugType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plugs</SelectItem>
                      <SelectItem value="ccs">CCS</SelectItem>
                      <SelectItem value="chademo">CHAdeMO</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="tesla">Tesla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Power</Label>
                  <Select value={filters.minPower} onValueChange={(value) => setFilters(prev => ({ ...prev, minPower: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Power</SelectItem>
                      <SelectItem value="50">50+ kW</SelectItem>
                      <SelectItem value="100">100+ kW</SelectItem>
                      <SelectItem value="150">150+ kW</SelectItem>
                      <SelectItem value="200">200+ kW</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="freeOnly"
                    checked={filters.freeOnly}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, freeOnly: checked }))}
                  />
                  <Label htmlFor="freeOnly">Free charging only</Label>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Map className="h-5 w-5" />
                    <span>Swiss Charging Network</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center relative">
                    <div className="text-center text-muted-foreground">
                      <Map className="h-12 w-12 mx-auto mb-2" />
                      <p>Swiss charging network map will display here</p>
                      <p className="text-sm">API integration with charging station data</p>
                    </div>
                    
                    {/* Mock status indicators */}
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-xs space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Available (247)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>In Use (89)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Out of Order (12)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{provider.name}</span>
                    <Badge variant="outline">{provider.locations} locations</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Avg. Price</div>
                      <div className="font-medium">CHF {provider.avgPrice}/kWh</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Max Power</div>
                      <div className="font-medium">{provider.maxPower} kW</div>
                    </div>
                  </div>
                  
                  {provider.subscription && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="font-medium text-sm">Subscription</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>CHF {provider.subscription.monthly}/month</div>
                        <div>CHF {provider.subscription.pricePerKwh}/kWh with subscription</div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Authentication</div>
                    <div className="flex flex-wrap gap-1">
                      {provider.authTypes.map((auth, authIndex) => (
                        <Badge key={authIndex} variant="secondary" className="text-xs">
                          {auth}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}