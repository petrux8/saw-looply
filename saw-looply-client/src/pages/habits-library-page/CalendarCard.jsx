import * as React from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const StyledDateCalendar = styled(DateCalendar, {
  shouldForwardProp: (prop) => prop !== "isValueSelected",
})(({ theme, isValueSelected }) => ({
  "&.MuiDateCalendar-root": {
    margin: "5px",
    width: "90vw",
    maxWidth: "800px",
    minWidth: "350px",
    height: "auto",
    minHeight: "400px",
    "& .MuiPickersDay-root.Mui-selected": {
      backgroundColor: isValueSelected ? theme.palette.primary.main : "white",
      color: isValueSelected ? "white" : "black",
    },

    [theme.breakpoints.up("sm")]: {
      width: "70vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "600px",
    },

    "& .MuiPickersCalendarHeader-root": {
      width: "auto",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "4rem",
    },

    "& .MuiDayCalendar-weekDayLabel": {
      fontSize: "1rem",
      width: "46px",
      height: "46px",
      lineHeight: "46px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "36px",
        height: "36px",
        lineHeight: "36px",
        fontSize: "0.85rem",
      },
    },
    "& .MuiDayCalendar-slideTransition": {
      minHeight: "500px",
    },
    "& .MuiPickersDay-root": {
      height: "50px",
      width: "50px",
      fontSize: "1rem",
      [theme.breakpoints.down("sm")]: {
        height: "40px",
        width: "40px",
        fontSize: "0.85rem",
      },
    },
  },
}));

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" &&
    prop !== "isLast" &&
    prop !== "isFirst" &&
    prop !== "isFuture",
})(({ theme, isSelected, isLast, isFirst, isFuture }) => ({
  borderRadius: 0,
  background: "white",
  ...(isFuture && {
    color: theme.palette.text.disabled,
  }),
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
  const { day, selectedDays, ...other } = props;
  const dayString = day.format("YYYY-MM-DD");

  const isFirst = !selectedDays.includes(
    dayjs(day).subtract(1, "day").format("YYYY-MM-DD")
  );
  const isLast = !selectedDays.includes(
    dayjs(day).add(1, "day").format("YYYY-MM-DD")
  );

  const isFuture = dayjs(day).isAfter(dayjs());

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      isSelected={selectedDays.includes(dayString)}
      isLast={isFirst}
      isFirst={isLast}
      isFuture={isFuture}
    />
  );
}

const CalendarCard = ({
  selectedDays,
  startDate,
  setStartDate,
}) => {
  const handleMonthChange = (newMonth) => {
    setStartDate(dayjs(newMonth).startOf("month"));
  };

  const isValueSelected = selectedDays.includes(startDate.format("YYYY-MM-DD"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDateCalendar
        disableHighlightToday
        value={startDate}
        isValueSelected={isValueSelected}
        sx={{
          "& .MuiPickersDay-root": {
            pointerEvents: "none",
            cursor: "default",
          },
        }}
        onMonthChange={handleMonthChange}
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDays: selectedDays,
          }),
        }}
      />
    </LocalizationProvider>
  );
}

export default CalendarCard;