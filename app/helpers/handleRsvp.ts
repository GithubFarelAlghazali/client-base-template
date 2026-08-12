"use server";
import { updateGuest } from "./sheetActions";

export default async function handleRsvp(
  message: string,
  presence: string,
  guestId: string,
) {
  const success = await updateGuest(guestId, {
    presenceStatus: presence,
    message: message,
  });
  return success;
}
