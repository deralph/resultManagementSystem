import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const initialFormState = {
  subjectName: "",
  subjectCode: "",
  year: "",
  totalLectures: "",
  department: "",
};

const Body = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state);
  const { subjectAdded, allDepartment: departments } = useSelector(
    (state) => state.admin
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState(initialFormState);

  // Clear redux errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  // Handle errors from Redux
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setFormValues(initialFormState);
      setLoading(false);
    }
  }, [errors]);

  // Handle subject addition success from Redux
  useEffect(() => {
    if (subjectAdded) {
      setLoading(false);
      setFormValues(initialFormState);
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ADD_SUBJECT, payload: false });
    }
  }, [subjectAdded, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addSubject(formValues));
  };

  const handleClear = () => {
    setFormValues(initialFormState);
    setError({});
  };

  return (
    <div className="mt-3 w-full px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1 className="text-lg font-semibold">Add Course</h1>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="subjectName">
                    Subject Name:
                  </label>
                  <input
                    id="subjectName"
                    name="subjectName"
                    placeholder="Course Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={formValues.subjectName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="subjectCode">
                    Subject Code:
                  </label>
                  <input
                    id="subjectCode"
                    name="subjectCode"
                    required
                    placeholder="Course Code"
                    className={classes.adminInput}
                    type="text"
                    value={formValues.subjectCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="year">
                    Year:
                  </label>
                  <Select
                    id="year"
                    name="year"
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formValues.year}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
              </div>
              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="totalLectures">
                    Total Lectures:
                  </label>
                  <input
                    id="totalLectures"
                    name="totalLectures"
                    required
                    placeholder="Total Lectures"
                    className={classes.adminInput}
                    type="number"
                    value={formValues.totalLectures}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="department">
                    Department:
                  </label>
                  <Select
                    id="department"
                    name="department"
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formValues.department}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.department}>
                        {dp.department}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
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
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Subject"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.subjectError || error.backendError) && (
                <p className="text-red-500">
                  {error.subjectError || error.backendError}
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
