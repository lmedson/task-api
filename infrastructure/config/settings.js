const envPath = process.env.NODE_ENV
  ? `./.env.${process.env.NODE_ENV}`
  : './.env';

require('dotenv').config({ path: envPath });

const { env } = process;

module.exports = {
  db: env.MONGODB_URI,
  port: env.PORT || 3000
};
