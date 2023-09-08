import { getClientHints } from "@/utils/client-hints/get-client-hints";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	ClientHintsCheck,
	ClientHintsProvider,
} from "@/utils/client-hints/components";
import { cn } from "@/utils/cn";
import { getUserPrefs } from "@/utils/user-preferences/get-user-prefs";
import {
	ThemeSelector,
	UserPrefsProvider,
} from "@/utils/user-preferences/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const clientHints = getClientHints();
	const userPrefs = getUserPrefs();
	const theme = userPrefs.theme || clientHints.prefersColorScheme;

	return (
		<html lang="en">
			<head>
				<ClientHintsCheck />
			</head>
			<body
				className={cn(
					inter.className,
					theme,
					"grid items-center justify-center gap-y-6",
				)}
			>
				<ClientHintsProvider clientHints={clientHints}>
					<UserPrefsProvider userPrefs={userPrefs}>
						<nav className="inline-flex items-center justify-end py-2">
							<ThemeSelector />
						</nav>

						<main className="space-y-6 max-w-md">{children}</main>
					</UserPrefsProvider>
				</ClientHintsProvider>
			</body>
		</html>
	);
}