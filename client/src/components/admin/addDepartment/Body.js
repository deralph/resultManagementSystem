import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const { errors, admin } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
    }
  }, [errors]);

  useEffect(() => {
    if (admin.departmentAdded) {
      setDepartment("");
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ADD_DEPARTMENT, payload: false });
      setLoading(false);
    }
  }, [admin.departmentAdded, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department }));
  };

  const handleClear = () => {
    setDepartment("");
    setError({});
  };

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1 className="text-lg font-semibold">Add Department</h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center py-6 space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Input Field */}
              <div className="flex flex-col sm:flex-row sm:items-center space-x-3">
                <h1 className={classes.adminLabel}>Department:</h1>
                <input
                  placeholder="Enter Department Name"
                  required
                  className={classes.adminInput}
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div
              className={
                classes.adminFormButton +
                " mt-4 flex flex-col sm:flex-row sm:space-x-4"
              }
            >
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={handleClear}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>

            {/* Loading and Error Messages */}
            <div className={classes.loadingAndError + " mt-2"}>
              {loading && (
                <Spinner
                  message="Adding Department"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.departmentError || error.backendError) && (
                <p className="text-red-500">
                  {error.departmentError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
