/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				vars: "all",
				args: "all",
				argsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				ignoreRestSiblings: false,
			},
		],
	},
};
