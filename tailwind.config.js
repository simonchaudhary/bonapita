module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#d65a31",
				primary100: "#F9E7E1",
			},

			// colors
			textColor: {
				primary: "#d65a31",
			},
			// min Width
			minWidth: {
				20: "5rem",
			},
			height: {
				90: "90vh",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
