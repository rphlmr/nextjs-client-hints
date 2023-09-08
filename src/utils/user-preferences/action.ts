"use server";

import { cookies } from "next/headers";
import { userPrefs } from "./config";

export async function setTheme(theme: string) {
	const { cookieName } = userPrefs.theme;

	if (theme !== "light" && theme !== "dark" && theme !== "system") {
		throw new Error("Invalid theme");
	}

	if (theme === "system") {
		cookies().delete(cookieName);
	} else {
		cookies().set(cookieName, theme);
	}
}
