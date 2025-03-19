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
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const subjects = useSelector((state) => state.admin.subjects?.result) || [];

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    department: "",
    year: "",
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
    dispatch(getSubject(value));
  };

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="flex-1 mt-3 px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <MenuBookIcon />
          <h1>All Subjects</h1>
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

            {/* Subjects List Section */}
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
                {(error.noSubjectError || error.backendError) && (
                  <p className="text-red-500 text-2xl font-bold">
                    {error.noSubjectError || error.backendError}
                  </p>
                )}
              </div>
              {search &&
                !loading &&
                Object.keys(error).length === 0 &&
                subjects?.length !== 0 && (
                  <div className={classes.adminData}>
                    {/* Header */}
                    <div className="flex items-center border-b pb-2 font-semibold text-sm">
                      <span className="w-1/12">Sr no.</span>
                      <span className="w-2/12">Subject Code</span>
                      <span className="w-5/12">Subject Name</span>
                      <span className="w-2/12">Total Lectures</span>
                    </div>
                    {/* Data Rows */}
                    {subjects.map((sub, idx) => (
                      <div
                        key={sub._id || idx}
                        className="flex items-center border-b py-2 text-sm"
                      >
                        <span className="w-1/12">{idx + 1}</span>
                        <span className="w-2/12">{sub.subjectCode}</span>
                        <span className="w-5/12">{sub.subjectName}</span>
                        <span className="w-2/12">{sub.totalLectures}</span>
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
