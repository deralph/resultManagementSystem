import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Control sidebar visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [navigate]);

  return (
    <>
      {/* Hamburger Menu Button (Only visible on mobile) */}
      <button
        className="md:hidden p-3 absolute top-4 left-4 z-50 bg-gray-100 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:flex md:w-1/5`}
      >
        <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-screen p-4">
          <div>
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <HomeIcon />
              <h1 className="font-normal">Dashboard</h1>
            </NavLink>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AssignmentIndIcon />
              <h1 className="font-normal">Profile</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/createNotice"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Create Notice</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/addadmin"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Add Admin</h1>
            </NavLink>
            <NavLink
              to="/admin/deleteadmin"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <DeleteIcon />
              <h1 className="font-normal">Delete Admin</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/adddepartment"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Add Department</h1>
            </NavLink>
            <NavLink
              to="/admin/deletedepartment"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <DeleteIcon />
              <h1 className="font-normal">Delete Department</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/allfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <EngineeringIcon />
              <h1 className="font-normal">Our Staffs</h1>
            </NavLink>
            <NavLink
              to="/admin/addfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Add Staff</h1>
            </NavLink>
            <NavLink
              to="/admin/deletefaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <DeleteIcon />
              <h1 className="font-normal">Delete Staff</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/allstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <BoyIcon />
              <h1 className="font-normal">Our Students</h1>
            </NavLink>
            <NavLink
              to="/admin/addstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Add Students</h1>
            </NavLink>
            <NavLink
              to="/admin/deletestudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <DeleteIcon />
              <h1 className="font-normal">Delete Student</h1>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/allsubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <MenuBookIcon />
              <h1 className="font-normal">Courses</h1>
            </NavLink>
            <NavLink
              to="/admin/addsubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <AddIcon />
              <h1 className="font-normal">Add Courses</h1>
            </NavLink>
            <NavLink
              to="/admin/deletesubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <DeleteIcon />
              <h1 className="font-normal">Delete Courses</h1>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Background overlay (only visible when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
