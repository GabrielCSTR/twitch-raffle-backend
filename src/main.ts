import helmet from 'helmet'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment, isProdEnv } from '@app/app.environment'
import logger from '@app/utils/logger'
import * as APP_CONFIG from '@app/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, isProdEnv ? { logger: false } : {})

  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: true })) 
  app.use(passport.initialize())

  return await app.listen(APP_CONFIG.APP.PORT)
}

bootstrap().then(() => {
  logger.info(`Backend is running at ${APP_CONFIG.APP.PORT}, env: ${environment}.`)
})
