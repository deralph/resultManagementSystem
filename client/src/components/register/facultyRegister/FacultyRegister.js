import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup
  .object({
    dob: yup.string().required("DOB is required"),
    name: yup.string().required("Name is required"),
    avatar: yup.string().required("Avatar is required"),
    gender: yup.string().required("Gender is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    department: yup.string().required("Department is required"),
    designation: yup.string().required("Designation is required"),
    joiningYear: yup.string().required("Joining date is required"),
    contactNumber: yup.string().required("Contact number is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
  })
  .required();

const defaultValues = {
  dob: "",
  name: "",
  email: "",
  avatar: "",
  username: "",
  password: "",
  department: "",
  joiningYear: "",
  showPassword: "",
  contactNumber: "",
};

const FacultyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    // Here you would dispatch your action, e.g.:
    // dispatch(
    //   addFaculty({
    //     ...data,
    //     joiningYear: new Date(data.joiningYear).getFullYear(),
    //   })
    // );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4">
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
            Welcome Staff!
          </h1>
          <p className="text-gray-600 text-center">
            Register your account to join our teaching community.
          </p>
        </div>

        {/* Right Panel – Registration Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`md:w-1/2 p-8 grid grid-cols-2 gap-4 transition-transform duration-1000 ${
            animate ? "translate-x-0" : "translate-x-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 col-span-2 text-center mb-4">
            Staff Registration
          </h2>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  id="email"
                  type="text"
                  placeholder="johndoe@email.com"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
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
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">
                {errors.username.message}
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
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
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
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 text-gray-700 font-medium">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select
                  id="gender"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            />
            {errors.gender && (
              <span className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </span>
            )}
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label
              htmlFor="designation"
              className="mb-1 text-gray-700 font-medium"
            >
              Designation
            </label>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <input
                  id="designation"
                  type="text"
                  placeholder="Teacher"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.designation ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.designation && (
              <span className="text-red-500 text-sm mt-1">
                {errors.designation.message}
              </span>
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-1 text-gray-700 font-medium">
              DOB
            </label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <input
                  id="dob"
                  type="date"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.dob && (
              <span className="text-red-500 text-sm mt-1">
                {errors.dob.message}
              </span>
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
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <input
                  id="department"
                  type="text"
                  placeholder="Department"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.department && (
              <span className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </span>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label
              htmlFor="contactNumber"
              className="mb-1 text-gray-700 font-medium"
            >
              Contact Number
            </label>
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <input
                  id="contactNumber"
                  type="number"
                  placeholder="Contact Number"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          {/* Joining Date */}
          <div className="flex flex-col">
            <label
              htmlFor="joiningYear"
              className="mb-1 text-gray-700 font-medium"
            >
              Joining Date
            </label>
            <Controller
              name="joiningYear"
              control={control}
              render={({ field }) => (
                <input
                  id="joiningYear"
                  type="date"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.joiningYear ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.joiningYear && (
              <span className="text-red-500 text-sm mt-1">
                {errors.joiningYear.message}
              </span>
            )}
          </div>

          {/* Avatar */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="avatar" className="mb-1 text-gray-700 font-medium">
              Avatar
            </label>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <input
                  id="avatar"
                  type="file"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.avatar ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {errors.avatar && (
              <span className="text-red-500 text-sm mt-1">
                {errors.avatar.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
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
        </form>
      </div>
    </div>
  );
};

export default FacultyRegister;
