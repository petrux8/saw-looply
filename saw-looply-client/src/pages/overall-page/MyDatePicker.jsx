import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function MyDatePicker({
  type = "year",
  currentDate = dayjs(),
  setCurrentDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {type == "year" ? (
        <DatePicker
          value={currentDate}
          label={"Select year"}
          views={["year"]}
          onChange={(newValue) => {
            if (newValue) {
              setCurrentDate(newValue.startOf("year"));
            }
          }}
        />
      ) : (
        <DatePicker
          value={currentDate}
          label={"Select month"}
          views={["month", "year"]}
          onChange={(newValue) => {
            if (newValue) {
              setCurrentDate(newValue.startOf("month"));
            }
          }}
        />
      )}
    </LocalizationProvider>
  );
}
