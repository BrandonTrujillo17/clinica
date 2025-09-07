import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-lively-term-adjpqp57-pooler.c-2.us-east-1.aws.neon.tech',
  database: 'citas_clinica',
  password: 'npg_1nl2MVFhHkyK',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

export const db = {
  query: (text, params) => pool.query(text, params),
};
