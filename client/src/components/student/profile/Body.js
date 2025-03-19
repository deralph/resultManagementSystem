import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import Data from "./Data";

const Body = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage safely
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fallback if user data is not available
  if (!user?.result) {
    return <div>User data not found</div>;
  }

  // Destructure properties from user.result for clarity
  const {
    avatar,
    name,
    email,
    username,
    department,
    fatherName,
    motherName,
    dob,
    year,
    contactNumber,
    section,
    fatherContactNumber,
    batch,
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
            onClick={() => navigate("/student/update")}
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
          {/* Scrollable Details Container */}
          <div className="overflow-y-scroll md:h-[27rem] h-auto">
            <div className="flex flex-col md:flex-row py-10 ml-10 space-y-10 md:space-y-0 md:space-x-40">
              <div className="flex flex-col space-y-10">
                <Data label="Name" value={name} />
                <Data label="Email" value={email} />
                <Data label="Username" value={username} />
                <Data label="Department" value={department} />
                <Data label="Father's Name" value={fatherName} />
                <Data label="Mother's Name" value={motherName} />
              </div>
              <div className="flex flex-col space-y-10">
                <Data label="DOB" value={dob} />
                <Data label="Year" value={year} />
                <Data label="Contact Number" value={contactNumber} />
                <Data label="Section" value={section} />
                <Data
                  label="Father's Contact Number"
                  value={fatherContactNumber}
                />
                <Data label="Batch" value={batch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
