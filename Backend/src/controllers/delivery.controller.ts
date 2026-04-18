import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const senderId = req.user?.userId;
    if (!senderId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { pickupAddress, pickupLat, pickupLng, dropoffAddress, dropoffLat, dropoffLng, packageSize, packageDetails, fare } = req.body;

    const delivery = await prisma.delivery.create({
      data: {
        senderId,
        pickupAddress,
        pickupLat,
        pickupLng,
        dropoffAddress,
        dropoffLat,
        dropoffLng,
        packageSize,
        packageDetails,
        fare,
        status: 'PENDING',
      },
    });

    res.status(201).json({ message: 'Delivery requested successfully', delivery });
  } catch (error) {
    console.error('Create Delivery Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getDeliveries = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userRole = req.user?.role;
    
    let deliveries;
    if (userRole === 'DRIVER') {
      deliveries = await prisma.delivery.findMany({ where: { driverId: userId } });
    } else {
      deliveries = await prisma.delivery.findMany({ where: { senderId: userId } });
    }

    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Get Deliveries Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const acceptDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const driverId = req.user?.userId;
    const id = req.params.id as string;

    if (!driverId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const delivery = await prisma.delivery.update({
      where: { id },
      data: { driverId, status: 'PICKED_UP' },
    });

    res.status(200).json({ message: 'Delivery accepted', delivery });
  } catch (error) {
    console.error('Accept Delivery Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
