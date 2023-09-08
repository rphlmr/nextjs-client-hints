import { getCookieValue } from "../cookie";
import { type UserPrefsNames, userPrefs } from "./config";

/**
 * Get the user preferences from cookies.
 *
 * **Server only**
 *
 * @returns an object with the client hints and their values
 */
export function getUserPrefs() {
	return Object.entries(userPrefs).reduce(
		(acc, [name, hint]) => {
			const prefName = name as UserPrefsNames;
			const cookieName = userPrefs[prefName].cookieName;

			if (!cookieName) {
				throw new Error(`Unknown user pref cookie: ${prefName}`);
			}

			// @ts-expect-error - this is fine (PRs welcome though)
			acc[prefName] = getCookieValue(cookieName) ?? hint.fallback;

			return acc;
		},
		{} as {
			[name in UserPrefsNames]: (typeof userPrefs)[name]["fallback"];
		},
	);
}
