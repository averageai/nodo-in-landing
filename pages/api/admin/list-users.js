import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  const { masterKey } = req.body;
  if (!masterKey || masterKey !== process.env.ADMIN_MASTER_KEY) {
    return res.status(401).json({ error: 'Clave maestra incorrecta' });
  }
  try {
    const result = await pool.query('SELECT id, username, is_superuser FROM users ORDER BY username ASC');
    return res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error('Error en list-users:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
} 