import fs from 'fs';
import path from 'path';
import { pool } from '../config/database';

const migrate = async () => {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  try {
    await pool.query(schema);
    console.log('✅ Database schema applied');
  } catch (error) {
    console.error('❌ Failed to apply database schema', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

migrate();
