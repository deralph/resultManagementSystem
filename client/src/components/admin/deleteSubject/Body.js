import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getSubject, deleteSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const subjectDeleted = useSelector((state) => state.admin.subjectDeleted);
  const subjects = useSelector((state) => state.admin.subjects?.result) || [];

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkedValue, setCheckedValue] = useState([]);
  const [value, setValue] = useState({ department: "", year: "" });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      setLoading(false);
    }
  }, [errorsFromStore]);

  useEffect(() => {
    if (subjectDeleted) {
      setValue({ department: "", year: "" });
      setSearch(false);
      setLoading(false);
      dispatch({ type: DELETE_SUBJECT, payload: false });
    }
  }, [subjectDeleted, dispatch]);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { value: checkboxValue, checked } = e.target;
    setCheckedValue((prev) =>
      checked
        ? [...prev, checkboxValue]
        : prev.filter((val) => val !== checkboxValue)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getSubject(value));
  };

  const handleDelete = () => {
    setError({});
    setLoading(true);
    dispatch(deleteSubject(checkedValue));
  };

  return (
    <div className="flex-1 mt-3 px-4">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <DeleteIcon />
          <h1>Delete Course</h1>
        </div>
        <div className="bg-white rounded-xl pt-6 pl-6 pr-6 pb-6 shadow-md">
          {/* Flex container for form and subject list */}
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
              </div>
              <div>
                <label htmlFor="year" className="block font-medium mb-1">
                  Year
                </label>
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
              </div>
              <button
                className={`${classes.adminFormSubmitButton} w-full`}
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Subject List Section */}
            <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
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
                  <div
                    className={`${classes.adminData} max-h-80 overflow-auto`}
                  >
                    {/* Header */}
                    <div className="flex items-center border-b pb-2 font-semibold text-sm">
                      <span className="w-1/6">Select</span>
                      <span className="w-1/6">Sr no.</span>
                      <span className="w-1/3">Subject Code</span>
                      <span className="w-1/3">Subject Name</span>
                      <span className="w-1/6">Total Lectures</span>
                    </div>
                    {/* Subject Items */}
                    {subjects.map((subject, idx) => (
                      <div
                        key={subject._id}
                        className="flex items-center border-b py-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          onChange={handleInputChange}
                          checked={checkedValue.includes(subject._id)}
                          value={subject._id}
                          className="w-5 h-5 mr-2"
                        />
                        <span className="w-1/6">{idx + 1}</span>
                        <span className="w-1/3">{subject.subjectCode}</span>
                        <span className="w-1/3">{subject.subjectName}</span>
                        <span className="w-1/6">{subject.totalLectures}</span>
                      </div>
                    ))}
                  </div>
                )}
              {search && Object.keys(error).length === 0 && (
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={handleDelete}
                    disabled={checkedValue.length === 0}
                    className={`${classes.adminFormSubmitButton} bg-blue-500 w-full md:w-auto`}
                  >
                    Delete
                  </button>
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
