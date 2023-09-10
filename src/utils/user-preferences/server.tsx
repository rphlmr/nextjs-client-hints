import { getCookieValue } from "../get-cookie-value";
import { userPreferences, type UserPreferencesName } from "./cookies";

/**
 * Get the user preferences from cookies.
 *
 * **Server only**
 *
 * @returns an object with the user preferences
 */
export function getUserPreferences() {
	return Object.entries(userPreferences).reduce(
		(acc, [name, hint]) => {
			const hintName = name as UserPreferencesName;
			const cookieName = userPreferences[hintName].cookieName;

			if (!cookieName) {
				throw new Error(`Unknown user preferences cookie: ${hintName}`);
			}

			if ("transform" in hint) {
				acc[hintName] = hint.transform(
					getCookieValue(cookieName) ?? hint.fallback,
				);
			} else {
				// @ts-expect-error - this is fine (PRs welcome though)
				acc[hintName] = getCookieValue(cookieName) ?? hint.fallback;
			}

			return acc;
		},
		{} as {
			[name in UserPreferencesName]: (typeof userPreferences)[name] extends {
				transform: (value: unknown) => infer ReturnValue;
			}
				? ReturnValue
				: (typeof userPreferences)[name]["fallback"];
		},
	);
}
