import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NodeEnvironmentEnum } from './delivery/enums/nodeEnvironment.enum';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const env = process.env.NODE_ENV;
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: (env === NodeEnvironmentEnum.Production) ? ['log', 'error', 'warn', 'verbose'] : ['log', 'error', 'warn', 'debug', 'verbose'] 
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Title Application')
    .setDescription('Description.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  const port = parseInt(process.env.NODE_PORT) | 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Starting Nest application ON port ${port}`);
}
bootstrap();
