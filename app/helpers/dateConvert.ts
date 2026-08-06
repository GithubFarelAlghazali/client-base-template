export const calendarDate = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};

export const readableDate = (date: string) => {
	const dateObj = new Date(date);

	const day = dateObj.toLocaleString("id-ID", { day: "numeric" });
	const month = dateObj.toLocaleString("id-ID", { month: "long" });
	const year = dateObj.toLocaleString("id-ID", { year: "numeric" });

	return {
		day,
		monthAndYear: `${month} ${year}`,
	};
};
