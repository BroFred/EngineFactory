import React, {
  useEffect, useRef, useMemo,
} from 'react';
import { useAtomValue } from 'jotai/utils';
import { useObservableState } from 'observable-hooks';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

export const config = () => null;

export const Edit = ({ dataAtoms, options, setConfig }) => {
  const { enginePath } = useAtomValue(dataAtoms[0]);
  const data = useObservableState(enginePath, []);
  const chart = useRef();
  const ref = useRef();

  const config1 = useMemo(() => ({
    type: 'line',
    data: {
      datasets: [{
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        radius: 0,
        data: [{ x: new Date(Date.now()).toISOString(), y: Math.random() * 100 }],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'second',
          },
        },
      },
    },
  }), []);

  useEffect(() => {
    if (ref.current && !chart.current) {
      chart.current = new Chart(ref.current, config1);
    }
    return () => {
      if (chart.current) {
        if (data) {
          if (chart.current.data.datasets[0].data.length > 10) {
            chart.current.data.datasets[0].data.shift();
          }

          chart.current.data.datasets[0].data.push(data);
        }
        chart.current.update();
      }
    };
  }, [data]);
  return <canvas style={{ position: 'relative' }} ref={ref} />;
};
