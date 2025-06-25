import React, { useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

const CustomPickersDay = (props) => {
  const { day, selected, outsideCurrentMonth, ...other } = props;

  const isDisabled = dayjs(day).isAfter(dayjs());


  return (
    <PickersDay
      {...other}
      day={day}
      selected={selected}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={{
        ...(isDisabled && {
          color: "gray",
          pointerEvents: "none",
        }),
      }}
    />
  );
}


const MyDateCalendar = ({ currentDate, setCurrentDate }) => {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  const dayjsDate = useMemo(() => {
    return dayjs(currentDate);
  }, [currentDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjsDate}
        onChange={(newValue) => setCurrentDate(dayjs(newValue))}
        slots={{
          day: CustomPickersDay,
        }}
      />
    </LocalizationProvider>
  );
}

export default MyDateCalendar;
