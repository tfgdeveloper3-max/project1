import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: "#147237",
                    dark: "#0f5a2b",
                    light: "#1f9048",
                    tint: "#e7f3ec",
                },
            },
            fontFamily: {
                atyp: ["AtypText", "sans-serif"],
            },
            backgroundImage: {
                "cta-gradient": "linear-gradient(90deg, #E1306C 0%, #F97316 100%)",
            },
        },
    },
    plugins: [],
} satisfies Config;