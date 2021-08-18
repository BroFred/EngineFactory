import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedLineSeries,
    XYChart,
    Tooltip,
  } from '@visx/xychart';

import React from "react";
import { ParentSize } from '@visx/responsive';
import {
    ProvidedZoom,
    TransformMatrix,
  } from '@visx/zoom/lib/types';
import { Zoom } from '@visx/zoom';


  
  const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
  ];
  
  const data2 = [
    { x: '2020-01-01', y: 10 },
    { x: '2020-01-02', y: 50 },
    { x: '2020-01-03', y: 80 },
  ];

  const data3 = [
    { x: '2020-01-01', y: 60 },
    { x: '2020-01-02', y: 100 },
    { x: '2020-01-03', y: 20 },
  ];

  const data4 = [
    { x: '01', y: 30 },
    { x: '02', y: 100 },
    { x: '03', y: 50 },
    { x: '04', y: 90 },
    { x: '05', y: 200 },
    { x: '06', y: 130 },
    { x: '07', y: 250 },
    { x: '08', y: 300 },
    { x: '09', y: 100 },
    { x: '10', y: 600 },
  ];

  const data5 = [
    { x: '01', y: 10 },
    { x: '02', y: 500 },
    { x: '03', y: 90 },
    { x: '04', y: 90 },
    { x: '05', y: 100 },
    { x: '06', y: 30 },
    { x: '07', y: 550 },
    { x: '08', y: 100 },
    { x: '09', y: 70 },
    { x: '10', y: 100 },
  ];

  const datas = [data4,data5]
  
  const accessors = {
    xAccessor: (d:any) => d.x,
    yAccessor: (d:any) => d.y,
  };

  type ZoomState = {
    initialTransformMatrix: TransformMatrix;
    transformMatrix: TransformMatrix;
    isDragging: boolean;
  };
  
  type ViewSize = {
    height: number,
    width: number,
  }
  
  interface ZoomControlProps {
    children: (size: ViewSize, zoom: ProvidedZoom & ZoomState) => React.ReactNode;
    transformMatrix: TransformMatrix;
  }

  const ZoomControl = (props: ZoomControlProps)=> {
    return (
      <ParentSize>
        { size => {
          return (
            <div>
              <Zoom
                width={size.width}
                height={size.height}
                scaleXMin={1 / 2}
                scaleXMax={4}
                scaleYMin={1 / 2}
                scaleYMax={4}
                transformMatrix={props.transformMatrix}>
                {(zoom) => props.children(size, zoom)}
              </Zoom>
            </div>);
        }}
      </ParentSize>
    );
  }
  
  const Line = ({
    width,
    height,
    data=datas,
  }) => {
      return (
        <XYChart
          width={width}
          height={height} 
          xScale={{
            type: 'band',
          }} 
          yScale={{ 
            type: 'linear',
          }}>
          <AnimatedAxis orientation="left"  label="value" />
          <AnimatedAxis orientation="bottom"  label="label" />
          {
            data.map((v,i)=>
              <AnimatedLineSeries dataKey={i} data={v} {...accessors} />
            )
          }
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({tooltipData}) => (
              <p>{
                `value: ${tooltipData?.nearestDatum.datum.y}`
              }</p>
            )}
          />
        </XYChart>
      )
    }

  export default Line

  export const ZoomLine = () => {
    const initialTransform = {
        scaleX: 1.0,
        scaleY: 1.0,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
      };
      return (
      <ZoomControl transformMatrix={initialTransform}>
        {(size,zoom)=>{
          return (
            <XYChart 
              height={300} 
              xScale={{
                type: 'band',
                range: [zoom.transformMatrix.translateX,
                zoom.transformMatrix.translateX + size.width * zoom.transformMatrix.scaleX]
              }} 
              yScale={{ 
                type: 'linear',
              }}>
              <AnimatedAxis orientation="bottom" numTicks={3} label="foobar" />
              <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
              <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
              <AnimatedLineSeries dataKey="Line 3" data={data3} {...accessors} />
              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                renderTooltip={({tooltipData}) => (
                  <p>{
                    `value: ${tooltipData?.nearestDatum.datum.y}`
                  }</p>
                )}
              />
            </XYChart>
          )
        }}
      </ZoomControl>
      )
    }
