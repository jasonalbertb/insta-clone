module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '426px',
      md2: "600px",
      md: '768px',
      lg: '976px',
      xl: '1024px',
      xxl: '1440px',
    },
    extend: { 
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.7)',
      },
      zIndex: {
        '1': '1',
      },
      height :{
        "26" : "6.5rem"
      },
      spacing: {
        "26" : "6.5rem"
      }
    },
  },
  plugins: [],
}
