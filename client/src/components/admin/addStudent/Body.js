import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import * as XLSX from "xlsx"; // For Excel parsing
import axios from "axios";

const initialFormState = {
  name: "",
  dob: "",
  email: "",
  department: "",
  contactNumber: "",
  avatar: "",
  batch: "",
  gender: "",
  year: "",
  fatherName: "",
  motherName: "",
  section: "",
  matricNo: "",
  fatherContactNumber: "",
  motherContactNumber: "",
};

const Body = () => {
  const dispatch = useDispatch();
  const errorRef = useRef();
  const departments = useSelector((state) => state.admin.allDepartment);
  const errorsFromStore = useSelector((state) => state.errors);
  const { studentAdded } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState(initialFormState);
  const [excelData, setExcelData] = useState([]);

  // Update error state when errors are set in the store
  useEffect(() => {
    if (errorsFromStore && Object.keys(errorsFromStore).length !== 0) {
      setError(errorsFromStore);
      errorRef.current &&
        errorRef.current.scrollIntoView({ behavior: "smooth" });
      setFormData((prevData) => ({ ...prevData, email: "" }));
      setLoading(false);
    }
  }, [errorsFromStore]);

  // Handle successful student addition
  useEffect(() => {
    if (studentAdded) {
      setLoading(false);
      setFormData(initialFormState);
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ADD_STUDENT, payload: false });
    }
  }, [studentAdded, dispatch]);

  // Clear any errors on mount
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addStudent(formData));
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setError({});
  };

  // Handle Excel file upload and parsing
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Convert string values to lowercase and trim whitespace
        const lowerCasedData = jsonData.map((row) => {
          const newRow = {};
          Object.keys(row).forEach((key) => {
            const value = row[key];
            newRow[key] =
              typeof value === "string" ? value.toLowerCase().trim() : value;
          });
          return newRow;
        });

        setExcelData(lowerCasedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  // Submit Excel data in bulk to the server
  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    if (excelData.length > 0) {
      try {
        const response = await axios.post(
          // "http://localhost:5000/api/admin/addstudentbulk",
          "https://resultmanagementsystem-exs8.onrender.com/api/admin/addstudentbulk",
          excelData
        );
        console.log("Bulk upload response:", response.data);
        setExcelData([]);
      } catch (error) {
        console.error(
          "Error during bulk upload:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="flex-1 mt-3 p-4">
      <div className="space-y-10">
        {/* Single Student Form Section */}
        <div className="form-section">
          <div className="flex items-center space-x-2 text-gray-400">
            <AddIcon />
            <h1 className="text-lg font-semibold">Add Student</h1>
          </div>
          <div className="bg-white flex flex-col rounded-xl p-4 shadow-md">
            <form
              className={`${classes.adminForm0} overflow-y-scroll max-h-[30rem]`}
              onSubmit={handleSubmit}
            >
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
                      required
                      placeholder="DD/MM/YYYY"
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
                      required
                      placeholder="Email"
                      className={classes.adminInput}
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Batch :</h1>
                    <input
                      required
                      placeholder="yyyy-yyyy"
                      className={classes.adminInput}
                      type="text"
                      value={formData.batch}
                      onChange={(e) =>
                        setFormData({ ...formData, batch: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Father's Name :</h1>
                    <input
                      required
                      placeholder="Father's Name"
                      className={classes.adminInput}
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) =>
                        setFormData({ ...formData, fatherName: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Mother's Name :</h1>
                    <input
                      required
                      placeholder="Mother's Name"
                      className={classes.adminInput}
                      type="text"
                      value={formData.motherName}
                      onChange={(e) =>
                        setFormData({ ...formData, motherName: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Year :</h1>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
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
                    <h1 className={classes.adminLabel}>Gender :</h1>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
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
                    <h1 className={classes.adminLabel}>
                      Father's Contact Number :
                    </h1>
                    <input
                      required
                      placeholder="Father's Contact Number"
                      className={classes.adminInput}
                      type="number"
                      value={formData.fatherContactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fatherContactNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>
                      Mother's Contact Number :
                    </h1>
                    <input
                      required
                      placeholder="Mother's Contact Number"
                      className={classes.adminInput}
                      type="number"
                      value={formData.motherContactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          motherContactNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Matric Number :</h1>
                    <input
                      required
                      placeholder="Matric Number"
                      className={classes.adminInput}
                      type="number"
                      value={formData.matricNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          matricNo: e.target.value,
                        })
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
                      value={formData.section}
                      onChange={(e) =>
                        setFormData({ ...formData, section: e.target.value })
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                    </Select>
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
                className={`${classes.adminFormButton} flex flex-col sm:flex-row sm:space-x-4 mt-4`}
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
              {/* Loading & Error */}
              <div ref={errorRef} className={`${classes.loadingAndError} mt-4`}>
                {loading && (
                  <Spinner
                    message="Adding Student"
                    height={30}
                    width={150}
                    color="#111111"
                    messageColor="blue"
                  />
                )}
                {(error.emailError || error.backendError) && (
                  <p className="text-red-500 mt-2">
                    {error.emailError || error.backendError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Excel Upload Section */}
        <div className="excel-upload-section mt-8">
          <div className="flex items-center space-x-2 text-gray-400">
            <AddIcon />
            <h1 className="text-lg font-semibold">Upload Excel Sheet</h1>
          </div>
          <div className="bg-white flex flex-col rounded-xl p-4 shadow-md">
            <input
              type="file"
              accept=".xls, .xlsx"
              onChange={handleExcelUpload}
              className="mb-4"
            />
            {excelData.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold">Preview Data:</h2>
                <pre className="text-sm max-h-40 overflow-y-scroll">
                  {JSON.stringify(excelData, null, 2)}
                </pre>
              </div>
            )}
            <button
              onClick={handleExcelSubmit}
              className="bg-red-400 py-3 px-12 font-bold text-white rounded-2xl mt-4 self-start"
              type="button"
            >
              Upload Excel Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
