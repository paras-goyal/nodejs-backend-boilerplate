import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL', error);
    process.exit(1);
  }
};