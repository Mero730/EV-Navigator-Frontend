import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Leaf, Euro, Calculator } from 'lucide-react';

interface VehicleSavingsComparisonProps {
  currentVehicle: {
    make: string;
    model: string;
    price: number;
    efficiency: number;
    totalCostYear3: number;
    chargingCost: number;
  };
}

interface ComparisonVehicle {
  id: string;
  make: string;
  model: string;
  type: 'ICE' | 'Hybrid' | 'EV';
  price: number;
  fuelConsumption?: number; // l/100km for ICE/Hybrid
  efficiency?: number; // kWh/100km for EV
  co2Emissions: number; // g/km
  totalCostYear3: number;
  fuelCost: number;
}

export function VehicleSavingsComparison({ currentVehicle }: VehicleSavingsComparisonProps) {
  const [selectedComparison, setSelectedComparison] = useState<string>('');

  const comparisonVehicles: ComparisonVehicle[] = [
    {
      id: 'bmw_x3_ice',
      make: 'BMW',
      model: 'X3 sDrive20i',
      type: 'ICE',
      price: 48000,
      fuelConsumption: 7.2,
      co2Emissions: 164,
      totalCostYear3: 62000,
      fuelCost: 0.32 // €/km
    },
    {
      id: 'audi_q5_hybrid',
      make: 'Audi',
      model: 'Q5 TFSI e',
      type: 'Hybrid',
      price: 52000,
      fuelConsumption: 2.4,
      efficiency: 18.5,
      co2Emissions: 54,
      totalCostYear3: 58000,
      fuelCost: 0.18
    },
    {
      id: 'mercedes_glc',
      make: 'Mercedes',
      model: 'GLC 200',
      type: 'ICE',
      price: 47000,
      fuelConsumption: 6.8,
      co2Emissions: 155,
      totalCostYear3: 60000,
      fuelCost: 0.29
    },
    {
      id: 'volvo_xc60_hybrid',
      make: 'Volvo',
      model: 'XC60 T8',
      type: 'Hybrid',
      price: 55000,
      fuelConsumption: 2.1,
      efficiency: 19.2,
      co2Emissions: 48,
      totalCostYear3: 61000,
      fuelCost: 0.16
    }
  ];

  const selectedVehicle = comparisonVehicles.find(v => v.id === selectedComparison);

  const calculateSavings = () => {
    if (!selectedVehicle) return null;

    const costSaving = selectedVehicle.totalCostYear3 - currentVehicle.totalCostYear3;
    const co2Saving = selectedVehicle.co2Emissions; // Current vehicle has 0 emissions
    const fuelSavingPerYear = (selectedVehicle.fuelCost - currentVehicle.chargingCost) * 15000; // 15,000 km/year
    const fuelSaving3Years = fuelSavingPerYear * 3;

    return {
      costSaving,
      co2Saving,
      fuelSaving3Years,
      fuelSavingPerYear,
      co2SavedTotal: co2Saving * 15000 * 3 / 1000 // kg over 3 years
    };
  };

  const savings = calculateSavings();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Savings Comparison
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare costs and environmental impact against conventional vehicles
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vehicle Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Compare with:</label>
          <Select value={selectedComparison} onValueChange={setSelectedComparison}>
            <SelectTrigger>
              <SelectValue placeholder="Select a vehicle to compare" />
            </SelectTrigger>
            <SelectContent>
              {comparisonVehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={vehicle.type === 'ICE' ? 'destructive' : vehicle.type === 'Hybrid' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {vehicle.type}
                    </Badge>
                    {vehicle.make} {vehicle.model}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Vehicle Summary */}
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-900">Your EV Choice</span>
          </div>
          <div className="text-sm text-green-800">
            {currentVehicle.make} {currentVehicle.model}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
            <div>
              <div className="font-medium">0 g/km</div>
              <div className="text-green-600">CO₂ emissions</div>
            </div>
            <div>
              <div className="font-medium">{currentVehicle.efficiency} kWh/100km</div>
              <div className="text-green-600">Energy use</div>
            </div>
            <div>
              <div className="font-medium">€{currentVehicle.totalCostYear3.toLocaleString()}</div>
              <div className="text-green-600">3-year cost</div>
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        {selectedVehicle && savings && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-blue-900">Comparison Vehicle</span>
                <Badge 
                  variant={selectedVehicle.type === 'ICE' ? 'destructive' : selectedVehicle.type === 'Hybrid' ? 'secondary' : 'default'}
                >
                  {selectedVehicle.type}
                </Badge>
              </div>
              <div className="text-sm text-blue-800">
                {selectedVehicle.make} {selectedVehicle.model}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <div className="font-medium">{selectedVehicle.co2Emissions} g/km</div>
                  <div className="text-blue-600">CO₂ emissions</div>
                </div>
                <div>
                  <div className="font-medium">
                    {selectedVehicle.fuelConsumption ? `${selectedVehicle.fuelConsumption} l/100km` : `${selectedVehicle.efficiency} kWh/100km`}
                  </div>
                  <div className="text-blue-600">Fuel/Energy use</div>
                </div>
                <div>
                  <div className="font-medium">€{selectedVehicle.totalCostYear3.toLocaleString()}</div>
                  <div className="text-blue-600">3-year cost</div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {savings.costSaving > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">Cost Savings</span>
                  </div>
                  <div className={`text-lg font-bold ${savings.costSaving > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {savings.costSaving > 0 ? '+' : ''}€{Math.abs(savings.costSaving).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Over 3 years</div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">CO₂ Avoided</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {savings.co2SavedTotal.toFixed(1)} kg
                  </div>
                  <div className="text-xs text-muted-foreground">Over 3 years (45,000 km)</div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Euro className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Fuel Savings</span>
                  </div>
                  <div className="text-lg font-bold text-orange-600">
                    €{Math.abs(savings.fuelSaving3Years).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    €{Math.abs(savings.fuelSavingPerYear).toFixed(0)}/year
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Leaf className="h-4 w-4 text-green-600" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  By choosing the {currentVehicle.make} {currentVehicle.model}, you'll avoid:
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CO₂ emissions per year</span>
                    <span className="font-medium text-green-600">
                      -{(savings.co2Saving * 15).toFixed(0)} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equivalent to trees planted</span>
                    <span className="font-medium text-green-600">
                      ~{Math.round(savings.co2SavedTotal / 22)} trees
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fuel consumption (3 years)</span>
                    <span className="font-medium text-green-600">
                      -{((selectedVehicle.fuelConsumption || 0) * 450).toFixed(0)} liters
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedVehicle && (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a vehicle above to see cost and environmental savings</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}