export function handleScrollable(val: boolean) {
	localStorage.setItem("scrollable", JSON.stringify(val));
	window.dispatchEvent(new Event("scrollable-change"));
}

export function getScrollable(): boolean {
	if (typeof window === "undefined") return false;
	return localStorage.getItem("scrollable") === "true";
}
