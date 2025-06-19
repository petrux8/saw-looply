import * as React from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useState } from "react";

const selectedDays = ["2025-06-19", "2025-06-20", "2025-06-21", "2025-06-22"];

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" && prop !== "isLast" && prop !== "isFirst",
})(({ theme, isSelected, isLast, isFirst }) => ({
  "&:hover": {
    backgroundColor: "inherit", // Disabilita l'hover
  },
  "&:focus": {
    backgroundColor: "inherit", // Disabilita il focus
  },
  "&:active": {
    backgroundColor: "inherit", // Disabilita il colore di attivazione
  },
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }),
  ...(isSelected &&
    isLast && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
  ...(isSelected &&
    isFirst && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
}));

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;
  const dayString = day.format("YYYY-MM-DD");

  const isFirst = !selectedDays.includes(
    dayjs(day).subtract(1, "day").format("YYYY-MM-DD")
  );
  const isLast = !selectedDays.includes(
    dayjs(day).add(1, "day").format("YYYY-MM-DD")
  );

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      isSelected={selectedDays.includes(dayString)}
      isLast={isFirst}
      isFirst={isLast}
    />
  );
}

export default function WeekPicker() {
  const [value] = useState(dayjs());

  const handleMonthChange = (newMonth) => {
    console.log("Mese cambiato a:", newMonth.format("YYYY-MM"));
    // Qui potresti ricaricare le date completate per il nuovo mese
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          "& .MuiPickersDay-root": {
            pointerEvents: "none",
            cursor: "default",
          },
        }}
        value={value}
        onMonthChange={handleMonthChange}
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
          }),
        }}
      />
    </LocalizationProvider>
  );
}
