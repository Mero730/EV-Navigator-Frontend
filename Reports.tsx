import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  FileText, 
  Upload, 
  Leaf, 
  TrendingDown,
  DollarSign,
  Fuel,
  Recycle,
  Download,
  Eye,
  Trash2,
  Car,
  Shield,
  Wrench,
  Battery,
  CheckCircle2
} from 'lucide-react';

export function Reports() {
  const [selectedICEVehicle, setSelectedICEVehicle] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Vehicle Registration 2024.pdf', type: 'registration', date: '2024-01-01', size: '1.2 MB' },
    { name: 'Insurance Policy 2024.pdf', type: 'insurance', date: '2024-01-15', size: '2.3 MB' },
    { name: 'Leasing Contract.pdf', type: 'leasing', date: '2023-12-01', size: '1.8 MB' },
    { name: 'SOH Report Dec 2024.pdf', type: 'soh', date: '2024-12-10', size: '0.9 MB' },
  ]);

  // Mock ecological data
  const ecoData = {
    monthsSinceSwitch: 18,
    totalKmDriven: 32000,
    co2Saved: 4800, // kg
    fuelSaved: 2100, // liters
    costSavings: 3200, // CHF
    energyUsed: 5800, // kWh
    renewablePercentage: 67,
    currentVehicleCO2: 42, // g CO2/km based on Swiss grid
    vehicleModel: 'Volkswagen ID.4'
  };

  const documentTypes = [
    { value: 'registration', label: 'Vehicle Registration', icon: Car },
    { value: 'insurance', label: 'Insurance Policy', icon: Shield },
    { value: 'leasing', label: 'Leasing Contract', icon: FileText },
    { value: 'maintenance', label: 'Maintenance Invoice', icon: Wrench },
    { value: 'soh', label: 'SOH Report', icon: Battery },
    { value: 'warranty', label: 'Warranty Document', icon: CheckCircle2 },
    { value: 'other', label: 'Other Document', icon: FileText },
  ];

  const iceVehicleOptions = [
    { value: 'bmw-320d', label: 'BMW 320d (2019)', consumption: 5.2, co2: 137 },
    { value: 'audi-a4', label: 'Audi A4 2.0 TDI (2020)', consumption: 4.8, co2: 128 },
    { value: 'mercedes-c200', label: 'Mercedes C200d (2018)', consumption: 5.1, co2: 135 },
    { value: 'vw-passat', label: 'VW Passat 2.0 TDI (2019)', consumption: 4.9, co2: 131 },
    { value: 'custom', label: 'Custom Vehicle', consumption: 6.0, co2: 150 }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Mock file upload - in real app would handle actual file upload
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: 'other',
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Reports & Insights</h1>
        <p className="text-muted-foreground">
          Document management and environmental impact analysis
        </p>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="ecological">Ecological Impact</TabsTrigger>
          <TabsTrigger value="recycling">End-of-Life Options</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Upload */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="fileUpload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Supported Documents</div>
                    {documentTypes.map((type, index) => {
                      const Icon = type.icon;
                      return (
                        <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Your Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => {
                      const docType = documentTypes.find(t => t.value === file.type);
                      const Icon = docType?.icon || FileText;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {file.date} • {file.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {docType?.label || 'Document'}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ecological" className="space-y-6">
          {/* Current Vehicle CO2 Information */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Your Vehicle's CO₂ Emissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Vehicle</div>
                  <div className="font-medium">{ecoData.vehicleModel}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">CO₂ Emissions per km</div>
                  <div className="text-2xl font-medium text-green-600">{ecoData.currentVehicleCO2}g CO₂/km</div>
                  <div className="text-sm text-muted-foreground">Including Swiss electricity grid emissions</div>
                </div>
              </div>
              <div className="mt-4 bg-white p-3 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  This figure includes the CO₂ emissions from electricity generation in Switzerland 
                  ({ecoData.renewablePercentage}% renewable energy) and vehicle manufacturing lifecycle impacts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Previous ICE Vehicle Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select your previous vehicle for comparison</label>
                  <Select value={selectedICEVehicle} onValueChange={setSelectedICEVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your previous ICE vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {iceVehicleOptions.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          {vehicle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedICEVehicle && (
                  <div className="text-sm text-muted-foreground">
                    {iceVehicleOptions.find(v => v.value === selectedICEVehicle)?.consumption}L/100km • {iceVehicleOptions.find(v => v.value === selectedICEVehicle)?.co2}g CO₂/km
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedICEVehicle && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span>CO₂ Saved</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-medium">{ecoData.co2Saved} kg</div>
                    <div className="text-sm text-muted-foreground">
                      Over {ecoData.monthsSinceSwitch} months
                    </div>
                    <div className="text-sm text-green-600">
                      Equivalent to planting 22 trees
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Fuel className="h-5 w-5 text-blue-600" />
                      <span>Fuel Saved</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-medium">{ecoData.fuelSaved} L</div>
                    <div className="text-sm text-muted-foreground">
                      Diesel not consumed
                    </div>
                    <div className="text-sm text-blue-600">
                      {Math.round(ecoData.fuelSaved / 50)} fewer fuel stops
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-orange-600" />
                      <span>Cost Savings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-medium">CHF {ecoData.costSavings}</div>
                    <div className="text-sm text-muted-foreground">
                      vs. fuel costs
                    </div>
                    <div className="text-sm text-orange-600">
                      CHF {Math.round(ecoData.costSavings / ecoData.monthsSinceSwitch)}/month avg
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-purple-600" />
                      <span>Energy Used</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-medium">{ecoData.energyUsed} kWh</div>
                    <div className="text-sm text-muted-foreground">
                      Electric energy consumed
                    </div>
                    <div className="text-sm text-green-600">
                      {ecoData.renewablePercentage}% renewable
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5" />
                    <span>Environmental Impact Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Carbon Footprint Comparison</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Your EV (including electricity)</span>
                            <span>42g CO₂/km</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Previous ICE vehicle</span>
                            <span>137g CO₂/km</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                      <div className="text-sm text-green-600">
                        Your EV produces 69% less CO₂ per kilometer
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Renewable Energy Impact</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Swiss grid renewable %</span>
                          <span>{ecoData.renewablePercentage}%</span>
                        </div>
                        <Progress value={ecoData.renewablePercentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Your charging pattern includes {ecoData.renewablePercentage}% renewable energy
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Environmental Achievement</h3>
                    <p className="text-sm text-green-700">
                      By switching to electric, you've avoided {ecoData.co2Saved}kg of CO₂ emissions. 
                      This is equivalent to the carbon absorbed by 22 mature trees in one year, 
                      or removing a gasoline car from the road for {Math.round(ecoData.co2Saved / 4000)} months.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="recycling" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="h-5 w-5" />
                  <span>Battery Recycling</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Manufacturer Take-Back</div>
                      <div className="text-xs text-muted-foreground">
                        Volkswagen offers battery recycling program with 95% material recovery
                      </div>
                      <Button variant="link" className="p-0 h-auto text-blue-600 text-xs">
                        Learn more about VW recycling
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Swiss Battery Recycling</div>
                      <div className="text-xs text-muted-foreground">
                        INOBAT provides nationwide EV battery collection and recycling
                      </div>
                      <Button variant="link" className="p-0 h-auto text-green-600 text-xs">
                        Find collection points
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Second-Life Applications</div>
                      <div className="text-xs text-muted-foreground">
                        Used EV batteries can power homes and businesses for 10+ years
                      </div>
                      <Button variant="link" className="p-0 h-auto text-purple-600 text-xs">
                        Explore second-life options
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Recycle className="h-5 w-5" />
                  <span>Vehicle Disposal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Authorized Recycling Centers</div>
                      <div className="text-xs text-muted-foreground">
                        Swiss Auto Recycling Network handles EV disposal according to EU standards
                      </div>
                      <Button variant="link" className="p-0 h-auto text-blue-600 text-xs">
                        Find nearest center
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Material Recovery</div>
                      <div className="text-xs text-muted-foreground">
                        85% of vehicle materials can be recycled, including rare earth elements
                      </div>
                      <div className="text-xs text-orange-600 mt-1">
                        Recovery value: CHF 1,200-2,800
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Trade-In Programs</div>
                      <div className="text-xs text-muted-foreground">
                        Many dealers offer EV trade-in programs with environmental certification
                      </div>
                      <Button variant="link" className="p-0 h-auto text-green-600 text-xs">
                        Check trade-in value
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="font-medium text-sm mb-2">Recycling Timeline</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Years 0-8: Normal vehicle use</div>
                    <div>• Years 8-12: Battery suitable for second-life applications</div>
                    <div>• Years 12+: Full recycling with material recovery</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Recycling Value Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium">CHF 18,500</div>
                  <div className="text-sm text-muted-foreground">Current vehicle value</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium">CHF 4,200</div>
                  <div className="text-sm text-muted-foreground">Battery second-life value</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium">CHF 1,800</div>
                  <div className="text-sm text-muted-foreground">Material recovery value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}