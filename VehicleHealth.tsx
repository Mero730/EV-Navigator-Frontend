import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Battery, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
  Route,
  Zap,
  Thermometer,
  Activity,
  Gauge
} from 'lucide-react';

export function VehicleHealth() {
  const [manualSOH, setManualSOH] = useState('');
  const [showSOHComparison, setShowSOHComparison] = useState(false);

  // Mock SOH data
  const currentSOHEstimate = 94.2;
  const testedSOH = 93.8;
  const originalRange = 340; // km WLTP
  const currentAdjustedRange = 320; // km adjusted
  const beginningRange = 340;

  // Degradation projections
  const projections = {
    scenarioUnusable: { years: 8.5, percentage: 70 },
    completelyUnusable: { years: 12, percentage: 50 },
    currentScenario: 'long-distance'
  };

  const handleSOHTest = () => {
    if (manualSOH) {
      setShowSOHComparison(true);
    }
  };

  const degradationTips = [
    {
      icon: Thermometer,
      title: 'Temperature Management',
      description: 'Avoid extreme temperatures. Park in shade or garage when possible.',
      impact: 'Reduces degradation by up to 20%'
    },
    {
      icon: Zap,
      title: 'Charging Habits',
      description: 'Charge to 80% for daily use, 100% only for long trips.',
      impact: 'Extends battery life by 15-25%'
    },
    {
      icon: Route,
      title: 'Driving Style',
      description: 'Avoid rapid acceleration and aggressive braking.',
      impact: 'Improves efficiency by 10-15%'
    },
    {
      icon: Clock,
      title: 'Charging Speed',
      description: 'Limit fast charging to 20% of total charging sessions.',
      impact: 'Reduces stress-related degradation'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Vehicle Health</h1>
        <p className="text-muted-foreground">
          Monitor your battery health and optimize vehicle performance
        </p>
      </div>

      <Tabs defaultValue="soh" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="soh">Battery Health</TabsTrigger>
          <TabsTrigger value="range">Range Analysis</TabsTrigger>
          <TabsTrigger value="tips">Optimization</TabsTrigger>
          <TabsTrigger value="specs">Vehicle Specifications</TabsTrigger>
        </TabsList>

        <TabsContent value="soh" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SOH Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Battery className="h-5 w-5" />
                    <span>State of Health (SOH)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Current Estimate</div>
                      <div className="text-3xl font-medium">{currentSOHEstimate}%</div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Excellent condition
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Last Tested</div>
                      <div className="text-3xl font-medium">{testedSOH}%</div>
                      <div className="text-sm text-muted-foreground">3 weeks ago</div>
                    </div>
                  </div>

                  <Progress value={currentSOHEstimate} className="h-3" />

                  {showSOHComparison && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Tested SOH ({testedSOH}%) is 0.4% lower than estimated ({currentSOHEstimate}%). 
                        This is within normal variance range.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SOH Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Enter tested SOH value (%)"
                      value={manualSOH}
                      onChange={(e) => setManualSOH(e.target.value)}
                      type="number"
                      min="0"
                      max="100"
                    />
                    <Button onClick={handleSOHTest}>Compare</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter your professionally tested SOH value to compare with our estimate
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Battery className="h-5 w-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <div className="font-medium text-blue-800 mb-2">Professional SOH Testing</div>
                          <p className="text-sm text-blue-700 mb-3">
                            Get an accurate battery health assessment from certified technicians. 
                            Professional testing provides precise measurements and official certification.
                          </p>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Schedule Testing Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SOH Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>12-Month Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 relative">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                      {(() => {
                        const data = [96.1, 95.8, 95.5, 95.3, 95.0, 94.8, 94.6, 94.4, 94.3, 94.2, 94.1, 94.2];
                        const maxValue = Math.max(...data);
                        const minValue = Math.min(...data);
                        const range = maxValue - minValue;
                        const padding = range * 0.1;
                        const adjustedMax = maxValue + padding;
                        const adjustedMin = minValue - padding;
                        const adjustedRange = adjustedMax - adjustedMin;
                        
                        const points = data.map((value, index) => {
                          const x = (index / (data.length - 1)) * 100;
                          const y = 100 - ((value - adjustedMin) / adjustedRange) * 100;
                          return `${x},${y}`;
                        }).join(' ');
                        
                        const pathData = data.map((value, index) => {
                          const x = (index / (data.length - 1)) * 100;
                          const y = 100 - ((value - adjustedMin) / adjustedRange) * 100;
                          return index === 0 ? `M${x},${y}` : `L${x},${y}`;
                        }).join(' ');
                        
                        const areaPath = pathData + ` L100,100 L0,100 Z`;
                        
                        return (
                          <>
                            <path d={areaPath} fill="url(#lineGradient)" />
                            <polyline
                              points={points}
                              fill="none"
                              stroke="rgb(59, 130, 246)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {data.map((value, index) => {
                              const x = (index / (data.length - 1)) * 100;
                              const y = 100 - ((value - adjustedMin) / adjustedRange) * 100;
                              return (
                                <circle
                                  key={index}
                                  cx={`${x}%`}
                                  cy={`${y}%`}
                                  r="3"
                                  fill="rgb(59, 130, 246)"
                                  stroke="white"
                                  strokeWidth="2"
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">12 months ago</span>
                      <span>96.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current</span>
                      <span className="font-medium">{currentSOHEstimate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual degradation</span>
                      <span className="text-orange-600">-1.9%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Battery Degradation Projections */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium">Degradation Projections</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Based on current usage patterns, environmental factors, and battery chemistry analysis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Scenario Limitation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-medium">{projections.scenarioUnusable.years} years</div>
                    <div className="text-sm text-muted-foreground">
                      When battery reaches {projections.scenarioUnusable.percentage}% SOH, long-distance travel may become challenging
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-sm mb-2">Alternative Uses:</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• City commuting (range: ~200km)</li>
                        <li>• Daily errands and shopping</li>
                        <li>• Short recreational trips</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Battery className="h-5 w-5 text-red-600" />
                    <span>End of Life</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-medium">{projections.completelyUnusable.years} years</div>
                    <div className="text-sm text-muted-foreground">
                      When battery reaches {projections.completelyUnusable.percentage}% SOH, vehicle becomes unsuitable for most use cases
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-sm mb-2">Consider:</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Battery replacement/refurbishment</li>
                        <li>• Vehicle trade-in program</li>
                        <li>• Recycling through manufacturer</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Degradation Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                    <div className="space-y-6">
                      {[
                        { year: 'Today', soh: 94.2, status: 'Excellent', color: 'green', description: 'Full functionality' },
                        { year: '2 years', soh: 90, status: 'Very Good', color: 'green', description: 'Minimal impact on daily use' },
                        { year: '5 years', soh: 82, status: 'Good', color: 'yellow', description: 'Slight range reduction noticeable' },
                        { year: '8.5 years', soh: 70, status: 'Limited', color: 'orange', description: 'Long-distance travel challenging' },
                        { year: '12 years', soh: 50, status: 'End of Life', color: 'red', description: 'Replacement recommended' },
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full border-2 bg-background flex items-center justify-center ${
                            milestone.color === 'green' ? 'border-green-500' :
                            milestone.color === 'yellow' ? 'border-yellow-500' :
                            milestone.color === 'orange' ? 'border-orange-500' : 'border-red-500'
                          }`}>
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.color === 'green' ? 'bg-green-500' :
                              milestone.color === 'yellow' ? 'bg-yellow-500' :
                              milestone.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{milestone.year}</span>
                              <Badge variant={milestone.color === 'green' ? 'secondary' : 'outline'}>
                                {milestone.soh}% SOH
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{milestone.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="range" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5" />
                  <span>Original WLTP Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-medium">{originalRange} km</div>
                <div className="text-sm text-muted-foreground">Factory specification</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Current Adjusted Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-medium">{currentAdjustedRange} km</div>
                <div className="text-sm text-muted-foreground">Real-world conditions</div>
                <div className="flex items-center text-sm text-orange-600 mt-2">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -20 km vs beginning
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="h-5 w-5" />
                  <span>Range Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-medium">94%</div>
                <div className="text-sm text-muted-foreground">Of original capacity</div>
                <Progress value={94} className="h-3 mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>WLTP vs Real-World Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">WLTP Consumption</div>
                    <div className="text-xl font-medium">15.9 kWh/100km</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Your Average</div>
                    <div className="text-xl font-medium">18.2 kWh/100km</div>
                    <div className="text-sm text-orange-600">+14% above WLTP</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Best Efficiency</div>
                    <div className="text-xl font-medium">16.8 kWh/100km</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Seasonal Impact</div>
                    <div className="text-xl font-medium">+25%</div>
                    <div className="text-sm text-muted-foreground">Winter consumption increase</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {degradationTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {tip.impact}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Your Optimization Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-medium">7.8/10</div>
                <Progress value={78} className="h-3" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Charging Habits</div>
                    <div className="font-medium text-green-600">Excellent (9/10)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Temperature Management</div>
                    <div className="font-medium text-yellow-600">Good (6/10)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Driving Style</div>
                    <div className="font-medium text-green-600">Very Good (8/10)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Maintenance</div>
                    <div className="font-medium text-green-600">Excellent (9/10)</div>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Optimization Tip</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider installing a garage or covered parking solution to improve temperature management. 
                    This single improvement could boost your score to 8.5/10.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="h-5 w-5" />
                <span>Vehicle Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}