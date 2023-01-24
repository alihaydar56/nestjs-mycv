import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession=require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    // ecnrypt cookie with that keys's string
    keys:['dmlsmdlmsldmd']
  }))
  app.useGlobalPipes(new ValidationPipe({ 
    // when we set whitelist true,this means our request body will only include validation pipe data,if any other value sended with request,this will we extraxted automatically.
    whitelist: true,
    skipNullProperties:false,
    skipUndefinedProperties:false,
    skipMissingProperties:false,
    disableErrorMessages:false,
   // transform:true
  }));
  await app.listen(3000);
}
bootstrap();
