import React from "react";
import Bar, { TransposedBar } from "./components/Bar";
import { BarGrouped, BarStacked } from "./components/BarGroup";
import Line,{ZoomLine} from "./components/Line";
import Area,{Area2, Area3} from "./components/Area";
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
  { name: "Bar chart", component: Bar, key: "xyBar" },
  { name: "Grouped Bars", component: BarGrouped, key: "groupBar" },
  { name: "Stacked Bars", component: BarStacked, key: "stackBar" },
  { name: "TransposedBar chart", component: TransposedBar, key: "transposedBar" },
  { name: "Line chart", component: Line, key: "line" },
  { name: "Zoom Line", component: ZoomLine, key: "Zoom Line" },
  { name: "Area chart", component: Area, key: "area" },
  { name: "Area2 chart", component: Area2, key: "area2" },
  { name: "Area3 chart", component: Area3, key: "area3" },
  { name: "Percentage chart", component: Percentage, key: "Percentage" },

];

const Visx = () => {
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