/**
 * Utilidad de una sola vez: genera el hash bcrypt que va en ADMIN_PASSWORD_HASH (.env).
 *
 * Uso:
 *   npx ts-node scripts/hash-password.ts "miPasswordSuperSegura"
 *
 * Copia el hash que imprime en consola dentro de tu .env, en la variable
 * ADMIN_PASSWORD_HASH. Nunca guardes el password en texto plano.
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
    console.log('Uso: npx ts-node scripts/hash-password.ts "tuPassword"');
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\nAgrega esto a tu .env:\n');
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
