"use server";

import { cookies } from "next/headers";
import { userPreferences } from "./cookies";

export async function setTheme(theme: string) {
	const { cookieName } = userPreferences.theme;

	if (theme !== "light" && theme !== "dark" && theme !== "system") {
		throw new Error("Invalid theme");
	}

	if (theme === "system") {
		cookies().delete(cookieName);
	} else {
		cookies().set(cookieName, theme);
	}
}
