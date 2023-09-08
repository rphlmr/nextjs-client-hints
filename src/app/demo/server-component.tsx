import { getClientHints } from "@/utils/client-hints/get-client-hints";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardItem,
	CardTitle,
} from "@/components/card";
import { getUserPrefs } from "@/utils/user-preferences/get-user-prefs";

export function ServerComponent({ serverDate }: { serverDate: string }) {
	const clientHints = getClientHints();
	const userPrefs = getUserPrefs();

	return (
		<Card>
			<CardHeader>
				<CardTitle>👋 I am a 🌍 server component</CardTitle>
				<CardDescription>
					I use the <code>getClientHints</code> and{" "}
					<code>getUserPrefs</code> functions.
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
