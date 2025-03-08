const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik','sans-serif']
      }
    }
  },
  plugins: [nextui()],
  safelist: [
    {
      pattern: /grid-cols-([123456])/,
      variants: ['sm', 'md', 'lg'],
    }
  ]
};
