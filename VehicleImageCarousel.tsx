import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface VehicleImageCarouselProps {
  vehicleName: string;
}

export function VehicleImageCarousel({ vehicleName }: VehicleImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Placeholder images - in a real app these would come from the vehicle data
  const placeholderImages = [
    { label: 'Exterior Front', color: 'bg-gradient-to-br from-blue-100 to-blue-200' },
    { label: 'Interior', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { label: 'Exterior Side', color: 'bg-gradient-to-br from-green-100 to-green-200' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % placeholderImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + placeholderImages.length) % placeholderImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <div className={`w-full h-full flex items-center justify-center ${placeholderImages[currentImage].color}`}>
          <div className="text-center">
            <div className="text-2xl font-semibold text-muted-foreground mb-2">
              {vehicleName}
            </div>
            <div className="text-muted-foreground">
              {placeholderImages[currentImage].label}
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={previousImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Indicators */}
      <div className="flex justify-center gap-2">
        {placeholderImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            onClick={() => setCurrentImage(index)}
            aria-label={`View ${placeholderImages[index].label}`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2">
        {placeholderImages.map((image, index) => (
          <button
            key={index}
            className={`flex-1 aspect-video rounded-md border-2 overflow-hidden transition-colors ${
              index === currentImage ? 'border-primary' : 'border-border'
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <div className={`w-full h-full flex items-center justify-center ${image.color}`}>
              <span className="text-xs text-muted-foreground">{image.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}