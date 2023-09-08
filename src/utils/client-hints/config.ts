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

export type ClientHintNames = keyof typeof clientHints;
