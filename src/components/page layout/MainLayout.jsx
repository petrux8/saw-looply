import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
