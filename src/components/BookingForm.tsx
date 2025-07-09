import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, User, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoogleMap from '@/components/GoogleMap';
import LocationInput from '@/components/LocationInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateFare, formatFare } from '@/lib/fareCalculator';
import { useToast } from '@/hooks/use-toast';

interface VehicleType {
  id: string;
  name: string;
  icon: string;
  price: string;
  capacity: string;
  eta: string;
}

const vehicleTypes: VehicleType[] = [
  { id: 'sedan', name: 'Sedan', icon: '🚗', price: '$12-15', capacity: '4 passengers', eta: '5 min' },
  { id: 'suv', name: 'SUV', icon: '🚙', price: '$18-22', capacity: '6 passengers', eta: '7 min' },
  { id: 'maxi', name: 'Maxi', icon: '🚐', price: '$25-30', capacity: '8 passengers', eta: '10 min' },
  { id: 'accessible', name: 'Accessible', icon: '♿', price: '$15-18', capacity: '3 passengers', eta: '8 min' },
  { id: 'premium', name: 'Premium', icon: '✨', price: '$35-45', capacity: '4 passengers', eta: '12 min' },
];

const BookingForm: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan');
  const [bookingStep, setBookingStep] = useState<'form' | 'vehicles' | 'confirmation'>('form');
  const [routeDistance, setRouteDistance] = useState<string>('');
  const [routeDuration, setRouteDuration] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const API_KEY = 'AIzaSyDm3PvqTQN5aFKoAwxC5fzLx8P8lwI-0OA';

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location detection.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode the coordinates to get an address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            setPickupLocation(address);
            toast({
              title: "Location detected",
              description: "Your current location has been set as pickup location.",
            });
          } else {
            toast({
              title: "Location not found",
              description: "Could not determine your address from GPS coordinates.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          toast({
            title: "Error",
            description: "Failed to get your address. Please enter manually.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = "Failed to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupLocation && destination) {
      setBookingStep('vehicles');
    }
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setBookingStep('confirmation');
  };

  const calculateEstimatedFare = () => {
    if (!routeDistance || !routeDuration) return null;
    
    // Parse distance (remove "km" and convert to number)
    const distanceKm = parseFloat(routeDistance.replace(/[^\d.]/g, ''));
    // Parse duration (remove "mins" and convert to number)
    const durationMinutes = parseFloat(routeDuration.replace(/[^\d.]/g, ''));
    
    if (isNaN(distanceKm) || isNaN(durationMinutes)) return null;
    
    return calculateFare(durationMinutes, distanceKm);
  };

  const fareData = calculateEstimatedFare();

  const handleBookRide = () => {
    // Mock booking logic
    alert('Ride booked successfully! Your driver will arrive shortly.');
    setBookingStep('form');
    setPickupLocation('');
    setDestination('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Book Your Ride</h1>
          <p className="text-xl text-muted-foreground">Fast, reliable, and comfortable transportation</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  {bookingStep === 'form' && 'Where to?'}
                  {bookingStep === 'vehicles' && 'Choose Your Ride'}
                  {bookingStep === 'confirmation' && 'Confirm Booking'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {bookingStep === 'form' && (
                  <form onSubmit={handleLocationSubmit} className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <LocationInput
                        placeholder="Pickup location"
                        value={pickupLocation}
                        onChange={setPickupLocation}
                        className="pl-10 pr-12"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        title="Use current location"
                      >
                        <Crosshair className={`h-4 w-4 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <LocationInput
                        placeholder="Where to?"
                        value={destination}
                        onChange={setDestination}
                        className="pl-10"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-taxi">
                      Find Rides
                    </Button>
                  </form>
                )}

                {bookingStep === 'vehicles' && (
                  <div className="space-y-4">
                    {vehicleTypes.map((vehicle) => (
                      <motion.div
                        key={vehicle.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedVehicle === vehicle.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleVehicleSelect(vehicle.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{vehicle.icon}</span>
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">{vehicle.capacity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{vehicle.price}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {vehicle.eta}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button
                      onClick={() => setBookingStep('form')}
                      variant="outline"
                      className="w-full"
                    >
                      Back to Locations
                    </Button>
                  </div>
                )}

                {bookingStep === 'confirmation' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold mb-2">Trip Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>From:</span>
                          <span className="font-medium">{pickupLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>To:</span>
                          <span className="font-medium">{destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vehicle:</span>
                          <span className="font-medium">
                            {vehicleTypes.find(v => v.id === selectedVehicle)?.name}
                          </span>
                        </div>
                        {fareData ? (
                          <>
                            <div className="flex justify-between">
                              <span>Distance:</span>
                              <span className="font-medium">{routeDistance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-medium">{routeDuration}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between text-xs">
                                <span>Base Fare:</span>
                                <span>{formatFare(fareData.breakdown.baseFare)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span>Time Charge:</span>
                                <span>{formatFare(fareData.breakdown.timeFare)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span>Distance Charge:</span>
                                <span>{formatFare(fareData.breakdown.distanceFare)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2">
                              <span className="font-semibold">Total Fare:</span>
                              <span className="font-semibold text-primary text-lg">
                                {formatFare(fareData.total)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between">
                            <span>Estimated Price:</span>
                            <span className="font-medium text-primary">
                              {vehicleTypes.find(v => v.id === selectedVehicle)?.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={handleBookRide}
                      className="w-full bg-primary hover:bg-primary/90 shadow-taxi"
                    >
                      Confirm & Book Ride
                    </Button>
                    <Button
                      onClick={() => setBookingStep('vehicles')}
                      variant="outline"
                      className="w-full"
                    >
                      Back to Vehicles
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <Card className="shadow-lg h-[500px]">
              <CardContent className="p-0 h-full">
                {pickupLocation && destination ? (
                  <GoogleMap
                    pickupLocation={pickupLocation}
                    destination={destination}
                    onRouteCalculated={(distance, duration) => {
                      setRouteDistance(distance);
                      setRouteDuration(duration);
                    }}
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-small" />
                    <div className="text-center z-10">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground">
                        Enter pickup and destination to see route
                      </p>
                    </div>
                  </div>
                )}
                {routeDistance && routeDuration && (
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
                    <p className="text-sm font-medium">Distance: {routeDistance}</p>
                    <p className="text-sm font-medium">Duration: {routeDuration}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
