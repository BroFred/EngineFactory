// import React from 'react'
// import { AxisLeft, AxisBottom } from '@visx/axis' 
// import { scaleLinear, scaleTime } from '@visx/scale' 
// import { extent, max } from 'd3-array'
// import {  LinePath, Bar } from '@visx/shape'
// import { curveBasis } from '@visx/curve'

// const data = [
//   { date: new Date(2017, 3, 1), value: 1 },
//   { date: new Date(2017, 4, 1), value: 2 },
//   { date: new Date(2017, 5, 1), value: 6 },
//   { date: new Date(2017, 6, 1), value: 3 },
//   { date: new Date(2017, 7, 1), value: 1 },
//   { date: new Date(2017, 8, 1), value: 5 },
// ]

// const data2 = [
//   { date: new Date(2017, 3, 1), value: 4 },
//   { date: new Date(2017, 4, 1), value: 4 },
//   { date: new Date(2017, 5, 1), value: 0 },
//   { date: new Date(2017, 6, 1), value: 1.5 },
//   { date: new Date(2017, 7, 1), value: 2 },
//   { date: new Date(2017, 8, 1), value: 1 },
// ]

// const series = [data, data2]


// const xMax = 300
// const yMax = 500

// const xScale = scaleTime({ 
//   domain: extent(data, (x)=>x), 
//   range: [0, xMax] 
// })
// const yScale = scaleLinear({ 
//   domain: [0, max(data, (y)=>y)], 
//   range: [yMax, 0] 
// })

// const x = d => d.date
// const y = d => d.value

// const colors = ['rgb(107, 157, 255)', 'rgb(252, 137, 159)']

  
//   const Line = () => {
//       return (
//         <svg width={300} height={500}> 
//           {series.map((seriesData, i) => (
//               <LinePath
//                 key={i}
//                 data-index={i}
//                 data={seriesData}
//                 xScale={xScale}
//                 yScale={yScale}
//                 x={x}
//                 y={y}
//                 curve={curveBasis}
//                 stroke={colors[i]}
//                 strokeLinecap="round"
//               />
//             ))}
//         </svg> 
//       )
//     }

//   export default Line

import React from "react";
import data from "./input";
import { scaleLinear } from "@visx/scale";
import { Circle, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { curveNatural } from "@visx/curve";
import { spring, Motion } from "react-motion";

const split = data.split("\n").filter((el) => {
  return el !== "";
});

const move = (data, moves) => {
  const lineLength = data[0].length;
  const rowCount = data.length;

  let treeCount = 0;
  let index = 0;
  let lineIndex = 0;
  let points = [];

  data.forEach((row, colIndex) => {
    //if the x coordinate matches the move, return a point
    if (colIndex % moves[1] !== 0) return;
    else points.push({ x: lineIndex, y: colIndex });
    if (row[index] === "#") treeCount++;
    index = (index + moves[0]) % lineLength;
    lineIndex = lineIndex + moves[0];
    //add the point after moving along the y axis
    points.push({ x: lineIndex, y: colIndex });
  });
  return { length: lineLength, count: treeCount, linePoints: points, rowCount };
};

const genTrees = (data, gridCols, lineLength) => {
  let points = [];
  data.forEach((row, yIndex) => {
    Array.from(row).forEach((col, xIndex) => {
      if (col === "#") {
        for (let i = 0; i < gridCols; i++) {
          points.push({ x: xIndex + i * lineLength, y: yIndex });
        }
      }
    });
  });
  return points;
};

const moves = [
  [1, 1, "#ff5733"],
  [3, 1, "#af33ff"],
  [5, 1, "#f10000"],
  [7, 1, "#f1cc00"],
  [1, 2, "#003af1"]
];

export default function Test() {
  const { length, linePoints, rowCount } = move(split, moves[1]);
  let gridCols = 0;

  //find the number of columns of trees we need
  for (let i = 0; i < rowCount; i++) {
    if (i * length > linePoints[linePoints.length - 1].x) {
      gridCols = i + 1;
      break;
    }
  }
  const width = 600;
  const height = 300;
  const xScale = scaleLinear({
    domain: [0, linePoints[linePoints.length - 1].x],
    range: [0, width]
  });
  const yScale = scaleLinear({
    domain: [linePoints[linePoints.length - 1].x, 0],
    range: [height, 0]
  });

  const points = genTrees(split, gridCols, length, rowCount);

  return (
    <>
      <svg width={width} height={height}>
        <Group top={20} left={20}>
          {moves.map((newMove, index) => {
            const { linePoints: newLinePoints } = move(split, newMove);
            return (
              <>
                <Motion
                  defaultStyle={{ strokeDashoffset: 100000 }}
                  style={{
                    strokeDashoffset: spring(0, { stiffness: 0.1 })
                  }}
                >
                  {(style) => (
                    <LinePath
                      key={"line-" + index}
                      curve={curveNatural}
                      data={newLinePoints}
                      x={(d) => xScale(d.x)}
                      y={(d) => yScale(d.y)}
                      stroke={newMove[2]}
                      strokeDasharray={100000}
                      strokeDashoffset={style.strokeDashoffset}
                      strokeWidth={2}
                    />
                  )}
                </Motion>
              </>
            );
          })}
        </Group>
      </svg>
    </>
  );
}

