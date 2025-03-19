import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { createNotice } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { CREATE_NOTICE, SET_ERRORS } from "../../../redux/actionTypes";

const initialNoticeState = {
  date: "",
  noticeFor: "",
  topic: "",
  content: "",
  from: "",
};

const Body = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state);
  const { noticeCreated } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState(initialNoticeState);

  // Clear Redux errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  // Handle Redux errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setFormValues(initialNoticeState);
      setLoading(false);
    }
  }, [errors]);

  // Handle notice creation success
  useEffect(() => {
    if (noticeCreated) {
      setLoading(false);
      setFormValues(initialNoticeState);
      dispatch({ type: CREATE_NOTICE, payload: false });
      dispatch({ type: SET_ERRORS, payload: {} });
    }
  }, [noticeCreated, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createNotice(formValues));
  };

  const handleClear = () => {
    setFormValues(initialNoticeState);
    setError({});
  };

  return (
    <div className="mt-3 w-full px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <EngineeringIcon />
          <h1 className="text-lg font-semibold">Create Notice</h1>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="date">
                    Date:
                  </label>
                  <input
                    id="date"
                    name="date"
                    placeholder="Date"
                    required
                    className={classes.adminInput}
                    type="date"
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="topic">
                    Topic:
                  </label>
                  <input
                    id="topic"
                    name="topic"
                    placeholder="Topic"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={formValues.topic}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="noticeFor">
                    To:
                  </label>
                  <Select
                    id="noticeFor"
                    name="noticeFor"
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formValues.noticeFor}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </div>
                <div className="mb-4">
                  <label className={classes.adminLabel} htmlFor="from">
                    From:
                  </label>
                  <input
                    id="from"
                    name="from"
                    placeholder="From"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={formValues.from}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label
                    className={`self-start ${classes.adminLabel}`}
                    htmlFor="content"
                  >
                    Content:
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    required
                    placeholder="Content..."
                    className={classes.adminInput}
                    value={formValues.content}
                    onChange={handleChange}
                  />
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
                  message="Creating Notice"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noticeError || error.backendError) && (
                <p className="text-red-500">
                  {error.noticeError || error.backendError}
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
