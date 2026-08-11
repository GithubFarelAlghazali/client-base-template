// cara pakai : node pw-hasher.mjs <password> <email>
// kalau argumen gak diisi, script akan nanya lewat prompt

import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import readline from "readline";

// set lokasi absolut dari root
const ENV_PATH = path.resolve(process.cwd(), ".env");

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

// tulis / update satu key ke .env
function upsertEnvVar(filePath, key, value) {
  let content = "";

  // cek isi env
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf-8");
  }

  // kalo udah ada isinya, cari di line berapa key berada
  const line = `${key}=${value}`;
  const regex = new RegExp(`^${key}=.*$`, "m");

  if (regex.test(content)) {
    // kalo ketemu, ganti dengan content baru
    content = content.replace(regex, line);
  } else {
    // kalo belum, bersihkan whitespace lalu tambahkan
    content = content.trim();
    content = content.length > 0 ? `${content}\n${line}\n` : `${line}\n`;
  }

  fs.writeFileSync(filePath, content, "utf-8");
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

  // DEVELOPMENT MODE ONLY
  // cari kemunculan $ lalu tambah backslash, mencegah dotenv-expand
  // (dipakai next dev/build) salah baca $2b / $10 di dalam hash sebagai variable
  const escapedHash = hash.replace(/\$/g, "\\$");
  upsertEnvVar(ENV_PATH, "ADMIN_PASSWORD_HASH", escapedHash);

  // ADMIN_EMAIL - string biasa, gak ada karakter $ jadi gak perlu di-escape
  upsertEnvVar(ENV_PATH, "ADMIN_EMAIL", email);

  // JWT_SECRET - random string base64, di-generate baru tiap script dijalankan
  const jwtSecret = crypto.randomBytes(32).toString("base64");
  upsertEnvVar(ENV_PATH, "JWT_SECRET", jwtSecret);

  console.log(
    `✅ ADMIN_PASSWORD_HASH, ADMIN_EMAIL, dan JWT_SECRET berhasil ditulis ke ${ENV_PATH}`,
  );
  console.log("");
  console.log(
    "⚠️  Buat di-paste ke Vercel (Environment Variables), pakai versi RAW ini (TANPA backslash):",
  );
}

main();
