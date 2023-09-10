export type Theme = "light" | "dark";

export const clientHints = {
	prefersColorScheme: {
		cookieName: "ch-prefers-color-scheme",
		getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
		fallback: "light" as Theme,
		transform(value: string) {
			return (value === "dark" ? "dark" : "light") satisfies Theme;
		},
	},
	timeZone: {
		cookieName: "ch-time-zone",
		getValueCode: `Intl.DateTimeFormat().resolvedOptions().timeZone`,
		fallback: "UTC",
	},
	locale: {
		cookieName: "ch-locale",
		getValueCode: `window.navigator.language`,
		fallback: "en",
	},
	// add other hints here
};

const preferences = {
	theme: {
		cookieName: "up-theme",
		maxAge: 60 * 60 * 24 * 365, // 1 year
		fallback: "" as Theme | "",
	},
	// add other user preferences here
};

export const userPreferences = {
	...clientHints,
	...preferences,
};

export type UserPreferencesName = keyof typeof userPreferences;
