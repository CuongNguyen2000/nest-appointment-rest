import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: LoggerService = new LoggerService();

  const config = new DocumentBuilder()
    .setTitle('Appointment API')
    .setDescription('Appointment API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  logger.verbose(`Database URL => ${configService.get('database.URL')}`);
  logger.verbose(`Application listening on port => ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
