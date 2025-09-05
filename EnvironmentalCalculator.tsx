import React, { useState } from 'react';
import { Leaf, Calculator, TreePine, Fuel } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface EnvironmentalCalculatorProps {
  vehicle: {
    efficiency: number;
    range: number;
  };
}

export function EnvironmentalCalculator({ vehicle }: EnvironmentalCalculatorProps) {
  const [annualKm, setAnnualKm] = useState(15000);
  const [electricitySource, setElectricitySource] = useState('swiss-mix');
  
  // CO2 emissions per kWh for different electricity sources (kg CO2/kWh)
  const emissionFactors = {
    'swiss-mix': 0.128, // Swiss electricity mix
    'renewable': 0.041, // 100% renewable
    'eu-mix': 0.296, // EU average mix
    'coal': 0.82, // Coal power
    'gas': 0.49 // Natural gas power
  };
  
  const sourceLabels = {
    'swiss-mix': 'Swiss Electricity Mix',
    'renewable': '100% Renewable Energy',
    'eu-mix': 'EU Average Mix',
    'coal': 'Coal Power',
    'gas': 'Natural Gas Power'
  };
  
  // Calculate annual consumption and emissions
  const annualConsumption = (annualKm / 100) * vehicle.efficiency; // kWh per year
  const annualEmissions = annualConsumption * emissionFactors[electricitySource as keyof typeof emissionFactors]; // kg CO2 per year
  
  // Gasoline car comparison (assuming 7L/100km, 2.31 kg CO2/L)
  const gasolineConsumption = (annualKm / 100) * 7; // L per year
  const gasolineEmissions = gasolineConsumption * 2.31; // kg CO2 per year
  
  const emissionsSaved = gasolineEmissions - annualEmissions;
  const percentageReduction = ((emissionsSaved / gasolineEmissions) * 100);
  
  // Trees equivalent (1 tree absorbs ~22 kg CO2 per year)
  const treesEquivalent = Math.round(emissionsSaved / 22);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          Environmental Impact Calculator
        </CardTitle>
        <CardDescription>
          Calculate your environmental impact based on driving patterns and electricity source
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annual-km">Annual Driving Distance</Label>
            <div className="flex gap-2">
              <Input
                id="annual-km"
                type="number"
                value={annualKm}
                onChange={(e) => setAnnualKm(Number(e.target.value))}
                min="0"
                max="100000"
                step="1000"
              />
              <span className="flex items-center px-3 py-2 text-sm text-muted-foreground">km/year</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="electricity-source">Electricity Source</Label>
            <Select value={electricitySource} onValueChange={setElectricitySource}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sourceLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Annual Consumption</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {annualConsumption.toLocaleString()} kWh
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Based on {vehicle.efficiency} kWh/100km efficiency
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Your CO₂ Emissions</span>
              </div>
              <div className="text-2xl font-bold text-orange-700">
                {Math.round(annualEmissions).toLocaleString()} kg
              </div>
              <p className="text-xs text-orange-600 mt-1">
                CO₂ per year with {sourceLabels[electricitySource as keyof typeof sourceLabels]}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">CO₂ Saved vs Gasoline</span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {Math.round(emissionsSaved).toLocaleString()} kg
              </div>
              <p className="text-xs text-green-600 mt-1">
                {percentageReduction.toFixed(0)}% reduction vs 7L/100km car
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TreePine className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">Trees Equivalent</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700">
                {treesEquivalent}
              </div>
              <p className="text-xs text-emerald-600 mt-1">
                Trees needed to offset your savings
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Comparison Chart */}
        <div className="space-y-4">
          <h4 className="font-medium">Annual CO₂ Emissions Comparison</h4>
          <div className="space-y-3">
            {/* Gasoline Car */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gasoline Car (7L/100km)</span>
                <span className="font-medium">{Math.round(gasolineEmissions).toLocaleString()} kg CO₂</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            
            {/* This EV */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This EV ({sourceLabels[electricitySource as keyof typeof sourceLabels]})</span>
                <span className="font-medium">{Math.round(annualEmissions).toLocaleString()} kg CO₂</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-green-500 h-full rounded-full" 
                  style={{ width: `${(annualEmissions / gasolineEmissions) * 100}%` }} 
                />
              </div>
            </div>
            
            {/* 100% Renewable for comparison */}
            {electricitySource !== 'renewable' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This EV (100% Renewable)</span>
                  <span className="font-medium">{Math.round((annualKm / 100) * vehicle.efficiency * emissionFactors.renewable).toLocaleString()} kg CO₂</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${(((annualKm / 100) * vehicle.efficiency * emissionFactors.renewable) / gasolineEmissions) * 100}%` }} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm">Key Factors</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Electricity source has major impact on total emissions</li>
            <li>• Swiss electricity mix is among the cleanest in Europe</li>
            <li>• EV emissions decrease as the grid gets cleaner over time</li>
            <li>• Manufacturing emissions not included in this calculation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}