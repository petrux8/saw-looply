import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSmallerThanLg = useMediaQuery("(max-width: 991.98px)");

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
          isSmallerThanLg={isSmallerThanLg}
        />
        <div
          className="flex-grow-1 p-3 bg-light"
          style={{
            padding: "1rem",
            overflowY: "auto",
            marginLeft: isSmallerThanLg ? 0 : "350px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
