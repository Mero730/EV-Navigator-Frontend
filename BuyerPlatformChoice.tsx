import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Wand2, Search, Target, Database, Users, BarChart3 } from 'lucide-react';

interface BuyerPlatformChoiceProps {
  onSelectWizard: () => void;
  onSelectDatabase: () => void;
}

export function BuyerPlatformChoice({ onSelectWizard, onSelectDatabase }: BuyerPlatformChoiceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">How would you like to find your EV?</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred way to explore electric vehicles
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wizard Option */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Wand2 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Smart Matching Wizard</CardTitle>
              <CardDescription className="text-base">
                Let our AI find the perfect EVs for your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Lifestyle-based matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Top 3-5 vehicle suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wand2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Quick 5-minute questionnaire</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Best for:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• First-time EV buyers</li>
                  <li>• Quick decision makers</li>
                  <li>• Those who prefer guided selection</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={onSelectWizard}
              >
                Start Smart Wizard
              </Button>
            </CardContent>
          </Card>

          {/* Database Browse Option */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Browse EV Database</CardTitle>
              <CardDescription className="text-base">
                Explore our comprehensive EV database yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Advanced search filters</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Complete vehicle database</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Detailed comparisons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Self-guided exploration</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Best for:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Research-oriented buyers</li>
                  <li>• Those with specific requirements</li>
                  <li>• Detailed comparison shoppers</li>
                </ul>
              </div>

              <Button 
                className="w-full bg-green-600 hover:green-700"
                onClick={onSelectDatabase}
              >
                Browse Database
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Don't worry! You can always switch between the wizard and database at any time.
          </p>
        </div>
      </div>
    </div>
  );
}