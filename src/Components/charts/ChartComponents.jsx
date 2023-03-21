// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const ChartComponent = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const myChartRef = chartRef.current.getContext("2d");
//     new Chart(myChartRef, {
//       type: "bar",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         datasets: [
//           {
//             label: "Sales",
//             data: [20, 40, 60, 80, 100, 120],
//             backgroundColor: "#0084FF",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });
//   }, []);

//   return <canvas ref={chartRef} />;
// };

// export default ChartComponent;

import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [20, 40, 60, 80, 100, 120],
              borderColor: "#0084FF",
              backgroundColor: "transparent",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartRef]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
