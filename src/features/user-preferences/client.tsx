"use client";

import React, { useTransition } from "react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { type getUserPreferences } from "./server";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/select";
import { cn } from "@/utils/cn";
import { setTheme } from "./action";
import { clientHints } from "./cookies";

/* -------------------------------------------------------------------------- */
/*                                  Context;                                  */
/* -------------------------------------------------------------------------- */

type UserPreferencesContext = ReturnType<typeof getUserPreferences>;

type UserPreferencesProviderProps = {
	userPreferences: UserPreferencesContext;
	children: React.ReactNode;
};

const Context = React.createContext<UserPreferencesContext | null>(null);

export const UserPreferencesProvider = ({
	userPreferences,
	children,
}: UserPreferencesProviderProps) => {
	const value = React.useMemo(() => userPreferences, [userPreferences]);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUserPreferences = () => {
	const context = React.useContext(Context);

	if (!context) {
		throw new Error(
			`useUserPreferences must be used within UserPreferencesProvider.`,
		);
	}
	return context;
};

/* -------------------------------------------------------------------------- */
/*                                   Script;                                  */
/* -------------------------------------------------------------------------- */

/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 *
 * @credit https://github.com/epicweb-dev/epic-stack
 */
export function ClientHintsCheck({ nonce }: { nonce?: string }) {
	const { refresh } = useRouter();
	React.useEffect(() => {
		const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
		function handleThemeChange() {
			document.cookie = `${clientHints.prefersColorScheme.cookieName}=${
				themeQuery.matches ? "dark" : "light"
			}`;
			refresh();
		}
		themeQuery.addEventListener("change", handleThemeChange);
		return () => {
			themeQuery.removeEventListener("change", handleThemeChange);
		};
	}, [refresh]);

	return (
		<script
			nonce={nonce}
			dangerouslySetInnerHTML={{
				__html: `
const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
	const [key, value] = cur.split('=');
	acc[key] = value;
	return acc;
}, {});
let cookieChanged = false;
const hints = [
${Object.values(clientHints)
	.map((hint) => {
		const cookieName = JSON.stringify(hint.cookieName);
		return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
	})
	.join(",\n")}
];
for (const hint of hints) {
	if (decodeURIComponent(hint.cookie) !== hint.actual) {
		cookieChanged = true;
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + ';path=/';
	}
}
// if the cookie changed, reload the page, unless the browser doesn't support
// cookies (in which case we would enter an infinite loop of reloads)
if (cookieChanged && navigator.cookieEnabled) {
	window.location.reload();
}
			`,
			}}
		/>
	);
}

/* -------------------------------------------------------------------------- */
/*                               Theme Selector                               */
/* -------------------------------------------------------------------------- */

export function ThemeSelector() {
	const { theme } = useUserPreferences();
	const [isPending, startTransition] = useTransition();

	return (
		<Select
			name="theme"
			defaultValue={theme || "system"}
			onValueChange={(value) => {
				startTransition(async () => {
					await setTheme(value);
				});
			}}
			dir="rtl"
		>
			<SelectTrigger className={cn("w-10", isPending && "animate-pulse")}>
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light" className="inline-flex">
					<SunIcon className="h-4 w-4" />
				</SelectItem>
				<SelectItem value="dark">
					<MoonIcon className="h-4 w-4" />
				</SelectItem>
				<SelectItem value="system">
					<DesktopIcon className="h-4 w-4" />
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
