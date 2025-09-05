import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Users, Zap, Clock, Car, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface DrivingProfileWizardProps {
  onComplete: () => void;
  onBack: () => void;
}

interface DrivingProfile {
  primaryUse: string;
  bodyType: string;
  dailyDistance: number[];
  longTripFrequency: string;
  passengers: string;
  cargoNeeds: string;
  chargingPreference: string;
  chargingLocation: string;
  budget: number[];
  priorities: string[];
}

const mockRecommendations = [
  {
    id: 'tesla-model-y',
    make: 'Tesla',
    model: 'Model Y',
    score: 94,
    matchReasons: ['Long range perfect for daily distance', 'Excellent charging network', 'Advanced tech features'],
    price: 55000,
    range: 515,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop',
    bestFor: 'Long-range performance',
    percentile: 95,
    totalCostYear3: 68000,
    category: 'Premium SUV'
  },
  {
    id: 'hyundai-ioniq5',
    make: 'Hyundai',
    model: 'IONIQ 5',
    score: 89,
    matchReasons: ['Ultra-fast charging', 'Great value proposition', 'Innovative design'],
    price: 52000,
    range: 481,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    bestFor: 'Fast charging',
    percentile: 88,
    totalCostYear3: 61000,
    category: 'Tech SUV'
  },
  {
    id: 'vw-id4',
    make: 'Volkswagen',
    model: 'ID.4',
    score: 85,
    matchReasons: ['Excellent value for money', 'Great range', 'Family-friendly'],
    price: 48000,
    range: 520,
    image: 'https://images.unsplash.com/photo-1619976215249-95ad23ea2816?w=400&h=300&fit=crop',
    bestFor: 'Value & range',
    percentile: 75,
    totalCostYear3: 57000,
    category: 'Mid-range SUV'
  },
  {
    id: 'nissan-leaf',
    make: 'Nissan',
    model: 'LEAF e+',
    score: 78,
    matchReasons: ['Most affordable option', 'Proven reliability', 'Perfect for city driving'],
    price: 38000,
    range: 385,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop',
    bestFor: 'Budget efficiency',
    percentile: 60,
    totalCostYear3: 44000,
    category: 'Budget Hatchback'
  }
];

