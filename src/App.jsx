import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import HabitList from "./components/pages/HabitList";
import CreateHabit from "./components/pages/CreateHabitPage";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";
import Navbar from "./components/Navbar";
import NavbarLayout from "./components/page layout/NavbarLayout";

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
              <NavbarLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HabitList />} />
          <Route path="create" element={<CreateHabit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
