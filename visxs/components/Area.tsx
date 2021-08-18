import React from 'react';
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedAreaSeries,
    XYChart,
    Tooltip,
  } from '@visx/xychart';

  const Demand = [
    { x: "Jan'21", z: 10, y: 10 },
    { x: "Feb'21", z: 13, y: 23 },
    { x: "Mar'21", z: 4, y: 27 },
    { x: "Apr'21", z: 5, y: 32 },
    { x: "May'21", z: 8, y: 40 },
    { x: "Jun'21", z: 5, y: 45 },
    { x: "Jul'21", z: 5, y: 50 },
    { x: "Aug'21", z: 5, y: 55 },
    { x: "Sep'21", z: 10, y: 65 },
    { x: "Oct'21", z: 10, y: 75 },
    { x: "Nov'21", z: 10, y: 85 },
    { x: "Dec'21", z: 15, y:100 },
  ];
  
  const Supply = [
    { x: "Jan'21", z: 10, y: 10 },
    { x: "Feb'21", z: 8, y: 18 },
    { x: "Mar'21", z: 6, y: 24 },
    { x: "Apr'21", z: 6, y: 30 },
    { x: "May'21", z: 6, y: 36 },
    { x: "Jun'21", z: 4, y: 40 },
    { x: "Jul'21", z: 6, y: 46 },
    { x: "Aug'21", z: 4, y: 50 },
    { x: "Sep'21", z: 5, y: 55 },
    { x: "Oct'21", z: 5, y: 60 },
    { x: "Nov'21", z: 5, y: 65 },
    { x: "Dec'21", z: 10, y: 75 },
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
          <AnimatedGrid columns={false} numTicks={4} />
          <AnimatedAreaSeries dataKey="Demand" data={Demand} {...accessors} stroke={"#0e8ff9"} fill={"#0e8ff9"} fillOpacity={"0.6"}/>
          <AnimatedAreaSeries dataKey="Supply" data={Supply} {...accessors} stroke={"#ff6200"} fill={"#ff6200"} fillOpacity={"0.8"}/>
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

 