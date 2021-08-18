import React,{ useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';


const coins = [
  {
    symbol: 'ADA',
    amount: 200,
    color: '#0033ad',
    inUSD: 1.48,
  },
  {
    symbol: 'SOL',
    amount: 5,
    color: '#00ffbd',
    inUSD: 37.6,
  },
  {
    symbol: 'BTC',
    amount: 0.005,
    color: '#f7931a',
    inUSD: 37363,
  },
];

export default function PieChart({
  width=100,
  height=100,
  data=coins
}) {
  const [active, setActive] = useState(null);
  const half = Math.min(width,height) / 2;
  return (
      <svg width={width} height={height+50}>
        <Group top={half} left={half}>
          <Pie
            data={data}
            pieValue={(v) => v.amount * v.inUSD}
            outerRadius={half}
            innerRadius={100}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          {active && data.length ? (
            <>
              <Text
                textAnchor='middle'
                fill={active.color}
                fontSize={40}
                dy={-20}
              >
                {`$${Math.floor(active.amount * active.inUSD)}`}
              </Text>
              <Text
                textAnchor='middle'
                fill={active.color}
                fontSize={20}
                dy={20}
              >
                {`${active.amount} ${active.symbol}`}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor='middle' fill='#aaa' fontSize={40} dy={20}>
                {`$${Math.floor(
                  data.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                )}`}
              </Text>
            </>
          )}
        </Group>
      </svg>
  );
}


export  function PieCircle() {
    const [active, setActive] = useState(null);
    const width = 400;
    const half = width / 2;
  
    return (
      <main>
        <svg width={width} height={width}>
          <Group top={half} left={half}>
            <Pie
              data={coins}
              pieValue={(data) => data.amount * data.inUSD}
              outerRadius={half}
              innerRadius={({ data }) => {
                const size = active && active.symbol == data.symbol ? 12 : 8;
                return half - size;
              }}
              padAngle={0.01}
            >
              {(pie) => {
                return pie.arcs.map((arc) => {
                  return (
                    <g
                      key={arc.data.symbol}
                      onMouseEnter={() => setActive(arc.data)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <path d={pie.path(arc)} fill={arc.data.color}></path>
                    </g>
                  );
                });
              }}
            </Pie>
  
            {active ? (
              <>
                <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                  {`$${Math.floor(active.amount * active.inUSD)}`}
                </Text>
  
                <Text
                  textAnchor="middle"
                  fill={active.color}
                  fontSize={20}
                  dy={20}
                >
                  {`${active.amount} ${active.symbol}`}
                </Text>
              </>
            ) : (
              <>
                <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                  {`$${Math.floor(
                    coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                  )}`}
                </Text>
  
                <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                  {`${coins.length} Assets`}
                </Text>
              </>
            )}
          </Group>
        </svg>
      </main>
    );
  }