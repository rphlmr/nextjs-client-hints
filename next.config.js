/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	output: "standalone",
};

module.exports = nextConfig;
