"use client";

import { useClientHints } from "@/utils/client-hints/components";
import { useUserPrefs } from "@/utils/user-preferences/components";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardItem,
	CardTitle,
} from "@/components/card";

export function ClientComponent({ serverDate }: { serverDate: string }) {
	const clientHints = useClientHints();
	const userPrefs = useUserPrefs();

	return (
		<Card>
			<CardHeader>
				<CardTitle>👋 I am a 🖥️ client component</CardTitle>
				<CardDescription>
					I use the <code>useClientHints</code> and{" "}
					<code>useUserPrefs</code> functions.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CardItem title="Prefers color scheme">
					{clientHints.prefersColorScheme}
				</CardItem>
				<CardItem title="Theme">
					{userPrefs.theme || "default"}
				</CardItem>
				<CardItem title="Locale">{clientHints.locale}</CardItem>
				<CardItem title="Timezone">{clientHints.timeZone}</CardItem>
				<CardItem title="Today is">
					<time dateTime={serverDate}>
						{Intl.DateTimeFormat(clientHints.locale, {
							dateStyle: "full",
							timeStyle: "long",
							timeZone: clientHints.timeZone,
						})
							.format(new Date(serverDate))
							// hack to replace non-breaking space with regular space. Prevent hydration mismatch on invisible character...
							.replace(/[\u202F\u00A0]/, " ")}
					</time>
				</CardItem>
			</CardContent>
		</Card>
	);
}
