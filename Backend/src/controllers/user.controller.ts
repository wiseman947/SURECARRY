import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { firstName, lastName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phone },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
    });

    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
