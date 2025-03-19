import React, { useEffect, useState, useMemo } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  uploadMark,
  getTest,
} from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  // Initial filter values; department comes from the logged‑in user.
  const initialFilterValues = useMemo(
    () => ({
      department: user?.result?.department || "",
      year: "",
      section: "",
      test: "",
    }),
    [user]
  );
  const [filterValues, setFilterValues] = useState(initialFilterValues);

  const [marks, setMarks] = useState([]);
  const [search, setSearch] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const store = useSelector((state) => state);
  const tests = store.faculty.tests.result;
  const students = useSelector((state) => state.admin.students.result);

  // On mount, clear errors and set the department.
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    setFilterValues((prev) => ({
      ...prev,
      department: user?.result?.department || "",
    }));
  }, [dispatch, user]);

  // Update local error state if store errors change.
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setFilterValues(initialFilterValues);
    }
  }, [store.errors, initialFilterValues]);

  // When students data is loaded, stop the loading indicator.
  useEffect(() => {
    if (students?.length !== 0) {
      setLoading(false);
    }
  }, [students]);

  // Listen for marks upload or errors to reset the form.
  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setFilterValues(initialFilterValues);
        setSearch(false);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [
    store.errors,
    store.faculty.marksUploaded,
    dispatch,
    initialFilterValues,
  ]);

  // When both year and section are selected, fetch tests.
  useEffect(() => {
    if (filterValues.year !== "" && filterValues.section !== "") {
      dispatch(getTest(filterValues));
    }
  }, [filterValues.year, filterValues.section, dispatch, filterValues]);

  // Handle changes for marks input.
  const handleInputChange = (val, _id) => {
    setMarks((prevMarks) => {
      const index = prevMarks.findIndex((item) => item._id === _id);
      if (index === -1) {
        return [...prevMarks, { _id, value: val }];
      } else {
        const newMarks = [...prevMarks];
        newMarks[index].value = val;
        return newMarks;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(filterValues));
  };

  const handleUpload = () => {
    setError({});
    dispatch(
      uploadMark(
        marks,
        filterValues.department,
        filterValues.section,
        filterValues.year,
        filterValues.test
      )
    );
  };

  return (
    <div className="flex-grow mt-3">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center text-gray-400 space-x-2">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        {/* Main Container: flex layout for search form and table */}
        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] flex flex-col md:flex-row">
          {/* Search Form */}
          <form
            className="flex flex-col space-y-2 md:w-1/3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: "100%" }}
              inputProps={{ "aria-label": "Without label" }}
              value={filterValues.year}
              onChange={(e) =>
                setFilterValues({ ...filterValues, year: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>

            <label htmlFor="section">Semester</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: "100%" }}
              inputProps={{ "aria-label": "Without label" }}
              value={filterValues.section}
              onChange={(e) =>
                setFilterValues({ ...filterValues, section: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>

            <label htmlFor="test">Test</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: "100%" }}
              inputProps={{ "aria-label": "Without label" }}
              value={filterValues.test}
              onChange={(e) =>
                setFilterValues({ ...filterValues, test: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {tests?.map((test, idx) => (
                <MenuItem value={test.test} key={idx}>
                  {test.test}
                </MenuItem>
              ))}
            </Select>

            <button
              className={`${classes.adminFormSubmitButton} w-full`}
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Students Table */}
          <div className="md:w-2/3 mt-4 md:mt-0 md:ml-6">
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
              {(error.noStudentError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div>

            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length > 0 && (
                <div
                  className={`${classes.adminData} overflow-auto`}
                  style={{ maxHeight: "20rem" }}
                >
                  {/* Table Header using flex */}
                  <div className="flex items-center border-b border-gray-300 py-2">
                    <span className="flex-1 font-bold">Sr no.</span>
                    <span className="flex-2 font-bold">Name</span>
                    <span className="flex-2 font-bold">Username</span>
                    <span className="flex-1 font-bold">Section</span>
                    <span className="flex-2 font-bold">Marks</span>
                  </div>
                  {/* Table Rows */}
                  {students.map((stu, idx) => (
                    <div
                      key={stu._id}
                      className="flex items-center border-b border-gray-100 py-2"
                    >
                      <span className="flex-1">{idx + 1}</span>
                      <span className="flex-2">{stu.name}</span>
                      <span className="flex-2">{stu.username}</span>
                      <span className="flex-1">{stu.section}</span>
                      <input
                        type="text"
                        className="flex-2 border-2 w-24 px-2 h-8"
                        onChange={(e) =>
                          handleInputChange(e.target.value, stu._id)
                        }
                        value={stu.marks || ""}
                      />
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleUpload}
                  className={`${classes.adminFormSubmitButton} bg-blue-500`}
                >
                  Upload
                </button>
              </div>
            )}
            {(error.examError || error.backendError) && (
              <p className="text-red-500 text-2xl font-bold mt-4 text-center">
                {error.examError || error.backendError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
