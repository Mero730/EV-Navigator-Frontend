import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { useAppState } from '../AppStateManager';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Shield,
  Zap,
  Car,
  Home,
  CreditCard,
  AlertCircle,
  ExternalLink,
  Gift,
  MapPin,
  CheckCircle2,
  Clock,
  Battery,
  Wrench,
  Target
} from 'lucide-react';

export function Finance() {
  const { state } = useAppState();
  const { userData } = state;
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Mock financial data
  const financeData = {
    currentResidualValue: 18500,
    originalValue: 42000,
    monthlyLease: 485,
    monthsRemaining: 18,
    totalPaid: 8730, // 485 * 18 months so far
    depreciation: 23500,
    
    // OPEX breakdown
    monthlyOPEX: {
      charging: 127,
      insurance: 185,
      maintenance: 45,
      lease: 485,
      total: 842
    },
    
    // Best time to buy analysis
    optimalBuyTime: {
      months: 12,
      residualAtTime: 16200,
      totalCostToBuy: 21850, // remaining lease payments + residual
      marketValue: 18900,
      savings: 2950
    },

    warranty: {
      manufacturer: {
        vehicle: { years: 2, km: 100000, remaining: { months: 8, km: 68000 } },
        battery: { years: 8, km: 160000, remaining: { months: 90, km: 128000 } }
      },
      extended: [
        { provider: 'VW Extended', cost: 1200, duration: '2 years', coverage: 'Comprehensive' },
        { provider: 'SwissWarranty+', cost: 890, duration: '3 years', coverage: 'Powertrain' }
      ]
    },

    subsidies: [
      { name: 'Canton Zurich EV Bonus', amount: 5000, status: 'eligible', type: 'vehicle' },
      { name: 'Home Charger Installation', amount: 1500, status: 'applied', type: 'charger' },
      { name: 'Solar + EV Package', amount: 3000, status: 'eligible', type: 'combined' }
    ]
  };

  const renderCostBreakdown = () => (
    <div className="space-y-4">
      <h3 className="font-medium">Cost Breakdown for Early Purchase</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Remaining lease payments ({financeData.optimalBuyTime.months} months)</span>
          <span>CHF {(financeData.monthlyLease * financeData.optimalBuyTime.months).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Residual value at optimal time</span>
          <span>CHF {financeData.optimalBuyTime.residualAtTime.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-medium">
          <span>Total cost to purchase</span>
          <span>CHF {financeData.optimalBuyTime.totalCostToBuy.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Market value at that time</span>
          <span>CHF {financeData.optimalBuyTime.marketValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600 font-medium">
          <span>Estimated savings vs. market</span>
          <span>CHF {financeData.optimalBuyTime.savings.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Finance Dashboard</h1>
        <p className="text-muted-foreground">
          Complete financial overview and optimization recommendations
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opex">OPEX Analysis</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
          <TabsTrigger value="subsidies">Subsidies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span>Current Value</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">CHF {financeData.currentResidualValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {Math.round((financeData.currentResidualValue / financeData.originalValue) * 100)}% of original value
                </div>
                <Progress 
                  value={(financeData.currentResidualValue / financeData.originalValue) * 100} 
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Optimal Buy Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">{financeData.optimalBuyTime.months} months</div>
                <div className="text-sm text-muted-foreground">
                  Save CHF {financeData.optimalBuyTime.savings.toLocaleString()}
                </div>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-green-600 text-xs"
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                >
                  View calculation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <span>Monthly OPEX</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">CHF {financeData.monthlyOPEX.total}</div>
                <div className="text-sm text-muted-foreground">
                  All operating expenses
                </div>
                <div className="text-sm text-orange-600">
                  CHF {(financeData.monthlyOPEX.total * 12 / 1000).toFixed(1)}k annually
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Lease Remaining</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">{financeData.monthsRemaining} months</div>
                <div className="text-sm text-muted-foreground">
                  CHF {(financeData.monthlyLease * financeData.monthsRemaining).toLocaleString()} remaining
                </div>
                <Progress 
                  value={((36 - financeData.monthsRemaining) / 36) * 100} 
                  className="h-2 mt-2" 
                />
              </CardContent>
            </Card>
          </div>

          {/* Cost Breakdown Modal */}
          {showCostBreakdown && (
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                {renderCostBreakdown()}
              </CardContent>
            </Card>
          )}

          {/* Lease Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Lease Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Original vehicle value</span>
                      <span>CHF {financeData.originalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current residual value</span>
                      <span>CHF {financeData.currentResidualValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total depreciation</span>
                      <span className="text-red-600">CHF {financeData.depreciation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium border-t pt-2">
                      <span>Monthly lease payment</span>
                      <span>CHF {financeData.monthlyLease}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payments made so far</span>
                      <span>CHF {financeData.totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Remaining payments</span>
                      <span>CHF {(financeData.monthlyLease * financeData.monthsRemaining).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>End-of-lease purchase option</span>
                      <span>CHF {financeData.currentResidualValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium border-t pt-2">
                      <span>Total to own (if purchased now)</span>
                      <span>CHF {(financeData.totalPaid + (financeData.monthlyLease * financeData.monthsRemaining) + financeData.currentResidualValue).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opex" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPEX Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Operating Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span>Lease Payment</span>
                    </div>
                    <span className="font-medium">CHF {financeData.monthlyOPEX.lease}</span>
                  </div>
                  <Progress value={(financeData.monthlyOPEX.lease / financeData.monthlyOPEX.total) * 100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Insurance</span>
                    </div>
                    <span className="font-medium">CHF {financeData.monthlyOPEX.insurance}</span>
                  </div>
                  <Progress value={(financeData.monthlyOPEX.insurance / financeData.monthlyOPEX.total) * 100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <span>Charging</span>
                    </div>
                    <span className="font-medium">CHF {financeData.monthlyOPEX.charging}</span>
                  </div>
                  <Progress value={(financeData.monthlyOPEX.charging / financeData.monthlyOPEX.total) * 100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4 text-orange-600" />
                      <span>Maintenance</span>
                    </div>
                    <span className="font-medium">CHF {financeData.monthlyOPEX.maintenance}</span>
                  </div>
                  <Progress value={(financeData.monthlyOPEX.maintenance / financeData.monthlyOPEX.total) * 100} className="h-2" />
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Monthly OPEX</span>
                    <span>CHF {financeData.monthlyOPEX.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Influencing Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Battery className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Battery Health Impact</div>
                      <div className="text-xs text-muted-foreground">
                        SOH at 94.2% - No impact on costs yet
                      </div>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 text-xs">
                        Optimal
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Charging Behavior</div>
                      <div className="text-xs text-muted-foreground">
                        70% home charging keeps costs low
                      </div>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 text-xs">
                        Efficient
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Warranty Coverage</div>
                      <div className="text-xs text-muted-foreground">
                        8 months vehicle, 90 months battery remaining
                      </div>
                      <Button variant="link" className="p-0 h-auto text-green-600 text-xs">
                        View warranty details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Cost Optimization Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Increase Home Charging</div>
                      <div className="text-xs text-muted-foreground">
                        Target 85% home charging to save CHF 15/month
                      </div>
                      <div className="text-xs text-green-600 mt-1">Potential: CHF 180/year</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Insurance Review</div>
                      <div className="text-xs text-muted-foreground">
                        EV-specific policies can be 10-15% cheaper
                      </div>
                      <div className="text-xs text-blue-600 mt-1">Potential: CHF 300/year</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Maintenance Scheduling</div>
                      <div className="text-xs text-muted-foreground">
                        Preventive maintenance reduces unexpected costs
                      </div>
                      <div className="text-xs text-purple-600 mt-1">Potential: CHF 200/year</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Smart Charging</div>
                      <div className="text-xs text-muted-foreground">
                        Time-of-use rates and load balancing
                      </div>
                      <div className="text-xs text-orange-600 mt-1">Potential: CHF 120/year</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Warranty */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Manufacturer Warranty</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">Vehicle Warranty</div>
                      <Badge variant={financeData.warranty.manufacturer.vehicle.remaining.months > 6 ? "secondary" : "destructive"}>
                        {financeData.warranty.manufacturer.vehicle.remaining.months > 0 ? `${financeData.warranty.manufacturer.vehicle.remaining.months} months` : 'Expired'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{financeData.warranty.manufacturer.vehicle.years} years or {financeData.warranty.manufacturer.vehicle.km.toLocaleString()} km</div>
                      <div>Remaining: {financeData.warranty.manufacturer.vehicle.remaining.km.toLocaleString()} km</div>
                    </div>
                    <Progress value={(financeData.warranty.manufacturer.vehicle.remaining.months / (financeData.warranty.manufacturer.vehicle.years * 12)) * 100} className="h-2 mt-2" />
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">Battery Warranty</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {Math.round(financeData.warranty.manufacturer.battery.remaining.months / 12)} years
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{financeData.warranty.manufacturer.battery.years} years or {financeData.warranty.manufacturer.battery.km.toLocaleString()} km</div>
                      <div>Remaining: {financeData.warranty.manufacturer.battery.remaining.km.toLocaleString()} km</div>
                    </div>
                    <Progress value={(financeData.warranty.manufacturer.battery.remaining.months / (financeData.warranty.manufacturer.battery.years * 12)) * 100} className="h-2 mt-2" />
                  </div>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Vehicle warranty expires in 8 months. Consider extended warranty options.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Extended Warranty Options */}
            <Card>
              <CardHeader>
                <CardTitle>Extended Warranty Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {financeData.warranty.extended.map((warranty, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{warranty.provider}</div>
                        <div className="text-xs text-muted-foreground">{warranty.duration} • {warranty.coverage}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">CHF {warranty.cost}</div>
                        <div className="text-xs text-muted-foreground">one-time</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Get Quote
                    </Button>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-sm text-blue-800 mb-1">Recommendation</div>
                  <div className="text-xs text-blue-700">
                    VW Extended offers best value with comprehensive coverage including battery degradation protection.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Coverage Details */}
          <Card>
            <CardHeader>
              <CardTitle>What's Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Current Manufacturer Warranty</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Powertrain components</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Electrical system</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Body and paint (3 years)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Battery capacity (≥70%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Not Covered</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span>Wear items (tires, brakes)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span>Cosmetic damage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span>Accident damage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span>Software updates</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Extended Options</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-600" />
                      <span>Component replacement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-600" />
                      <span>Roadside assistance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-600" />
                      <span>Rental car coverage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-600" />
                      <span>Battery degradation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subsidies" className="space-y-6">
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              Subsidies shown are for your registered location: {userData.zipCode}, Switzerland
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeData.subsidies.map((subsidy, index) => (
              <Card key={index} className={subsidy.status === 'eligible' ? 'border-green-200 bg-green-50/50' : subsidy.status === 'applied' ? 'border-blue-200 bg-blue-50/50' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-base">{subsidy.name}</span>
                    <Badge variant={subsidy.status === 'eligible' ? 'secondary' : subsidy.status === 'applied' ? 'outline' : 'destructive'}>
                      {subsidy.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-medium">CHF {subsidy.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {subsidy.type === 'vehicle' && 'Vehicle purchase bonus'}
                      {subsidy.type === 'charger' && 'Home charger installation'}
                      {subsidy.type === 'combined' && 'Solar + EV package'}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {subsidy.type === 'vehicle' && 'For EV purchases'}
                      {subsidy.type === 'charger' && 'Installation subsidy'}
                      {subsidy.type === 'combined' && 'Renewable energy combo'}
                    </span>
                  </div>
                  
                  <Button 
                    variant={subsidy.status === 'eligible' ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full"
                    disabled={subsidy.status === 'applied'}
                  >
                    {subsidy.status === 'eligible' && (
                      <>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Apply Now
                      </>
                    )}
                    {subsidy.status === 'applied' && (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Application Pending
                      </>
                    )}
                    {subsidy.status === 'expired' && 'No Longer Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Total Available Subsidies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-green-600">
                    CHF {financeData.subsidies.filter(s => s.status === 'eligible').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Available to claim</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-blue-600">
                    CHF {financeData.subsidies.filter(s => s.status === 'applied').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Application pending</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium">
                    CHF {financeData.subsidies.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total potential value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}