import { AppStateProvider, useAppState } from './components/AppStateManager';
import { PlatformSelection } from './components/PlatformSelection';
import { LoginPage } from './components/LoginPage';
import { BuyerRegistration } from './components/BuyerRegistration';
import { BuyerPlatformChoice } from './components/BuyerPlatformChoice';
import { EVQuestionnaire } from './components/EVQuestionnaire';
import { VehicleStatsUpdate } from './components/VehicleStatsUpdate';
import { Dashboard } from './components/Dashboard';
import { DrivingProfileWizard } from './components/DrivingProfileWizard';
import { VehicleBrowser } from './components/VehicleBrowser';
import { VehicleRecommendations } from './components/VehicleRecommendations';
import { BuyerPlatform } from './components/BuyerPlatform';

function AppContent() {
  const { state, selectPlatform, login, completeBuyerRegistration, selectBuyerPath, completeWizard } = useAppState();

  // Platform Selection (first step)
  if (!state.hasSelectedPlatform) {
    return <PlatformSelection onSelectPlatform={selectPlatform} />;
  }

  // Owner Path
  if (state.platformType === 'owner') {
    if (!state.isLoggedIn) {
      return <LoginPage />;
    }

    if (!state.hasCompletedOnboarding) {
      // Show vehicle stats update if user is returning, otherwise show questionnaire
      if (state.userData.email && state.userData.name) {
        return <VehicleStatsUpdate />;
      }
      return <EVQuestionnaire />;
    }

    return <Dashboard />;
  }

  // Buyer Path
  if (state.platformType === 'buyer') {
    if (state.currentView === 'buyerRegistration') {
      return (
        <BuyerRegistration 
          onComplete={completeBuyerRegistration}
          onBack={() => selectPlatform('buyer')}
        />
      );
    }

    if (state.currentView === 'buyerPlatformChoice') {
      return (
        <BuyerPlatformChoice
          onSelectWizard={() => selectBuyerPath('wizard')}
          onSelectDatabase={() => selectBuyerPath('database')}
        />
      );
    }

    if (state.currentView === 'wizard') {
      return (
        <DrivingProfileWizard
          onComplete={completeWizard}
          onBack={() => selectBuyerPath('database')}
        />
      );
    }

    if (state.currentView === 'recommendations') {
      return (
        <VehicleRecommendations
          onBack={() => selectBuyerPath('wizard')}
          onGoToDatabase={() => selectBuyerPath('database')}
        />
      );
    }

    if (state.currentView === 'vehicleBrowser') {
      return <BuyerPlatform />;
    }
  }

  // Fallback
  return <div>Loading...</div>;
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="size-full">
        <AppContent />
      </div>
    </AppStateProvider>
  );
}