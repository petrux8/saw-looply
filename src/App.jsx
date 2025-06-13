import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";

import MainLayout from "./components/nav/MainLayout";

import AuthPage from "./components/pages/auth-page/AuthPage";
import HabitListPage from "./components/pages/habit-list-page/HabitListPage";
import CreateHabit from "./components/pages/create-habit-page/CreateHabitPage";
import StatsPage from "./components/pages/stats-page/StatsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HabitListPage />} />
          <Route path="create" element={<CreateHabit />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="update/:habitId" element={<CreateHabit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
