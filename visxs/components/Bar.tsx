import React from "react";
import { XYChart, BarSeries, Axis, lightTheme, Tooltip,darkTheme } from "@visx/xychart";
import customTheme from '../customTheme';

interface BarProps {
  height: number;
  width: number;
  vertical: boolean;
  data: object;
  onPointerUp?: ()=>void
}

const test = 
[{ "x": "ShangHai", "y": 4 },
{ "x": "BeiJing", "y": 10 },
{ "x": "JiangSu", "y": 15 },
{ "x": "Hubei", "y": 23 }]

export default function Bar({
  width,
  height,
  vertical=true,
  onPointerUp,
  data=test
}: BarProps) {
  const xConfig = { type: 'band', paddingInner: 0.3 } as const;
  const yConfig = { type: 'linear' } as const;
  return (
    <XYChart
      theme={lightTheme}
      height={height}
      width={width}
      xScale={vertical ? xConfig: yConfig}
      yScale={vertical ? yConfig: xConfig}
      onPointerUp={onPointerUp}
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
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
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
