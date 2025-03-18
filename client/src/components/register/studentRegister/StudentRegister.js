import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import Spinner from "../../../utils/Spinner";

const StudentRegister = () => {
  // Form fields state
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [section, setSection] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState({});

  const store = useSelector((state) => state);

  // Trigger slide-in animation after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update error state if available in store
  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    // Dispatch your registration action here
    // e.g., dispatch(addStudent({ ... }))
  };

  // (Optional) Clear form fields on error from store if needed
  useEffect(() => {
    if (store.errors) {
      setName("");
      setEmail("");
      setBatch("");
      setUsername("");
      setPassword("");
      setAvatar(null);
      setGender("");
      setDepartment("");
      setDob("");
      setFatherName("");
      setFatherContact("");
      setContactNumber("");
      setJoiningYear("");
      setSubjects([]);
      setSection("");
      setLoading(false);
    }
  }, [store.errors]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4 relative">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <a href="/">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105">
            Home
          </button>
        </a>
      </div>
      {/* Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel – Welcome Section */}
        <div
          className={`md:w-1/2 p-8 flex flex-col justify-center items-center bg-gray-100 transition-transform duration-1000 ${
            animate ? "translate-x-0" : "-translate-x-10"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome Student!
          </h1>
          <p className="text-gray-600 text-center">
            Register your account to join the system.
          </p>
        </div>
        {/* Right Panel – Registration Form */}
        <form
          onSubmit={register}
          className={`md:w-1/2 p-8 grid grid-cols-2 gap-4 transition-transform duration-1000 ${
            animate ? "translate-x-0" : "translate-x-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 col-span-2 text-center mb-4">
            Student Registration
          </h2>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.name && (
              <span className="text-red-500 text-sm mt-1">{error.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.email && (
              <span className="text-red-500 text-sm mt-1">{error.email}</span>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-gray-700 font-medium"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.username && (
              <span className="text-red-500 text-sm mt-1">
                {error.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[A-Z])(?=.*[@])(?=.*\d).{6,}$"
              title="Must include one uppercase letter, one '@', one number and at least 6 characters"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityIcon className="text-gray-600" />
              ) : (
                <VisibilityOffIcon className="text-gray-600" />
              )}
            </div>
            {error.password && (
              <span className="text-red-500 text-sm mt-1">
                {error.password}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 text-gray-700 font-medium">
              Gender
            </label>
            <select
              id="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {error.gender && (
              <span className="text-red-500 text-sm mt-1">{error.gender}</span>
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-1 text-gray-700 font-medium">
              DOB
            </label>
            <input
              id="dob"
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.dob && (
              <span className="text-red-500 text-sm mt-1">{error.dob}</span>
            )}
          </div>

          {/* Batch */}
          <div className="flex flex-col">
            <label htmlFor="batch" className="mb-1 text-gray-700 font-medium">
              Batch
            </label>
            <input
              id="batch"
              type="text"
              required
              placeholder="Batch 19"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.batch && (
              <span className="text-red-500 text-sm mt-1">{error.batch}</span>
            )}
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label htmlFor="section" className="mb-1 text-gray-700 font-medium">
              Section
            </label>
            <input
              id="section"
              type="text"
              required
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.section && (
              <span className="text-red-500 text-sm mt-1">{error.section}</span>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label
              htmlFor="department"
              className="mb-1 text-gray-700 font-medium"
            >
              Department
            </label>
            <input
              id="department"
              type="text"
              required
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.department && (
              <span className="text-red-500 text-sm mt-1">
                {error.department}
              </span>
            )}
          </div>

          {/* Father Name */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="fatherName"
              className="mb-1 text-gray-700 font-medium"
            >
              Father Name
            </label>
            <input
              id="fatherName"
              type="text"
              placeholder="Father Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.fatherName && (
              <span className="text-red-500 text-sm mt-1">
                {error.fatherName}
              </span>
            )}
          </div> */}

          {/* Father Contact */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="fatherContact"
              className="mb-1 text-gray-700 font-medium"
            >
              Father Contact
            </label>
            <input
              id="fatherContact"
              type="text"
              placeholder="Father Contact"
              value={fatherContact}
              onChange={(e) => setFatherContact(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.fatherContact && (
              <span className="text-red-500 text-sm mt-1">
                {error.fatherContact}
              </span>
            )}
          </div> */}

          {/* Contact Number */}
          <div className="flex flex-col">
            <label
              htmlFor="contactNumber"
              className="mb-1 text-gray-700 font-medium"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="number"
              required
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.contactNumber && (
              <span className="text-red-500 text-sm mt-1">
                {error.contactNumber}
              </span>
            )}
          </div>

          {/* Joining Year */}
          {/* <div className="flex flex-col">
            <label
              htmlFor="joiningYear"
              className="mb-1 text-gray-700 font-medium"
            >
              Joining Year
            </label>
            <input
              id="joiningYear"
              type="date"
              required
              value={joiningYear}
              onChange={(e) => setJoiningYear(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.joiningYear && (
              <span className="text-red-500 text-sm mt-1">
                {error.joiningYear}
              </span>
            )}
          </div> */}

          {/* Avatar
          <div className="flex flex-col col-span-2">
            <label htmlFor="avatar" className="mb-1 text-gray-700 font-medium">
              Avatar
            </label>
            <input
              id="avatar"
              type="file"
              required
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.avatar && (
              <span className="text-red-500 text-sm mt-1">{error.avatar}</span>
            )}
          </div>

          Subjects
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="subjects"
              className="mb-1 text-gray-700 font-medium"
            >
              Subjects
            </label>
            <select
              id="subjects"
              // multiple
              required
              value={subjects}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setSubjects(selected);
              }}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="maths">Maths</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="history">History</option>
              <option value="economics">Economics</option>
            </select>
            {error.subjects && (
              <span className="text-red-500 text-sm mt-1">
                {error.subjects}
              </span>
            )}
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {loading && (
            <Spinner
              message="Processing..."
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          {(error.username || error.password) && (
            <p className="text-red-500 col-span-2 text-center">
              {error.username || error.password}
            </p>
          )}
          {/* Back to Home Button */}
          <div className="col-span-2 flex justify-center">
            <a href="/">
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105 flex items-center gap-2">
                <ChevronLeftOutlined /> Back to Home
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
