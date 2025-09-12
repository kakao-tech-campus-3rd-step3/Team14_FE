// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        keyframes: {
          wave: {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        },
        animation: {
          wave: "wave 8s linear infinite",
          "wave-slow": "wave 12s linear infinite reverse",
        },
      },
    },
    plugins: [],
  };
  