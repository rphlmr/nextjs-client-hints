import { getUserPreferences } from "@/utils/user-preferences/server";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardItem,
	CardTitle,
} from "@/components/card";

export function ServerComponent({ serverDate }: { serverDate: string }) {
	const { locale, prefersColorScheme, theme, timeZone } =
		getUserPreferences();

	return (
		<Card>
			<CardHeader>
				<CardTitle>👋 I am a 🌍 server component</CardTitle>
				<CardDescription>
					I use the <code>getUserPreferences</code> function.
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
