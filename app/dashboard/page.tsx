import { getGuestList } from "../helpers/sheetActions";
import GuestDashboardClient from "./guestDashboard";

export const dynamic = "force-dynamic";

export default async function GuestDashboardPage() {
  const guestList = await getGuestList();

  return <GuestDashboardClient guestList={guestList} />;
}