export function DrivingProfileWizard({ onComplete, onBack }: DrivingProfileWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<DrivingProfile>({
    primaryUse: '',
    bodyType: '',
    dailyDistance: [50],
    longTripFrequency: '',
    passengers: '',
    cargoNeeds: '',
    chargingPreference: '',
    chargingLocation: '',
    budget: [60000],
    priorities: []
  });

  // Updated steps for two questions per frame
  const steps = [
    {
      id: 'usage-body',
      title: 'Vehicle Type & Usage',
      description: 'Tell us about your vehicle needs and preferences',
      questions: ['primaryUse', 'bodyType']
    },
    {
      id: 'distance-trips',
      title: 'Driving Patterns',
      description: 'How do you plan to use your vehicle?',
      questions: ['dailyDistance', 'longTripFrequency']
    },
    {
      id: 'passengers-cargo',
      title: 'Space Requirements',
      description: 'How many people and how much cargo?',
      questions: ['passengers', 'cargoNeeds']
    },
    {
      id: 'charging-location',
      title: 'Charging Setup',
      description: 'Where and how will you charge?',
      questions: ['chargingPreference', 'chargingLocation']
    },
    {
      id: 'budget-priorities',
      title: 'Budget & Preferences',
      description: 'What matters most to you?',
      questions: ['budget', 'priorities']
    },
    {
      id: 'results',
      title: 'Results',
      description: 'Your personalized recommendations',
      questions: []
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePriorityToggle = (priority: string) => {
    setProfile(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const renderQuestion = (questionId: string) => {
    switch (questionId) {
      case 'primaryUse':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Primary Use</Label>
            <RadioGroup value={profile.primaryUse} onValueChange={(value) => setProfile(prev => ({ ...prev, primaryUse: value }))}>
              {[
                { value: 'commuting', label: 'Daily Commuting', desc: 'Regular trips to work or school' },
                { value: 'family', label: 'Family Transport', desc: 'School runs, shopping, family outings' },
                { value: 'business', label: 'Business Travel', desc: 'Client visits, meetings, business trips' },
                { value: 'leisure', label: 'Leisure & Weekend', desc: 'Weekend trips, holidays, recreational use' },
                { value: 'mixed', label: 'Mixed Use', desc: 'Combination of all above' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'bodyType':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Body Type</Label>
            <RadioGroup value={profile.bodyType} onValueChange={(value) => setProfile(prev => ({ ...prev, bodyType: value }))}>
              {[
                { value: 'hatchback', label: 'Hatchback', desc: 'Compact and efficient for city driving' },
                { value: 'sedan', label: 'Sedan', desc: 'Traditional 4-door with separate trunk' },
                { value: 'suv', label: 'SUV/Crossover', desc: 'Higher riding position, more space' },
                { value: 'wagon', label: 'Station Wagon', desc: 'Extended cargo space with car-like handling' },
                { value: 'pickup', label: 'Pickup Truck', desc: 'Open bed for hauling cargo' },
                { value: 'any', label: 'No Preference', desc: 'Open to any body style' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'dailyDistance':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Daily Distance (km)</Label>
              <Slider
                value={profile.dailyDistance}
                onValueChange={(value) => setProfile(prev => ({ ...prev, dailyDistance: value }))}
                max={200}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10 km</span>
                <span className="font-medium text-foreground">{profile.dailyDistance[0]} km/day</span>
                <span>200+ km</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm">
                <strong>Range Recommendation:</strong> For {profile.dailyDistance[0]} km daily driving, 
                you'll need at least {Math.ceil(profile.dailyDistance[0] * 3.5)} km of range for comfortable weekly charging.
              </p>
            </div>
          </div>
        );

      case 'longTripFrequency':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Long Trip Frequency</Label>
            <RadioGroup value={profile.longTripFrequency} onValueChange={(value) => setProfile(prev => ({ ...prev, longTripFrequency: value }))}>
              {[
                { value: 'never', label: 'Rarely/Never', desc: 'Mostly local driving within city limits' },
                { value: 'monthly', label: 'Monthly', desc: 'Occasional trips over 300km' },
                { value: 'weekly', label: 'Weekly', desc: 'Regular long-distance travel' },
                { value: 'daily', label: 'Daily/Often', desc: 'Frequent long trips or highway commuting' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'passengers':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Typical Passengers</Label>
            <RadioGroup value={profile.passengers} onValueChange={(value) => setProfile(prev => ({ ...prev, passengers: value }))}>
              {[
                { value: '1-2', label: '1-2 People', desc: 'Just me or with one passenger' },
                { value: '3-4', label: '3-4 People', desc: 'Small family or occasional passengers' },
                { value: '5-7', label: '5-7 People', desc: 'Large family or frequent group transport' },
                { value: '7+', label: '7+ People', desc: 'Large families or commercial use' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'cargoNeeds':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Cargo Requirements</Label>
            <RadioGroup value={profile.cargoNeeds} onValueChange={(value) => setProfile(prev => ({ ...prev, cargoNeeds: value }))}>
              {[
                { value: 'minimal', label: 'Minimal', desc: 'Small bags, occasional shopping' },
                { value: 'moderate', label: 'Moderate', desc: 'Weekly groceries, luggage for trips' },
                { value: 'large', label: 'Large', desc: 'Sports equipment, large shopping trips' },
                { value: 'commercial', label: 'Commercial', desc: 'Tools, work equipment, heavy hauling' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'chargingPreference':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Charging Preference</Label>
            <RadioGroup value={profile.chargingPreference} onValueChange={(value) => setProfile(prev => ({ ...prev, chargingPreference: value }))}>
              {[
                { value: 'home', label: 'Home Charging', desc: 'Charge overnight at home (wallbox)' },
                { value: 'work', label: 'Workplace Charging', desc: 'Charge during work hours' },
                { value: 'public', label: 'Public Charging', desc: 'Use public charging stations' },
                { value: 'fast', label: 'Fast Charging', desc: 'Prefer quick charging on the go' },
                { value: 'mixed', label: 'Mixed Approach', desc: 'Combination of charging methods' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'chargingLocation':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">Primary Charging Location</Label>
            <RadioGroup value={profile.chargingLocation} onValueChange={(value) => setProfile(prev => ({ ...prev, chargingLocation: value }))}>
              {[
                { value: 'home-garage', label: 'Home Garage', desc: 'Private garage with dedicated charging' },
                { value: 'home-driveway', label: 'Home Driveway', desc: 'Outdoor charging at home' },
                { value: 'apartment', label: 'Apartment Complex', desc: 'Shared charging facilities' },
                { value: 'workplace', label: 'Workplace', desc: 'Employer-provided charging' },
                { value: 'public-only', label: 'Public Only', desc: 'Rely entirely on public charging' },
                { value: 'mixed', label: 'Mixed Options', desc: 'Combination of locations' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Budget Range (€)</Label>
              <Slider
                value={profile.budget}
                onValueChange={(value) => setProfile(prev => ({ ...prev, budget: value }))}
                max={150000}
                min={20000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>€20,000</span>
                <span className="font-medium text-foreground">€{profile.budget[0].toLocaleString()}</span>
                <span>€150,000+</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { range: '€20k-40k', label: 'Budget' },
                { range: '€40k-70k', label: 'Mid-range' },
                { range: '€70k+', label: 'Premium' }
              ].map((category) => (
                <div key={category.range} className="p-3 border rounded-lg text-center">
                  <p className="text-sm font-medium">{category.label}</p>
                  <p className="text-xs text-muted-foreground">{category.range}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'priorities':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Top Priorities</Label>
              <p className="text-sm text-muted-foreground mt-1">Select all that apply (max 3)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Long Range', 'Fast Charging', 'Low Price', 'Luxury Features',
                'Performance', 'Efficiency', 'Space', 'Technology',
                'Brand Reputation', 'Design', 'Safety', 'Reliability'
              ].map((priority) => (
                <Button
                  key={priority}
                  variant={profile.priorities.includes(priority) ? "default" : "outline"}
                  className="justify-start h-auto p-3"
                  onClick={() => handlePriorityToggle(priority)}
                  disabled={!profile.priorities.includes(priority) && profile.priorities.length >= 3}
                >
                  {profile.priorities.includes(priority) && (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {priority}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Question not found</div>;
    }
  };

  const renderStep = () => {
    const currentStepData = steps[currentStep];
    
    if (currentStepData.id === 'results') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Your Perfect EV Matches</h3>
            <p className="text-muted-foreground">
              Based on your driving profile, here are our top recommendations
            </p>
          </div>

          {/* Side-by-side layout for recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockRecommendations.map((vehicle, index) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden relative">
                          <img
                            src={vehicle.image}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{vehicle.make} {vehicle.model}</h4>
                          <p className="text-xs text-muted-foreground">
                            €{vehicle.price.toLocaleString()} • {vehicle.range} km range
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {vehicle.score}% Match
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">#{index + 1} Choice</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-1">Why it matches:</h5>
                        <div className="space-y-1">
                          {vehicle.matchReasons.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-muted-foreground">3-Year Cost</div>
                            <div className="text-sm font-semibold">€{vehicle.totalCostYear3.toLocaleString()}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.bestFor}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={onComplete} className="w-full max-w-md">
              View All Recommended Vehicles
            </Button>
          </div>
        </div>
      );
    }

    // Render two questions side by side for other steps
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {currentStepData.questions.map((questionId, index) => (
          <div key={questionId} className="space-y-4">
            {renderQuestion(questionId)}
          </div>
        ))}
      </div>
    );
  };

  const canProceed = () => {
    const currentStepData = steps[currentStep];
    if (currentStepData.id === 'results') return true;
    
    return currentStepData.questions.every(questionId => {
      switch (questionId) {
        case 'primaryUse': return profile.primaryUse !== '';
        case 'bodyType': return profile.bodyType !== '';
        case 'dailyDistance': return profile.dailyDistance[0] > 0;
        case 'longTripFrequency': return profile.longTripFrequency !== '';
        case 'passengers': return profile.passengers !== '';
        case 'cargoNeeds': return profile.cargoNeeds !== '';
        case 'chargingPreference': return profile.chargingPreference !== '';
        case 'chargingLocation': return profile.chargingLocation !== '';
        case 'budget': return profile.budget[0] > 0;
        case 'priorities': return profile.priorities.length > 0;
        default: return true;
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Browser
          </Button>
          
          <div className="mb-6">
            <h1 className="mb-2">Vehicle Recommendation Wizard</h1>
            <p className="text-muted-foreground">
              Answer a few questions to get personalized EV recommendations
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {(steps[currentStep].id.includes('usage') || steps[currentStep].id === 'results') && <Car className="h-5 w-5 text-blue-600" />}
                {steps[currentStep].id.includes('distance') && <MapPin className="h-5 w-5 text-blue-600" />}
                {steps[currentStep].id.includes('passengers') && <Users className="h-5 w-5 text-blue-600" />}
                {steps[currentStep].id.includes('charging') && <Zap className="h-5 w-5 text-blue-600" />}
                {steps[currentStep].id.includes('budget') && <Clock className="h-5 w-5 text-blue-600" />}
              </div>
              <div>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
          {steps[currentStep].id !== 'results' && (
            <div className="flex justify-between p-6 pt-0">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}