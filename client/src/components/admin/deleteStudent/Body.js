import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, deleteStudent } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const studentDeleted = useSelector((state) => state.admin.studentDeleted);
  const students = useSelector((state) => state.admin.students?.result) || [];

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkedValue, setCheckedValue] = useState([]);
  const [value, setValue] = useState({ department: "", year: "" });
  const [search, setSearch] = useState(false);

  // Listen for errors from Redux and update local state
  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      setLoading(false);
    }
  }, [errorsFromStore]);

  // Reset form when deletion is complete
  useEffect(() => {
    if (studentDeleted) {
      setValue({ department: "", year: "" });
      setSearch(false);
      setLoading(false);
      dispatch({ type: DELETE_STUDENT, payload: false });
    }
  }, [studentDeleted, dispatch]);

  // Stop loading when students data is received
  useEffect(() => {
    if (students?.length) {
      setLoading(false);
    }
  }, [students]);

  // Clear errors on component mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  // Use immutable updates for checkbox state
  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    setCheckedValue((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };

  const handleDelete = () => {
    setError({});
    setLoading(true);
    dispatch(deleteStudent(checkedValue));
  };

  return (
    <div className="flex-1 mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <DeleteIcon />
          <h1>Delete Student</h1>
        </div>
        <div className="bg-white rounded-xl pt-6 pl-6 pr-6 pb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Form */}
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: "100%" }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) =>
                setValue({ ...value, department: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: "100%" }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-full`}
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Student Data */}
          <div className="md:col-span-3">
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
                <div className={`${classes.adminData} max-h-80 overflow-auto`}>
                  <div className="grid grid-cols-8 gap-2 font-semibold border-b pb-2">
                    <span className="col-span-1">Select</span>
                    <span className="col-span-1">Sr no.</span>
                    <span className="col-span-2">Name</span>
                    <span className="col-span-2">Username</span>
                    <span className="col-span-2">Section</span>
                  </div>
                  {students.map((student, idx) => (
                    <div
                      key={student._id}
                      className="grid grid-cols-8 gap-2 items-center py-2 border-b"
                    >
                      <input
                        type="checkbox"
                        onChange={handleInputChange}
                        checked={checkedValue.includes(student._id)}
                        value={student._id}
                        className="col-span-1 border-2 w-5 h-5"
                      />
                      <span className="col-span-1">{idx + 1}</span>
                      <span className="col-span-2">{student.name}</span>
                      <span className="col-span-2">{student.username}</span>
                      <span className="col-span-2">{student.section}</span>
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="flex items-center justify-center mt-5">
                <button
                  onClick={handleDelete}
                  disabled={checkedValue.length === 0}
                  className={`${classes.adminFormSubmitButton} bg-blue-500 w-full md:w-auto`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
