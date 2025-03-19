import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartment,
  getAllDepartment,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { DELETE_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";

const initialFilter = { department: "" };

const Body = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const departments = useSelector((state) => state.admin.allDepartment);
  const faculties = useSelector((state) => state.admin.faculties.result);
  const errors = useSelector((state) => state.errors);
  const { departmentDeleted } = useSelector((state) => state.admin);

  // Local state
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(false);
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

  // Handle department deletion success
  useEffect(() => {
    if (departmentDeleted) {
      setLoading(false);
      setFilter(initialFilter);
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [departmentDeleted, dispatch]);

  // Turn off loading if faculties data is available
  useEffect(() => {
    if (faculties?.length > 0) {
      setLoading(false);
    }
  }, [faculties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError({});
    dispatch(deleteDepartment(filter));
  };

  return (
    <div className="flex-[0.8] mt-3 w-full px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <EngineeringIcon />
          <h1 className="text-lg font-semibold">All Faculty</h1>
        </div>
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem] mr-10">
          {/* Filter / Delete Form */}
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
              onChange={(e) =>
                setFilter({ ...filter, department: e.target.value })
              }
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
              Delete
            </button>
          </form>
          {/* Loading/Error Section */}
          <div className="col-span-1 md:col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Deleting"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
