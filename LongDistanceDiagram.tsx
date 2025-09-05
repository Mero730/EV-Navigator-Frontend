import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Battery, Zap, MapPin, Clock } from 'lucide-react';

interface LongDistanceData {
  firstLegDistance: number;
  chargingTime: number;
  secondLegDistance: number;
  totalDistance: number;
  firstLegDuration: number;
  chargingDuration: number;
  secondLegDuration: number;
  totalDuration: number;
}

interface LongDistanceDiagramProps {
  data?: LongDistanceData;
}

export function LongDistanceDiagram({ 
  data = {
    firstLegDistance: 380,
    chargingTime: 15,
    secondLegDistance: 120,
    totalDistance: 500,
    firstLegDuration: 270, // minutes
    chargingDuration: 15,
    secondLegDuration: 90,
    totalDuration: 375
  }
}: LongDistanceDiagramProps) {
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const firstLegPercent = (data.firstLegDistance / data.totalDistance) * 100;
  const secondLegPercent = (data.secondLegDistance / data.totalDistance) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Long Distance Journey Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Typical 500km journey with optimized charging strategy
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Journey Overview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">{data.totalDistance}km</div>
            <div className="text-sm text-muted-foreground">Total Distance</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-orange-600">{data.chargingTime}min</div>
            <div className="text-sm text-muted-foreground">Charging Stop</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">{formatDuration(data.totalDuration)}</div>
            <div className="text-sm text-muted-foreground">Total Time</div>
          </div>
        </div>

        {/* Visual Journey Diagram */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Journey Breakdown</div>
          
          {/* Battery Level Visualization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Battery Level</span>
              <span className="text-muted-foreground">100% → 20% → 80%</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              {/* First leg - battery draining */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-orange-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${firstLegPercent}%` }}
              >
                {data.firstLegDistance}km
              </div>
              {/* Charging stop */}
              <div 
                className="absolute top-0 h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium border-l-2 border-white"
                style={{ 
                  left: `${firstLegPercent}%`, 
                  width: '8%' 
                }}
              >
                ⚡{data.chargingTime}min
              </div>
              {/* Second leg */}
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xs font-medium border-l-2 border-white"
                style={{ 
                  left: `${firstLegPercent + 8}%`, 
                  width: `${secondLegPercent}%` 
                }}
              >
                {data.secondLegDistance}km
              </div>
            </div>
          </div>

          {/* Time Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-medium">First Leg</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{data.firstLegDistance}km</div>
                <div className="text-sm text-muted-foreground">{formatDuration(data.firstLegDuration)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Charging Stop</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">20% → 80%</div>
                <div className="text-sm text-muted-foreground">{data.chargingTime} minutes</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-medium">Second Leg</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{data.secondLegDistance}km</div>
                <div className="text-sm text-muted-foreground">{formatDuration(data.secondLegDuration)}</div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-3">Key Insights</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-600" />
                <span className="text-sm">80% range utilization</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">4% time charging</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <span className="text-sm">150kW peak charging</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Optimal stop location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Suitability Rating */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium">Long Distance Suitability</span>
            <Badge variant="default" className="bg-green-600">
              ★★★★☆ Excellent
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Well-suited for long distance travel with minimal charging stops required.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}