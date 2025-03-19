import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, deleteAdmin } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";

const initialFilterState = { department: "" };

const Body = () => {
  const dispatch = useDispatch();

  // Selectors from Redux store
  const departments = useSelector((state) => state.admin.allDepartment);
  const errors = useSelector((state) => state.errors);
  const adminDeleted = useSelector((state) => state.admin.adminDeleted);
  const students = useSelector((state) => state.admin.students.result);

  // Local states
  const [filter, setFilter] = useState(initialFilterState);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [localError, setLocalError] = useState({});

  // Clear Redux errors on mount
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

  // When deletion is successful, reset filter, selections and loading state
  useEffect(() => {
    if (adminDeleted) {
      setFilter(initialFilterState);
      setSelectedIds([]);
      setLoading(false);
      setHasSearched(false);
      dispatch({ type: DELETE_ADMIN, payload: false });
    }
  }, [adminDeleted, dispatch]);

  // Stop loading once students are loaded
  useEffect(() => {
    if (students && students.length > 0) {
      setLoading(false);
    }
  }, [students]);

  // Handle changes for the filter input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes with immutable updates
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setLocalError({});
    dispatch(getAdmin(filter));
  };

  // Handle delete action for selected admins/students
  const handleDelete = () => {
    setLocalError({});
    setLoading(true);
    dispatch(deleteAdmin(selectedIds));
  };

  return (
    <div className="flex-[0.8] mt-3 w-full px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <DeleteIcon />
          <h1 className="text-lg font-semibold">All Students</h1>
        </div>
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem] mr-10">
          {/* Filter Section */}
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSearchSubmit}
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
          {/* Data & Actions Section */}
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
              {(localError.noAdminError || localError.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {localError.noAdminError || localError.backendError}
                </p>
              )}
            </div>
            {hasSearched &&
              !loading &&
              !Object.keys(localError).length &&
              students?.length > 0 && (
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
                  {students.map((adm, idx) => (
                    <div
                      key={adm._id || idx}
                      className={`${classes.adminDataBody} grid grid-cols-8 items-center`}
                    >
                      <input
                        type="checkbox"
                        value={adm._id}
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
                        {adm.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {adm.username}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}
                      >
                        {adm.email}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            {hasSearched && !Object.keys(localError).length && (
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
