export const getDynamicPricing = (baseFare: number, distance: number, trafficLevel: 'LOW' | 'MEDIUM' | 'HIGH'): number => {
  let multiplier = 1.0;
  
  if (trafficLevel === 'MEDIUM') multiplier = 1.2;
  if (trafficLevel === 'HIGH') multiplier = 1.5;
  
  // Calculate randomized surge based on time of day
  const hour = new Date().getHours();
  if (hour >= 17 && hour <= 19) {
    multiplier += 0.3; // Rush hour surge
  }

  return parseFloat((baseFare + (distance * 1.5) * multiplier).toFixed(2));
};

export const getRouteOptimization = (origin: string, destination: string) => {
  // Mock AI generated optimal route output
  return {
    origin,
    destination,
    estimatedTimeMinutes: Math.floor(Math.random() * 40) + 10,
    distanceKm: (Math.random() * 15 + 2).toFixed(1),
    optimalPath: [
      { lat: 10.0, lng: 20.0 },
      { lat: 10.1, lng: 20.1 },
      { lat: 10.2, lng: 20.2 },
    ]
  };
};
