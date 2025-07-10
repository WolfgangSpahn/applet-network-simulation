/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dev/**/*.{js,jsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
      extend: {
        colors: {
          'prophy-black': '#21252b',
          'prophy-blue':  '#282c34',
          'prophy-red':  '#eca1a6',
          'phbern-red':   '#e06c75',
          'prophy-green': '#98c379',
          'prophy-green-hover': '#98c37975',        
          'prophy-orange': '#e5c07b',
          'prophy-lightblue': '#61afef',
          'prophy-lightblue-hover': '#61afef75',
          'prophy-purple': '#c678dd',
          'prophy-cyan': '#56b6c2',
          'prophy-darkgray': '#111827',
          'prophy-lightgray': '#2d3748',
          'prophy-gray': '#abb2bf'
        },
        height: {
          '100': '25rem',    // 100 units = 25rem
          '110': '27.5rem',  // 110 units = 27.5rem
          '120': '30rem',    // 120 units = 30rem
          '126': '31.5rem',  // 126 units = 31.5rem
          '130': '32.5rem',  // 130 units = 32.5rem
          '140': '35rem',    // 140 units = 35rem
          '150': '37.5rem',  // 150 units = 37.5rem
          '160': '40rem',    // 160 units = 40rem
          '180': '45rem',    // 180 units = 45rem
          '200': '50rem',    // 200 units = 50rem
          // Add more custom heights as needed
        },
  
        fontSize: {
          "fluid-4xs": "clamp(0.375rem, 0.6vw, 0.5rem)", // ~6px
          "fluid-3xs": "clamp(0.5rem, 0.8vw, 0.625rem)", // ~8px
          "fluid-2xs": "clamp(0.625rem, 0.8vw, 0.75rem)", // ~10px
          "fluid-xs": "clamp(0.75rem, 1vw, 1rem)",   // ~12px - 16px
          "fluid-sm": "clamp(0.875rem, 1.2vw, 1.125rem)", // ~14px - 18px
          "fluid-base": "clamp(1rem, 1.5vw, 1.25rem)",   // ~16px - 20px
          "fluid-lg": "clamp(1.125rem, 2vw, 1.5rem)",  // ~18px - 24px
          "fluid-xl": "clamp(1.25rem, 2.5vw, 2rem)",  // ~20px - 32px
          "fluid-2xl": "clamp(1.5rem, 3vw, 2.5rem)",  // ~24px - 40px
          "fluid-3xl": "clamp(1.875rem, 4vw, 3rem)",  // ~30px - 48px
          "fluid-4xl": "clamp(2.25rem, 5vw, 3.5rem)",  // ~36px - 56px
          "fluid-5xl": "clamp(3rem, 6vw, 4rem)",  // ~48px - 64px
          "fluid-6xl": "clamp(3.75rem, 7vw, 5rem)",  // ~60px - 80px
          "fluid-7xl": "clamp(4.5rem, 8vw, 6rem)",  // ~72px - 96px
        },
        // should enable border coloring but does not work
        borderColor: theme => ({
          'prophy-green': theme('colors.prophy-green'),
        }),
      },
    },
    corePlugins: {
      preflight: false, // This disables Tailwind's built-in Preflight
    },
    plugins: [
      require('flowbite/plugin'), // require Flowbite's plugin for Tailwind CSS 
      function({ addComponents }) {
        addComponents({
          '.marked p': {
            '@apply text-base': {},
          },
          '.marked ol': {
            '@apply list-decimal list-inside space-y-2 pl-5 text-base': {},
          },
          '.marked ol li': {
            '@apply mb-2 text-base': {},
          },
          '.marked p:last-of-type': {
            '@apply text-base': {},
          },
        });
      },
    ],
  }
  
  