import { eventInfo, brideInfo } from "./data";
import { calendarDate } from "./dateConvert";

export default function addToCalendar() {
	const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";

	const startDate = new Date(eventInfo.resepsi.date);
	const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

	const title = encodeURIComponent(`Resepsi ${brideInfo.man.nickname} & ${brideInfo.woman.nickname}`);
	const details = encodeURIComponent("Mohon doa restu dan kehadirannya di acara pernikahan kami.");
	const location = encodeURIComponent(eventInfo.resepsi.location);

	const dates = `${calendarDate(startDate)}/${calendarDate(endDate)}`;

	const calendarUrl = `${baseUrl}&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=Asia/Jakarta`;

	window.open(calendarUrl, "_blank");
}
