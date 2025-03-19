import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/facultylogin");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center mb-2 md:mb-0">
        <img
          src="https://www.freeiconspng.com/thumbs/results-icon-png/results-icon-png-7.png"
          alt="Logo"
          className="h-7"
        />
        <h1 className="font-bold text-blue-600 text-sm ml-2">SRMS</h1>
      </div>

      {/* Title */}
      <h1 className="font-semibold text-black text-center">Welcome</h1>

      {/* User Info & Logout */}
      <div className="flex items-center space-x-2 mt-2 md:mt-0">
        <Avatar
          src={user?.result?.avatar}
          alt={user?.result?.name.charAt(0)}
          sx={{ width: 24, height: 24 }}
          className="border-blue-600 border-2"
        />
        <h1 className="text-sm">{user?.result?.name.split(" ")[0]}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
  );
};

export default Header;
