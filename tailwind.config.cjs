module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { forest: '#11270C', sky: '#55ACD3', indigo: '#4C5EA9', leaf: '#42922E', cream: '#F7F8F3' },
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    boxShadow: { card: '0 18px 48px -26px rgba(17,39,12,.28)' }
  } },
  plugins: []
};
