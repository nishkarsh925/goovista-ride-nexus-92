interface FareBreakdown {
  baseFare: number;
  timeFare: number;
  distanceFare: number;
  total: number;
}

interface FareCalculationResult {
  total: number;
  breakdown: FareBreakdown;
}

/**
 * Calculate taxi fare based on duration and distance
 * @param durationInMinutes - Trip duration in minutes
 * @param distanceInKm - Trip distance in kilometers
 * @returns Total fare and breakdown
 */
export function calculateFare(durationInMinutes: number, distanceInKm: number): FareCalculationResult {
  const BASE_FARE = 2.33;
  const PER_MINUTE_RATE = 0.32;
  const PER_KILOMETER_RATE = 1.06;

  const baseFare = BASE_FARE;
  const timeFare = durationInMinutes * PER_MINUTE_RATE;
  const distanceFare = distanceInKm * PER_KILOMETER_RATE;
  const total = baseFare + timeFare + distanceFare;

  return {
    total: Number(total.toFixed(2)),
    breakdown: {
      baseFare: Number(baseFare.toFixed(2)),
      timeFare: Number(timeFare.toFixed(2)),
      distanceFare: Number(distanceFare.toFixed(2)),
      total: Number(total.toFixed(2))
    }
  };
}

/**
 * Format fare amount as currency string
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatFare(amount: number): string {
  return `$${amount.toFixed(2)}`;
}