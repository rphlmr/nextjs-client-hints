"use client";

import React, { useTransition } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { setTheme } from "./action";
import { type getUserPrefs } from "./get-user-prefs";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { cn } from "../cn";

/* -------------------------------------------------------------------------- */
/*                                  Context;                                  */
/* -------------------------------------------------------------------------- */

type UserPrefsContext = ReturnType<typeof getUserPrefs>;

type UserPrefsProviderProps = {
	userPrefs: UserPrefsContext;
	children: React.ReactNode;
};

const Context = React.createContext<UserPrefsContext | null>(null);

export const UserPrefsProvider = ({
	userPrefs,
	children,
}: UserPrefsProviderProps) => {
	const value = React.useMemo(() => userPrefs, [userPrefs]);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUserPrefs = () => {
	const context = React.useContext(Context);

	if (!context) {
		throw new Error(
			`useUserPrefs must be used within a UserPrefsProvider.`,
		);
	}
	return context;
};

/* -------------------------------------------------------------------------- */
/*                               Theme Selector                               */
/* -------------------------------------------------------------------------- */

export function ThemeSelector() {
	const { theme } = useUserPrefs();
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
