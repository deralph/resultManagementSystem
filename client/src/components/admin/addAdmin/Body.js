import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addAdmin } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ADD_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const { errors: errorsFromStore } = useSelector((state) => state);
  const { adminAdded } = useSelector((state) => state.admin);
  const departments = useSelector((state) => state.admin.allDepartment);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    department: "",
    contactNumber: "",
    avatar: "",
    joiningYear: new Date().getFullYear(),
  });

  // Watch for errors from the store
  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      // Reset the email field if there's an error (as per your original logic)
      setFormData((prevData) => ({ ...prevData, email: "" }));
      setLoading(false);
    }
  }, [errorsFromStore]);

  // Watch for successful admin addition
  useEffect(() => {
    if (errorsFromStore || adminAdded) {
      setLoading(false);
      if (adminAdded) {
        setFormData({
          name: "",
          dob: "",
          email: "",
          department: "",
          contactNumber: "",
          avatar: "",
          joiningYear: new Date().getFullYear(),
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_ADMIN, payload: false });
      }
    }
  }, [errorsFromStore, adminAdded, dispatch]);

  // Clear any existing errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addAdmin(formData));
  };

  const handleClear = () => {
    setFormData({
      name: "",
      dob: "",
      email: "",
      department: "",
      contactNumber: "",
      avatar: "",
      joiningYear: new Date().getFullYear(),
    });
    setError({});
  };

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center space-x-2 text-gray-400">
          <EngineeringIcon />
          <h1 className="text-lg font-semibold">Add Admin</h1>
        </div>
        {/* Form Container */}
        <div className="bg-white flex flex-col rounded-xl p-4 shadow-md">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div
              className={`${classes.adminForm1} flex flex-col md:flex-row md:space-x-4`}
            >
              {/* Left Side Fields */}
              <div className={`${classes.adminForm2l} flex-1 space-y-4`}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Name :</h1>
                  <input
                    placeholder="Full Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>DOB :</h1>
                  <input
                    placeholder="DD/MM/YYYY"
                    required
                    className={classes.adminInput}
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Email :</h1>
                  <input
                    placeholder="Email"
                    required
                    className={classes.adminInput}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* Right Side Fields */}
              <div
                className={`${classes.adminForm2r} flex-1 space-y-4 mt-4 md:mt-0`}
              >
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
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
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Contact Number :</h1>
                  <input
                    required
                    placeholder="Contact Number"
                    className={classes.adminInput}
                    type="number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Avatar :</h1>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, avatar: base64 })
                    }
                  />
                </div>
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
            {/* Loading and Error Display */}
            <div className={classes.loadingAndError + " mt-2"}>
              {loading && (
                <Spinner
                  message="Adding Admin"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.emailError || error.backendError) && (
                <p className="text-red-500">
                  {error.emailError || error.backendError}
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
