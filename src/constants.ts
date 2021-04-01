export const JWT_SECRET = 'supersecretsecretcode'
export const JWT_EXPIRES_IN = 60 * 60 * 24

const DEV_DB = {
  type: 'sqlite',
  database: 'db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true
}

const PROD_DB = {
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true
}

export const DB_OPTIONS = process.env.NODE_ENV === 'dev' ? DEV_DB : PROD_DB
