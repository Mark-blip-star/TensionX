import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express"
import path, {join} from "path";
import {ValidationPipe} from "@nestjs/common";
import * as passport from "passport";
const session = require(`express-session`)
import { create } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const hbs = create({
    defaultLayout:`main`,
    extname:`handlebars`,
  })
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set(`views`,`views`)

  app.use(session({
    secret:"some",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000 * 60 * 60}
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname,`..`,`static`))
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
