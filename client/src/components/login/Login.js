import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      // className="h-screen w-screen backdrop-blur-md flex  justify-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <header className="flex items-center mb-8 space-x-4">
        <h1 className="text-3xl font-bold text-black text-center">
          ADEKUNLE AJASIN UNIVERSITY
        </h1>
      </header>
      <main className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="  bg-white text-black border font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
          Are you an Admin?{" "}
          <Link
            to="/login/adminlogin"
            className="underline hover:text-yellow-500"
          >
            Sign In
          </Link>{" "}
          or{" "}
          <Link
            to="/register/admin-register"
            className="underline hover:text-yellow-500"
          >
            Register
          </Link>
        </div>
        <div className="bg-white text-black border font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
          {/* Are you a Faculty?{" "} */}
          Are you a Staff?{" "}
          <Link
            to="/login/facultylogin"
            className="underline hover:text-yellow-500"
          >
            Sign In
          </Link>{" "}
          or{" "}
          <Link
            to="/register/faculty-register"
            className="underline hover:text-yellow-500"
          >
            Register
          </Link>
        </div>
        <div className="bg-white text-black border font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">
          Are you a Student?{" "}
          <Link
            to="/login/studentlogin"
            className="underline hover:text-yellow-500"
          >
            Sign In
          </Link>{" "}
          or{" "}
          <Link
            to="/register/student-register"
            className="underline hover:text-yellow-500"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
