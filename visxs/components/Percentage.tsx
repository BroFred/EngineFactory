import React from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeFormat, timeParse } from "d3-time-format";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { LegendOrdinal } from "@visx/legend";

const darkGreen = "#017300";
const green = "#01c88d";
const orange = "#faa93d";
const yellow = "#ffd32e";
const lightYellow = "#ffcd00";
const lightestYellow = "#ffe57c";
const lightGray = "#ccd3de";
const gray = "#d3d3d3";
const darkGray = "#282828";
const background = "#eaedff";
const defaultMargin = { top: 60, right: 0, bottom: 60, left: 280 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 160,
  minHeight: 100,
  backgroundColor: "#4e5271",
  color: "white"
};

const legendStyles = {
  display: "flex",
  minWidth: 230,
  backgroundColor: "white",
  color: "#282828",
  fontSize: 12,
  position: "absolute",
  top: 10,
  left: 5,
  boxShadow: "2px 2px 5px #ccd3de"
};

const data = [
  {
    level: "P7",
    date: "2020-10-01",
    Confirmed: 0,
    Mastered: 80,
    "Gaining skils & understanding": 10,
    Involvement: 0,
    Participation: 3,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 7
  },
  {
    level: "P8",
    date: "2020-10-02",
    Confirmed: 0,
    Mastered: 68,
    "Gaining skils & understanding": 18,
    Involvement: 0,
    Participation: 5,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 9
  },
  {
    level: "1C",
    date: "2020-10-03",
    Confirmed: 0,
    Mastered: 75,
    "Gaining skils & understanding": 8,
    Involvement: 0,
    Participation: 9,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "1B",
    date: "2020-10-04",
    Confirmed: 0,
    Mastered: 52,
    "Gaining skils & understanding": 20,
    Involvement: 0,
    Participation: 10,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "1A",
    date: "2020-10-05",
    Confirmed: 0,
    Mastered: 58,
    "Gaining skils & understanding": 10,
    Involvement: 0,
    Participation: 3,
    Engagement: "0",
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "2C",
    date: "2020-10-06",
    Confirmed: 0,
    Mastered: 60,
    "Gaining skils & understanding": 10,
    Involvement: 0,
    Participation: 15,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "2B",
    date: "2020-10-07",
    Confirmed: 0,
    Mastered: 40,
    "Gaining skils & understanding": 4,
    Involvement: 0,
    Participation: 16,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "2A",
    date: "2020-10-08",
    Confirmed: 5,
    Mastered: 46,
    "Gaining skils & understanding": 6,
    Involvement: 0,
    Participation: 10,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "3",
    date: "2020-10-09",
    Confirmed: 5,
    Mastered: 40,
    "Gaining skils & understanding": 6,
    Involvement: 0,
    Participation: 6,
    Engagement: 0,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  },
  {
    level: "4",
    date: "2020-10-10",
    Confirmed: 5,
    Mastered: 30,
    "Gaining skils & understanding": 10,
    Involvement: 0,
    Participation: 20,
    Engagement: 5,
    "Attention & response": 5,
    Awareness: 0,
    Encounter: 10,
    "Not applicable": 8
  },
  {
    level: "5",
    date: "2020-10-11",
    Confirmed: 5,
    Mastered: 40,
    "Gaining skils & understanding": 10,
    Involvement: 5,
    Participation: 10,
    Engagement: 2,
    "Attention & response": 2,
    Awareness: 2,
    Encounter: 3,
    "Not applicable": 5
  },
  {
    level: "5+",
    date: "2020-10-12",
    Confirmed: 5,
    Mastered: 40,
    "Gaining skils & understanding": 20,
    Involvement: 0,
    Participation: 10,
    Engagement: 10,
    "Attention & response": 0,
    Awareness: 0,
    Encounter: 0,
    "Not applicable": 8
  }
];

const keys = [
  "Confirmed",
  "Mastered",
  "Gaining skils & understanding",
  "Involvement",
  "Participation",
  "Engagement",
  "Attention & response",
  "Awareness",
  "Encounter",
  "Not applicable"
];

const scoreTotals = data.reduce((allTotals, currentLevel) => {
  const totalScore = keys.reduce((scoreTotal, k) => {
    scoreTotal += Number(currentLevel[k]);
    return scoreTotal;
  }, 0);

  allTotals.push(totalScore);
  return allTotals;
}, []);

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%d %b %Y");
const formatDate = (date) => format(parseDate(date));

const getDate = (d) => d.date;
const getLevel = (d) => d.level;

const levelScale = scaleBand({ domain: data.map(getLevel), padding: 0.4 });
const dateScale = scaleBand({ domain: data.map(getDate) });
const scoreScale = scaleLinear({
  domain: [0, Math.max(...scoreTotals)],
  nice: true
});
const colorScale = scaleOrdinal({
  domain: keys,
  range: [
    darkGreen,
    green,
    orange,
    yellow,
    yellow,
    yellow,
    lightYellow,
    lightYellow,
    lightestYellow,
    lightGray
  ]
});
const percentageScale = scaleLinear({
  domain: [0, 100]
});

let tooltipTimeout;

export default function StackedBarChart({
  width,
  height,
  event = false,
  margin = defaultMargin
}) {
  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  // creates the bounds
  const xMin = 0;
  const xMax = width - margin.left - margin.right;
  const yMin = 0;
  const yMax = height - margin.top - margin.bottom;

  // And then scales the graph by our data
  dateScale.rangeRound([xMin, xMax]);
  scoreScale.range([yMax, yMin]);
  levelScale.range([xMin, xMax]);
  percentageScale.rangeRound([yMax, yMin]);

  if (!width || !height) {
    return null;
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={2}
        />

        <Group top={margin.top} left={margin.left}>
          <BarStack
            data={data}
            keys={keys}
            x={getLevel}
            xScale={levelScale}
            yScale={scoreScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    stroke="white"
                    onClick={() => {
                      if (event) alert(`Clicked: ${JSON.stringify(bar)}`);
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={(event) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const top = event.clientY;
                      const left = bar.x + bar.width + 260;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left
                      });
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>

        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={levelScale}
          hideTicks
          stroke={gray}
          strokeWidth={1}
          tickLabelProps={() => ({
            fill: darkGray,
            fontSize: 11,
            textAnchor: "middle"
          })}
        />
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={percentageScale}
          hideTicks
          numTicks={5}
          tickFormat={(percent) => percent + "%"}
          stroke={gray}
          strokeWidth={1}
        />
        <GridRows
          top={margin.top}
          left={margin.left}
          scale={percentageScale}
          width={xMax}
          height={yMax - margin.top - margin.bottom}
          stroke="white"
          strokeOpacity={0.4}
          numTicks={5}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: margin.top / 2 - 18,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: 14
        }}
      >
        <LegendOrdinal
          scale={colorScale}
          style={legendStyles}
          direction="column-reverse"
          shape="circle"
          shapeMargin="10px 6px 10px 16px"
        />
      </div>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {/* <div style={{ color: colorScale(tooltipData.key) }}> */}
          <div className="tooltip-title">
            <strong>{tooltipData.key}</strong>
          </div>
          <div className="tooltip-value">
            {tooltipData.bar.data[tooltipData.key]}% of{" "}
            {tooltipData.bar.data.level}
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}
