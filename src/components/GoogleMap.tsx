
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation } from 'lucide-react';

interface GoogleMapProps {
  pickupLocation: string;
  destination: string;
  onRouteCalculated?: (distance: string, duration: string) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ pickupLocation, destination, onRouteCalculated }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  const API_KEY = 'AIzaSyDm3PvqTQN5aFKoAwxC5fzLx8P8lwI-0OA';

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -37.8136, lng: 144.9631 }, // Melbourne center
            zoom: 12,
            disableDefaultUI: true, // Disable all default UI controls
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            gestureHandling: 'cooperative',
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#1f2937' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3f4f6' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#374151' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#1e40af' }]
              }
            ]
          });

          const directionsServiceInstance = new google.maps.DirectionsService();
          const directionsRendererInstance = new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#eab308',
              strokeWeight: 4
            }
          });

          directionsRendererInstance.setMap(mapInstance);

          setMap(mapInstance);
          setDirectionsService(directionsServiceInstance);
          setDirectionsRenderer(directionsRendererInstance);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError(true);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (map && directionsService && directionsRenderer && pickupLocation && destination) {
      const request: google.maps.DirectionsRequest = {
        origin: pickupLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          
          const route = result.routes[0];
          const leg = route.legs[0];
          
          if (onRouteCalculated) {
            onRouteCalculated(leg.distance?.text || '', leg.duration?.text || '');
          }
        } else {
          console.error('Directions request failed:', status);
        }
      });
    }
  }, [map, directionsService, directionsRenderer, pickupLocation, destination, onRouteCalculated]);

  if (mapError) {
    return (
      <div className="w-full h-full rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-small" />
        <div className="text-center z-10">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Map Preview</h3>
          <p className="text-muted-foreground mb-4">
            Route: {pickupLocation} → {destination}
          </p>
          <div className="bg-background/80 rounded-lg p-3 inline-block">
            <p className="text-sm font-medium">Mock Route Info:</p>
            <p className="text-sm text-muted-foreground">Distance: ~12.5 km</p>
            <p className="text-sm text-muted-foreground">Duration: ~18 minutes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg relative overflow-hidden"
      style={{ 
        minHeight: '400px',
      }}
    >
      <style jsx>{`
        .gm-style .gm-style-cc,
        .gm-style .gm-style-mtc,
        .gm-style .gmnoprint,
        .gm-style-cc + div,
        .gm-style-cc,
        .gm-style-mtc,
        .gmnoprint,
        .gm-bundled-control,
        .gmnoprint div,
        .gm-style div[style*="background-color: rgb(255, 255, 255)"],
        .gm-style a[href*="maps.google.com"],
        .gm-style a[href*="google.com/maps"],
        .gm-style .gm-err-container,
        .gm-style .gm-err-message,
        .gm-style .gm-err-autocomplete,
        .gm-style-iw-t::after,
        .gm-style .gm-ui-hover-effect {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        .gm-style {
          font-family: inherit !important;
        }
        
        .gm-style a {
          color: transparent !important;
          text-decoration: none !important;
        }
        
        .gm-style a:hover {
          color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleMap;
