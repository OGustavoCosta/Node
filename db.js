import 'dotenv/config';
import postgres from 'postgres';
import { neon } from '@neondatabase/serverless';

// Conexão direta (substitua `process.env.DATABASE_URL` pelo valor correto, se necessário)
const sql = neon(process.env.DATABASE_URL);

// Exportando a conexão
export { sql };
