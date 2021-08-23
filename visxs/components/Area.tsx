import React from 'react';
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedAreaSeries,
    XYChart,
    Tooltip,
  } from '@visx/xychart';

import { appleStock } from '@visx/mock-data';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear, scaleBand,scaleLog,scaleOrdinal} from '@visx/scale';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { extent, max } from 'd3-array';

  const Demand = [
    { x: 1994, z: 10, y: 10 },
    { x: 1995, z: 13, y: 23 },
    { x: 1996, z: 4, y: 27 },
    { x: 1997, z: 5, y: 32 },
    { x: 1998, z: 8, y: 40 },
    { x: 1999, z: 5, y: 45 },
    { x: 2001, z: 5, y: 50 },
    { x: 2002, z: 5, y: 55 },
    { x: 2003, z: 10, y: 65 },
    { x: 2004, z: 10, y: 75 },
    { x: 2005, z: 10, y: 85 },
    { x: 2006, z: 15, y:100 },
  ];
  
  const Supply = [
    { x: 1994, z: 10, y: 10 },
    { x: 1995, z: 8, y: 18 },
    { x: 1996, z: 6, y: 24 },
    { x: 1997, z: 6, y: 30 },
    { x: 1998, z: 6, y: 36 },
    { x: 1999, z: 4, y: 40 },
    { x: 2001, z: 6, y: 46 },
    { x: 2002, z: 4, y: 50 },
    { x: 2003, z: 5, y: 55 },
    { x: 2004, z: 5, y: 60 },
    { x: 2005, z: 5, y: 65 },
    { x: 2006, z: 10, y: 75 },
  ];
  
  const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
    zAccessor: d => d.z
  };

  const colors = {"Demand":"#0e8ff9", "Supply": "#ff6200"};
  
  
export default function Area({
  width,
  height,
}){
    return (
      <div>
        <XYChart width={width} height={height} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
          <AnimatedAxis orientation="bottom"/>
          <AnimatedAxis orientation="left"/>
          <AnimatedGrid columns={false} numTicks={5} />
          <AnimatedAreaSeries numTicks={10} dataKey="Demand" data={Demand} {...accessors}  fill={"red"} fillOpacity={"0.6"}/>
          <AnimatedAreaSeries  numTicks={10} dataKey="Supply" data={Supply} {...accessors}  fill={"#ff6200"} fillOpacity={"0.8"}/>
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData }) => (
              <div style={{ padding: "4px"}}>
                <div style={{ marginBottom: "8px", color: colors[tooltipData.nearestDatum.key]  ,textDecoration: "underline" }}>
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                {": "}
                {accessors.zAccessor(tooltipData.nearestDatum.datum)}
                <p>Total: {accessors.yAccessor(tooltipData.nearestDatum.datum)}</p>
              </div>
            )}
          />
        </XYChart>
        </div>
    )
}




console.log('appleStock',appleStock)

const width = 750;
const height = 400;

// Bounds
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const x = d => new Date(d.date);
const y = d => d.close;

const xScale = scaleTime({
  range: [0, xMax],
  domain: extent(appleStock, x)
});
const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(appleStock, y)],
});

export const Area2 = () => (
  <div>
    <svg width={width} height={height}>
      <LinearGradient
        from='#fbc2eb'
        to='#a6c1ee'
        id='gradient'
      />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={appleStock}
          x={(d) => xScale(new Date(d.date))}
          y={(d) => yScale(d.close)}
          yScale={yScale}
          fill={"url(#gradient)"}
          stroke={"#333"}
        />
        <AxisLeft
          scale={yScale}
          label={'Close Price ($)'}
          stroke={'#1b1a1e'}
        />
        <AxisBottom
          scale={xScale}
          top={yMax}
          label={'Years'}
          stroke={'#1b1a1e'}
        />
      </Group>
    </svg>
  </div>
)

const supplyX = d => d.x;
const supplyY = d => d.y;

const supplyXScale = scaleLinear({
  range: [0, xMax],
  domain: extent(Supply, supplyX)
});
const supplyYScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(Supply, supplyY)],
});
export const Area3 = () => (
  <div>
    <svg width={width} height={height}>
      <LinearGradient
        from='#fbc2eb'
        to='#a6c1ee'
        id='gradient'
      />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={Supply}
          x={(d) => supplyXScale(d.x)}
          y={(d) => supplyYScale(d.y)}
          yScale={supplyYScale}
          fill={"url(#gradient)"}
          stroke={"#333"}
        />
        <AxisLeft
          scale={supplyYScale}
          label={'Close Price ($)'}
          stroke={'#1b1a1e'}
        />
        <AxisBottom
          scale={supplyXScale}
          top={yMax}
          label={'Years'}
          stroke={'#1b1a1e'}
        />
      </Group>
    </svg>
  </div>
)

 