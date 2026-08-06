import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isInitialized = false;

// Express-level CORS handling for all requests (including preflight OPTIONS)
server.use((req: any, res: any, next: any) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Origin');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

export const bootstrapServer = async () => {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        return callback(null, origin);
      },
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'Origin'],
      optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    isInitialized = true;
  }
  return server;
};

export default async function handler(req: any, res: any) {
  try {
    await bootstrapServer();
    server(req, res);
  } catch (error: any) {
    console.error('Vercel Serverless NestJS initialization error:', error);
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error during serverless initialization',
      error: error?.message || String(error),
    });
  }
}


