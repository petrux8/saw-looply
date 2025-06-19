import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PrivateRoute from "./nav/route/PrivateRoute";
import PublicRoute from "./nav/route/PublicRoute";

import MainLayout from "./nav/MainLayout";
import { HabitProvider } from "./context/HabitContext";
import { useFirebaseAuth } from "./context/FirebaseAuthContext";

import AuthPage from "./pages/auth-page/AuthPage";
import HabitsSchedulePage from "./pages/habits-schedule-page/HabitsSchedulePage";
import HabitDetailPage from "./pages/habits-list-page/HabitDetailPage";
import OverallStatsPage from "./pages/overall-page/OverallStatsPage";
import HabitsLibraryPage from "./pages/habits-list-page/HabitsLibraryPage";

function App() {
  const { currentUser } = useFirebaseAuth();

  return (
    <HabitProvider userId={currentUser?.uid}>
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
            <Route index element={<HabitsSchedulePage />} />
            <Route path="habits" element={<HabitsLibraryPage />} />
            <Route path="habits/:id" element={<HabitDetailPage />} />
            <Route path="dashboard" element={<OverallStatsPage />} />
          </Route>
        </Routes>
      </Router>
    </HabitProvider>
  );
}

export default App;
