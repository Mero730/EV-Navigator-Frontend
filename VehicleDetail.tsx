import React, { useState } from 'react';
import { ArrowLeft, Award, BarChart3, MapPin, Zap, Gauge, Fuel, Users, ExternalLink, ChevronDown, ThermometerSun, Snowflake, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SwissEnergyLabel } from './SwissEnergyLabel';
import { ChargingCalculator } from './ChargingCalculator';
import { LongDistanceDiagram } from './LongDistanceDiagram';
import { EnhancedCostAnalysis } from './EnhancedCostAnalysis';
import { EnvironmentalCalculator } from './EnvironmentalCalculator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  range: number;
  acceleration: number;
  chargingSpeed: number;
  efficiency: number;
  seating: number;
  bodyType: string;
  drivetrain: string;
  image: string;
  rating: number;
  description: string;
  suitableFor: string[];
  pros: string[];
  cons: string[];
  rank: number;
  bestFor: string;
  percentile: number;
  totalCostYear1: number;
  totalCostYear3: number;
  resaleValue: number;
  chargingCost: number;
  maintenanceCost: number;
  category: string;
}

interface VehicleDetailProps {
  vehicle: Vehicle;
  onBack: () => void;
  onViewRanking?: () => void;
}

export function VehicleDetail({ vehicle, onBack, onViewRanking }: VehicleDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedBattery, setExpandedBattery] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState('mild');

  const competitorComparison = [
    { metric: 'Range', value: vehicle.range, max: 600, unit: 'km' },
    { metric: 'Charging Speed', value: vehicle.chargingSpeed, max: 300, unit: 'kW' },
    { metric: 'Efficiency', value: 25 - vehicle.efficiency, max: 10, unit: 'km/kWh', inverted: true },
    { metric: 'Performance', value: 10 - vehicle.acceleration, max: 7, unit: 's 0-100', inverted: true },
    { metric: 'Value', value: (100000 - vehicle.price) / 1000, max: 80, unit: 'value score' }
  ];

  // Specifications data organized by sections (without battery section)
  const specificationsData: { [key: string]: { label: string; value: string }[] } = {
    "Overview": [
      { label: "Powertrain Type", value: "Electric" },
      { label: "Top Speed", value: "160 km/h" },
      { label: "0–100 km/h Acceleration", value: `${vehicle.acceleration}s` },
      { label: "Power", value: "150 kW / 201 PS / 201 BHP" },
      { label: "Seats", value: `${vehicle.seating}` },
      { label: "Doors", value: "5" },
      { label: "Weight (Kerb)", value: "2,135 kg" }
    ],
    "Performance": [
      { label: "Top Speed", value: "160 km/h" },
      { label: "0–100 km/h Acceleration", value: `${vehicle.acceleration}s` },
      { label: "Power-to-Weight Ratio", value: "70 kW/1000kg" },
      { label: "Power", value: "150 kW" },
      { label: "Torque", value: "310 Nm" }
    ],
    "Energy Consumption": [
      { label: "Efficiency", value: `${vehicle.efficiency} kWh/100km` },
      { label: "MPGe (Combined)", value: "92 MPGe" },
      { label: "Range (WLTP)", value: `${vehicle.range} km` }
    ],
    "Electric Powertrain": [
      { label: "Peak Power", value: "150 kW" },
      { label: "Peak Torque", value: "310 Nm" },
      { label: "Motor Type", value: "Permanent magnet synchronous" },
      { label: "Drivetrain", value: vehicle.drivetrain }
    ],
    "Drivetrain & Chassis": [
      { label: "Driven Wheels", value: vehicle.drivetrain },
      { label: "Gearbox", value: "Single-speed automatic" },
      { label: "Tyre Sizes", value: "235/55 R19" },
      { label: "Front Suspension", value: "MacPherson strut" },
      { label: "Rear Suspension", value: "Multi-link" },
      { label: "Front Brakes", value: "Ventilated discs" },
      { label: "Rear Brakes", value: "Solid discs" }
    ],
    "Dimensions & Practicality": [
      { label: "Body Style", value: vehicle.bodyType },
      { label: "Doors", value: "5" },
      { label: "Seats", value: `${vehicle.seating}` },
      { label: "Turning Circle", value: "11.2 m" },
      { label: "Kerb Weight", value: "2,135 kg" },
      { label: "Gross Weight", value: "2,720 kg" },
      { label: "Maximum Payload", value: "585 kg" },
      { label: "Length", value: "4,712 mm" },
      { label: "Width", value: "1,985 mm" },
      { label: "Height", value: "1,937 mm" },
      { label: "Wheelbase", value: "2,850 mm" }
    ],
    "Cargo Space": [
      { label: "Trunk Volume", value: "465 L (1,405 L with seats down)" },
      { label: "Luggage Capacity", value: "~4 standard suitcases" },
      { label: "Load Floor", value: "Variable height" },
      { label: "Rear Seat Folding", value: "60/40 split" }
    ]
  };

  // Enhanced battery details with proper chemistry breakdown
  const batteryDetails = {
    composition: "NCM 811 (Nickel Cobalt Manganese)",
    nickelContent: "80%",
    cobaltContent: "10%", 
    manganeseContent: "10%",
    cells: "288 cells in 12S24P configuration",
    voltage: "355V nominal",
    warranty: "8 years / 160,000 km",
    coldSensitivity: "20% range reduction below 0°C",
    lifetime: "800,000 km",
    cycleLife: "2,000-3,000 cycles (80% capacity retention)",
    recycling: "95% material recovery rate",
    energyDensity: "250 Wh/kg",
    thermalManagement: "Liquid cooling system"
  };

  // SOC-based range simulation data
  const socSimulationMild = {
    startSoc: 100,
    endSoc: 20,
    distance: 400, // 100% to 20% SOC
    chargingTime: 15, // minutes
    secondLegDistance: 320 // 100% to 20% SOC after charging
  };

  const socSimulationCold = {
    startSoc: 100,
    endSoc: 20,
    distance: 320, // 100% to 20% SOC in cold weather
    chargingTime: 15, // minutes
    secondLegDistance: 256 // 100% to 20% SOC after charging in cold
  };

  // Range data for mild and cold weather
  const rangeDataMild = [
    { condition: 'City – Mild Weather', range: 480 },
    { condition: 'Highway – Mild Weather', range: 520 },
    { condition: 'Combined – Mild Weather', range: 500 }
  ];

  const rangeDataCold = [
    { condition: 'City – Cold Weather', range: 380, reduction: '21%' },
    { condition: 'Highway – Cold Weather', range: 420, reduction: '19%' },
    { condition: 'Combined – Cold Weather', range: 400, reduction: '20%' }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="gap-2 mb-4"
            aria-label="Return to vehicle browser"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browser
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-1">{vehicle.make} {vehicle.model}</h1>
              <p className="text-muted-foreground mb-4">
                {vehicle.year} • {vehicle.bodyType} • {vehicle.drivetrain}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-3xl font-bold">€{vehicle.price.toLocaleString()}</p>
              <p className="text-muted-foreground">Starting price</p>
              <Button className="mt-2">Configure & Order</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="range">Range</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
            <TabsTrigger value="performance-analysis">Performance Analysis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Specifications and Market Position */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>Range</span>
                      </div>
                      <span className="font-semibold">{vehicle.range} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span>Charging</span>
                      </div>
                      <span className="font-semibold">{vehicle.chargingSpeed} kW</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-red-600" />
                        <span>0-100 km/h</span>
                      </div>
                      <span className="font-semibold">{vehicle.acceleration}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-purple-600" />
                        <span>Efficiency</span>
                      </div>
                      <span className="font-semibold">{vehicle.efficiency} kWh/100km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span>Seating</span>
                      </div>
                      <span className="font-semibold">{vehicle.seating} seats</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Position */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Market Position
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        #{Math.ceil((100 - vehicle.percentile) / 10)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Overall Market Rank</p>
                      <Badge variant="default" className="bg-blue-600">
                        Top {100 - vehicle.percentile}% of all EVs
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Swiss Energy Label */}
              <div>
                <SwissEnergyLabel vehicle={vehicle} />
              </div>
            </div>

            {/* Price Summary Box */}
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Purchase Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        €{vehicle.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Starting MSRP</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">3-Year TCO</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        €{vehicle.totalCostYear3.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Total cost of ownership</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Cost per km</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        €{(vehicle.totalCostYear3 / (3 * 15000)).toFixed(2)}
                      </div>
                      <p className="text-sm text-muted-foreground">Over 3 years</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Range Comparison Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Range Summary</CardTitle>
                <CardDescription>Quick overview of range performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">400km</div>
                    <div className="text-sm text-muted-foreground">Cold Weather Average</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-lg font-semibold text-green-600">500km</div>
                    <div className="text-sm text-muted-foreground">Mild Weather Average</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Range Tab - Updated with SOC-based simulation */}
          <TabsContent value="range" className="space-y-6">
            {/* SOC-Based Range Simulation - Full Width */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">SOC-Based Range Simulation</h3>
              <p className="text-sm text-muted-foreground">
                Real-world driving from 100% to 20% State of Charge, then 15-minute rapid charging
              </p>
              
              {/* Mild Weather */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    Mild Weather (15°C+)
                  </CardTitle>
                  <CardDescription>Driving simulation under optimal conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">100% → 20% SOC</span>
                        <span className="text-sm font-medium">{socSimulationMild.distance}km</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-8 flex items-center">
                        <div className="bg-green-500 h-full rounded-full flex items-center justify-center text-white text-sm font-medium w-full">
                          {socSimulationMild.distance}km driving range
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Rapid charging</span>
                        <span className="text-sm font-medium">{socSimulationMild.chargingTime} minutes</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 flex items-center">
                        <div className="bg-orange-500 h-full rounded-full flex items-center justify-center text-white text-xs font-medium w-full">
                          20% → 80% SOC in {socSimulationMild.chargingTime} min
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">100% → 20% SOC (2nd leg)</span>
                        <span className="text-sm font-medium">{socSimulationMild.secondLegDistance}km</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-8 flex items-center">
                        <div className="bg-blue-500 h-full rounded-full flex items-center justify-center text-white text-sm font-medium w-full">
                          {socSimulationMild.secondLegDistance}km additional range
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-700">
                        Total: {socSimulationMild.distance + socSimulationMild.secondLegDistance}km with one 15-minute stop
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cold Weather */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-blue-500" />
                    Cold Weather (0°C)
                  </CardTitle>
                  <CardDescription>Driving simulation under cold weather conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">100% → 20% SOC</span>
                        <span className="text-sm font-medium">{socSimulationCold.distance}km</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-8 flex items-center">
                        <div className="bg-green-500 h-full rounded-full flex items-center justify-center text-white text-sm font-medium w-full">
                          {socSimulationCold.distance}km driving range
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Rapid charging</span>
                        <span className="text-sm font-medium">{socSimulationCold.chargingTime} minutes</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 flex items-center">
                        <div className="bg-orange-500 h-full rounded-full flex items-center justify-center text-white text-xs font-medium w-full">
                          20% → 80% SOC in {socSimulationCold.chargingTime} min
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">100% → 20% SOC (2nd leg)</span>
                        <span className="text-sm font-medium">{socSimulationCold.secondLegDistance}km</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-8 flex items-center">
                        <div className="bg-blue-500 h-full rounded-full flex items-center justify-center text-white text-sm font-medium w-full">
                          {socSimulationCold.secondLegDistance}km additional range
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">
                        Total: {socSimulationCold.distance + socSimulationCold.secondLegDistance}km with one 15-minute stop
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {Math.round(((socSimulationMild.distance + socSimulationMild.secondLegDistance - socSimulationCold.distance - socSimulationCold.secondLegDistance) / (socSimulationMild.distance + socSimulationMild.secondLegDistance)) * 100)}% reduction vs mild weather
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real Range Estimations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Real Range Estimations
                </CardTitle>
                <CardDescription>
                  Range performance under different weather conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Weather Condition:</label>
                    <Select value={weatherCondition} onValueChange={setWeatherCondition}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">
                          <div className="flex items-center gap-2">
                            <ThermometerSun className="h-4 w-4" />
                            Mild Weather (15°C+)
                          </div>
                        </SelectItem>
                        <SelectItem value="cold">
                          <div className="flex items-center gap-2">
                            <Snowflake className="h-4 w-4" />
                            Cold Weather (0°C)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {weatherCondition === 'mild' 
                    ? rangeDataMild.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                          <span className="text-sm">{item.condition}</span>
                          <div className="text-right">
                            <div className="font-semibold">{item.range} km</div>
                          </div>
                        </div>
                      ))
                    : rangeDataCold.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                          <span className="text-sm">{item.condition}</span>
                          <div className="text-right">
                            <div className="font-semibold">{item.range} km</div>
                            <div className="text-xs text-red-600">
                              -{item.reduction} vs mild
                            </div>
                          </div>
                        </div>
                      ))
                  }
                </div>
              </CardContent>
            </Card>

            {/* WLTP Official Rating */}
            <Card>
              <CardHeader>
                <CardTitle>WLTP Official Rating</CardTitle>
                <CardDescription>Standardized test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{vehicle.range} km</div>
                  <p className="text-sm text-muted-foreground mb-1">WLTP Combined Range</p>
                  <Badge variant="default" className="bg-green-600">
                    Official Rating
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy consumption</span>
                    <span className="font-medium">{vehicle.efficiency} kWh/100km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Test temperature</span>
                    <span className="font-medium">23°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Test conditions</span>
                    <span className="font-medium">Mixed (City/Highway)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="space-y-6">
            {Object.entries(specificationsData).map(([section, specs]) => (
              <Card key={section}>
                <CardHeader>
                  <CardTitle>{section}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Battery Tab - Enhanced with better information */}
          <TabsContent value="battery" className="space-y-6">
            {/* Battery Chemistry Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Battery Chemistry & Composition</CardTitle>
                <CardDescription>
                  Detailed breakdown of the battery cell chemistry and materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Chemical Composition</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nickel (Ni)</span>
                        <span className="font-medium">{batteryDetails.nickelContent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cobalt (Co)</span>
                        <span className="font-medium">{batteryDetails.cobaltContent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manganese (Mn)</span>
                        <span className="font-medium">{batteryDetails.manganeseContent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Energy Density</span>
                        <span className="font-medium">{batteryDetails.energyDensity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Physical Specifications</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Usable Capacity</span>
                        <span className="font-medium">82 kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Capacity</span>
                        <span className="font-medium">87 kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nominal Voltage</span>
                        <span className="font-medium">{batteryDetails.voltage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thermal Management</span>
                        <span className="font-medium">{batteryDetails.thermalManagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battery Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery Type</span>
                      <span className="font-medium">Lithium-ion NCM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chemistry</span>
                      <span className="font-medium">{batteryDetails.composition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Form Factor</span>
                      <span className="font-medium">Pouch cells</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Number of Cells</span>
                      <span className="font-medium">288</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Configuration</span>
                      <span className="font-medium">12S24P</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Warranty</span>
                      <span className="font-medium">{batteryDetails.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Lifetime</span>
                      <span className="font-medium text-green-600">{batteryDetails.lifetime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cycle Life</span>
                      <span className="font-medium">{batteryDetails.cycleLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Climate Sensitivity</span>
                      <span className="font-medium text-orange-600">{batteryDetails.coldSensitivity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recyclability</span>
                      <span className="font-medium text-green-600">{batteryDetails.recycling}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charging Information */}
            <Card>
              <CardHeader>
                <CardTitle>Charging Capabilities</CardTitle>
                <CardDescription>DC fast charging and AC charging specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ChargingCalculator vehicle={vehicle} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Analysis Tab - Restructured with costs on top and environmental calculator */}
          <TabsContent value="performance-analysis" className="space-y-6">
            {/* Cost Analysis - Moved to top */}
            <EnhancedCostAnalysis vehicle={vehicle} />

            {/* Competitor Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance vs Competitors
                </CardTitle>
                <CardDescription>
                  How this vehicle performs against market competition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {competitorComparison.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.value} {metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-full rounded-full ${
                          metric.value / metric.max > 0.8 ? 'bg-green-500' :
                          metric.value / metric.max > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((metric.value / metric.max) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Environmental Impact Calculator - Moved to bottom */}
            <EnvironmentalCalculator vehicle={vehicle} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}