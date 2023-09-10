"use client";

import { useUserPreferences } from "@/utils/user-preferences/client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardItem,
	CardTitle,
} from "@/components/card";

export function ClientComponent({ serverDate }: { serverDate: string }) {
	const { locale, prefersColorScheme, theme, timeZone } =
		useUserPreferences();

	return (
		<Card>
			<CardHeader>
				<CardTitle>👋 I am a 🖥️ client component</CardTitle>
				<CardDescription>
					I use the <code>useUserPreferences</code> hook.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CardItem title="Prefers color scheme">
					{prefersColorScheme}
				</CardItem>
				<CardItem title="Theme">{theme || "default"}</CardItem>
				<CardItem title="Locale">{locale}</CardItem>
				<CardItem title="Timezone">{timeZone}</CardItem>
				<CardItem title="Today is">
					<time dateTime={serverDate}>
						{Intl.DateTimeFormat(locale, {
							dateStyle: "full",
							timeStyle: "long",
							timeZone: timeZone,
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
