import { promises as fs } from "fs";
import path from "path";

export async function writeJson<T>(
  relativePath: string,
  newData: Partial<T> | T | [T] | T[],
  matchKey?: keyof T,
): Promise<boolean> {
  try {
    // ambil absolute path
    const filePath = path.join(process.cwd(), relativePath);

    // baca data lama kalo ada
    let existingData = null;
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileContent);
    } catch {
      existingData = null;
    }

    let finalData;

    // proses merging data
    if (Array.isArray(existingData) && matchKey) {
      // case 1: file berisi objek
      const itemsToUpdate = Array.isArray(newData) ? newData : [newData];
      finalData = [...existingData];

      for (const newItem of itemsToUpdate) {
        const targetValue = (newItem as any)[matchKey];

        if (targetValue === undefined || targetValue === null) {
          finalData.push(newItem);
          continue;
        }

        const idx = finalData.findIndex((item) => {
          return (
            item &&
            item[matchKey] !== undefined &&
            String(item[matchKey]).trim() === String(targetValue).trim()
          );
        });

        if (idx !== -1) {
          finalData[idx] = { ...finalData[idx], ...newItem };
        } else {
          finalData.push(newItem);
        }
      }
    } else if (
      typeof existingData === "object" &&
      existingData !== null &&
      !Array.isArray(existingData) &&
      typeof newData === "object" &&
      !Array.isArray(newData)
    ) {
      // case 2: file objek tunggal
      finalData = { ...existingData, ...newData };
    } else {
      // case 3: TIMPA total
      finalData = newData;
    }

    // tulis ulang data ke file JSON
    await fs.writeFile(filePath, JSON.stringify(finalData, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to ", relativePath, " : ", error);
    return false;
  }
}
