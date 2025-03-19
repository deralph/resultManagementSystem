import React, { useEffect, useState, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../redux/actions/facultyActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_TEST, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  // Extract Redux states for errors and test-added flag.
  const errorsFromStore = useSelector((state) => state.errors);
  const testAdded = useSelector((state) => state.faculty.testAdded);

  // Define initial form values (department remains constant).
  const initialFormValues = useMemo(
    () => ({
      subjectCode: "",
      section: "",
      year: "",
      test: "",
      totalMarks: "",
      date: "",
      department: user?.result?.department || "",
    }),
    [user]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);

  // Clear errors on mount.
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  // Update local error state and reset form when errors change.
  useEffect(() => {
    if (Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      setFormValues(initialFormValues);
      setLoading(false);
    }
  }, [errorsFromStore, initialFormValues]);

  // Listen for testAdded flag to reset form and clear errors.
  useEffect(() => {
    if (errorsFromStore || testAdded) {
      setLoading(false);
      if (testAdded) {
        setFormValues(initialFormValues);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_TEST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [errorsFromStore, testAdded, dispatch, initialFormValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createTest(formValues));
  };

  const handleClear = () => {
    setFormValues(initialFormValues);
    setError({});
  };

  return (
    <div className="flex-grow mt-3">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center text-gray-400 space-x-2">
          <AddIcon />
          <h1>Create Test</h1>
        </div>
        {/* Form Container */}
        <div className="mr-10 bg-white flex flex-col rounded-xl p-6">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Left Side Form Fields */}
              <div className="flex-1 space-y-4">
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Test Name :</h1>
                  <input
                    placeholder="Test Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={formValues.test}
                    onChange={(e) =>
                      setFormValues({ ...formValues, test: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Subject Code :</h1>
                  <input
                    required
                    placeholder="Subject Code"
                    className={classes.adminInput}
                    type="text"
                    value={formValues.subjectCode}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        subjectCode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <input
                    required
                    placeholder={user?.result?.department}
                    disabled
                    className={classes.adminInput}
                    type="text"
                    value={user?.result?.department}
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formValues.year}
                    onChange={(e) =>
                      setFormValues({ ...formValues, year: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
              </div>
              {/* Right Side Form Fields */}
              <div className="flex-1 space-y-4 mt-4 md:mt-0">
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Total Marks :</h1>
                  <input
                    required
                    placeholder="Total Marks"
                    className={classes.adminInput}
                    type="number"
                    value={formValues.totalMarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        totalMarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Date :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="date"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Section :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formValues.section}
                    onChange={(e) =>
                      setFormValues({ ...formValues, section: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            {/* Form Buttons */}
            <div className={classes.adminFormButton}>
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
            {/* Loading & Error Display */}
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Creating Test"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.testError || error.backendError) && (
                <p className="text-red-500">
                  {error.testError || error.backendError}
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
