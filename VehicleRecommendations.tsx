import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ArrowLeft, Star, ChevronDown, MapPin, Zap, Users, Euro, Car, CheckCircle, Plus } from 'lucide-react';

interface VehicleRecommendation {
  id: string;
  make: string;
  model: string;
  score: number;
  matchReasons: string[];
  price: number;
  range: number;
  acceleration: number;
  efficiency: number;
  chargingSpeed: number;
  seating: number;
  bestFor: string;
  percentile: number;
  totalCostYear3: number;
  category: string;
  bodyType: string;
  drivetrain: string;
  pros: string[];
  cons: string[];
}

interface VehicleRecommendationsProps {
  onBack: () => void;
  onGoToDatabase: () => void;
  recommendations?: VehicleRecommendation[];
}

export function VehicleRecommendations({ onBack, onGoToDatabase, recommendations = [] }: VehicleRecommendationsProps) {
  const [expandedVehicles, setExpandedVehicles] = useState<Set<string>>(new Set());
  const [showMoreRecommendations, setShowMoreRecommendations] = useState(false);

  // Mock recommendations if none provided
  const mockRecommendations: VehicleRecommendation[] = [
    {
      id: 'tesla-model-y',
      make: 'Tesla',
      model: 'Model Y Long Range',
      score: 94,
      matchReasons: [
        'Excellent range matches your long-distance needs',
        'Supercharger network perfect for road trips',
        'Advanced autopilot for highway driving',
        'Spacious interior for family use'
      ],
      price: 55900,
      range: 533,
      acceleration: 5.0,
      efficiency: 16.9,
      chargingSpeed: 250,
      seating: 5,
      bestFor: 'Long-range family trips',
      percentile: 95,
      totalCostYear3: 68000,
      category: 'Premium SUV',
      bodyType: 'SUV',
      drivetrain: 'AWD',
      pros: ['Market-leading range', 'Excellent charging network', 'Advanced tech features', 'Strong resale value'],
      cons: ['Higher purchase price', 'Build quality concerns', 'Limited service network']
    },
    {
      id: 'hyundai-ioniq5',
      make: 'Hyundai',
      model: 'IONIQ 5',
      score: 89,
      matchReasons: [
        'Ultra-fast 800V charging architecture',
        'Innovative interior design with space',
        'Great value for money proposition',
        'Advanced driver assistance features'
      ],
      price: 52000,
      range: 481,
      acceleration: 5.2,
      efficiency: 17.7,
      chargingSpeed: 233,
      seating: 5,
      bestFor: 'Fast charging technology',
      percentile: 88,
      totalCostYear3: 61000,
      category: 'Tech SUV',
      bodyType: 'SUV',
      drivetrain: 'AWD',
      pros: ['Ultra-fast charging', 'Spacious interior', 'Innovative design', '5-year warranty'],
      cons: ['Limited charging network', 'Road noise at speed', 'Firm ride quality']
    },
    {
      id: 'vw-id4',
      make: 'Volkswagen',
      model: 'ID.4 Pro',
      score: 85,
      matchReasons: [
        'Excellent balance of range and price',
        'Traditional SUV proportions',
        'Solid build quality',
        'Good charging infrastructure support'
      ],
      price: 48500,
      range: 520,
      acceleration: 6.2,
      efficiency: 17.4,
      chargingSpeed: 135,
      seating: 5,
      bestFor: 'Balanced performance & value',
      percentile: 75,
      totalCostYear3: 57000,
      category: 'Mid-range SUV',
      bodyType: 'SUV',
      drivetrain: 'RWD',
      pros: ['Great range for price', 'Solid build quality', 'Spacious interior', 'Good dealer network'],
      cons: ['Slower charging speed', 'Less advanced tech', 'Higher wind noise']
    }
  ];

  const additionalRecommendations: VehicleRecommendation[] = [
    {
      id: 'ford-mustang-mach-e',
      make: 'Ford',
      model: 'Mustang Mach-E',
      score: 82,
      matchReasons: [
        'Sporty design with SUV practicality',
        'Good range and performance balance',
        'Established dealer network',
        'Advanced infotainment system'
      ],
      price: 50500,
      range: 491,
      acceleration: 4.8,
      efficiency: 18.1,
      chargingSpeed: 150,
      seating: 5,
      bestFor: 'Sporty SUV performance',
      percentile: 80,
      totalCostYear3: 59000,
      category: 'Performance SUV',
      bodyType: 'SUV',
      drivetrain: 'AWD',
      pros: ['Sporty handling', 'Good range', 'Strong performance', 'Ford reliability'],
      cons: ['Higher efficiency rating', 'Limited rear visibility', 'Touch-heavy controls']
    },
    {
      id: 'bmw-ix3',
      make: 'BMW',
      model: 'iX3',
      score: 78,
      matchReasons: [
        'Premium luxury features',
        'Excellent build quality',
        'Good driving dynamics',
        'Established service network'
      ],
      price: 56000,
      range: 460,
      acceleration: 6.8,
      efficiency: 18.5,
      chargingSpeed: 150,
      seating: 5,
      bestFor: 'Luxury driving experience',
      percentile: 70,
      totalCostYear3: 64000,
      category: 'Luxury SUV',
      bodyType: 'SUV',
      drivetrain: 'RWD',
      pros: ['Premium interior', 'Excellent handling', 'Strong brand', 'Good tech integration'],
      cons: ['Lower range', 'Higher price', 'More expensive maintenance']
    }
  ];

  const displayRecommendations = recommendations.length > 0 ? recommendations : mockRecommendations;
  const allRecommendations = showMoreRecommendations 
    ? [...displayRecommendations, ...additionalRecommendations] 
    : displayRecommendations;

  const toggleVehicleExpansion = (vehicleId: string) => {
    const newExpanded = new Set(expandedVehicles);
    if (newExpanded.has(vehicleId)) {
      newExpanded.delete(vehicleId);
    } else {
      newExpanded.add(vehicleId);
    }
    setExpandedVehicles(newExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-blue-600';
    if (score >= 70) return 'bg-orange-600';
    return 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Wizard
          </Button>
          
          <div className="mb-6">
            <h1 className="mb-2">Your EV Recommendations</h1>
            <p className="text-muted-foreground">
              Based on your preferences, here are the best electric vehicles for you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Top 3 Recommendations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Top Recommendations
          </h2>
          
          {allRecommendations.map((vehicle, index) => (
            <Card key={vehicle.id} className={`overflow-hidden ${index < 3 ? 'border-2 border-blue-200 bg-blue-50/30' : 'hover:shadow-md'} transition-all`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${getScoreColor(vehicle.score)} text-white`}>
                        #{index + 1} Match
                      </Badge>
                      <Badge variant="outline">{vehicle.category}</Badge>
                      {index < 3 && <Badge variant="default" className="bg-blue-600">Recommended</Badge>}
                    </div>
                    <CardTitle className="text-xl">
                      {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {vehicle.bodyType} • {vehicle.drivetrain} • {vehicle.bestFor}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">€{vehicle.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Starting price</div>
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-sm">
                        {vehicle.score}% Match
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <MapPin className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                    <div className="font-semibold">{vehicle.range} km</div>
                    <div className="text-xs text-muted-foreground">Range</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Zap className="h-4 w-4 mx-auto mb-1 text-green-600" />
                    <div className="font-semibold">{vehicle.chargingSpeed} kW</div>
                    <div className="text-xs text-muted-foreground">Max Charging</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Car className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                    <div className="font-semibold">{vehicle.acceleration}s</div>
                    <div className="text-xs text-muted-foreground">0-100 km/h</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Euro className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                    <div className="font-semibold">€{(vehicle.totalCostYear3 / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-muted-foreground">3-Year Cost</div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Match Score</span>
                    <span className="font-medium">{vehicle.score}%</span>
                  </div>
                  <Progress value={vehicle.score} className={`h-2 [&>div]:${getScoreColor(vehicle.score)}`} />
                </div>

                {/* Why it matches */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Why this matches your needs:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {vehicle.matchReasons.slice(0, 4).map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand/Collapse Details */}
                <Collapsible
                  open={expandedVehicles.has(vehicle.id)}
                  onOpenChange={() => toggleVehicleExpansion(vehicle.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span>Show detailed specifications</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedVehicles.has(vehicle.id) ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-4 pt-4 border-t">
                    {/* Detailed Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                        <div className="font-medium">{vehicle.efficiency} kWh/100km</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Seating</div>
                        <div className="font-medium">{vehicle.seating} seats</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Market Position</div>
                        <div className="font-medium">Top {100 - vehicle.percentile}%</div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">Pros</h5>
                        <ul className="space-y-1">
                          {vehicle.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-600 mb-2">Considerations</h5>
                        <ul className="space-y-1">
                          {vehicle.cons.map((con, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <div className="w-3 h-3 border border-orange-400 rounded-full mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        Save to Favorites
                      </Button>
                      <Button variant="outline" size="sm">
                        Request Quote
                      </Button>
                      <Button size="sm">
                        View Full Details
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Recommendations */}
        {!showMoreRecommendations && (
          <div className="text-center py-6">
            <Button
              variant="outline"
              onClick={() => setShowMoreRecommendations(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Show 2 More Recommendations
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
          <Button 
            onClick={onGoToDatabase}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Explore Full EV Database
          </Button>
          <Button variant="outline" className="flex-1">
            Save Recommendations to Profile
          </Button>
          <Button variant="outline" className="flex-1">
            Start New Search
          </Button>
        </div>

        {/* Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="space-y-1 text-sm">
              <li>• Contact dealers for test drives and pricing</li>
              <li>• Check charging infrastructure in your area</li>
              <li>• Consider financing and insurance options</li>
              <li>• Review government incentives and rebates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}