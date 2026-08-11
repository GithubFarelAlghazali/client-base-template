// cara pakai : node pw-hasher.mjs <password> <email>
// kalau argumen gak diisi, script akan nanya lewat prompt
//
// hasil:
//   .env         -> buat dev lokal (hash di-escape, aman dari dotenv-expand)
//   .env.vercel  -> buat di-upload/paste langsung ke Vercel dashboard (raw, tanpa backslash)

import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import readline from "readline";

// set lokasi absolut dari root
const ENV_PATH = path.resolve(process.cwd(), ".env");
const ENV_VERCEL_PATH = path.resolve(process.cwd(), ".env.vercel");

// ambil input dari console
function promptInput(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// tulis / update satu key ke file env manapun
function upsertEnvVar(filePath, key, value) {
  let content = "";

  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf-8");
  }

  const line = `${key}=${value}`;
  const regex = new RegExp(`^${key}=.*$`, "m");

  if (regex.test(content)) {
    content = content.replace(regex, line);
  } else {
    content = content.trim();
    content = content.length > 0 ? `${content}\n${line}\n` : `${line}\n`;
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

// tulis satu key yang sama ke DUA file sekaligus (local + vercel)
function upsertBoth(key, localValue, vercelValue = localValue) {
  upsertEnvVar(ENV_PATH, key, localValue);
  upsertEnvVar(ENV_VERCEL_PATH, key, vercelValue);
}

async function main() {
  const password =
    process.argv[2] || (await promptInput("Masukkan password: "));
  const email =
    process.argv[3] || (await promptInput("Masukkan email admin: "));

  if (!password) {
    console.error("❌ Password tidak boleh kosong.");
    process.exit(1);
  }
  if (!email) {
    console.error("❌ Email tidak boleh kosong.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  // ADMIN_PASSWORD_HASH
  // - versi lokal di-escape ($ -> \$) biar dotenv-expand (dipakai next dev/build) gak salah baca $2b/$10 sebagai variable
  // - versi vercel RAW, karena Vercel gak proses escape/expand sama sekali
  const escapedHash = hash.replace(/\$/g, "\\$");
  upsertBoth("ADMIN_PASSWORD_HASH", escapedHash, hash);

  // ADMIN_EMAIL - polos, sama di kedua file (gak ada karakter $ jadi gak perlu di-escape)
  upsertBoth("ADMIN_EMAIL", email);

  // JWT_SECRET - random string base64, sama di kedua file, di-generate baru tiap script dijalankan
  const jwtSecret = crypto.randomBytes(32).toString("base64");
  upsertBoth("JWT_SECRET", jwtSecret);

  console.log(`✅ .env (lokal) berhasil ditulis ke ${ENV_PATH}`);
  console.log(
    `✅ .env.vercel (siap upload) berhasil ditulis ke ${ENV_VERCEL_PATH}`,
  );
  console.log("");
  console.log(
    "➡️  Tinggal buka Vercel dashboard > Settings > Environment Variables,",
  );
  console.log(
    "    lalu import/paste isi file .env.vercel itu langsung (bukan .env lokal).",
  );
}

main();
