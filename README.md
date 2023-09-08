This is a [Next.js](https://nextjs.org/) demo handling client hints and user preferences without any hydration error.

It is largely based on the Remix Run stack [The Epic Stack](https://github.com/epicweb-dev/epic-stack) from <a href="https://kentcdodds.com">Kent C. Dodds</a> and
    <a href="https://github.com/epicweb-dev/epic-stack/graphs/contributors">contributors</a>.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What is solved here

You have no request headers for the user timezone or it color scheme preference.
If you want to use one of this, you can only access that client side and you will have hydration issues: server side rendered content will be different from the client side rendered one.

## How to use it
Just copy/paste the [src/utils](src/utils) folder in your project and use the `ClientHintsProvider` and `UserPreferencesProvider` in your root layout.

```tsx
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
```

## Learn More

All the non-magic happens in the [src/utils/client-hints](src/utils/client-hints) &  [src/utils/user-preferences](src/utils/user-preferences/) folders.

In [src/utils/client-hints/components.tsx](src/utils/client-hints/components.tsx), `ClientHintsCheck` is a component that is rendered in the `<head>` of our document before anything else. That component renders a small and fast inline script which checks the user's cookies for the expected client hints. If they are not present or if they're outdated, it sets a cookie and triggers a reload of the page.

Then, we use regular `cookies()` function in root layout to read the cookie and set the client hints in a `ClientHintsProvider`.
We do the same for user preferences (like its selected theme).

See [Client Hints decision from The Epic Stack](https://github.com/epicweb-dev/epic-stack/blob/e20e5e1b18a62d793a4ead0a542dca65cb23fb9a/docs/client-hints.md)

## Learn more about client hints
The [Client Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints) are a set of HTTP request header fields that a server can proactively request from a client to get information about the device, network, user, and user-agent-specific preferences. The server can determine which resources to send, based on the information that the client chooses to provide.
