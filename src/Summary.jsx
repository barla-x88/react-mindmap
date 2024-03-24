import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const Summary = ({ position = {}, data = [568, 2300, 1200] }) => {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Comments'],
        datasets: [
          {
            label: 'Count',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            ticks: {
              autoSkip: false,
            },
          },
          x: {
            position: 'top',
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div
      className="summary"
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: '200',
        ...position,
      }}
    >
      <canvas ref={ref} id="chart"></canvas>
      <p style={{ textAlign: 'center' }}>* placeholder data</p>
    </div>
  );
};
export default Summary;
