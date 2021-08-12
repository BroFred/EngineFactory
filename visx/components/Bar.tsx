import React from "react";
import { XYChart, BarSeries, Axis, lightTheme, Tooltip,darkTheme } from "@visx/xychart";
import customTheme from '../customTheme';


const data: { x: string; y: number }[] = [
  { x: "上海", y: 4 },
  { x: "北京", y: 10 },
  { x: "湖北", y: 15 },
  { x: "江苏", y: 23 },
];

export default function Bar({
  width,
  height,
  vertical=true,
}: {
  width: number;
  height: number;
  vertical?: boolean
}) {
    const xConfig = { type: 'band', paddingInner: 0.3 } as const;
    const yConfig = { type: 'linear' } as const;
  return (
    <XYChart
      theme={lightTheme}
      height={height}
      width={width}
      xScale={vertical ? xConfig: yConfig}
      yScale={vertical ? yConfig: xConfig}
    >
      <Axis orientation="left" />
      <Axis orientation="bottom" />
      <BarSeries
        data={data}
        dataKey="y"
        xAccessor={(d) => vertical ? d.x : d.y}
        yAccessor={(d) => vertical ? d.y : d.x}
      />
      <Tooltip
        renderTooltip={({tooltipData}) => (
          <p>{
            `Stuff: ${tooltipData?.nearestDatum.datum.y}`
          }</p>
        )}
      />
    </XYChart>
  );
}

export function TransposedBar(props: { height: number; width: number }) {
  return <Bar vertical={false} {...props} />;
}
