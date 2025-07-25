import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

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

  const { masterKey, action, username, password, is_superuser, modules, userId } = req.body;
  if (!masterKey || masterKey !== process.env.ADMIN_MASTER_KEY) {
    return res.status(401).json({ error: 'Clave maestra incorrecta' });
  }

  try {
    if (action === 'create') {
      if (!username || !password) {
        return res.status(400).json({ error: 'Faltan datos para crear usuario' });
      }
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (username, password_hash, is_superuser, modules) VALUES ($1, $2, $3, $4)',
        [username, hash, !!is_superuser, modules || null]
      );
      return res.status(200).json({ success: true, message: 'Usuario creado' });
    }
    if (action === 'change_password') {
      if (!userId || !password) {
        return res.status(400).json({ error: 'Faltan datos para cambiar contraseña' });
      }
      const hash = await bcrypt.hash(password, 10);
      await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, userId]);
      return res.status(200).json({ success: true, message: 'Contraseña actualizada' });
    }
    return res.status(400).json({ error: 'Acción no soportada' });
  } catch (error) {
    console.error('Error en admin/users:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
} 