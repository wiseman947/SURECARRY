import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    let wallet = await prisma.wallet.findUnique({ where: { userId } });

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await prisma.wallet.create({
        data: {
          userId,
          balance: 0.0,
        },
      });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error('Get Wallet Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fundWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { amount } = req.body;

    if (amount <= 0) {
      res.status(400).json({ error: 'Amount must be greater than zero' });
      return;
    }

    let wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { userId, balance: 0.0 } });
    }

    // Process transaction directly using Prisma transaction to ensure consistency
    const result = await prisma.$transaction([
      prisma.wallet.update({
        where: { userId },
        data: { balance: { increment: amount } },
      }),
      prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'DEPOSIT',
          description: 'User funded wallet',
        },
      }),
    ]);

    res.status(200).json({ message: 'Wallet funded successfully', wallet: result[0], transaction: result[1] });
  } catch (error) {
    console.error('Fund Wallet Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
