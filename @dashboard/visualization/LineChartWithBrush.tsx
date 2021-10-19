import React, { useEffect, useState, useMemo } from 'react';
import {
  Pie,
  PieChart,
  BarChart,
  Bar,
  Cell,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Rectangle,
  ComposedChart,
} from 'recharts';
import {
  takeLast, last, map, mapObjIndexed, toPairs, values, range, prop, sort, equals, eqProps, values, reduce,
  groupBy,
} from 'ramda';
import { extent } from 'd3-array';

import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';
import { Box } from '@chakra-ui/react';
import scale, { scaleThreshold } from 'd3-scale';

export const config = () => null;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const d = useObservableState(enginePath, []);
  const ys = sort((a, b) => a - b, map(({ y }) => y, d));
  //   const xMax = Math.max(width - margin.left - margin.right, 0);

  const qunt = useMemo(
    () => scaleThreshold().domain([...takeLast(COLORS.length - 2, ys), 999999]).range(
      ['red', 'white', 'green'],
    ),
    [ys],
  );
  const data = map(
    (c) => reduce((res, { x, y }) => ({ x, y: y + res.y }), { y: 0 }, c),
    values(groupBy(
      ({ x }) => x,
      map(({ x, y }) => ({ x: qunt(y), y }), d),
    )),
  );
  console.log(data);

  const [domain, setDomain] = useState();
  //   useEffect(() => {
  //     setTimeout(() => setDomain(takeLast(10, [...domain, `${Number(last(domain)) + 1}`])), 1000);
  //   }, [domain]);
  return (
    <Box onMouseDown={(e) => e.stopPropagation()} w="100%" h="100%">
      <ResponsiveContainer width={1200} height={350}>
        <PieChart
          onMouseDown={(e) => e.stopPropagation()}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" scale={qunt} />
          <YAxis dataKey="y" /> */}
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="y"
            nameKey="x"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Brush
            data={d}
            dataKey="x"
            height={30}
            stroke="#8884d8"
          >
            <AreaChart
              data={data}
            >
              <Area dataKey="y" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>

          </Brush>
          {/* <Bar dataKey="y" fill="#8884d8" /> */}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
