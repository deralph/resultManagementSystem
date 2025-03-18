import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center space-y-16 p-6">
        <h1 className="text-3xl font-semibold text-white bg-black bg-opacity-75 rounded-xl w-full text-center py-4">
          ADEKUNLE AJASIN UNIVERSITY
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Admin Card */}
          <div className="flex flex-col items-center justify-center space-y-6 bg-[#E91E63] bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-extrabold text-white">Admin</h2>
            <Link
              to="/register/admin-register"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Register
            </Link>
            <Link
              to="/login/adminlogin"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Login
            </Link>
          </div>
          {/* Faculty Card */}
          <div className="flex flex-col items-center justify-center space-y-6 bg-[#5a51d6] bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-extrabold text-white">Faculty</h2>
            <Link
              to="/register/faculty-register"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Register
            </Link>
            <Link
              to="/login/facultylogin"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Login
            </Link>
          </div>
          {/* Student Card */}
          <div className="flex flex-col items-center justify-center space-y-6 bg-[#d65158] bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-extrabold text-white">Student</h2>
            <Link
              to="/register/student-register"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Register
            </Link>
            <Link
              to="/login/studentlogin"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
