import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./nav/route/PrivateRoute";
import PublicRoute from "./nav/route/PublicRoute";

import MainLayout from "./nav/MainLayout";
import { HabitProvider } from "./context/HabitContext";
import { useFirebaseAuth } from "./context/FirebaseAuthContext";

import LoginPage from "./pages/login-page/LoginPage";
import HabitsSchedulePage from "./pages/habits-schedule-page/HabitsSchedulePage";
import OverallStatsPage from "./pages/overall-page/OverallStatsPage";
import HabitsLibraryPage from "./pages/habits-library-page/HabitsLibraryPage";
import HabitStatisticsPage from "./pages/habits-library-page/HabitStatisticsPage";

function App() {
  const { currentUser } = useFirebaseAuth();

  return (
    <HabitProvider userId={currentUser?.uid}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
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
            <Route index element={<HabitsSchedulePage />} />
            <Route path="habits" element={<HabitsLibraryPage />} />
            <Route path="habits/:id" element={<HabitStatisticsPage />} />
            <Route path="dashboard" element={<OverallStatsPage />} />
          </Route>
        </Routes>
      </Router>
    </HabitProvider>
  );
}

export default App;
