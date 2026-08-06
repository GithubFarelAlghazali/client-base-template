const PLAY_EVENT = "wedding-audio:play";
const PAUSE_EVENT = "wedding-audio:pause";

export const playGlobalMusic = () => {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event(PLAY_EVENT));
	}
};

export const pauseGlobalMusic = () => {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event(PAUSE_EVENT));
	}
};

export { PLAY_EVENT, PAUSE_EVENT };