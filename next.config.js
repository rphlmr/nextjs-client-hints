/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	output: "standalone",
	poweredByHeader: false,
};

module.exports = nextConfig;
