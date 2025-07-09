
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Loader } from '@googlemaps/js-api-loader';

interface LocationInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  className = '',
  required = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [hasAutocomplete, setHasAutocomplete] = useState<boolean>(false);

  const API_KEY = 'AIzaSyDm3PvqTQN5aFKoAwxC5fzLx8P8lwI-0OA';

  useEffect(() => {
    const initAutocomplete = async () => {
      const loader = new Loader({
        apiKey: API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (inputRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ['formatted_address', 'name']
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && place.formatted_address) {
              onChange(place.formatted_address);
            }
          });
          
          setHasAutocomplete(true);
        }
      } catch (error) {
        console.error('Error loading Google Places:', error);
        setHasAutocomplete(false);
      }
    };

    initAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      required={required}
    />
  );
};

export default LocationInput;
