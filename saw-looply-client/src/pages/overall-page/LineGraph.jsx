import React from "react";
import ReactApexChart from "react-apexcharts";

function LineGraph({ data = [], type }) {
  const maxValue = Math.max(...data[0].data.map((d) => d.y)) || 1;

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "Habit Completion Trends",
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: type === "month" ? "dd MMM" : "MMM",
      },
    },
    yaxis: {
      title: {
        text: "Completed Habits",
      },
      labels: {
        formatter: (value) => Math.floor(value),
      },
      min: 0,
      max: maxValue < 5 ? 5 : maxValue,
      tickAmount: maxValue < 5 ? maxValue + 1 : 5,
    },
  };

  const series = data;

  return <ReactApexChart options={options} series={series} type="line" />;
}

export default LineGraph;
