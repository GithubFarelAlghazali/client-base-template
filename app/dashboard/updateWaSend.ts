"use server";
import { writeJson } from "../helpers/writeJson";

export default async function updateWaSend(guestId: string) {
  const success = await writeJson(
    "/app/helpers/guestList.json",
    {
      id: guestId,
      invitationStatus: "dikirim",
    },
    "id",
  );
  return success;
}
