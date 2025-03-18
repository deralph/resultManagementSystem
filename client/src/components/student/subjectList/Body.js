import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [value, setValue] = useState({
    department: "",
    year: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getSubject(value));
  };

  const subjectsFromStore = useSelector((state) => state.admin.subjects.result);

  // Fallback sample subjects array so that something is displayed if Redux data is empty.
  const sampleSubjects = [
    {
      subjectCode: "CSC 201",
      subjectName: "Introduction to Algorithm",
    },
    {
      subjectCode: "CSC 205",
      subjectName: "Operating System I",
    },
    {
      subjectCode: "CSC 215",
      subjectName: "Assembly Language",
    },
    {
      subjectCode: "CSC 211",
      subjectName: "Introduction to Programming",
    },
    {
      subjectCode: "ENT 201",
      subjectName: "Entrepreneur",
    },
  ];

  // Use the subjects from Redux if available, otherwise fallback to sampleSubjects.
  const displaySubjects =
    subjectsFromStore && subjectsFromStore.length > 0
      ? subjectsFromStore
      : sampleSubjects;

  useEffect(() => {
    if (subjectsFromStore?.length !== 0) setLoading(false);
  }, [subjectsFromStore]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Courses</h1>
        </div>
        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            {/* <div className={classes.loadingAndError}>
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
                <p className="text-red-500 text-2xl font-bold">
                  No Course Found
                </p>
              )}
            </div>
            {!loading &&
              Object.keys(error).length === 0 &&
              displaySubjects.length !== 0 && ( */}
            {true && (
              <div className={classes.adminData}>
                <div className="grid grid-cols-7">
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Sr no.
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Course Code
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-3`}>
                    Course Name
                  </h1>
                  {/* <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Total Lectures
                    </h1> */}
                </div>
                {displaySubjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className={`${classes.adminDataBody} grid grid-cols-7`}
                  >
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {idx + 1}
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {sub.subjectCode}
                    </h1>
                    <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>
                      {sub.subjectName}
                    </h1>
                    {/* <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {sub.totalLectures}
                      </h1> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
