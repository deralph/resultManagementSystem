import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import Data from "./Data";

const Body = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage and safely parse it.
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If user data isn't available, render a fallback.
  if (!user?.result) {
    return <div>User data not found</div>;
  }

  // Destructure the necessary properties from user.result.
  const {
    avatar,
    name,
    email,
    username,
    department,
    dob,
    joiningYear,
    contactNumber,
  } = user.result;

  return (
    <div className="flex-grow mt-3">
      <div className="space-y-5">
        {/* Header Section */}
        <div className="flex items-center justify-between mr-8">
          <div className="flex items-center space-x-2 text-gray-400">
            <AssignmentIndIcon />
            <h1>Profile</h1>
          </div>
          <div
            onClick={() => navigate("/admin/update")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <SecurityUpdateIcon />
            <h1 className="font-bold">Update</h1>
          </div>
        </div>
        {/* Profile Details Section */}
        <div className="w-[98%] bg-white relative rounded-xl p-5">
          {/* Centered Avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
            <Avatar src={avatar} sx={{ width: 70, height: 70 }} />
          </div>
          {/* Data Section: Stacks vertically on mobile and horizontally on medium+ screens */}
          <div className="flex flex-col md:flex-row py-10 ml-10 space-y-10 md:space-y-0 md:space-x-40">
            <div className="flex flex-col space-y-10">
              <Data label="Name" value={name} />
              <Data label="Email" value={email} />
              <Data label="Username" value={username} />
              <Data label="Department" value={department} />
            </div>
            <div className="flex flex-col space-y-10">
              <Data label="DOB" value={dob} />
              <Data label="Joining Year" value={joiningYear} />
              <Data label="Contact Number" value={contactNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
