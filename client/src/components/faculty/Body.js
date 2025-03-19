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
import ReplyIcon from "@mui/icons-material/Reply";
import ShowNotice from "../notices/ShowNotice";

const Body = () => {
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-5">
        {/* Dashboard Header */}
        <div className="flex items-center space-x-2 text-gray-400">
          <HomeIcon />
          <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Statistics & Main Content */}
        <div className="space-y-4 overflow-y-auto">
          {/* Statistics Grid */}
          <div className="bg-white rounded-xl shadow-lg px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <EngineeringIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Class</h1>
                <h2 className="text-xl font-bold">12</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <BoyIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Student</h1>
                <h2 className="text-xl font-bold">10</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r border-gray-200 pr-4">
              <SupervisorAccountIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Subject</h1>
                <h2 className="text-xl font-bold">5</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MenuBookIcon
                className="rounded-full p-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm">Test</h1>
                <h2 className="text-xl font-bold">3</h2>
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
                      <Notice idx={idx} notice={notice} notFor="student" />
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
