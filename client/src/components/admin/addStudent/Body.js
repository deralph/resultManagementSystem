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
import * as XLSX from "xlsx"; // Import SheetJS for Excel parsing
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();

  const [value, setValue] = useState({
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
  });

  // State to store Excel parsed data
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      errorRef.current.scrollIntoView({ behavior: "smooth" });
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(value));
    setError({});
    setLoading(true);
  };

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
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
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // Function to handle Excel file upload and parsing
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        // Convert the sheet data to JSON.
        // Ensure your Excel header names match your form keys.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Convert all string values in each row to lowercase.
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

  // Function to handle the submission of the Excel data to the server

  // Assuming you have a state variable "excelData" (an array of student objects)
  // and a setter "setExcelData" available in your component.
  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    console.log(excelData);
    if (excelData.length > 0) {
      try {
        // Post the entire array of student objects to the bulk endpoint
        const response = await axios.post(
          "http://localhost:5000/api/admin/addstudentbulk",
          excelData
        );
        console.log("Bulk upload response:", response.data);
        // Optionally, clear the excelData state after a successful upload
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
    <div className="flex-[0.8] mt-3">
      <div className="space-y-10">
        {/* Section for single student form */}
        <div className="form-section">
          <div className="flex text-gray-400 items-center space-x-2">
            <AddIcon />
            <h1>Add Student</h1>
          </div>
          <div className="mr-10 bg-white flex flex-col rounded-xl">
            <form
              className={`${classes.adminForm0} scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-scroll h-[30rem]`}
              onSubmit={handleSubmit}
            >
              <div className={classes.adminForm1}>
                <div className={classes.adminForm2l}>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Name :</h1>
                    <input
                      placeholder="Full Name"
                      required
                      className={classes.adminInput}
                      type="text"
                      value={value.name}
                      onChange={(e) =>
                        setValue({ ...value, name: e.target.value })
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
                      value={value.dob}
                      onChange={(e) =>
                        setValue({ ...value, dob: e.target.value })
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
                      value={value.email}
                      onChange={(e) =>
                        setValue({ ...value, email: e.target.value })
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
                      value={value.batch}
                      onChange={(e) =>
                        setValue({ ...value, batch: e.target.value })
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
                      value={value.fatherName}
                      onChange={(e) =>
                        setValue({ ...value, fatherName: e.target.value })
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
                      value={value.motherName}
                      onChange={(e) =>
                        setValue({ ...value, motherName: e.target.value })
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
                      value={value.year}
                      onChange={(e) =>
                        setValue({ ...value, year: e.target.value })
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
                <div className={classes.adminForm2r}>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Department :</h1>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36 }}
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
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Gender :</h1>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={value.gender}
                      onChange={(e) =>
                        setValue({ ...value, gender: e.target.value })
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
                      value={value.contactNumber}
                      onChange={(e) =>
                        setValue({ ...value, contactNumber: e.target.value })
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
                      value={value.fatherContactNumber}
                      onChange={(e) =>
                        setValue({
                          ...value,
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
                      value={value.motherContactNumber}
                      onChange={(e) =>
                        setValue({
                          ...value,
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
                      value={value.matricNo}
                      onChange={(e) =>
                        setValue({
                          ...value,
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
                      value={value.section}
                      onChange={(e) =>
                        setValue({ ...value, section: e.target.value })
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
                        setValue({ ...value, avatar: base64 })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={classes.adminFormButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Submit
                </button>
                <button
                  onClick={() => {
                    setValue({
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
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Clear
                </button>
              </div>
              <div ref={errorRef} className={classes.loadingAndError}>
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
                  <p className="text-red-500">
                    {error.emailError || error.backendError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Separate section for Excel upload */}
        <div className="excel-upload-section mt-8">
          <div className="flex text-gray-400 items-center space-x-2">
            <AddIcon />
            <h1>Upload Excel Sheet</h1>
          </div>
          <div className="mr-10 bg-white flex flex-col rounded-xl p-4">
            <input
              type="file"
              accept=".xls, .xlsx"
              onChange={handleExcelUpload}
            />
            {excelData.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold">Preview Data:</h2>
                <pre className="text-sm max-h-40 overflow-y-scroll">
                  {JSON.stringify(excelData, null, 2)}
                </pre>
              </div>
            )}
            <div>
              <button
                className={`bg-red-400 py-3 px-12 flex font-bold text-white rounded-2xl mt-4`}
                onClick={handleExcelSubmit}
                type="button"
              >
                Upload Excel Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
