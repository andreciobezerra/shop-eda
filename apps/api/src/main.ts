import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { EnvironmentVariables } from './config/env.validation';

const numCPUs = os.cpus().length;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const configService = app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');

  app.setGlobalPrefix(apiPrefix);

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

  console.log(
    `[Worker ${process.pid}] API running on http://localhost:${port}/${apiPrefix}`,
  );
}

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(
      `[Worker ${worker.process.pid}] died (code: ${code}, signal: ${signal}). Restarting...`,
    );
    cluster.fork();
  });
} else {
  bootstrap().catch((err) => {
    console.error(`[Worker ${process.pid}] Bootstrap failed:`, err);
    process.exit(1);
  });
}
