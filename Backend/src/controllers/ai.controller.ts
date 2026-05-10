import { Request, Response } from 'express';
import { getDynamicPricing, getRouteOptimization } from '../services/ai.service';

export const calculatePricing = (req: Request, res: Response): void => {
  try {
    const { baseFare, distance, trafficLevel } = req.body;

    if (!baseFare || !distance || !trafficLevel) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    const price = getDynamicPricing(Number(baseFare), Number(distance), trafficLevel);
    res.status(200).json({ estimatedFare: price });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchOptimalRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      res.status(400).json({ error: 'Missing origin or destination' });
      return;
    }

    const routeData = await getRouteOptimization(origin, destination);
    res.status(200).json(routeData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
