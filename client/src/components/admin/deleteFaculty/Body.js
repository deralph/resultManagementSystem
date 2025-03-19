import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty, getFaculty } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";

const initialFilter = { department: "" };

const Body = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const departments = useSelector((state) => state.admin.allDepartment);
  const faculties = useSelector((state) => state.admin.faculties.result);
  const errors = useSelector((state) => state.errors);
  const facultyDeleted = useSelector((state) => state.admin.facultyDeleted);

  // Local state
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [localError, setLocalError] = useState({});

  // Clear errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  // Update local error state when Redux errors change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLocalError(errors);
      setLoading(false);
    }
  }, [errors]);

  // Reset state when faculty deletion is successful
  useEffect(() => {
    if (facultyDeleted) {
      setLoading(false);
      setFilter(initialFilter);
      setSearch(false);
      setSelectedIds([]);
      dispatch({ type: DELETE_FACULTY, payload: false });
    }
  }, [facultyDeleted, dispatch]);

  // Turn off loading once faculties data is available
  useEffect(() => {
    if (faculties?.length > 0) {
      setLoading(false);
    }
  }, [faculties]);

  // Immutable update for checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setLocalError({});
    dispatch(getFaculty(filter));
  };

  const handleDelete = () => {
    setLocalError({});
    setLoading(true);
    dispatch(deleteFaculty(selectedIds));
  };

  return (
    <div className="flex-[0.8] mt-3 w-full px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <DeleteIcon />
          <h1 className="text-lg font-semibold">Delete Staff</h1>
        </div>
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem] mr-10">
          {/* Filter Section */}
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}
          >
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              name="department"
              value={filter.department}
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit"
            >
              Search
            </button>
          </form>
          {/* Data & Delete Section */}
          <div className="col-span-1 md:col-span-3 mr-6">
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
              {(localError.noFacultyError || localError.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {localError.noFacultyError || localError.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              !Object.keys(localError).length &&
              faculties?.length > 0 && (
                <div className={`${classes.adminData} h-[20rem]`}>
                  <div className="grid grid-cols-8">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Select
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Sr no.
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Name
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Username
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Email
                    </h1>
                  </div>
                  {faculties.map((staff, idx) => (
                    <div
                      key={staff._id || idx}
                      className={`${classes.adminDataBody} grid grid-cols-8 items-center`}
                    >
                      <input
                        type="checkbox"
                        value={staff._id}
                        onChange={handleCheckboxChange}
                        className="col-span-1 border-2 w-16 h-4 mt-3 px-2"
                      />
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}
                      >
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {staff.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {staff.username}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {staff.email}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            {search && !Object.keys(localError).length && (
              <div className="space-x-3 flex items-center justify-center mt-5">
                <button
                  onClick={handleDelete}
                  className={`${classes.adminFormSubmitButton} bg-blue-500`}
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
