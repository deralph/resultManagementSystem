import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { getFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const faculties = useSelector((state) => state.admin.faculties?.result) || [];

  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update error state if errors exist in Redux store
  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      setLoading(false);
    }
  }, [errorsFromStore]);

  // Turn off loading when faculty data is received
  useEffect(() => {
    if (faculties.length > 0) {
      setLoading(false);
    }
  }, [faculties]);

  // Clear errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty({ department }));
  };

  return (
    <div className="flex-1 mt-3 px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <EngineeringIcon />
          <h1>All Faculty</h1>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Form Section */}
            <form
              className="flex flex-col space-y-4 md:w-1/3"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="department" className="block font-medium mb-1">
                  Department
                </label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: "100%" }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.department}>
                      {dp.department}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <button
                type="submit"
                className={`${classes.adminFormSubmitButton} w-full`}
              >
                Search
              </button>
            </form>

            {/* Faculty List Section */}
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
                {(error.noFacultyError || error.backendError) && (
                  <p className="text-red-500 text-2xl font-bold">
                    {error.noFacultyError || error.backendError}
                  </p>
                )}
              </div>
              {search &&
                !loading &&
                Object.keys(error).length === 0 &&
                faculties.length > 0 && (
                  <div className={classes.adminData}>
                    {/* Header */}
                    <div className="flex items-center border-b pb-2 font-semibold text-sm">
                      <span className="w-1/12">Sr no.</span>
                      <span className="w-3/12">Name</span>
                      <span className="w-2/12">Username</span>
                      <span className="w-3/12">Email</span>
                      <span className="w-3/12">Designation</span>
                    </div>
                    {/* Faculty Items */}
                    {faculties.map((fac, idx) => (
                      <div
                        key={fac._id}
                        className="flex items-center border-b py-2 text-sm"
                      >
                        <span className="w-1/12 font-bold">{idx + 1}</span>
                        <span className="w-3/12">{fac.name}</span>
                        <span className="w-2/12">{fac.username}</span>
                        <span className="w-3/12">{fac.email}</span>
                        <span className="w-3/12">{fac.designation}</span>
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
