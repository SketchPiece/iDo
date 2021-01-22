export const jwtSecret = 'supersecretsecretcode'
export const jwtExpiresIn = 60 * 60
export const DBOptions =
  process.env.NODE_ENV === 'dev'
    ? {
        type: 'sqlite',
        database: 'db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }
    : {
        type: 'postgres',
        host: process.env.DATABASE_URL,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: true
      }
