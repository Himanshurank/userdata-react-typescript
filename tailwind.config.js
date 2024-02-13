/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			height: {
				"10vh": "10vh",
				"20vh": "20vh",
				"90vh": "90vh",
			},
			padding: {
				"5px": "5px"
			},
			backdropBlur: {
				"2px": "2px"
			},
		}
	},
	plugins: [],
};
