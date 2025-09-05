import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart } from 'lucide-react';
import exampleImage from 'figma:asset/b88204ac533140b546f783881d1a3028ba4380e9.png';

interface CostBreakdownData {
  depreciation: number;
  parking: number;
  insurance: number;
  diverse: number;
  maintenance: number;
  energy: number;
  repair: number;
  tires: number;
}

interface CostBreakdownChartProps {
  data?: CostBreakdownData;
  totalCost?: number;
}

export function CostBreakdownChart({ 
  data = {
    depreciation: 27,
    parking: 16,
    insurance: 10,
    diverse: 9,
    maintenance: 12,
    energy: 13,
    repair: 9,
    tires: 4
  },
  totalCost = 52000
}: CostBreakdownChartProps) {
  
  const costCategories = [
    { 
      key: 'depreciation', 
      label: 'Amortisation', 
      percentage: data.depreciation, 
      color: 'bg-blue-600',
      icon: '📊',
      description: 'Vehicle depreciation over time',
      isFixed: true
    },
    { 
      key: 'parking', 
      label: 'Garagierungskosten', 
      percentage: data.parking, 
      color: 'bg-blue-500',
      icon: '🅿️',
      description: 'Parking and garage costs',
      isFixed: true
    },
    { 
      key: 'insurance', 
      label: 'Versicherungen', 
      percentage: data.insurance, 
      color: 'bg-blue-400',
      icon: '🛡️',
      description: 'Insurance premiums',
      isFixed: true
    },
    { 
      key: 'diverse', 
      label: 'Diverse', 
      percentage: data.diverse, 
      color: 'bg-blue-300',
      icon: '•••',
      description: 'Miscellaneous costs',
      isFixed: false
    },
    { 
      key: 'maintenance', 
      label: 'Wertminderung', 
      percentage: data.maintenance, 
      color: 'bg-green-600',
      icon: '⬇️',
      description: 'Value depreciation',
      isFixed: false
    },
    { 
      key: 'energy', 
      label: 'Energiekosten', 
      percentage: data.energy, 
      color: 'bg-green-500',
      icon: '⚡',
      description: 'Electricity/charging costs',
      isFixed: false
    },
    { 
      key: 'repair', 
      label: 'Reparaturkosten', 
      percentage: data.repair, 
      color: 'bg-green-400',
      icon: '🔧',
      description: 'Repair and service costs',
      isFixed: false
    },
    { 
      key: 'tires', 
      label: 'Reifenkosten', 
      percentage: data.tires, 
      color: 'bg-green-300',
      icon: '🛞',
      description: 'Tire replacement costs',
      isFixed: false
    }
  ];

  const calculateAmount = (percentage: number) => {
    return Math.round((percentage / 100) * totalCost);
  };

  // Create SVG pie chart
  const createPieChart = () => {
    let cumulativePercentage = 0;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

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

      return (
        <path
          key={category.key}
          d={pathData}
          fill={category.color.includes('blue-600') ? '#2563eb' : 
                category.color.includes('blue-500') ? '#3b82f6' :
                category.color.includes('blue-400') ? '#60a5fa' :
                category.color.includes('blue-300') ? '#93c5fd' :
                category.color.includes('green-600') ? '#16a34a' :
                category.color.includes('green-500') ? '#22c55e' :
                category.color.includes('green-400') ? '#4ade80' :
                category.color.includes('green-300') ? '#86efac' : '#64748b'}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          stroke="white"
          strokeWidth="2"
        />
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Reference to TCS Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Cost Breakdown Analysis 2025
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total cost of ownership breakdown based on TCS methodology
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <img 
              src={exampleImage} 
              alt="TCS Cost Breakdown Example" 
              className="max-w-full h-auto rounded-lg border"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Reference: TCS (Touring Club Schweiz) Cost Analysis Method
          </p>
        </CardContent>
      </Card>

      {/* Interactive Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicle Cost Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            3-year total cost of ownership: €{totalCost.toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {createPieChart()}
                  {/* Center circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="35"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="text-sm font-medium fill-foreground"
                  >
                    Total Cost
                  </text>
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                  >
                    €{(totalCost / 1000).toFixed(0)}k
                  </text>
                </svg>
              </div>
            </div>

            {/* Legend and Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  Fixed Costs (62%)
                </div>
                {costCategories.filter(cat => cat.isFixed).map((category) => (
                  <div key={category.key} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-sm`}></div>
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.percentage}%</div>
                      <div className="text-xs text-muted-foreground">€{calculateAmount(category.percentage).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-2 pt-3 border-t">
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                  Variable Costs (38%)
                </div>
                {costCategories.filter(cat => !cat.isFixed).map((category) => (
                  <div key={category.key} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-sm`}></div>
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.percentage}%</div>
                      <div className="text-xs text-muted-foreground">€{calculateAmount(category.percentage).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">€{Math.round(totalCost * 0.62).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Fixed Costs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">€{Math.round(totalCost * 0.38).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Variable Costs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">€{(totalCost / 3 / 15000).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Cost per km</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}