export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    URL: process.env.DATABASE_URL,
    HOST: process.env.POSTGRES_HOST,
    PORT: process.env.POSTGRES_PORT,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.POSTGRES_DB,
  },
});
