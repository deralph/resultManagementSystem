import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import ReplyIcon from "@mui/icons-material/Reply";

const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const [value, onChange] = useState(new Date());
  const students = useSelector((state) => state.admin.allStudent);
  const faculties = useSelector((state) => state.admin.allFaculty);
  const admins = useSelector((state) => state.admin.allAdmin);
  const departments = useSelector((state) => state.admin.allDepartment);

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-5">
        {/* Dashboard Header */}
        <div className="flex items-center space-x-2 text-gray-400">
          <HomeIcon />
          <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="space-y-4 overflow-hidden">
          {/* Statistics Grid */}
          <div className="bg-white rounded-xl shadow-lg px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <EngineeringIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Staff</h1>
                <h2 className="text-xl font-bold">{faculties?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <BoyIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Student</h1>
                <h2 className="text-xl font-bold">{students?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <SupervisorAccountIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Admin</h1>
                <h2 className="text-xl font-bold">{admins?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MenuBookIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Department</h1>
                <h2 className="text-xl font-bold">{departments?.length}</h2>
              </div>
            </div>
          </div>

          {/* Calendar & Notices */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-lg p-4 w-full md:w-1/3">
              <Calendar onChange={onChange} value={value} className="w-full" />
            </div>
            {/* Notices */}
            <div className="bg-white rounded-xl shadow-lg pt-3 w-full md:w-2/3 flex flex-col">
              <div className="flex items-center justify-between px-3">
                {open && (
                  <ReplyIcon
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                )}
                <h1 className="font-bold text-xl text-center flex-grow">
                  Notices
                </h1>
              </div>
              <div
                className="mx-5 mt-5 space-y-3 overflow-y-auto"
                style={{ maxHeight: "15rem" }}
              >
                {!open ? (
                  notices?.map((notice, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setOpen(true);
                        setOpenNotice(notice);
                      }}
                      className="cursor-pointer"
                    >
                      <Notice idx={idx} notice={notice} notFor="" />
                    </div>
                  ))
                ) : (
                  <ShowNotice notice={openNotice} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
