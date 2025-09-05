import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  email: string;
  zipCode: string;
  name: string;
  age: number;
  carMake: string;
  carModel: string;
  carYear: number;
  mileage: number;
  usagePattern: string;
  hasHomeCharger: boolean;
  homeChargerType: string;
  chargingBehavior: string;
  persona?: 'carefree' | 'performance';
}

export interface BuyerUserData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
  age: string;
  interestedInEV: string;
  currentVehicle: string;
}

export interface AppState {
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  hasSelectedPlatform: boolean;
  platformType: 'owner' | 'buyer' | null;
  currentView: 'platformSelection' | 'login' | 'buyerRegistration' | 'buyerPlatformChoice' | 'questionnaire' | 'dashboard' | 'wizard' | 'vehicleBrowser' | 'recommendations';
  userData: UserData;
  buyerData: BuyerUserData;
  wizardCompleted: boolean;
}

interface AppContextType {
  state: AppState;
  selectPlatform: (platform: 'owner' | 'buyer') => void;
  login: (email: string, isNewUser?: boolean) => void;
  completeOnboarding: (userData: UserData) => void;
  completeBuyerRegistration: (buyerData: BuyerUserData) => void;
  selectBuyerPath: (path: 'wizard' | 'database') => void;
  completeWizard: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
  updateBuyerData: (updates: Partial<BuyerUserData>) => void;
  logout: () => void;
}

const initialState: AppState = {
  isLoggedIn: false,
  hasCompletedOnboarding: false,
  hasSelectedPlatform: false,
  platformType: null,
  currentView: 'platformSelection',
  userData: {
    email: '',
    zipCode: '8001',
    name: 'Max Mustermann',
    age: 32,
    carMake: 'Volkswagen',
    carModel: 'ID.4',
    carYear: 2022,
    mileage: 25000,
    usagePattern: 'mixed',
    hasHomeCharger: true,
    homeChargerType: '11kW AC',
    chargingBehavior: 'overnight',
  },
  buyerData: {
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    country: '',
    age: '',
    interestedInEV: '',
    currentVehicle: '',
  },
  wizardCompleted: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const selectPlatform = (platform: 'owner' | 'buyer') => {
    setState(prev => ({
      ...prev,
      hasSelectedPlatform: true,
      platformType: platform,
      currentView: platform === 'owner' ? 'login' : 'buyerRegistration',
    }));
  };

  const login = (email: string, isNewUser = false) => {
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentView: prev.platformType === 'owner' 
        ? (isNewUser ? 'questionnaire' : 'questionnaire') // Both new and returning users go to questionnaire/update
        : 'buyerPlatformChoice',
      userData: { ...prev.userData, email },
    }));
  };

  const completeOnboarding = (userData: UserData) => {
    // Determine persona based on usage pattern and charging behavior
    const persona = userData.usagePattern === 'long-distance' || userData.chargingBehavior === 'fast' 
      ? 'performance' 
      : 'carefree';

    setState(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      currentView: 'dashboard',
      userData: { ...userData, persona },
    }));
  };

  const completeBuyerRegistration = (buyerData: BuyerUserData) => {
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentView: 'buyerPlatformChoice',
      buyerData,
    }));
  };

  const selectBuyerPath = (path: 'wizard' | 'database') => {
    setState(prev => ({
      ...prev,
      currentView: path === 'wizard' ? 'wizard' : 'vehicleBrowser',
    }));
  };

  const completeWizard = () => {
    setState(prev => ({
      ...prev,
      wizardCompleted: true,
      currentView: 'recommendations',
    }));
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setState(prev => ({
      ...prev,
      userData: { ...prev.userData, ...updates },
    }));
  };

  const updateBuyerData = (updates: Partial<BuyerUserData>) => {
    setState(prev => ({
      ...prev,
      buyerData: { ...prev.buyerData, ...updates },
    }));
  };

  const logout = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      selectPlatform,
      login, 
      completeOnboarding, 
      completeBuyerRegistration,
      selectBuyerPath,
      completeWizard,
      updateUserData, 
      updateBuyerData,
      logout 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}