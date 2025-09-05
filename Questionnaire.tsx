import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { QuestionPage } from './QuestionPage';

export interface QuestionnaireData {
  name: string;
  age: number;
  experience: string;
  skills: number;
  location: string;
  availability: string;
  salary: number;
  interests: string;
  motivation: string;
}

const initialData: QuestionnaireData = {
  name: '',
  age: 25,
  experience: '',
  skills: 5,
  location: '',
  availability: '',
  salary: 50000,
  interests: '',
  motivation: ''
};

export function Questionnaire() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>(initialData);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalPages = 3;
  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDataUpdate = (updates: Partial<QuestionnaireData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleRestart = () => {
    setCurrentPage(0);
    setFormData(initialData);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Thank You!</CardTitle>
            <p className="text-muted-foreground">
              Your questionnaire has been completed successfully.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-medium">Your Responses:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Age:</strong> {formData.age}</div>
                <div><strong>Experience:</strong> {formData.experience}</div>
                <div><strong>Skills (1-10):</strong> {formData.skills}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Availability:</strong> {formData.availability}</div>
                <div><strong>Salary:</strong> ${formData.salary.toLocaleString()}</div>
                <div><strong>Interests:</strong> {formData.interests}</div>
              </div>
              <div className="col-span-2">
                <strong>Motivation:</strong> {formData.motivation}
              </div>
            </div>
            <Button onClick={handleRestart} className="w-full">
              Start New Questionnaire
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Welcome to Our Questionnaire</CardTitle>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <QuestionPage
            pageNumber={currentPage}
            formData={formData}
            onDataUpdate={handleDataUpdate}
          />
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentPage === totalPages - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}