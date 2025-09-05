import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User, Mail, MapPin, Calendar } from 'lucide-react';

interface BuyerRegistrationProps {
  onComplete: (userData: BuyerUserData) => void;
  onBack: () => void;
}

interface BuyerUserData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
  age: string;
  interestedInEV: string;
  currentVehicle: string;
}

export function BuyerRegistration({ onComplete, onBack }: BuyerRegistrationProps) {
  const [formData, setFormData] = useState<BuyerUserData>({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    country: '',
    age: '',
    interestedInEV: '',
    currentVehicle: ''
  });

  const [errors, setErrors] = useState<Partial<BuyerUserData>>({});

  const validateForm = () => {
    const newErrors: Partial<BuyerUserData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.age) newErrors.age = 'Age range is required';
    if (!formData.interestedInEV) newErrors.interestedInEV = 'Please select your EV interest level';
    if (!formData.currentVehicle) newErrors.currentVehicle = 'Please select your current vehicle type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleInputChange = (field: keyof BuyerUserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Platform Selection
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Create Your Buyer Account</CardTitle>
            <p className="text-muted-foreground">
              Tell us about yourself to get personalized EV recommendations
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="8001"
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-500">{errors.zipCode}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CH">Switzerland</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="AT">Austria</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="IT">Italy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Demographics
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age Range *</Label>
                  <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
                    <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46-55">46-55</SelectItem>
                      <SelectItem value="56-65">56-65</SelectItem>
                      <SelectItem value="65+">65+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>
              </div>

              {/* EV Interest */}
              <div className="space-y-4">
                <h3 className="font-medium">EV Interest</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="interestedInEV">How interested are you in EVs? *</Label>
                  <Select value={formData.interestedInEV} onValueChange={(value) => handleInputChange('interestedInEV', value)}>
                    <SelectTrigger className={errors.interestedInEV ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select interest level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-interested">Very interested - ready to buy</SelectItem>
                      <SelectItem value="interested">Interested - researching options</SelectItem>
                      <SelectItem value="somewhat-interested">Somewhat interested - just exploring</SelectItem>
                      <SelectItem value="not-sure">Not sure - need more information</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.interestedInEV && (
                    <p className="text-sm text-red-500">{errors.interestedInEV}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentVehicle">What do you currently drive? *</Label>
                  <Select value={formData.currentVehicle} onValueChange={(value) => handleInputChange('currentVehicle', value)}>
                    <SelectTrigger className={errors.currentVehicle ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select current vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ice">Gasoline/Diesel vehicle</SelectItem>
                      <SelectItem value="hybrid">Hybrid vehicle</SelectItem>
                      <SelectItem value="phev">Plug-in Hybrid</SelectItem>
                      <SelectItem value="ev">Electric vehicle</SelectItem>
                      <SelectItem value="none">No car currently</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.currentVehicle && (
                    <p className="text-sm text-red-500">{errors.currentVehicle}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Continue to EV Matching
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}