import React, { useState } from 'react';
import { Button } from './ui/button';
import { useAppState } from './AppStateManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Home, 
  User,
  LogOut,
  Car,
  Search,
  LogIn,
  UserPlus
} from 'lucide-react';

interface BuyerNavigationProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export function BuyerNavigation({ currentSection = 'home', onSectionChange }: BuyerNavigationProps) {
  const { logout, state } = useAppState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWizardChoiceModal, setShowWizardChoiceModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'browse', icon: Search, label: 'Browse EVs' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    setShowLoginModal(true);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoginModal(false);
    if (!isSignUp) {
      // For existing users, show wizard/database choice
      setShowWizardChoiceModal(true);
    } else {
      // For new users, go to account creation flow
      // This would trigger account creation flow
    }
  };

  const handleWizardChoice = (choice: 'wizard' | 'database') => {
    setShowWizardChoiceModal(false);
    if (choice === 'wizard') {
      // Navigate to wizard
      if (onSectionChange) {
        onSectionChange('wizard');
      }
    } else {
      // Stay on database view
      if (onSectionChange) {
        onSectionChange('browse');
      }
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
              <span className="font-medium">EV Database</span>
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
              <span className="text-muted-foreground">EV Buyer Platform</span>
            </div>
            
            {state.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome!</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleSignIn}>
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignUp}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Login/Signup Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isSignUp ? 'Create Account' : 'Sign In'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Wizard Choice Modal */}
      <Dialog open={showWizardChoiceModal} onOpenChange={setShowWizardChoiceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome Back!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              How would you like to explore electric vehicles today?
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => handleWizardChoice('wizard')}
                className="h-auto p-4 text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Vehicle Recommendation Wizard</div>
                  <div className="text-sm text-muted-foreground">
                    Get personalized recommendations based on your needs
                  </div>
                </div>
              </Button>
              <Button 
                onClick={() => handleWizardChoice('database')}
                className="h-auto p-4 text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Browse Vehicle Database</div>
                  <div className="text-sm text-muted-foreground">
                    Explore all available electric vehicles
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}