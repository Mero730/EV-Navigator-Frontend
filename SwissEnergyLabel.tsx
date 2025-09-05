import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Zap, Leaf } from 'lucide-react';

interface SwissEnergyLabelProps {
  vehicle: {
    make: string;
    model: string;
    efficiency: number;
    range: number;
    price: number;
  };
}

export function SwissEnergyLabel({ vehicle }: SwissEnergyLabelProps) {
  // Calculate energy efficiency class based on kWh/100km
  const getEfficiencyClass = (efficiency: number) => {
    if (efficiency <= 15) return { class: 'A+++', color: 'bg-green-700', score: 95 };
    if (efficiency <= 18) return { class: 'A++', color: 'bg-green-600', score: 85 };
    if (efficiency <= 20) return { class: 'A+', color: 'bg-green-500', score: 75 };
    if (efficiency <= 22) return { class: 'A', color: 'bg-green-400', score: 65 };
    if (efficiency <= 25) return { class: 'B', color: 'bg-yellow-400', score: 55 };
    if (efficiency <= 28) return { class: 'C', color: 'bg-orange-400', score: 45 };
    return { class: 'D', color: 'bg-red-500', score: 35 };
  };

  const efficiencyData = getEfficiencyClass(vehicle.efficiency);
  const co2Emissions = 0; // Electric vehicles have zero direct emissions

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <CardTitle className="text-sm">Swiss Energy Label</CardTitle>
        </div>
        <div className="text-xs text-muted-foreground">
          {vehicle.make} {vehicle.model}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Energy Efficiency Scale */}
        <div className="space-y-1">
          <div className="text-xs font-medium mb-2">Energy Efficiency</div>
          {['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D'].map((grade, index) => {
            const isActive = grade === efficiencyData.class;
            const colors = [
              'bg-green-700', 'bg-green-600', 'bg-green-500', 'bg-green-400',
              'bg-yellow-400', 'bg-orange-400', 'bg-red-500'
            ];
            
            return (
              <div
                key={grade}
                className={`flex items-center h-6 rounded text-white text-xs font-medium ${
                  isActive ? colors[index] : 'bg-gray-200'
                } ${isActive ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="px-2 flex-1">
                  <span className={isActive ? 'text-white' : 'text-gray-500'}>
                    {grade}
                  </span>
                </div>
                {isActive && (
                  <div className="pr-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-current" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Energy Consumption */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {vehicle.efficiency}
            </div>
            <div className="text-xs text-muted-foreground">kWh/100km</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {co2Emissions}
            </div>
            <div className="text-xs text-muted-foreground">g CO₂/km</div>
          </div>
        </div>

        {/* Range and Price Information */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="text-center">
            <div className="text-sm font-medium">{vehicle.range} km</div>
            <div className="text-xs text-muted-foreground">WLTP Range</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">€{(vehicle.price / 1000).toFixed(0)}k</div>
            <div className="text-xs text-muted-foreground">Starting Price</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}