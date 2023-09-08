import { getCookieValue } from "../cookie";
import { clientHints, type ClientHintNames } from "./config";

/**
 * Get the client hints from cookies.
 *
 * **Server only**
 *
 * @returns an object with the client hints and their values
 */
export function getClientHints() {
	return Object.entries(clientHints).reduce(
		(acc, [name, hint]) => {
			const hintName = name as ClientHintNames;
			const cookieName = clientHints[hintName].cookieName;

			if (!cookieName) {
				throw new Error(`Unknown client hint cookie: ${hintName}`);
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
			[name in ClientHintNames]: (typeof clientHints)[name] extends {
				transform: (value: unknown) => infer ReturnValue;
			}
				? ReturnValue
				: (typeof clientHints)[name]["fallback"];
		},
	);
}
