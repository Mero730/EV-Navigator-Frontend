import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { useAppState } from './AppStateManager';
import { 
  Car, 
  Upload, 
  FileText, 
  Battery,
  Gauge,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export function VehicleStatsUpdate() {
  const { state, completeOnboarding } = useAppState();
  const [currentMileage, setCurrentMileage] = useState(state.userData.mileage?.toString() || '');
  const [lastSOHTest, setLastSOHTest] = useState('');
  const [sohTestDate, setSOHTestDate] = useState('');
  const [sohCertificate, setSOHCertificate] = useState<File | null>(null);
  const [batteryWarrantyStatus, setBatteryWarrantyStatus] = useState('');
  const [recentServiceDate, setRecentServiceDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSOHCertificate(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data with new information
    const updatedUserData = {
      ...state.userData,
      mileage: parseInt(currentMileage) || state.userData.mileage,
      lastSOHTest: parseFloat(lastSOHTest) || undefined,
      sohTestDate: sohTestDate || undefined,
      batteryWarrantyStatus: batteryWarrantyStatus || undefined,
      recentServiceDate: recentServiceDate || undefined,
      additionalNotes: additionalNotes || undefined,
    };

    completeOnboarding(updatedUserData);
  };

  const handleSkip = () => {
    completeOnboarding(state.userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center">
              <Car className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl">Update Vehicle Information</h1>
            <p className="text-muted-foreground">
              Help us provide better insights by updating your vehicle statistics
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span>Current Vehicle Statistics</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Update any information that has changed since your last visit
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Mileage */}
              <div className="space-y-2">
                <Label htmlFor="mileage" className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4" />
                  <span>Current Mileage (km)</span>
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  value={currentMileage}
                  onChange={(e) => setCurrentMileage(e.target.value)}
                  placeholder={`Previous: ${state.userData.mileage || 'Not recorded'} km`}
                />
              </div>

              <Separator />

              {/* SOH Test Results */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Battery className="h-5 w-5" />
                  <span className="font-medium">Recent SOH Test</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soh-value">SOH Test Result (%)</Label>
                    <Input
                      id="soh-value"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={lastSOHTest}
                      onChange={(e) => setLastSOHTest(e.target.value)}
                      placeholder="e.g., 94.2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soh-date">Test Date</Label>
                    <Input
                      id="soh-date"
                      type="date"
                      value={sohTestDate}
                      onChange={(e) => setSOHTestDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* SOH Certificate Upload */}
                <div className="space-y-2">
                  <Label htmlFor="soh-certificate" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>SOH Test Certificate (optional)</span>
                  </Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload your official SOH test certificate
                      </p>
                      <input
                        type="file"
                        id="soh-certificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleCertificateUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('soh-certificate')?.click()}
                      >
                        Choose File
                      </Button>
                      {sohCertificate && (
                        <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{sohCertificate.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Additional Updates</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="warranty-status">Battery Warranty Status</Label>
                    <Input
                      id="warranty-status"
                      value={batteryWarrantyStatus}
                      onChange={(e) => setBatteryWarrantyStatus(e.target.value)}
                      placeholder="e.g., Valid until 2030, 8 years remaining"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service-date">Most Recent Service Date</Label>
                    <Input
                      id="service-date"
                      type="date"
                      value={recentServiceDate}
                      onChange={(e) => setRecentServiceDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Any other relevant updates about your vehicle's condition, performance changes, modifications, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="flex-1">
                  Update & Continue
                </Button>
                <Button type="button" variant="outline" onClick={handleSkip} className="flex-1">
                  Skip for Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-blue-800 mb-1">Why we ask for updates</div>
              <p className="text-blue-700">
                Regular updates help us provide more accurate range predictions, better degradation analysis, 
                and personalized maintenance recommendations. All information is stored securely and used only 
                to improve your EV management experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}