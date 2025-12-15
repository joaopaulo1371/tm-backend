export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
  },

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'agrocrm',
  },

  // Caso você precise futuramente
  // auth: {
  //   jwtSecret: process.env.JWT_SECRET || 'secret',
  //   jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  // },

  // storage: {
  //   bucket: process.env.BUCKET_NAME || '',
  // },

  // email: {
  //   host: process.env.SMTP_HOST,
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS,
  // },
});
