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
		</>
	);
}
