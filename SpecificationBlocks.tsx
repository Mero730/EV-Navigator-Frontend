import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Battery, 
  Zap, 
  Gauge, 
  Fuel, 
  MapPin, 
  Euro,
  Ruler,
  Weight,
  Settings,
  Car,
  Home,
  Plug,
  ArrowUpDown
} from 'lucide-react';

interface SpecificationData {
  [category: string]: string[] | { [subcategory: string]: string[] };
}

interface SpecificationBlocksProps {
  specifications: SpecificationData;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Overview': <Car className="h-5 w-5" />,
  'Price & Availability': <Euro className="h-5 w-5" />,
  'Real Range Estimation': <MapPin className="h-5 w-5" />,
  'Long Distance Suitability': <MapPin className="h-5 w-5" />,
  'Battery': <Battery className="h-5 w-5" />,
  'Charging': <Zap className="h-5 w-5" />,
  'Performance': <Gauge className="h-5 w-5" />,
  'Bidirectional Charging': <ArrowUpDown className="h-5 w-5" />,
  'Energy Consumption': <Fuel className="h-5 w-5" />,
  'Real-Energy Consumption Estimation': <Fuel className="h-5 w-5" />,
  'Dimensions and Weight': <Ruler className="h-5 w-5" />,
  'Miscellaneous': <Settings className="h-5 w-5" />,
  'Home and Destination Charging (0–100%)': <Home className="h-5 w-5" />
};

// Mock specification values - in a real app, these would come from the vehicle data
const mockSpecificationValues: { [key: string]: string } = {
  'Useable Battery': '82 kWh',
  'Real Range': '450 km',
  'Efficiency': '18.2 kWh/100km',
  'United Kingdom': '£45,000',
  'The Netherlands': '€52,000',
  'Germany': '€51,500',
  'Since date per country': 'UK: Jan 2024, NL: Feb 2024, DE: Jan 2024',
  'City – Cold Weather': '380 km',
  'Highway – Cold Weather': '420 km',
  'Combined – Cold Weather': '400 km',
  'City – Mild Weather': '480 km',
  'Highway – Mild Weather': '520 km',
  'Combined – Mild Weather': '500 km',
  'Star Rating': '★★★★☆',
  'First Leg Distance': '380 km',
  'Charging Stop': '15 minutes',
  'Second Leg Distance': '120 km',
  'Total Distance': '500 km',
  'First Leg Duration': '4h 30min',
  'Charging Stop (minutes)': '15 min',
  'Second Leg Duration': '1h 30min',
  'Total Duration': '6h 15min',
  'Nominal Capacity': '85 kWh',
  'Battery Type': 'Lithium-ion NCM',
  'Number of Cells': '288',
  'Architecture': '400V',
  'Warranty Period': '8 years',
  'Warranty Mileage': '160,000 km',
  'Useable Capacity': '82 kWh',
  'Cathode Material': 'NCM 811',
  'Pack Configuration': '12S24P',
  'Nominal Voltage': '355V',
  'Form Factor': 'Pouch',
  'Name / Reference': 'SK Innovation NCM',
  'Charge Port Type': 'Type 2',
  'Port Location': 'Rear left',
  'Charge Power (AC, kW)': '11 kW',
  'Charge Time': '8h 30min',
  'Charge Speed': '65 km/h',
  'Charge Port (type)': 'CCS2',
  'Charge Power (max, DC)': '150 kW',
  'Charge Power (10–80%, DC)': '125 kW avg',
  'Charge Time (10–80%)': '28 minutes',
  'Autocharge Supported': 'Yes',
  'Plug & Charge Supported': 'Yes',
  'Supported Protocol': 'ISO 15118',
  'Preconditioning Possible': 'Yes',
  'Automatically Using Navigation': 'Yes',
  'Acceleration (0–100 km/h)': '7.2 seconds',
  'Top Speed': '160 km/h',
  'Electric Range': '450 km (WLTP)',
  'Total Power': '150 kW (201 hp)',
  'Total Torque': '310 Nm',
  'Drive': 'Front-wheel drive',
  'V2L Supported': 'Yes',
  'Max Output Power': '3.6 kW',
  'Exterior Outlet(s)': '1x Schuko',
  'Interior Outlet(s)': '1x 12V socket',
  'V2H via AC Supported': 'No',
  'V2H via DC Supported': 'No',
  'V2G via AC Supported': 'No',
  'V2G via DC Supported': 'No',
  'Range': '450 km',
  'Vehicle Consumption (Wh/km)': '182 Wh/km',
  'CO₂ Emissions': '0 g/km',
  'Vehicle Fuel Equivalent (l/100km)': '1.8 l/100km',
  'Rated Consumption (Wh/km)': '175 Wh/km',
  'Rated Fuel Equivalent (l/100km)': '1.7 l/100km',
  'Length': '4,712 mm',
  'Width': '1,985 mm',
  'Width with mirrors': '2,175 mm',
  'Height': '1,937 mm',
  'Wheelbase': '2,850 mm',
  'Weight Unladen (EU)': '2,135 kg',
  'Gross Vehicle Weight (GVWR)': '2,720 kg',
  'Max. Payload': '585 kg',
  'Cargo Volume': '465 L',
  'Cargo Volume Max': '1,405 L',
  'Cargo Volume Frunk': '85 L',
  'Roof Load': '100 kg',
  'Tow Hitch Possible': 'Yes',
  'Towing Weight Unbraked': '750 kg',
  'Towing Weight Braked': '1,650 kg',
  'Vertical Load Max': '100 kg',
  'Seats': '5',
  'Isofix': '3 positions',
  'Turning Circle': '11.2 m',
  'Platform': 'MEB',
  'EV Dedicated Platform': 'Yes',
  'Car Body': 'SUV',
  'Segment': 'Mid-size SUV',
  'Roof Rails': 'Yes',
  'Heat Pump (HP)': 'Yes',
  'HP Standard Equipment': 'Yes'
};

export function SpecificationBlocks({ specifications }: SpecificationBlocksProps) {
  const renderSpecificationValue = (key: string) => {
    const value = mockSpecificationValues[key] || 'Not specified';
    
    // Special formatting for certain types of values
    if (key.includes('Star Rating')) {
      return <span className="text-yellow-500">{value}</span>;
    }
    if (key.includes('Supported') && (value === 'Yes' || value === 'No')) {
      return (
        <Badge variant={value === 'Yes' ? 'default' : 'secondary'} className={value === 'Yes' ? 'bg-green-600' : ''}>
          {value}
        </Badge>
      );
    }
    if (key.includes('CO₂')) {
      return <span className="text-green-600 font-medium">{value}</span>;
    }
    
    return value;
  };

  const renderSpecificationItems = (items: string[], categoryName: string) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
          <span className="text-muted-foreground">{item}</span>
          <div className="font-medium">
            {renderSpecificationValue(item)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSubcategories = (subcategories: { [subcategory: string]: string[] }) => (
    <div className="space-y-6">
      {Object.entries(subcategories).map(([subcat, items]) => (
        <div key={subcat}>
          <h4 className="font-medium mb-3 text-primary">{subcat}</h4>
          {renderSpecificationItems(items, subcat)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Object.entries(specifications).map(([category, content]) => (
        <Card key={category} className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {categoryIcons[category] || <Settings className="h-5 w-5" />}
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(content) 
              ? renderSpecificationItems(content, category)
              : renderSubcategories(content)
            }
          </CardContent>
        </Card>
      ))}
    </div>
  );
}