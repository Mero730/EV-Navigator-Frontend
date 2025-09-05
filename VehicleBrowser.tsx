import React, { useState } from 'react';
import { Search, Filter, Zap, Users, MapPin, ChevronRight, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { VehicleDetail } from './VehicleDetail';
import { DrivingProfileWizard } from './DrivingProfileWizard';

// Mock vehicle data with enhanced information
const mockVehicles = [
  {
    id: 'tesla-model-y',
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    price: 55000,
    range: 515,
    acceleration: 6.6,
    chargingSpeed: 250,
    efficiency: 16.9,
    seating: 5,
    bodyType: 'SUV',
    drivetrain: 'AWD',
    description: 'Premium electric SUV with advanced autopilot and supercharging network.',
    suitableFor: ['Tech enthusiasts', 'Long commutes', 'Performance seekers'],
    bestFor: 'Long-range performance',
    percentile: 95,
    totalCostYear1: 62000,
    totalCostYear3: 68000,
    resaleValue: 75,
    chargingCost: 0.12,
    maintenanceCost: 450,
    category: 'Premium SUV',
    batteryCapacity: 75,
    acChargingPower: 11,
    dcChargingPower: 250,
    chargingPorts: ['CCS', 'Type 2'],
    plugAndCharge: true,
    v2l: false,
    v2g: false,
    cargoVolume: 854,
    towRating: 1600,
    length: 4751,
    width: 1921,
    height: 1624,
    wheelbase: 2890,
    groundClearance: 167,
    topSpeed: 217,
    power: 258,
    torque: 420,
    availability: 'available'
  },
  {
    id: 'vw-id4',
    make: 'Volkswagen',
    model: 'ID.4',
    year: 2024,
    price: 48000,
    range: 520,
    acceleration: 8.5,
    chargingSpeed: 135,
    efficiency: 16.3,
    seating: 5,
    bodyType: 'SUV',
    drivetrain: 'RWD',
    description: 'Practical electric SUV with excellent range and competitive pricing.',
    suitableFor: ['Families', 'Daily commuting', 'Value seekers'],
    bestFor: 'Value & range',
    percentile: 75,
    totalCostYear1: 53000,
    totalCostYear3: 57000,
    resaleValue: 62,
    chargingCost: 0.13,
    maintenanceCost: 500,
    category: 'Mid-range SUV',
    batteryCapacity: 77,
    acChargingPower: 11,
    dcChargingPower: 135,
    chargingPorts: ['CCS', 'Type 2'],
    plugAndCharge: true,
    v2l: false,
    v2g: false,
    cargoVolume: 543,
    towRating: 1200,
    length: 4584,
    width: 1852,
    height: 1612,
    wheelbase: 2766,
    groundClearance: 180,
    topSpeed: 160,
    power: 150,
    torque: 310,
    availability: 'available'
  },
  {
    id: 'hyundai-ioniq5',
    make: 'Hyundai',
    model: 'IONIQ 5',
    year: 2024,
    price: 52000,
    range: 481,
    acceleration: 7.4,
    chargingSpeed: 233,
    efficiency: 16.8,
    seating: 5,
    bodyType: 'SUV',
    drivetrain: 'RWD',
    description: 'Innovative electric SUV with ultra-fast charging and futuristic design.',
    suitableFor: ['Tech enthusiasts', 'Design lovers', 'Fast charging needs'],
    bestFor: 'Fast charging',
    percentile: 88,
    totalCostYear1: 57000,
    totalCostYear3: 61000,
    resaleValue: 72,
    chargingCost: 0.12,
    maintenanceCost: 480,
    category: 'Tech SUV',
    batteryCapacity: 72.6,
    acChargingPower: 11,
    dcChargingPower: 233,
    chargingPorts: ['CCS', 'Type 2'],
    plugAndCharge: false,
    v2l: true,
    v2g: false,
    cargoVolume: 527,
    towRating: 1600,
    length: 4635,
    width: 1890,
    height: 1605,
    wheelbase: 3000,
    groundClearance: 163,
    topSpeed: 185,
    power: 160,
    torque: 350,
    availability: 'available'
  },
  {
    id: 'bmw-ix',
    make: 'BMW',
    model: 'iX',
    year: 2024,
    price: 84000,
    range: 510,
    acceleration: 6.1,
    chargingSpeed: 195,
    efficiency: 20.5,
    seating: 5,
    bodyType: 'SUV',
    drivetrain: 'AWD',
    description: 'Innovative electric SUV with sustainable materials and advanced technology.',
    suitableFor: ['Eco-conscious buyers', 'Tech lovers', 'Luxury SUV seekers'],
    bestFor: 'Sustainable luxury',
    percentile: 85,
    totalCostYear1: 92000,
    totalCostYear3: 98000,
    resaleValue: 70,
    chargingCost: 0.14,
    maintenanceCost: 750,
    category: 'Luxury SUV',
    batteryCapacity: 105.2,
    acChargingPower: 11,
    dcChargingPower: 195,
    chargingPorts: ['CCS', 'Type 2'],
    plugAndCharge: true,
    v2l: false,
    v2g: false,
    cargoVolume: 500,
    towRating: 2500,
    length: 4953,
    width: 1967,
    height: 1696,
    wheelbase: 3000,
    groundClearance: 202,
    topSpeed: 200,
    power: 240,
    torque: 630,
    availability: 'available'
  },
  {
    id: 'polestar-2',
    make: 'Polestar',
    model: '2',
    year: 2024,
    price: 46000,
    range: 475,
    acceleration: 7.0,
    chargingSpeed: 150,
    efficiency: 17.2,
    seating: 5,
    bodyType: 'Sedan',
    drivetrain: 'RWD',
    description: 'Minimalist electric sedan with premium build quality and Google integration.',
    suitableFor: ['Design conscious', 'Tech users', 'Performance seekers'],
    bestFor: 'Design & tech',
    percentile: 78,
    totalCostYear1: 51000,
    totalCostYear3: 54000,
    resaleValue: 68,
    chargingCost: 0.13,
    maintenanceCost: 520,
    category: 'Premium Sedan',
    batteryCapacity: 78,
    acChargingPower: 11,
    dcChargingPower: 150,
    chargingPorts: ['CCS', 'Type 2'],
    plugAndCharge: true,
    v2l: false,
    v2g: false,
    cargoVolume: 405,
    towRating: 1500,
    length: 4606,
    width: 1859,
    height: 1479,
    wheelbase: 2735,
    groundClearance: 162,
    topSpeed: 205,
    power: 170,
    torque: 330,
    availability: 'available'
  },
  {
    id: 'nissan-leaf',
    make: 'Nissan',
    model: 'LEAF e+',
    year: 2024,
    price: 38000,
    range: 385,
    acceleration: 7.3,
    chargingSpeed: 100,
    efficiency: 18.5,
    seating: 5,
    bodyType: 'Hatchback',
    drivetrain: 'FWD',
    description: 'Affordable electric hatchback with proven reliability and practicality.',
    suitableFor: ['City driving', 'Budget conscious', 'First EV'],
    bestFor: 'Budget efficiency',
    percentile: 60,
    totalCostYear1: 42000,
    totalCostYear3: 44000,
    resaleValue: 55,
    chargingCost: 0.14,
    maintenanceCost: 420,
    category: 'Budget Hatchback',
    batteryCapacity: 62,
    acChargingPower: 6.6,
    dcChargingPower: 100,
    chargingPorts: ['CHAdeMO', 'Type 2'],
    plugAndCharge: false,
    v2l: false,
    v2g: true,
    cargoVolume: 435,
    towRating: 0,
    length: 4490,
    width: 1789,
    height: 1540,
    wheelbase: 2700,
    groundClearance: 157,
    topSpeed: 157,
    power: 160,
    torque: 340,
    availability: 'available'
  }
];

interface FilterState {
  // Simple Filters
  priceRange: [number, number];
  rangeType: 'wltp' | 'real-world';
  rangeFilter: [number, number];
  bodyType: string;
  seats: string;
  brand: string;
  drivetrain: string;
  availability: string;

  // Advanced Filters
  acceleration: [number, number];
  topSpeed: [number, number];
  power: [number, number];
  torque: [number, number];
  batteryCapacity: [number, number];
  acChargingPower: [number, number];
  dcChargingPower: [number, number];
  chargingPorts: string[];
  plugAndCharge: boolean | null;
  v2l: boolean | null;
  v2g: boolean | null;
  efficiency: [number, number];
  cargoVolume: [number, number];
  towRating: [number, number];
  dimensions: {
    length: [number, number];
    width: [number, number];
    height: [number, number];
  };
}

export function VehicleBrowser() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [viewMode, setViewMode] = useState<'grid' | 'comparison'>('grid');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [20000, 150000],
    rangeType: 'wltp',
    rangeFilter: [200, 600],
    bodyType: 'all',
    seats: 'all',
    brand: 'all',
    drivetrain: 'all',
    availability: 'all',
    acceleration: [3, 15],
    topSpeed: [120, 250],
    power: [50, 500],
    torque: [200, 800],
    batteryCapacity: [40, 120],
    acChargingPower: [3, 22],
    dcChargingPower: [50, 350],
    chargingPorts: [],
    plugAndCharge: null,
    v2l: null,
    v2g: null,
    efficiency: [12, 25],
    cargoVolume: [200, 1000],
    towRating: [0, 3000],
    dimensions: {
      length: [3500, 5500],
      width: [1600, 2100],
      height: [1400, 1800]
    }
  });

  const brands = [...new Set(mockVehicles.map(v => v.make))].sort();
  const bodyTypes = [...new Set(mockVehicles.map(v => v.bodyType))].sort();

  const filteredVehicles = mockVehicles
    .filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = vehicle.price >= filters.priceRange[0] && vehicle.price <= filters.priceRange[1];
      const range = filters.rangeType === 'wltp' ? vehicle.range : vehicle.range * 0.8; // Real-world ~80% of WLTP
      const matchesRange = range >= filters.rangeFilter[0] && range <= filters.rangeFilter[1];
      const matchesBodyType = filters.bodyType === 'all' || vehicle.bodyType.toLowerCase() === filters.bodyType;
      const matchesSeats = filters.seats === 'all' || 
        (filters.seats === '2' && vehicle.seating <= 2) ||
        (filters.seats === '4' && vehicle.seating <= 4) ||
        (filters.seats === '5' && vehicle.seating <= 5) ||
        (filters.seats === '7+' && vehicle.seating >= 7);
      const matchesBrand = filters.brand === 'all' || vehicle.make === filters.brand;
      const matchesDrivetrain = filters.drivetrain === 'all' || vehicle.drivetrain.toLowerCase() === filters.drivetrain;
      const matchesAvailability = filters.availability === 'all' || vehicle.availability === filters.availability;

      return matchesSearch && matchesPrice && matchesRange && matchesBodyType && 
             matchesSeats && matchesBrand && matchesDrivetrain && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'range': return b.range - a.range;
        case 'efficiency': return a.efficiency - b.efficiency;
        case 'power': return b.power - a.power;
        default: return 0;
      }
    });

  if (selectedVehicle) {
    const vehicle = mockVehicles.find(v => v.id === selectedVehicle);
    if (vehicle) {
      return <VehicleDetail vehicle={vehicle} onBack={() => setSelectedVehicle(null)} />;
    }
  }

  if (showWizard) {
    return <DrivingProfileWizard onComplete={() => setShowWizard(false)} onBack={() => setShowWizard(false)} />;
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredVehicles.map((vehicle) => (
        <Card key={vehicle.id} className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVehicle(vehicle.id)}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{vehicle.make} {vehicle.model}</CardTitle>
                <CardDescription>{vehicle.year} • {vehicle.bodyType} • {vehicle.drivetrain}</CardDescription>
              </div>
              <div className="text-right">
                <p className="font-semibold">€{vehicle.price.toLocaleString()}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {vehicle.bestFor}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{vehicle.range} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{vehicle.chargingSpeed} kW</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{vehicle.seating} seats</span>
              </div>
              <div className="text-sm text-muted-foreground">
                0-100: {vehicle.acceleration}s
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {vehicle.suitableFor.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderComparisonView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Vehicle Comparison
        </CardTitle>
        <CardDescription>
          Compare key metrics across all vehicles in your search
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer"
                 onClick={() => setSelectedVehicle(vehicle.id)}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold">{vehicle.make} {vehicle.model}</h4>
                  <p className="text-sm text-muted-foreground">
                    €{vehicle.price.toLocaleString()} • {vehicle.bestFor}
                  </p>
                </div>
                <Badge variant="outline">
                  {vehicle.category}
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Range</span>
                    <span className="text-sm font-medium">{vehicle.range} km</span>
                  </div>
                  <Progress value={(vehicle.range / 600) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Charging</span>
                    <span className="text-sm font-medium">{vehicle.chargingSpeed} kW</span>
                  </div>
                  <Progress value={(vehicle.chargingSpeed / 300) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Performance</span>
                    <span className="text-sm font-medium">{vehicle.acceleration}s</span>
                  </div>
                  <Progress value={((10 - vehicle.acceleration) / 7) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Efficiency</span>
                    <span className="text-sm font-medium">{vehicle.efficiency} kWh/100km</span>
                  </div>
                  <Progress value={((25 - vehicle.efficiency) / 10) * 100} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">EV Vehicle Database</h1>
            <p className="text-muted-foreground">
              Find the perfect electric vehicle for your needs
            </p>
          </div>
          <Button onClick={() => setShowWizard(true)} className="gap-2">
            <Zap className="h-4 w-4" />
            Vehicle Wizard
          </Button>
        </div>
        <Tabs defaultValue="simple" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="simple">Simple Filters (Quick Search)</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Filters (Detailed Search)</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'comparison' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('comparison')}
                >
                  Compare
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low-High)</SelectItem>
                  <SelectItem value="range">Range (High-Low)</SelectItem>
                  <SelectItem value="efficiency">Most Efficient</SelectItem>
                  <SelectItem value="power">Most Powerful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Simple Filters */}
          <TabsContent value="simple" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Quick Search Filters
                </CardTitle>
                <CardDescription>Intuitive filters for mainstream users who want to browse quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Price Range (€)</label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      max={150000}
                      min={20000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>€{filters.priceRange[0].toLocaleString()}</span>
                      <span>€{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Range</label>
                    <Select
                      value={filters.rangeType}
                      onValueChange={(value: 'wltp' | 'real-world') => 
                        setFilters(prev => ({ ...prev, rangeType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wltp">WLTP Rating</SelectItem>
                        <SelectItem value="real-world">Real-world</SelectItem>
                      </SelectContent>
                    </Select>
                    <Slider
                      value={filters.rangeFilter}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, rangeFilter: value as [number, number] }))}
                      max={600}
                      min={200}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.rangeFilter[0]} km</span>
                      <span>{filters.rangeFilter[1]} km</span>
                    </div>
                  </div>

                  {/* Body Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Body Type</label>
                    <Select
                      value={filters.bodyType}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, bodyType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seats */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Seats</label>
                    <Select
                      value={filters.seats}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, seats: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="4">Up to 4 seats</SelectItem>
                        <SelectItem value="5">Up to 5 seats</SelectItem>
                        <SelectItem value="7+">7+ seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Brand / Manufacturer</label>
                    <Select
                      value={filters.brand}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Drivetrain */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Drivetrain</label>
                    <Select
                      value={filters.drivetrain}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, drivetrain: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="fwd">FWD</SelectItem>
                        <SelectItem value="rwd">RWD</SelectItem>
                        <SelectItem value="awd">AWD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Availability</label>
                    <Select
                      value={filters.availability}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="available">On Sale</SelectItem>
                        <SelectItem value="preorder">Pre-order</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Filters */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Performance & Powertrain */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance & Powertrain</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Acceleration (0-100 km/h)</label>
                    <Slider
                      value={filters.acceleration}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, acceleration: value as [number, number] }))}
                      max={15}
                      min={3}
                      step={0.1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.acceleration[0]}s</span>
                      <span>{filters.acceleration[1]}s</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Top Speed (km/h)</label>
                    <Slider
                      value={filters.topSpeed}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, topSpeed: value as [number, number] }))}
                      max={250}
                      min={120}
                      step={5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.topSpeed[0]} km/h</span>
                      <span>{filters.topSpeed[1]} km/h</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Power Output (kW)</label>
                    <Slider
                      value={filters.power}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, power: value as [number, number] }))}
                      max={500}
                      min={50}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.power[0]} kW</span>
                      <span>{filters.power[1]} kW</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Torque (Nm)</label>
                    <Slider
                      value={filters.torque}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, torque: value as [number, number] }))}
                      max={800}
                      min={200}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.torque[0]} Nm</span>
                      <span>{filters.torque[1]} Nm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Battery & Charging */}
              <Card>
                <CardHeader>
                  <CardTitle>Battery & Charging</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Battery Capacity (kWh usable)</label>
                    <Slider
                      value={filters.batteryCapacity}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, batteryCapacity: value as [number, number] }))}
                      max={120}
                      min={40}
                      step={5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.batteryCapacity[0]} kWh</span>
                      <span>{filters.batteryCapacity[1]} kWh</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">AC Charging Power (kW max)</label>
                    <Slider
                      value={filters.acChargingPower}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, acChargingPower: value as [number, number] }))}
                      max={22}
                      min={3}
                      step={0.5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.acChargingPower[0]} kW</span>
                      <span>{filters.acChargingPower[1]} kW</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">DC Charging Power (kW max)</label>
                    <Slider
                      value={filters.dcChargingPower}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, dcChargingPower: value as [number, number] }))}
                      max={350}
                      min={50}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.dcChargingPower[0]} kW</span>
                      <span>{filters.dcChargingPower[1]} kW</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Charging Port Type</label>
                    <div className="flex flex-wrap gap-2">
                      {['Type 2', 'CCS', 'CHAdeMO', 'NACS'].map((port) => (
                        <div key={port} className="flex items-center space-x-2">
                          <Checkbox 
                            id={port}
                            checked={filters.chargingPorts.includes(port)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  chargingPorts: [...prev.chargingPorts, port] 
                                }));
                              } else {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  chargingPorts: prev.chargingPorts.filter(p => p !== port) 
                                }));
                              }
                            }}
                          />
                          <label htmlFor={port} className="text-sm">{port}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Special Features</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="plugAndCharge"
                          checked={filters.plugAndCharge === true}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({ ...prev, plugAndCharge: checked ? true : null }));
                          }}
                        />
                        <label htmlFor="plugAndCharge" className="text-sm">Plug & Charge Support</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="v2l"
                          checked={filters.v2l === true}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({ ...prev, v2l: checked ? true : null }));
                          }}
                        />
                        <label htmlFor="v2l" className="text-sm">Vehicle-to-Load (V2L)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="v2g"
                          checked={filters.v2g === true}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({ ...prev, v2g: checked ? true : null }));
                          }}
                        />
                        <label htmlFor="v2g" className="text-sm">Vehicle-to-Grid (V2G)</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Practicality & Dimensions */}
              <Card>
                <CardHeader>
                  <CardTitle>Practicality & Dimensions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Efficiency (kWh/100km)</label>
                    <Slider
                      value={filters.efficiency}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, efficiency: value as [number, number] }))}
                      max={25}
                      min={12}
                      step={0.5}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.efficiency[0]} kWh/100km</span>
                      <span>{filters.efficiency[1]} kWh/100km</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cargo Volume (liters)</label>
                    <Slider
                      value={filters.cargoVolume}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, cargoVolume: value as [number, number] }))}
                      max={1000}
                      min={200}
                      step={25}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.cargoVolume[0]} L</span>
                      <span>{filters.cargoVolume[1]} L</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tow Rating (kg)</label>
                    <Slider
                      value={filters.towRating}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, towRating: value as [number, number] }))}
                      max={3000}
                      min={0}
                      step={100}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.towRating[0]} kg</span>
                      <span>{filters.towRating[1]} kg</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Length (mm)</label>
                    <Slider
                      value={filters.dimensions.length}
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        dimensions: { ...prev.dimensions, length: value as [number, number] } 
                      }))}
                      max={5500}
                      min={3500}
                      step={50}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{filters.dimensions.length[0]} mm</span>
                      <span>{filters.dimensions.length[1]} mm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredVehicles.length} of {mockVehicles.length} vehicles
            </p>
          </div>

          {viewMode === 'grid' ? renderGridView() : renderComparisonView()}
        </div>
      </div>
    </div>
  );
}