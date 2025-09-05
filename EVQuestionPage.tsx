import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { UserData } from './AppStateManager';

interface EVQuestionPageProps {
  pageNumber: number;
  formData: UserData;
  onDataUpdate: (updates: Partial<UserData>) => void;
}

export function EVQuestionPage({ pageNumber, formData, onDataUpdate }: EVQuestionPageProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const usagePatternDescriptions = {
    'commuting': 'Daily trips to work, typically 20-80 km per day with regular charging patterns.',
    'city-driving': 'Short urban trips, frequent stops, lower speeds, ideal for EVs with good efficiency.',
    'long-distance': 'Regular trips over 200 km, requires careful charging planning and higher range.',
    'mixed': 'Combination of city and highway driving with varying trip lengths and patterns.',
    'weekend': 'Occasional recreational driving, lower annual mileage, flexible charging schedule.',
    'delivery': 'Commercial use with high daily mileage, predictable routes, and business charging needs.'
  };

  const renderPage0 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Personal Information</h2>
      
      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP Code</Label>
        <Input
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => onDataUpdate({ zipCode: e.target.value })}
          placeholder="Enter your ZIP code"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onDataUpdate({ name: e.target.value })}
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min="18"
          max="80"
          value={formData.age.toString()}
          onChange={(e) => onDataUpdate({ age: parseInt(e.target.value) || 18 })}
          placeholder="Enter your age"
        />
      </div>
    </div>
  );

  const renderPage1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Vehicle Information</h2>
      
      <div className="space-y-2">
        <Label>Car Make</Label>
        <Select value={formData.carMake} onValueChange={(value) => onDataUpdate({ carMake: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select car make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tesla">Tesla</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="audi">Audi</SelectItem>
            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
            <SelectItem value="volkswagen">Volkswagen</SelectItem>
            <SelectItem value="nissan">Nissan</SelectItem>
            <SelectItem value="chevrolet">Chevrolet</SelectItem>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="hyundai">Hyundai</SelectItem>
            <SelectItem value="kia">Kia</SelectItem>
            <SelectItem value="polestar">Polestar</SelectItem>
            <SelectItem value="skoda">Skoda</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carModel">Car Model</Label>
        <Input
          id="carModel"
          value={formData.carModel}
          onChange={(e) => onDataUpdate({ carModel: e.target.value })}
          placeholder="e.g., Model 3, i4, e-tron, ID.3"
        />
      </div>

      <div className="space-y-2">
        <Label>Car Year</Label>
        <Select 
          value={formData.carYear.toString()} 
          onValueChange={(value) => onDataUpdate({ carYear: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select car year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Usage & Mileage</h2>
      
      <div className="space-y-2">
        <Label htmlFor="mileage">Current Mileage (km)</Label>
        <Input
          id="mileage"
          type="number"
          min="0"
          value={formData.mileage.toString()}
          onChange={(e) => onDataUpdate({ mileage: parseInt(e.target.value) || 0 })}
          placeholder="Enter current mileage in kilometers"
        />
      </div>

      <div className="space-y-2">
        <Label>Primary Usage Pattern</Label>
        <Select value={formData.usagePattern} onValueChange={(value) => onDataUpdate({ usagePattern: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your primary usage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commuting">Daily Commuting</SelectItem>
            <SelectItem value="city-driving">City Driving</SelectItem>
            <SelectItem value="long-distance">Long Distance Travel</SelectItem>
            <SelectItem value="mixed">Mixed Usage</SelectItem>
            <SelectItem value="weekend">Weekend Driving</SelectItem>
            <SelectItem value="delivery">Delivery/Business</SelectItem>
          </SelectContent>
        </Select>
        
        {formData.usagePattern && (
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            {usagePatternDescriptions[formData.usagePattern as keyof typeof usagePatternDescriptions]}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="homeCharger">Do you have a charging station at home?</Label>
          <Switch
            id="homeCharger"
            checked={formData.hasHomeCharger}
            onCheckedChange={(checked) => onDataUpdate({ hasHomeCharger: checked })}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {formData.hasHomeCharger ? 'Great! You have home charging.' : 'You rely on public charging.'}
        </p>
      </div>
    </div>
  );

  const renderPage3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Charging Preferences</h2>
      
      {formData.hasHomeCharger && (
        <div className="space-y-2">
          <Label>Type of Home Charger</Label>
          <Select value={formData.homeChargerType} onValueChange={(value) => onDataUpdate({ homeChargerType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select charger type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="level1">Level 1 (230V, Standard Outlet, 2.3kW)</SelectItem>
              <SelectItem value="level2">Level 2 (400V, Dedicated, 11kW)</SelectItem>
              <SelectItem value="level2-fast">Level 2 (400V, Fast, 22kW)</SelectItem>
              <SelectItem value="tesla-wall">Tesla Wall Connector</SelectItem>
              <SelectItem value="smart-charger">Smart Charger (WiFi Enabled)</SelectItem>
              <SelectItem value="portable">Portable Charger</SelectItem>
              <SelectItem value="not-sure">Not Sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Charging Behavior</Label>
        <Select value={formData.chargingBehavior} onValueChange={(value) => onDataUpdate({ chargingBehavior: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your charging preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home-slow">Home - Slow overnight charging (3-11kW)</SelectItem>
            <SelectItem value="home-fast">Home - Fast charging when needed (11-22kW)</SelectItem>
            <SelectItem value="work">Work - Charge during work hours</SelectItem>
            <SelectItem value="public-fast">Public - Fast charging on the go (50-350kW)</SelectItem>
            <SelectItem value="public-planned">Public - Planned charging stops</SelectItem>
            <SelectItem value="mixed">Mixed - Depends on situation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Setup Summary</h3>
        <div className="text-sm space-y-1">
          <div><strong>Vehicle:</strong> {formData.carYear} {formData.carMake} {formData.carModel}</div>
          <div><strong>Mileage:</strong> {formData.mileage.toLocaleString()} km</div>
          <div><strong>Usage:</strong> {formData.usagePattern}</div>
          <div><strong>Home Charging:</strong> {formData.hasHomeCharger ? 'Yes' : 'No'}</div>
          <div><strong>Charging Style:</strong> {formData.chargingBehavior}</div>
        </div>
      </div>
    </div>
  );

  const pages = [renderPage0, renderPage1, renderPage2, renderPage3];
  
  return (
    <div className="min-h-[500px]">
      {pages[pageNumber]()}
    </div>
  );
}