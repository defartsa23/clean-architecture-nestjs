import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Bank Scrap')
    .setDescription('Bank scrap automation.')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  const port = 3000
  await app.listen(port);
  logger.log(`Starting Nest application ON port ${port}`);
}
bootstrap();
