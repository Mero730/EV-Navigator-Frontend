import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { QuestionnaireData } from './Questionnaire';

interface QuestionPageProps {
  pageNumber: number;
  formData: QuestionnaireData;
  onDataUpdate: (updates: Partial<QuestionnaireData>) => void;
}

export function QuestionPage({ pageNumber, formData, onDataUpdate }: QuestionPageProps) {
  const renderPage0 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Personal Information</h2>
      
      {/* Question 1: Name (Text Input) */}
      <div className="space-y-2">
        <Label htmlFor="name">What's your full name?</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onDataUpdate({ name: e.target.value })}
          placeholder="Enter your full name"
        />
      </div>

      {/* Question 2: Age (Slider) */}
      <div className="space-y-4">
        <Label>What's your age?</Label>
        <div className="space-y-2">
          <Slider
            value={[formData.age]}
            onValueChange={(value) => onDataUpdate({ age: value[0] })}
            max={70}
            min={18}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>18</span>
            <span className="font-medium">{formData.age} years old</span>
            <span>70</span>
          </div>
        </div>
      </div>

      {/* Question 3: Experience Level (Dropdown) */}
      <div className="space-y-2">
        <Label>What's your experience level?</Label>
        <Select value={formData.experience} onValueChange={(value) => onDataUpdate({ experience: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
            <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
            <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
            <SelectItem value="expert">Expert (10+ years)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPage1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Skills & Availability</h2>
      
      {/* Question 4: Skills Rating (Slider) */}
      <div className="space-y-4">
        <Label>How would you rate your technical skills? (1-10)</Label>
        <div className="space-y-2">
          <Slider
            value={[formData.skills]}
            onValueChange={(value) => onDataUpdate({ skills: value[0] })}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1 (Beginner)</span>
            <span className="font-medium">{formData.skills}/10</span>
            <span>10 (Expert)</span>
          </div>
        </div>
      </div>

      {/* Question 5: Location (Dropdown) */}
      <div className="space-y-2">
        <Label>Where are you located?</Label>
        <Select value={formData.location} onValueChange={(value) => onDataUpdate({ location: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north-america">North America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="south-america">South America</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question 6: Availability (Dropdown) */}
      <div className="space-y-2">
        <Label>What's your availability?</Label>
        <Select value={formData.availability} onValueChange={(value) => onDataUpdate({ availability: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
            <SelectItem value="part-time">Part-time (20-40 hours/week)</SelectItem>
            <SelectItem value="freelance">Freelance (Project-based)</SelectItem>
            <SelectItem value="contract">Contract (3-6 months)</SelectItem>
            <SelectItem value="consulting">Consulting (As needed)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Preferences & Goals</h2>
      
      {/* Question 7: Salary Expectation (Slider) */}
      <div className="space-y-4">
        <Label>What's your salary expectation? (USD per year)</Label>
        <div className="space-y-2">
          <Slider
            value={[formData.salary]}
            onValueChange={(value) => onDataUpdate({ salary: value[0] })}
            max={200000}
            min={30000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$30,000</span>
            <span className="font-medium">${formData.salary.toLocaleString()}</span>
            <span>$200,000</span>
          </div>
        </div>
      </div>

      {/* Question 8: Interests (Text Input) */}
      <div className="space-y-2">
        <Label htmlFor="interests">What are your main areas of interest?</Label>
        <Input
          id="interests"
          value={formData.interests}
          onChange={(e) => onDataUpdate({ interests: e.target.value })}
          placeholder="e.g., Web Development, AI, Mobile Apps"
        />
      </div>

      {/* Question 9: Motivation (Textarea) */}
      <div className="space-y-2">
        <Label htmlFor="motivation">What motivates you in your work?</Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => onDataUpdate({ motivation: e.target.value })}
          placeholder="Tell us what drives you and what you're passionate about..."
          rows={4}
        />
      </div>
    </div>
  );

  const pages = [renderPage0, renderPage1, renderPage2];
  
  return (
    <div className="min-h-[400px]">
      {pages[pageNumber]()}
    </div>
  );
}