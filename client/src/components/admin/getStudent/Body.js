import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const students = useSelector((state) => state.admin.students?.result) || [];

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    department: "",
    // year: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      setLoading(false);
    }
  }, [errorsFromStore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="flex-1 mt-3 px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className="mr-10 bg-white rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Form Section */}
            <form
              className="flex flex-col space-y-4 md:w-1/3"
              onSubmit={handleSubmit}
            >
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
              {/* <label htmlFor="year">Year</label>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 224 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.year}
                onChange={(e) => setValue({ ...value, year: e.target.value })}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select> */}
              <button
                className={`${classes.adminFormSubmitButton} w-full`}
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Student List Section */}
            <div className="md:w-2/3 md:ml-6 mt-6 md:mt-0">
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
                students?.length !== 0 && (
                  <div className={classes.adminData}>
                    {/* Header */}
                    <div className="flex items-center border-b pb-2 font-semibold text-sm">
                      <span className="w-1/12">Sr no.</span>
                      <span className="w-2/12">Name</span>
                      <span className="w-2/12">Username</span>
                      <span className="w-2/12">Email</span>
                      <span className="w-1/12">Section</span>
                      <span className="w-2/12">Batch</span>
                    </div>
                    {/* Data Rows */}
                    {students.map((stu, idx) => (
                      <div
                        key={stu._id || idx}
                        className="flex items-center border-b py-2 text-sm"
                      >
                        <span className="w-1/12">{idx + 1}</span>
                        <span className="w-2/12">{stu.name}</span>
                        <span className="w-2/12">{stu.username}</span>
                        <span className="w-2/12">{stu.email}</span>
                        <span className="w-1/12">{stu.section}</span>
                        <span className="w-2/12">{stu.batch}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
