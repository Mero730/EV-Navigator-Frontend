import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, Zap, Clock, MapPin } from 'lucide-react';

interface ChargingCalculatorProps {
  vehicle: {
    efficiency: number; // kWh/100km
    range: number; // km
  };
}

interface Connector {
  id: string;
  mode: 'AC' | 'DC';
  label: string;
  maxPowerKW: number;
  port: string;
  voltageV?: number;
  phases?: number;
  amps?: number;
}

export function ChargingCalculator({ vehicle }: ChargingCalculatorProps) {
  const [chargerMode, setChargerMode] = useState<'AC' | 'DC'>('AC');
  const [connectorId, setConnectorId] = useState('eu_schuko_1p_16a');
  const [socStart, setSocStart] = useState('20');
  const [socTarget, setSocTarget] = useState('80');
  const [batteryTemp, setBatteryTemp] = useState('auto');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Vehicle specifications
  const batteryCapacityKWh = 75; // Estimated based on vehicle range and efficiency
  const acLimitKW = 11;
  const dcLimitKW = 150;

  const connectors: Connector[] = [
    {
      id: 'eu_schuko_1p_16a',
      mode: 'AC',
      label: 'EURO 16A 1-phase',
      voltageV: 230,
      phases: 1,
      amps: 16,
      maxPowerKW: 3.7,
      port: 'Type 2'
    },
    {
      id: 'type2_3p_11kw',
      mode: 'AC',
      label: 'Type 2 11 kW',
      voltageV: 400,
      phases: 3,
      amps: 16,
      maxPowerKW: 11,
      port: 'Type 2'
    },
    {
      id: 'type2_3p_22kw',
      mode: 'AC',
      label: 'Type 2 22 kW',
      voltageV: 400,
      phases: 3,
      amps: 32,
      maxPowerKW: 22,
      port: 'Type 2'
    },
    {
      id: 'ccs_dc_50',
      mode: 'DC',
      label: 'CCS DC 50 kW',
      maxPowerKW: 50,
      port: 'CCS'
    },
    {
      id: 'ccs_dc_150',
      mode: 'DC',
      label: 'CCS DC 150 kW',
      maxPowerKW: 150,
      port: 'CCS'
    },
    {
      id: 'ccs_dc_250',
      mode: 'DC',
      label: 'CCS DC 250 kW',
      maxPowerKW: 250,
      port: 'CCS'
    }
  ];

  const selectedConnector = connectors.find(c => c.id === connectorId);
  const availableConnectors = connectors.filter(c => c.mode === chargerMode);

  // Calculations
  const usableKWh = batteryCapacityKWh * (parseInt(socTarget) - parseInt(socStart)) / 100;
  const maxPowerForMode = chargerMode === 'AC' ? Math.min(acLimitKW, selectedConnector?.maxPowerKW || 0) : Math.min(dcLimitKW, selectedConnector?.maxPowerKW || 0);
  
  const tempFactor = batteryTemp === 'cold' ? 0.8 : batteryTemp === 'hot' ? 0.9 : 1;
  const avgPowerKW = maxPowerForMode * tempFactor;
  const durationHours = usableKWh / avgPowerKW;
  const addedRangeKm = usableKWh * (100 / vehicle.efficiency);

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  // Update connector when mode changes
  useEffect(() => {
    const newConnectors = connectors.filter(c => c.mode === chargerMode);
    if (newConnectors.length > 0 && !newConnectors.find(c => c.id === connectorId)) {
      setConnectorId(newConnectors[0].id);
    }
  }, [chargerMode, connectorId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Charging Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate charging time, cost, and range for different charger types
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Charger Mode Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Charging type</label>
          <div className="flex gap-2">
            <Button
              variant={chargerMode === 'AC' ? 'default' : 'outline'}
              onClick={() => setChargerMode('AC')}
              className="flex-1"
            >
              AC - Home
            </Button>
            <Button
              variant={chargerMode === 'DC' ? 'default' : 'outline'}
              onClick={() => setChargerMode('DC')}
              className="flex-1"
            >
              DC - Fast
            </Button>
          </div>
        </div>

        {/* Connector Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Connector or station</label>
          <Select value={connectorId} onValueChange={setConnectorId}>
            <SelectTrigger>
              <SelectValue placeholder="Select connector" />
            </SelectTrigger>
            <SelectContent>
              {availableConnectors.map((connector) => (
                <SelectItem key={connector.id} value={connector.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {connector.port}
                    </Badge>
                    {connector.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Power and limits auto-fill but can be overridden below.
          </p>
        </div>

        {/* Session Inputs */}
        <div className="space-y-4">
          <h4 className="font-medium">Session</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start SOC</label>
              <Select value={socStart} onValueChange={setSocStart}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (i * 5).toString()).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target SOC</label>
              <Select value={socTarget} onValueChange={setSocTarget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (i * 5 + 10).toString()).filter(v => parseInt(v) > parseInt(socStart)).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>



        {/* Advanced Settings */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0">
              <span className="font-medium">Advanced</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm">Battery temperature</label>
              <Select value={batteryTemp} onValueChange={setBatteryTemp}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Results */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Results</h4>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Charging time</span>
              </div>
              <div className="font-semibold">{formatDuration(durationHours)}</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Range added</span>
              </div>
              <div className="font-semibold">{Math.round(addedRangeKm)} km</div>
            </Card>
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t">
            Values update automatically when inputs change. Actual charging performance may vary based on battery condition, temperature, and charger specifications.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}