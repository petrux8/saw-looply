import React from "react";
import { LineChart } from "@mui/x-charts";

export default function Stats({ habit }) {
  console.log(habit.history);

  return (
    <LineChart
      dataset={habit.history}
      xAxis={[{ dataKey: "day" }]}
      series={[
        {
          dataKey: "value",
        },
      ]}
      height={300}
    />
  );
}
