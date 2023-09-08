import { type Theme } from "../client-hints/config";

export const userPrefs = {
	theme: {
		cookieName: "up-theme",
		maxAge: 60 * 60 * 24 * 365, // 1 year
		fallback: "" as Theme | "",
	},
	// add other user preferences here
};

export type UserPrefsNames = keyof typeof userPrefs;
