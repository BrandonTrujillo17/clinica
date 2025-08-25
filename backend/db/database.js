const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Tu nombre de usuario de PostgreSQL
  host: 'localhost', // O la IP del servidor de la base de datos
  database: 'citas_clinica', // El nombre de la base de datos de la clínica
  password: '12345678', // La contraseña de tu usuario
  port: 5432, // El puerto por defecto de PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};