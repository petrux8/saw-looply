import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSmallerThanMd = useMediaQuery("(max-width: 767.98px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Topbar onBurgerClick={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          closeSidebar={() => setIsSidebarOpen(false)}
          isSmallerThanMd={isSmallerThanMd}
        />
        <div
          className="flex-grow-1 p-3 bg-light"
          style={{
            padding: "1rem",
            overflowY: "auto",
            marginLeft: isSmallerThanMd ? 0 : "350px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
