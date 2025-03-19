import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import ShowNotice from "../notices/ShowNotice";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import Notice from "../notices/Notice";

const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const testResult = useSelector((state) => state.student.testResult.result);
  const attendance = useSelector((state) => state.student.attendance.result);
  const user = JSON.parse(localStorage.getItem("user"));
  const subjects = useSelector((state) => state.admin.subjects.result);
  let totalAttendance = 0;
  attendance?.forEach((att) => (totalAttendance += att.attended));
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {/* Statistics Cards */}
          <div className="bg-white rounded-xl shadow-lg px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <EngineeringIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm md:text-base">Subjects</h1>
                <h2 className="text-xl md:text-2xl font-bold">
                  {subjects?.length}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <BoyIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm md:text-base">Test</h1>
                <h2 className="text-xl md:text-2xl font-bold">
                  {testResult?.length}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <SupervisorAccountIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm md:text-base">Attendance</h1>
                <h2 className="text-xl md:text-2xl font-bold">
                  {totalAttendance}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MenuBookIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm md:text-base">Year</h1>
                <h2 className="text-xl md:text-2xl font-bold">
                  {user?.result?.year}
                </h2>
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
                      <Notice idx={idx} notice={notice} notFor="faculty" />
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
