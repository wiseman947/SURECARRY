import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { setupSwagger } from './swagger';
setupSwagger(app);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'SureCarry API is running' });
});

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import rideRoutes from './routes/ride.routes';
import deliveryRoutes from './routes/delivery.routes';
import walletRoutes from './routes/wallet.routes';
import aiRoutes from './routes/ai.routes';
import chatRoutes from './routes/chat.routes';

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', chatRoutes);

import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
