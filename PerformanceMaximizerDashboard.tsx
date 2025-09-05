import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAppState } from '../AppStateManager';
import { 
  TrendingUp, 
  Battery, 
  Zap, 
  Route,
  Clock,
  Target,
  Activity,
  ArrowUp,
  ArrowDown,
  DollarSign,
  TrendingDown,
  Search
} from 'lucide-react';

export function PerformanceMaximizerDashboard() {
  const { state } = useAppState();
  const { userData } = state;

  // Mock data for performance metrics
  const monthlyElectricityCost = 127;
  const currentSOH = 94.2;
  const projectedSOH12Months = 91.8;
  const efficiencyScore = 8.7;
  const weeklyConsumption = [4.2, 3.8, 4.1, 3.9, 4.3, 3.7, 4.0];
  const monthlyTrend = [85, 87, 89, 88, 90, 89, 91, 90, 92, 91, 93, 94];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Performance Header */}
      <div className="space-y-2">
        <h1 className="text-2xl">Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Optimize your {userData.carYear} {userData.carMake} {userData.carModel} performance
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Monthly Cost */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">${monthlyElectricityCost}</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <ArrowDown className="h-3 w-3" />
              <span>-12% vs last month</span>
            </div>
            <div className="mt-2 h-8 flex items-end space-x-1">
              {[135, 142, 138, 129, 127, 131, 127].map((value, i) => (
                <div
                  key={i}
                  className="bg-green-200 flex-1 rounded-sm"
                  style={{ height: `${(value / 150) * 100}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current SOH */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Current SOH</CardTitle>
            <Battery className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{currentSOH}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3" />
              <span>-0.1% this month</span>
            </div>
            <div className="mt-2 h-8 flex items-end space-x-1">
              {monthlyTrend.slice(-7).map((value, i) => (
                <div
                  key={i}
                  className="bg-blue-200 flex-1 rounded-sm"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 12-Month Projection */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">SOH in 12 Months</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{projectedSOH12Months}%</div>
            <div className="text-xs text-muted-foreground">-2.4% degradation</div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                Above average retention
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Efficiency Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{efficiencyScore}/10</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3" />
              <span>+0.3 this week</span>
            </div>
            <div className="mt-2 h-8 flex items-end space-x-1">
              {weeklyConsumption.map((value, i) => (
                <div
                  key={i}
                  className="bg-green-200 flex-1 rounded-sm"
                  style={{ height: `${(value / 5) * 100}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cost Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Home Charging</div>
                    <div className="font-medium">$89 (70%)</div>
                    <div className="text-xs text-green-600">$0.12/kWh avg</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Public Fast</div>
                    <div className="font-medium">$38 (30%)</div>
                    <div className="text-xs text-orange-600">$0.35/kWh avg</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total kWh</div>
                    <div className="font-medium">486 kWh</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cost Efficiency</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <div className="font-medium mb-1">💡 Cost Optimization</div>
                  <div className="text-muted-foreground">
                    Increase home charging to 85% to save ~$15/month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SOH Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Battery className="h-5 w-5" />
                <span>Battery Health Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Health</div>
                    <div className="text-xl font-medium">{currentSOH}%</div>
                    <div className="text-xs text-green-600">
                      Above average for age
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">12-Month Projection</div>
                    <div className="text-xl font-medium">{projectedSOH12Months}%</div>
                    <div className="text-xs text-muted-foreground">
                      2.4% annual degradation
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Range Impact</div>
                    <div className="text-xl font-medium">-15 miles</div>
                    <div className="text-xs text-muted-foreground">
                      Estimated loss in 12 months
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Charging Cycles</div>
                    <div className="text-xl font-medium">247</div>
                    <div className="text-xs text-muted-foreground">
                      Well within optimal range
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="space-y-6">
          {/* EV Database */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">EV Database</CardTitle>
              <Search className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Compare & Analyze</div>
                  <div className="text-muted-foreground">
                    Deep dive into EV specifications
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-white rounded">
                    <div className="font-medium">150+</div>
                    <div className="text-muted-foreground">Models</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded">
                    <div className="font-medium">25+</div>
                    <div className="text-muted-foreground">Metrics</div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  Browse & Compare
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Quick Wins</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Smart Charging</div>
                    <div className="text-xs text-muted-foreground">
                      Schedule for off-peak hours
                    </div>
                    <div className="text-xs text-green-600 mt-1">+$15/month</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Preconditioning</div>
                    <div className="text-xs text-muted-foreground">
                      Heat while plugged in
                    </div>
                    <div className="text-xs text-blue-600 mt-1">+12% efficiency</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Route Planning</div>
                    <div className="text-xs text-muted-foreground">
                      Use eco-friendly routes
                    </div>
                    <div className="text-xs text-purple-600 mt-1">+8% range</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}