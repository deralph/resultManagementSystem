import React, { useEffect } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();

  // Retrieve subjects from Redux store.
  const subjectsFromStore = useSelector((state) => state.admin.subjects.result);

  // Fallback sample subjects in case Redux data is empty.
  const sampleSubjects = [
    { subjectCode: "CSC 201", subjectName: "Introduction to Algorithm" },
    { subjectCode: "CSC 205", subjectName: "Operating System I" },
    { subjectCode: "CSC 215", subjectName: "Assembly Language" },
    { subjectCode: "CSC 211", subjectName: "Introduction to Programming" },
    { subjectCode: "ENT 201", subjectName: "Entrepreneur" },
  ];

  // Use Redux subjects if available; otherwise, fallback to sampleSubjects.
  const displaySubjects =
    subjectsFromStore && subjectsFromStore.length > 0
      ? subjectsFromStore
      : sampleSubjects;

  // Clear any errors on mount.
  useEffect(() => {
    dispatch({ type: "SET_ERRORS", payload: {} });
  }, [dispatch]);

  // Optionally, dispatch getSubject on mount if needed.
  // useEffect(() => {
  //   dispatch(getSubject({ department: "", year: "" }));
  // }, [dispatch]);

  return (
    <div className="flex-grow mt-3">
      <div className="space-y-5">
        {/* Header Section */}
        <div className="flex items-center text-gray-400 space-x-2">
          <MenuBookIcon />
          <h1>All Courses</h1>
        </div>
        {/* Content Container */}
        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-auto md:h-[29.5rem]">
          <div className="mb-4 mr-6">
            {/*
            Uncomment the block below to display a loading spinner and error messages:
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">No Course Found</p>
              )}
            </div>
            */}
            {/* Table Header using flex */}
            <div className="flex items-center border-b border-gray-200 pb-2">
              <h1 className={`flex-[1] ${classes.adminDataHeading}`}>Sr no.</h1>
              <h1 className={`flex-[2] ${classes.adminDataHeading}`}>
                Course Code
              </h1>
              <h1 className={`flex-[3] ${classes.adminDataHeading}`}>
                Course Name
              </h1>
            </div>
            {/* Table Body using flex for each row */}
            <div>
              {displaySubjects.map((sub, idx) => (
                <div
                  key={idx}
                  className={`flex items-center py-2 border-b border-gray-100 ${classes.adminDataBody}`}
                >
                  <span className={`flex-[1] ${classes.adminDataBodyFields}`}>
                    {idx + 1}
                  </span>
                  <span className={`flex-[2] ${classes.adminDataBodyFields}`}>
                    {sub.subjectCode}
                  </span>
                  <span className={`flex-[3] ${classes.adminDataBodyFields}`}>
                    {sub.subjectName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
