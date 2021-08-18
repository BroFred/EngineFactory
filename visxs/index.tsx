import React, { useState, useEffect, useRef } from "react";
import Bar, { TransposedBar } from "./components/Bar";
import { BarGrouped, BarStacked } from "./components/BarGroup";
import Line,{ZoomLine} from "./components/Line";
import Area from "./components/Area";
import Pie from "./components/Pie";
import Percentage from "./components/Percentage";

interface IChartEntry {
  name: string;
  key: string;
  component: React.FunctionComponent<ChartProps>;
}

interface ChartProps {
  height: number;
  width: number;
}

const CHARTS: IChartEntry[] = [
  { name: "Pie chart", component: Pie, key: "pie" },
  { name: "Percentage chart", component: Percentage, key: "Percentage" },
  { name: "Bar chart", component: Bar, key: "xyBar" },
  { name: "Grouped Bars", component: BarGrouped, key: "groupBar" },
  { name: "Stacked Bars", component: BarStacked, key: "stackBar" },
  { name: "TransposedBar chart", component: TransposedBar, key: "transposedBar" },
  { name: "Line chart", component: Line, key: "line" },
  { name: "Zoom Line", component: ZoomLine, key: "Zoom Line" },
  { name: "Area chart", component: Area, key: "area" },
];

const Visx = () => {
  const [chart, setChart] = useState<string>("xyBar");
  const selectedChart = CHARTS.find((c) => c.key === chart);
    return (
      <div>
        <h1>Visx POC</h1>
        {
          CHARTS.map(v=>(
            <div key={v.key}>
              <h2>{v.name}</h2>
              <v.component width={800} height={500}/>
            </div>
          ))
        }
        
      </div>
    );
  };

  export default  Visx