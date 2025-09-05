import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Calculator, TrendingUp } from 'lucide-react';

interface EnhancedCostAnalysisProps {
  vehicle: {
    price: number;
    efficiency: number;
    chargingCost: number;
    maintenanceCost: number;
  };
}

interface CostBreakdown {
  amortization: number;
  parking: number;
  insurance: number;
  diverse: number;
  maintenance: number;
  energy: number;
  repair: number;
  tires: number;
}

export function EnhancedCostAnalysis({ vehicle }: EnhancedCostAnalysisProps) {
  // Calculate annual costs based on yearly operating costs with fixed values
  const amortizationAnnual = vehicle.price * 0.08; // 8% of purchase price
  const parkingAnnual = 1800; // €1800/year for garage/parking (fixed)
  const insuranceAnnual = 1400; // €1400/year insurance (fixed)
  const diverseAnnual = 600; // €600/year miscellaneous costs (fixed)
  const maintenanceAnnual = 800; // €800/year maintenance (fixed)
  const energyAnnual = 850; // €850/year energy costs (fixed, reasonable for EV)
  const repairAnnual = 400; // €400/year repair costs (fixed)
  const tiresAnnual = 350; // €350/year tire costs (fixed)
  
  const totalAnnualCost = amortizationAnnual + parkingAnnual + insuranceAnnual + diverseAnnual + 
                         maintenanceAnnual + energyAnnual + repairAnnual + tiresAnnual;

  // Calculate percentages
  const costBreakdown: CostBreakdown = {
    amortization: Math.round((amortizationAnnual / totalAnnualCost) * 100),
    parking: Math.round((parkingAnnual / totalAnnualCost) * 100),
    insurance: Math.round((insuranceAnnual / totalAnnualCost) * 100),
    diverse: Math.round((diverseAnnual / totalAnnualCost) * 100),
    maintenance: Math.round((maintenanceAnnual / totalAnnualCost) * 100),
    energy: Math.round((energyAnnual / totalAnnualCost) * 100),
    repair: Math.round((repairAnnual / totalAnnualCost) * 100),
    tires: Math.round((tiresAnnual / totalAnnualCost) * 100)
  };

  const costCategories = [
    { 
      key: 'amortization', 
      label: 'Amortisation', 
      percentage: costBreakdown.amortization, 
      amount: amortizationAnnual,
      color: 'bg-blue-600',
      isFixed: true
    },
    { 
      key: 'parking', 
      label: 'Parking/Garage', 
      percentage: costBreakdown.parking, 
      amount: parkingAnnual,
      color: 'bg-blue-500',
      isFixed: true
    },
    { 
      key: 'insurance', 
      label: 'Insurance', 
      percentage: costBreakdown.insurance, 
      amount: insuranceAnnual,
      color: 'bg-blue-400',
      isFixed: true
    },
    { 
      key: 'diverse', 
      label: 'Miscellaneous', 
      percentage: costBreakdown.diverse, 
      amount: diverseAnnual,
      color: 'bg-blue-300',
      isFixed: false
    },
    { 
      key: 'maintenance', 
      label: 'Maintenance', 
      percentage: costBreakdown.maintenance, 
      amount: maintenanceAnnual,
      color: 'bg-green-600',
      isFixed: false
    },
    { 
      key: 'energy', 
      label: 'Energy Costs', 
      percentage: costBreakdown.energy, 
      amount: energyAnnual,
      color: 'bg-green-500',
      isFixed: false
    },
    { 
      key: 'repair', 
      label: 'Repairs', 
      percentage: costBreakdown.repair, 
      amount: repairAnnual,
      color: 'bg-green-400',
      isFixed: false
    },
    { 
      key: 'tires', 
      label: 'Tires', 
      percentage: costBreakdown.tires, 
      amount: tiresAnnual,
      color: 'bg-green-300',
      isFixed: false
    }
  ];

  const fixedCostsPercentage = costCategories.filter(cat => cat.isFixed).reduce((sum, cat) => sum + cat.percentage, 0);
  const variableCostsPercentage = 100 - fixedCostsPercentage;

  // Create SVG pie chart
  const createPieChart = () => {
    let cumulativePercentage = 0;
    const radius = 110; // Increased radius for bigger chart
    const centerX = 140; // Updated center coordinates
    const centerY = 140;

    return costCategories.map((category, index) => {
      const startAngle = (cumulativePercentage / 100) * 360;
      const endAngle = ((cumulativePercentage + category.percentage) / 100) * 360;
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = category.percentage > 50 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      cumulativePercentage += category.percentage;

      const colors: { [key: string]: string } = {
        'bg-blue-600': '#2563eb',
        'bg-blue-500': '#3b82f6',
        'bg-blue-400': '#60a5fa',
        'bg-blue-300': '#93c5fd',
        'bg-green-600': '#16a34a',
        'bg-green-500': '#22c55e',
        'bg-green-400': '#4ade80',
        'bg-green-300': '#86efac'
      };

      return (
        <path
          key={category.key}
          d={pathData}
          fill={colors[category.color] || '#64748b'}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          stroke="white"
          strokeWidth="2"
        />
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Interactive Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Annual Cost Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total annual cost: €{totalAnnualCost.toLocaleString()} (based on yearly operating costs)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart - Made Bigger */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="280" height="280" viewBox="0 0 280 280">
                  {createPieChart()}
                  {/* Center circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r="50"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <text
                    x="140"
                    y="133"
                    textAnchor="middle"
                    className="text-base font-medium fill-foreground"
                  >
                    Annual Cost
                  </text>
                  <text
                    x="140"
                    y="152"
                    textAnchor="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    €{(totalAnnualCost / 1000).toFixed(0)}k
                  </text>
                </svg>
              </div>
            </div>

            {/* Legend and Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  Fixed Costs ({fixedCostsPercentage}%)
                </div>
                {costCategories.filter(cat => cat.isFixed).map((category) => (
                  <div key={category.key} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-sm`}></div>
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.percentage}%</div>
                      <div className="text-xs text-muted-foreground">€{Math.round(category.amount).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-2 pt-3 border-t">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                  Variable Costs ({variableCostsPercentage}%)
                </div>
                {costCategories.filter(cat => !cat.isFixed).map((category) => (
                  <div key={category.key} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-sm`}></div>
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.percentage}%</div>
                      <div className="text-xs text-muted-foreground">€{Math.round(category.amount).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Projections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4" />
              Year 1 Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              €{totalAnnualCost.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Including purchase cost impact</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              3-Year Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              €{(totalAnnualCost * 3).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total cost of ownership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4" />
              Cost per km
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{(totalAnnualCost / 15000).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Based on 15,000 km/year</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Details */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Calculation Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Breakdown of annual cost calculations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Fixed Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amortization (8% of €{vehicle.price.toLocaleString()})</span>
                  <span>€{Math.round(amortizationAnnual).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking/Garage</span>
                  <span>€{parkingAnnual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance</span>
                  <span>€{Math.round(insuranceAnnual).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Miscellaneous</span>
                  <span>€{diverseAnnual.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Variable Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Energy ({vehicle.efficiency} kWh/100km × 15,000km)</span>
                  <span>€{Math.round(energyAnnual).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance</span>
                  <span>€{maintenanceAnnual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Repairs</span>
                  <span>€{repairAnnual.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tires</span>
                  <span>€{tiresAnnual.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}