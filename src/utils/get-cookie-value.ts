import { cookies } from "next/headers";

export function getCookieValue(name: string) {
	const cookieStore = cookies();

	const value = cookieStore.get(name)?.value;

	return value ? decodeURIComponent(value) : null;
}
