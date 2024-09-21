import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				main: '#88aaee',
				mainAccent: '#4d80e6',
				overlay: 'rgba(0,0,0,0.8)',

				// light mode
				bg: '#dfe5f2',
				text: '#000',
				border: '#000',

				// dark mode
				darkBg: '#272933',
				darkText: '#eeefe9',
				darkBorder: '#000',
				secondaryBlack: '#1b1b1b',
			},
			borderRadius: {
				base: '5px'
			},
			boxShadow: {
				light: '3px 4px 0px 0px #000',
				dark: '3px 4px 0px 0px #000',
			},
			translate: {
				boxShadowX: '3px',
				boxShadowY: '4px',
				reverseBoxShadowX: '-3px',
				reverseBoxShadowY: '-4px',
			},
			fontWeight: {
				base: '500',
				heading: '700',
			},
			animation: {
				marquee: "marquee 10s linear infinite",
				marquee2: "marquee2 10s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config