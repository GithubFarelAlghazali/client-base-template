"use client";

import { ReactNode, useEffect, useState } from "react";
import { getScrollable } from "../helpers/handleScrollable";

export default function ScrollLock({ children }: { children: ReactNode }) {
	const [scrollable, setScrollableState] = useState<boolean>(() => getScrollable());

	useEffect(() => {
		const handleChange = () => setScrollableState(getScrollable());
		window.addEventListener("scrollable-change", handleChange);
		window.addEventListener("storage", handleChange);
		return () => {
			window.removeEventListener("scrollable-change", handleChange);
			window.removeEventListener("storage", handleChange);
		};
	}, []);

	useEffect(() => {
		document.body.style.overflow = scrollable ? "auto" : "hidden";
		document.documentElement.style.overflow = scrollable ? "auto" : "hidden";
	}, [scrollable]);

	return <>{children}</>;
}
