import React, { useState } from 'react';
import { BuyerNavigation } from './BuyerNavigation';
import { BuyerHome } from './BuyerHome';
import { BuyerProfile } from './BuyerProfile';
import { VehicleBrowser } from './VehicleBrowser';

export function BuyerPlatform() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderContent = () => {
    switch (currentSection) {
      case 'browse':
        return <VehicleBrowser />;
      case 'profile':
        return <BuyerProfile />;
      case 'home':
      default:
        return <BuyerHome onNavigateToDatabase={() => setCurrentSection('browse')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BuyerNavigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
}