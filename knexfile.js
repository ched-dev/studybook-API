require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  production: {
    client: 'pg',
    connection: { 
      connectionString: process.env.PRODUCTION_DATABASE_URL,
      ssl: { rejectUnauthorized: false, requestCert: true }
    }
  }
};
