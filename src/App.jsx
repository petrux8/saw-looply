import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import HabitListPage from "./components/pages/HabitListPage";
import CreateHabit from "./components/pages/CreateHabitPage";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";
import MainLayout from "./components/nav/MainLayout";
import StatsPage from "./components/pages/StatsPage";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
