import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'source-map-support/register';
import { exit } from 'process';
const { version } = require('../package.json');

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  const configService = app.get<ConfigService<any>, ConfigService<any>>(ConfigService);

  app.use(json({ limit: '10mb' }));
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  app.use(morgan(configService.get('environment') === 'production' ? 'combined' : 'dev'));
  /// Parses incoming JSON requests
  app.useGlobalPipes(new ValidationPipe({ transform: true, }));
  /// Define interceptors for any method response
  //app.useGlobalInterceptors(new TransformResponseInterceptor());
  if (configService.get<boolean>('ENABLE_SWAGGER', false)) {
    const config = new DocumentBuilder()
      .setTitle('My Beautiful API')
      .setDescription('Integrated API for my application')
      .setVersion(version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup(`swagger`, app, document, {
      customSiteTitle: 'My Beautiful API',
      swaggerOptions: {
        persistAuthorization: true,
      }
    });
  }

  const port = configService.get<number>('SERVER_PORT', 3000);
  try {
    await app.listen(port, '0.0.0.0');
    logger.log(`Server is listening on port ${port}`);
  }
  catch(ex) {
    logger.error(ex);
    await app.close().catch(() => {});
    exit(1);
  }
}
bootstrap();