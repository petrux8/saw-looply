import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
