import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
import { studentSignIn } from "../../../redux/actions/studentActions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const defaultValues = {
  username: "",
  password: "",
};

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    await dispatch(studentSignIn({ username, password }, navigate));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <a href="/">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105">
            Home
          </button>
        </a>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section – Welcome Message */}
        <div
          className={`md:w-1/2 p-8 flex flex-col justify-center items-center bg-gray-100 transition-transform duration-1000 ${
            animate ? "translate-x-0" : "-translate-x-10"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome Back, IPTP Student!
          </h1>
          <p className="text-gray-600 text-center">
            Sign in to access your IPTP dashboard and continue your learning journey.
          </p>
        </div>

        {/* Right Section – Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`md:w-1/2 p-8 flex flex-col justify-center space-y-6 bg-white transition-transform duration-1000 ${
            animate ? "translate-x-0" : "translate-x-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Student Login
          </h2>

          {/* Username Input */}
          <div className="flex flex-col">
            <label
              className="mb-1 text-gray-700 font-medium"
              htmlFor="username"
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
                  placeholder="Enter your username"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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

          {/* Password Input */}
          <div className="flex flex-col relative">
            <label
              className="mb-1 text-gray-700 font-medium"
              htmlFor="password"
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
                  placeholder="Enter your password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...field}
                />
              )}
            />
            {/* Password Visibility Toggle */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {loading && (
            <Spinner
              message="Logging In"
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

export default StudentLogin;
