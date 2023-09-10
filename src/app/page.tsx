import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ClientComponent } from "./demo/client-component";
import { ServerComponent } from "./demo/server-component";

export default function Home() {
	const serverDate = new Date().toISOString();

	return (
		<>
			<div className="opacity-60">
				<p>Try to change your location (devtools &gt; sensors)</p>
				<p>Try to change your locale (ex: Locale Switcher addon)</p>
			</div>
			<ServerComponent serverDate={serverDate} />
			<ClientComponent serverDate={serverDate} />

			<Link
				href="https://github.com/rphlmr/nextjs-client-hints"
				className="inline-flex items-center space-x-1"
			>
				<GitHubLogoIcon className="inline-block w-4 h-4 mr-1" />
				<span>@rphlmr</span>
			</Link>
		</>
	);
}
