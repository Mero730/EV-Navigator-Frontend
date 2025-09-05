import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAppState } from '../AppStateManager';
import { 
  Car, 
  Battery, 
  Zap,
  Gauge,
  Weight,
  Ruler,
  Award,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function VehicleSpecs() {
  const { state } = useAppState();
  const { userData } = state;
  const [expandedBattery, setExpandedBattery] = useState(false);

  // Mock vehicle specs data
  const vehicleSpecs = {
    current: {
      make: userData.carMake || 'Volkswagen',
      model: userData.carModel || 'ID.3',
      year: userData.carYear || 2022,
      range: 340, // km WLTP
      power: 150, // kW
      torque: 310, // Nm
      acceleration: 9.0, // 0-100 km/h
      topSpeed: 160, // km/h
      efficiency: 15.9, // kWh/100km
      batteryCapacity: 58, // kWh net
      chargingSpeed: 100, // kW DC max
      weight: 1719, // kg
      length: 4261, // mm
      width: 1809, // mm
      height: 1552, // mm
    },
    comparison: [
      { make: 'Tesla', model: 'Model 3', range: 491, power: 208, efficiency: 14.7, acceleration: 6.1, price: 48990 },
      { make: 'BMW', model: 'i4 eDrive40', range: 493, power: 250, efficiency: 16.1, acceleration: 5.7, price: 56500 },
      { make: 'Mercedes', model: 'EQA 250', range: 426, power: 140, efficiency: 15.7, acceleration: 8.9, price: 47550 },
      { make: 'Audi', model: 'Q4 e-tron', range: 341, power: 150, efficiency: 17.0, acceleration: 8.5, price: 51500 },
      { make: 'Hyundai', model: 'IONIQ 5', range: 384, power: 160, efficiency: 16.8, acceleration: 8.5, price: 44900 }
    ]
  };

  const batteryDetails = {
    manufacturer: 'LG Energy Solution',
    chemistry: 'NCM 622 (Nickel Cobalt Manganese)',
    cells: 288,
    modules: 12,
    nominalVoltage: 350, // V
    grossCapacity: 62, // kWh
    netCapacity: 58, // kWh
    coolingSystem: 'Liquid cooling with heat pump integration',
    warranty: { years: 8, km: 160000, degradation: 70 },
    degradationRate: 2.3, // % per year
    optimalTemp: { min: 15, max: 25 }, // °C
    chargingCurve: [
      { soc: 10, power: 100 },
      { soc: 20, power: 100 },
      { soc: 40, power: 95 },
      { soc: 60, power: 70 },
      { soc: 80, power: 40 },
      { soc: 90, power: 25 }
    ]
  };

  // Calculate performance percentiles
  const calculatePercentile = (value: number, category: 'range' | 'power' | 'efficiency' | 'acceleration' | 'price') => {
    const allVehicles = [...vehicleSpecs.comparison, {
      make: vehicleSpecs.current.make,
      model: vehicleSpecs.current.model,
      range: vehicleSpecs.current.range,
      power: vehicleSpecs.current.power,
      efficiency: vehicleSpecs.current.efficiency,
      acceleration: vehicleSpecs.current.acceleration,
      price: 45000 // estimated
    }];

    const values = allVehicles.map(v => {
      switch (category) {
        case 'range': return v.range || 0;
        case 'power': return v.power || 0;
        case 'efficiency': return category === 'efficiency' ? (20 - (v.efficiency || 20)) : v.efficiency || 0; // Lower is better for efficiency
        case 'acceleration': return category === 'acceleration' ? (15 - (v.acceleration || 15)) : v.acceleration || 0; // Lower is better for acceleration
        case 'price': return category === 'price' ? (70000 - (v.price || 70000)) : v.price || 0; // Lower is better for price
        default: return 0;
      }
    });

    const currentValue = values[values.length - 1];
    const sorted = values.sort((a, b) => b - a);
    const rank = sorted.indexOf(currentValue) + 1;
    return Math.round(((allVehicles.length - rank + 1) / allVehicles.length) * 100);
  };

  const metrics = [
    { 
      name: 'Range', 
      value: vehicleSpecs.current.range, 
      unit: 'km', 
      percentile: calculatePercentile(vehicleSpecs.current.range, 'range'),
      icon: Ruler 
    },
    { 
      name: 'Power', 
      value: vehicleSpecs.current.power, 
      unit: 'kW', 
      percentile: calculatePercentile(vehicleSpecs.current.power, 'power'),
      icon: Zap 
    },
    { 
      name: 'Efficiency', 
      value: vehicleSpecs.current.efficiency, 
      unit: 'kWh/100km', 
      percentile: calculatePercentile(vehicleSpecs.current.efficiency, 'efficiency'),
      icon: Gauge,
      lowerIsBetter: true
    },
    { 
      name: 'Acceleration', 
      value: vehicleSpecs.current.acceleration, 
      unit: 's (0-100)', 
      percentile: calculatePercentile(vehicleSpecs.current.acceleration, 'acceleration'),
      icon: TrendingUp,
      lowerIsBetter: true
    },
    { 
      name: 'Weight', 
      value: vehicleSpecs.current.weight, 
      unit: 'kg', 
      percentile: 65, // mock percentile
      icon: Weight 
    }
  ];

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return 'text-green-600 bg-green-100';
    if (percentile >= 60) return 'text-blue-600 bg-blue-100';
    if (percentile >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPercentileLabel = (percentile: number) => {
    if (percentile >= 80) return 'Top 20%';
    if (percentile >= 60) return 'Top 40%';
    if (percentile >= 40) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Vehicle Specifications</h1>
        <p className="text-muted-foreground">
          Detailed specifications and market comparison for your {userData.carYear} {userData.carMake} {userData.carModel}
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
          <TabsTrigger value="battery">Battery Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics with Percentiles */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{metric.name}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getPercentileColor(metric.percentile)}`}
                      >
                        {getPercentileLabel(metric.percentile)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-medium">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.unit}</div>
                    <Progress 
                      value={metric.percentile} 
                      className="h-2 mt-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {metric.percentile}th percentile
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Max Power</div>
                    <div className="font-medium">{vehicleSpecs.current.power} kW</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Max Torque</div>
                    <div className="font-medium">{vehicleSpecs.current.torque} Nm</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">0-100 km/h</div>
                    <div className="font-medium">{vehicleSpecs.current.acceleration} s</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Top Speed</div>
                    <div className="font-medium">{vehicleSpecs.current.topSpeed} km/h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="h-5 w-5" />
                  <span>Energy & Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">WLTP Range</div>
                    <div className="font-medium">{vehicleSpecs.current.range} km</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Battery Capacity</div>
                    <div className="font-medium">{vehicleSpecs.current.batteryCapacity} kWh</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Efficiency</div>
                    <div className="font-medium">{vehicleSpecs.current.efficiency} kWh/100km</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">DC Fast Charging</div>
                    <div className="font-medium">{vehicleSpecs.current.chargingSpeed} kW</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Dimensions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Length</div>
                    <div className="font-medium">{vehicleSpecs.current.length} mm</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Width</div>
                    <div className="font-medium">{vehicleSpecs.current.width} mm</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Height</div>
                    <div className="font-medium">{vehicleSpecs.current.height} mm</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Weight</div>
                    <div className="font-medium">{vehicleSpecs.current.weight} kg</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Market Position</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Range Leadership</span>
                    <Badge variant="secondary" className={getPercentileColor(calculatePercentile(vehicleSpecs.current.range, 'range'))}>
                      {getPercentileLabel(calculatePercentile(vehicleSpecs.current.range, 'range'))}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Performance</span>
                    <Badge variant="secondary" className={getPercentileColor(calculatePercentile(vehicleSpecs.current.power, 'power'))}>
                      {getPercentileLabel(calculatePercentile(vehicleSpecs.current.power, 'power'))}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Efficiency</span>
                    <Badge variant="secondary" className={getPercentileColor(calculatePercentile(vehicleSpecs.current.efficiency, 'efficiency'))}>
                      {getPercentileLabel(calculatePercentile(vehicleSpecs.current.efficiency, 'efficiency'))}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">
                How your {vehicleSpecs.current.make} {vehicleSpecs.current.model} compares to similar EVs
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Vehicle</th>
                      <th className="text-right py-2">Range (km)</th>
                      <th className="text-right py-2">Power (kW)</th>
                      <th className="text-right py-2">Efficiency (kWh/100km)</th>
                      <th className="text-right py-2">0-100 km/h (s)</th>
                      <th className="text-right py-2">Price (CHF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-blue-50">
                      <td className="py-3 font-medium">
                        {vehicleSpecs.current.make} {vehicleSpecs.current.model}
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">Your Car</Badge>
                      </td>
                      <td className="text-right py-3 font-medium">{vehicleSpecs.current.range}</td>
                      <td className="text-right py-3 font-medium">{vehicleSpecs.current.power}</td>
                      <td className="text-right py-3 font-medium">{vehicleSpecs.current.efficiency}</td>
                      <td className="text-right py-3 font-medium">{vehicleSpecs.current.acceleration}</td>
                      <td className="text-right py-3 font-medium">45,000*</td>
                    </tr>
                    {vehicleSpecs.comparison.map((vehicle, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{vehicle.make} {vehicle.model}</td>
                        <td className="text-right py-3">{vehicle.range}</td>
                        <td className="text-right py-3">{vehicle.power}</td>
                        <td className="text-right py-3">{vehicle.efficiency}</td>
                        <td className="text-right py-3">{vehicle.acceleration}</td>
                        <td className="text-right py-3">{vehicle.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                *Estimated price at time of purchase
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="battery" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Battery Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="h-5 w-5" />
                  <span>Battery Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Manufacturer</div>
                    <div className="font-medium">{batteryDetails.manufacturer}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Chemistry</div>
                    <div className="font-medium">NCM 622</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Net Capacity</div>
                    <div className="font-medium">{batteryDetails.netCapacity} kWh</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Gross Capacity</div>
                    <div className="font-medium">{batteryDetails.grossCapacity} kWh</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Cells</div>
                    <div className="font-medium">{batteryDetails.cells}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Modules</div>
                    <div className="font-medium">{batteryDetails.modules}</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setExpandedBattery(!expandedBattery)}
                  className="w-full flex items-center space-x-2"
                >
                  <Info className="h-4 w-4" />
                  <span>More Battery Details</span>
                  {expandedBattery ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>

            {/* Charging Curve */}
            <Card>
              <CardHeader>
                <CardTitle>DC Charging Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 flex items-end space-x-2">
                    {batteryDetails.chargingCurve.map((point, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="bg-blue-500 w-full rounded-t-sm"
                          style={{ height: `${point.power}%` }}
                        ></div>
                        <div className="text-xs mt-1">{point.soc}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Charging power (kW) vs State of Charge (%)
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm">
                    <div className="font-medium mb-1">Charging Strategy</div>
                    <div className="text-muted-foreground">
                      Optimal charging range: 10-80% SOC for fastest charging speeds
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extended Battery Information */}
          {expandedBattery && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Battery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Technical Specifications</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nominal Voltage</span>
                        <span>{batteryDetails.nominalVoltage}V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cooling System</span>
                        <span>Liquid cooling</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Degradation Rate</span>
                        <span>{batteryDetails.degradationRate}% per year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optimal Temperature</span>
                        <span>{batteryDetails.optimalTemp.min}-{batteryDetails.optimalTemp.max}°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Warranty Coverage</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{batteryDetails.warranty.years} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mileage Limit</span>
                        <span>{batteryDetails.warranty.km.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Min. Capacity</span>
                        <span>{batteryDetails.warranty.degradation}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Battery Chemistry Details</h3>
                  <div className="bg-muted/50 p-4 rounded-lg text-sm">
                    <div className="space-y-2">
                      <div><strong>NCM 622 (Nickel Cobalt Manganese):</strong></div>
                      <div>• 60% Nickel - High energy density</div>
                      <div>• 20% Cobalt - Stability and safety</div>
                      <div>• 20% Manganese - Cost-effectiveness and safety</div>
                      <div className="mt-2 text-muted-foreground">
                        This chemistry offers a good balance of energy density, safety, and cost-effectiveness, 
                        making it ideal for long-range EVs with reasonable degradation characteristics.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}