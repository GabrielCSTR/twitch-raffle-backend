import path from 'path'
import yargs from 'yargs'

const argv = yargs.argv as Record<string, string | void>
const ROOT_PATH = path.join(__dirname, '..')
const packageJSON = require(path.resolve(ROOT_PATH, 'package.json'))

export const APP = {
  PORT: 3000,
  ROOT_PATH,
  DEFAULT_CACHE_TTL: 60 * 60 * 24,
  MASTER: 'STDEv',
  NAME: 'StreamRaffle',
  URL: 'https://api.steamraffle.app',
  ADMIN_EMAIL: argv.admin_email || 'admin email, e.g. admin@example.com',
  FE_NAME: 'Strdev.me',
  FE_URL: 'https://Strdev.me',
  STATIC_URL: 'https://static.Strdev.me',
}

export const PROJECT = {
  name: packageJSON.name,
  version: packageJSON.version,
  author: packageJSON.author,
  homepage: packageJSON.homepage,
  documentation: packageJSON.documentation,
  repository: packageJSON.repository.url,
}

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://Strdev.me', 'https://cdn.Strdev.me', 'https://admin.Strdev.me'],
  allowedReferer: 'surmon.me',
}

export const MONGO_DB_PROD = {
  uri: argv.db_uri || `mongodb://127.0.0.1:27017/NodePress`,
}

export const MONGO_DB = {
    DB_HOST: argv.DB_HOST || 'localhost',
    DB_PORT: argv.DB_PORT || 27017,
    DB_USERNAME: argv.DB_USERNAME || "",
    DB_PASSWORD: argv.DB_PASSWORD || "",
    DB_DATABASE: argv.DB_DATABASE || "",
}

export const REDIS = {
  host: argv.redis_host || 'localhost',
  port: argv.redis_port || 6379,
  username: argv.redis_username || null,
  password: argv.redis_password || null,
}

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  jwtSecret: argv.auth_key || 'devstrstreamraffle',
  defaultPassword: argv.auth_default_password || 'root',
}

export const TWITCH = {
    clientID: argv.twitch_id || '959cf3eaki4ml4qfg2ror5pgfkh454',
    clientSecret: argv.twitch_secret || 'ihkq41lcai2018p9ng4iwpe5ajahpu',
    callbackURL: argv.twitch_callback || 'http://localhost:3000/api/v1/auth/twitch/callback',
    scope: argv.twitch_scope || ["user:read:follows", "channel:read:subscriptions", "moderator:read:followers"],
  }

export const EMAIL = {
  port: 587,
  host: argv.email_host || 'your email host, e.g. smtp.qq.com',
  account: argv.email_account || 'your email address, e.g. admin@example.me',
  password: argv.email_password || 'your email password',
  from: `"${APP.FE_NAME}" <${argv.email_from || argv.email_account}>`,
}