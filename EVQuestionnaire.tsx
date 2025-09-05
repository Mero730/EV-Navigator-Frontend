import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { EVQuestionPage } from './EVQuestionPage';
import { useAppState, UserData } from './AppStateManager';

export function EVQuestionnaire() {
  const [currentPage, setCurrentPage] = useState(0);
  const { state, updateUserData, completeOnboarding } = useAppState();
  const [formData, setFormData] = useState<UserData>(state.userData);

  const totalPages = 4; // Updated to 4 pages for better grouping
  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      completeOnboarding(formData);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDataUpdate = (updates: Partial<UserData>) => {
    const updatedData = { ...formData, ...updates };
    setFormData(updatedData);
    updateUserData(updates);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Setup Your EV Profile</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentPage + 1} of {totalPages}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <EVQuestionPage
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
              {currentPage === totalPages - 1 ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}