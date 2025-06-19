import { useParams } from "react-router-dom";
import { useHabitById } from "../../hook/useHabitById";
import CalendarCard from "./CalendarCard";

const HabitDetailPage = () => {
  const { id } = useParams();
  const { habit } = useHabitById({ id });

  return (
    <div>
      {habit.name}
      <CalendarCard />
    </div>
  );
};

export default HabitDetailPage;
