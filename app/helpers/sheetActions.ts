import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Nama tab di spreadsheet yang menyimpan data tamu. Ganti kalau beda.
const GUEST_SHEET_TITLE = "Guests";

export interface Guest {
  id: string;
  name: string;
  phone: string;
  presenceStatus: string;
  message: string;
  invitationStatus: string;
}

// --- Auth ---
// Sengaja diisolasi di satu fungsi kecil: kalau nanti kebijakan org
// GCP masih memblokir pembuatan service account key dan kamu pindah
// ke OAuth2 refresh token, cukup ganti isi fungsi ini saja — getGuestList
// dan updateGuest di bawah, plus semua file yang memakainya, gak perlu diubah.
function getServiceAccountAuth() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY belum diset di environment variables",
    );
  }

  // Vercel menyimpan env var sebagai satu baris, jadi \n literal di
  // private key perlu dikonversi jadi newline asli dulu.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  return new JWT({ email, key: privateKey, scopes: SCOPES });
}

// Cache instance per invocation biar gak re-auth & re-load tiap
// getGuestList/updateGuest dipanggil dalam request yang sama.
let cachedDoc: GoogleSpreadsheet | null = null;

async function getGuestSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID belum diset di environment variables");
  }

  if (!cachedDoc) {
    cachedDoc = new GoogleSpreadsheet(sheetId, getServiceAccountAuth());
  }

  await cachedDoc.loadInfo();

  const sheet = cachedDoc.sheetsByTitle[GUEST_SHEET_TITLE];
  if (!sheet) {
    throw new Error(
      `Tab bernama "${GUEST_SHEET_TITLE}" tidak ditemukan di spreadsheet ini`,
    );
  }

  return sheet;
}

// --- Read ---
// Dipanggil dari Server Component (page.tsx) saat render, jadi
// datanya selalu fresh setiap dashboard dibuka.
export async function getGuestList(): Promise<Guest[]> {
  const sheet = await getGuestSheet();
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    id: String(row.get("id") ?? ""),
    name: String(row.get("name") ?? ""),
    phone: String(row.get("phone") ?? ""),
    presenceStatus: String(row.get("presenceStatus") ?? ""),
    message: String(row.get("message") ?? ""),
    invitationStatus: String(row.get("invitationStatus") ?? ""),
  }));
}

// --- Write ---
// Pengganti langsung writeJson(path, data, "id"): cari baris
// berdasarkan id, lalu update kolom yang dikasih.
export async function updateGuest(
  guestId: string,
  updates: Partial<Omit<Guest, "id">>,
): Promise<boolean> {
  try {
    const sheet = await getGuestSheet();
    const rows = await sheet.getRows();

    const row = rows.find(
      (r) => String(r.get("id")).trim() === String(guestId).trim(),
    );

    if (!row) {
      console.error(`Guest dengan id "${guestId}" tidak ditemukan di sheet`);
      return false;
    }

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        row.set(key, value);
      }
    }

    await row.save();
    return true;
  } catch (error) {
    console.error("Gagal update guest di Google Sheets:", error);
    return false;
  }
}
