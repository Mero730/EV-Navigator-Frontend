import React, { useState } from 'react';
import { Button } from './ui/button';
import { useAppState } from './AppStateManager';
import { 
  Home, 
  Map, 
  Zap, 
  Car, 
  DollarSign, 
  BarChart3, 
  Settings,
  LogOut,
  Search
} from 'lucide-react';

interface NavigationProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Navigation({ currentSection = 'home', onSectionChange }: NavigationProps) {
  const { state, logout } = useAppState();
  const { userData } = state;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'plan', icon: Map, label: 'Plan' },
    { id: 'vehicle', icon: Car, label: 'Vehicle' },
    { id: 'finance', icon: DollarSign, label: 'Finance' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-medium">EV Manager</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentSection === item.id ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Welcome, </span>
              <span className="font-medium">{userData.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}