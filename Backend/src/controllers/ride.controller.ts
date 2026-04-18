import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const requestRide = async (req: Request, res: Response): Promise<void> => {
  try {
    const passengerId = req.user?.userId;
    if (!passengerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { pickupLat, pickupLng, pickupAddress, dropoffLat, dropoffLng, dropoffAddress, fare } = req.body;

    const ride = await prisma.ride.create({
      data: {
        passengerId,
        pickupLat,
        pickupLng,
        pickupAddress,
        dropoffLat,
        dropoffLng,
        dropoffAddress,
        fare,
        status: 'PENDING',
      },
    });

    res.status(201).json({ message: 'Ride requested successfully', ride });
  } catch (error) {
    console.error('Request Ride Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRides = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Identify if user is driver or passenger and return relevant rides
    const userRole = req.user?.role;
    
    let rides;
    if (userRole === 'DRIVER') {
      rides = await prisma.ride.findMany({ where: { driverId: userId } });
    } else {
      rides = await prisma.ride.findMany({ where: { passengerId: userId } });
    }

    res.status(200).json(rides);
  } catch (error) {
    console.error('Get Rides Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const acceptRide = async (req: Request, res: Response): Promise<void> => {
  try {
    const driverId = req.user?.userId;
    const id = req.params.id as string;

    if (!driverId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const ride = await prisma.ride.update({
      where: { id },
      data: { driverId, status: 'ACCEPTED' },
    });

    res.status(200).json({ message: 'Ride accepted', ride });
  } catch (error) {
    console.error('Accept Ride Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
