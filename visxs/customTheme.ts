import { buildChartTheme } from '@visx/xychart';

export default buildChartTheme({
    // colors
  backgroundColor: '#f09ae9',
  colors: ['rgba(255,231,143,0.8)', '#6a097d', '#d6e0f0'],
  // grid
  gridColor: '#336d88',
  gridColorDark: '#1d1b38',
  // labels
  svgLabelBig: { fill: '#1d1b38' },
  // lines
  tickLength: 8,
});