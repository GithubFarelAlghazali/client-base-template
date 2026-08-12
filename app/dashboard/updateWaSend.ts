"use server";
import { updateGuest } from "../helpers/sheetActions";

export default async function updateWaSend(guestId: string) {
  const success = await updateGuest(guestId, {
    invitationStatus: "dikirim",
  });
  return success;
}
