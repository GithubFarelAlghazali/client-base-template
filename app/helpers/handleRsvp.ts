"use server";
import { writeJson } from "./writeJson";

export default async function handleRsvp(
  message: string,
  presence: string,
  guestId: string,
) {
  const success = await writeJson(
    "/app/helpers/guestList.json",
    {
      id: guestId,
      presenceStatus: presence,
      message,
    },
    "id",
  );
  return success;
}
