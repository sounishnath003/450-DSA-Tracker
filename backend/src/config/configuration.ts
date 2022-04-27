export default () => ({
  port: parseInt(process.env.PORT, 10) || 1337,
  mongodbDev: process.env.DATABASE_URI_DEV || '',
  mongodbProd: process.env.DATABASE_URI_PROD || '',
  nodeenv: process.env.NODE_ENV,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret1234'
});
