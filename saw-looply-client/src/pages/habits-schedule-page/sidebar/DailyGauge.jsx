import { GaugeContainer, Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function DailyGauge({ percentage }) {
  return (
    <GaugeContainer
      style={{
        width: "80%",
        maxWidth: "300px",
        height: "auto",
        aspectRatio: "1", // Gestito tramite CSS
      }}
    >
      <Gauge
        value={percentage}
        valueMax={100}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
        text={({ value }) => `${Math.round(value)}%\nCurrent Progress`}
        sx={{
          [`& .MuiGauge-valueArc`]: {
            fill: percentage >= 100 ? "#4caf50" : percentage <= 25 ? "#dc3545" : percentage <= 60 ? "#ffc107" : "#1976d2",
          },
          [`& .MuiGauge-referenceArc`]: {
            fill: "#e0e0e0",
          },
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: {
              xs: "0.5rem",
              sm: "0.7rem",
              md: "0.9rem",
            },
            [`& tspan:last-of-type`]: {
              fontSize: {
                xs: "0.2rem",
                sm: "0.3rem",
                md: "0.4rem",
              },
            },
          },
        }}
      />
    </GaugeContainer>
  );
}

export default DailyGauge;
