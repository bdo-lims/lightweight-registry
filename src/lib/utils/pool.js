import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  "host": `${process.env.DB_HOST}`,
  "port": process.env.DB_PORT,
  "user": `${process.env.DB_USER}`,
  "password" : `${process.env.DB_PASS}`,
  "database" : `${process.env.DB_NAME}`,
  "max": 20,
  "connectionTimeoutMillis" : 0,
  "idleTimeoutMillis": 30000
});

export default pool;
