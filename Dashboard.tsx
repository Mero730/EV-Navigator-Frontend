import React, { useState } from 'react';
import { useAppState } from './AppStateManager';
import { CarefreeSpeedDashboard } from './dashboards/CarefreeSpeedDashboard';
import { PerformanceMaximizerDashboard } from './dashboards/PerformanceMaximizerDashboard';
import { Navigation } from './Navigation';
import { TripPlanning } from './sections/TripPlanning';
import { VehicleHealth } from './sections/VehicleHealth';
import { VehicleSpecs } from './sections/VehicleSpecs';
import { Reports } from './sections/Reports';
import { Finance } from './sections/Finance';
import { Settings } from './sections/Settings';
import { VehicleBrowser } from './VehicleBrowser';

export function Dashboard() {
  const { state } = useAppState();
  const { userData } = state;
  const [currentSection, setCurrentSection] = useState('home');

  const renderContent = () => {
    switch (currentSection) {
      case 'plan':
        return <TripPlanning />;
      case 'vehicle':
        return (
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl">Vehicle Management</h1>
              <p className="text-muted-foreground">
                Monitor health, analyze performance, and explore specifications
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <VehicleHealth />
              <VehicleSpecs />
            </div>
          </div>
        );
      case 'charging':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h1 className="text-2xl mb-2">Charging Information</h1>
              <p className="text-muted-foreground">
                Charging functionality has been integrated into the Route & Charging Planning section.
              </p>
            </div>
            <TripPlanning />
          </div>
        );
      case 'finance':
        return <Finance />;
      case 'reports':
        return <Reports />;

      case 'settings':
        return <Settings />;
      default:
        return userData.persona === 'carefree' ? (
          <CarefreeSpeedDashboard />
        ) : (
          <PerformanceMaximizerDashboard />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
}