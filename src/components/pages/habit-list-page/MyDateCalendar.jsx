import React, { useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { parseISODateAsLocal } from "../../../util/parseDate";

export default function MyDateCalendar({currentDate, setCurrentDate}) {
  const dayjsDate = useMemo (() => {
    return dayjs(currentDate);
  }, [currentDate])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={dayjsDate} onChange={(newValue) => setCurrentDate(parseISODateAsLocal(newValue.toISOString().split('T')[0]))}/>
    </LocalizationProvider>
  );
}
