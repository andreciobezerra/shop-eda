import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../config/env.validation';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        type: 'postgresql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        user: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        dbName: config.get<string>('DB_NAME', 'shop_eda'),
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        debug: config.get<string>('NODE_ENV') === 'development',
        allowGlobalContext: true,
        discovery: {
          warnWhenNoEntities: true,
        },
        metadataProvider: undefined,
      }),
    }),
  ],
})
export class DatabaseModule {}
