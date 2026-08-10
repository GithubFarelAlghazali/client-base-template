// cara pakai : node /scripts/pw-hasher.mjs PASSWORD_KAMU

import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import readline from "readline";

// set lokasi absolut dari root
const ENV_PATH = path.resolve(process.cwd(), ".env");
const ENV_KEY = process.argv[3] || "ADMIN_PASSWORD_HASH";

// ambil password dari input console
function promptPassword(query) {
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

// tulis ke .env
function upsertEnvVar(filePath, key, value) {
  let content = "";

  // cek isi env
  if (fs.existsSync(filePath)) {
    // kalo gaada,timpa
    content = fs.readFileSync(filePath, "utf-8");
  }

  // kalo udah ada isinya, cari di line berapa ADMIN_PASSWORD_HASH berada
  const line = `${key}=${value}`;
  const regex = new RegExp(`^${key}=.*$`, "m");

  if (regex.test(content)) {
    // kalo ketemu, ganti dengan content
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
    process.argv[2] || (await promptPassword("Masukkan password: "));

  if (!password) {
    console.error("❌ Password tidak boleh kosong.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  // cari kemunculan $ lalu tambah backslash, mencegah NEXTJS ngerusak env
  const escapedHash = hash.replace(/\$/g, "\\$");
  upsertEnvVar(ENV_PATH, ENV_KEY, escapedHash);

  console.log(`✅ ${ENV_KEY} berhasil ditulis ke ${ENV_PATH}`);
}

main();
