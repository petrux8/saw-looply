import React from "react";
import { ChartsReferenceLine, LineChart } from "@mui/x-charts";
import { dateToDayOfWeek } from "../../../util/parseDate";

export default function MyLineChart({ year, month, habit }) {
  const getDaysData = (year, month) => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      if (!habit.days)
        return {
          day: i + 1,
          value: habit.history[i + 1] ? +habit.history[i + 1] : 0,
        };
        else if(habit.days.includes(dateToDayOfWeek(year, month, i + 1))){
          return{
            day: i + 1,
            value : habit.history[i + 1] ? +habit.history[i + 1] : 0
          }
        }
    }).filter(Boolean);
  };

  console.log(habit.name + " " + habit.target);

  const data = getDaysData(year, month);
  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "day", min: 1, max: 31 }]}
      yAxis={[{ dataKey: "value", labelWidth: 50 }]}
      series={[
        {
          dataKey: "value",
          curve: "linear",
        },
      ]}
      height={300}
    >
      {habit.type === "quantitative" && (
        <ChartsReferenceLine
          y={habit.target}
          label="Target"
          lineStyle={{ stroke: "red", strokeDasharray: "5 5" }}
        />
      )}
    </LineChart>
  );
}
