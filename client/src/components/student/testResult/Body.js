import React, { useEffect, useState, useMemo } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { SET_ERRORS } from "../../../redux/actionTypes";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  // Retrieve test results from Redux; fallback to sample data if empty.
  const testResultFromStore = useSelector(
    (state) => state.student.testResult.result
  );
  const sampleTestResult = [
    {
      subjectCode: "CSC 201",
      subjectName: "Introduction to Algorithm",
      test: 20,
      marks: 45,
      totalMarks: 65,
    },
    {
      subjectCode: "CSC 205",
      subjectName: "Operating System I",
      test: 25,
      marks: 50,
      totalMarks: 75,
    },
    {
      subjectCode: "CSC 215",
      subjectName: "Assembly Language",
      test: 15,
      marks: 35,
      totalMarks: 50,
    },
    {
      subjectCode: "CSC 211",
      subjectName: "Introduction to programming",
      test: 28,
      marks: 43,
      totalMarks: 71,
    },
    {
      subjectCode: "ENT 201",
      subjectName: "Entrepreneur",
      test: 20,
      marks: 42,
      totalMarks: 62,
    },
  ];
  const displayResult =
    testResultFromStore && testResultFromStore.length > 0
      ? testResultFromStore
      : sampleTestResult;

  // Augment each course with a random unit property (2 or 3).
  // useMemo prevents reassigning new random units on every render.
  const displayResultWithUnits = useMemo(() => {
    return displayResult.map((item) => ({
      ...item,
      unit: item.unit || (Math.random() > 0.5 ? 2 : 3),
    }));
  }, [displayResult]);

  // Listen for errors in Redux and update local error state.
  const store = useSelector((state) => state);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Calculate grade based on percentage (marks / totalMarks * 100)
  const computeGrade = (marks, totalMarks) => {
    const percentage = totalMarks;
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    if (percentage >= 30) return "E";
    return "F";
  };

  // Mapping from letter grade to grade points on a 5-point scale.
  const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

  // Compute GPA as the weighted average of grade points by course unit.
  const computedGPA = useMemo(() => {
    const totalWeighted = displayResultWithUnits.reduce((acc, item) => {
      const grade = computeGrade(item.marks, item.totalMarks);
      return acc + gradePoints[grade] * item.unit;
    }, 0);
    const totalUnits = displayResultWithUnits.reduce(
      (acc, item) => acc + item.unit,
      0
    );
    return totalUnits ? (totalWeighted / totalUnits).toFixed(2) : "N/A";
  }, [displayResultWithUnits]);

  return (
    <div className="flex-grow mt-3">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center text-gray-400 space-x-2">
          <MenuBookIcon />
          <h1 className="text-xl font-semibold">All Courses</h1>
        </div>
        {/* GPA Display */}
        <div className="mr-10 text-right font-bold text-lg">
          GPA: {computedGPA}
        </div>
        {/* Table Container */}
        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-auto md:h-[29.5rem] overflow-auto">
          {/* Table Header using Flex */}
          <div className="flex items-center border-b border-gray-200 pb-2">
            <span className="flex-[1] font-bold">Sr no.</span>
            <span className="flex-[1] font-bold">Course Code</span>
            <span className="flex-[2] font-bold">Course Name</span>
            <span className="flex-[1] font-bold">Test</span>
            <span className="flex-[1] font-bold">Marks Obtained</span>
            <span className="flex-[1] font-bold">Total Marks</span>
            <span className="flex-[1] font-bold">Unit</span>
            <span className="flex-[2] font-bold">Grade</span>
          </div>
          {/* Table Rows */}
          {displayResultWithUnits.map((res, idx) => (
            <div
              key={idx}
              className="flex items-center py-2 border-b border-gray-100"
            >
              <span className="flex-[1]">{idx + 1}</span>
              <span className="flex-[1]">{res.subjectCode}</span>
              <span className="flex-[2]">{res.subjectName}</span>
              <span className="flex-[1]">{res.test}</span>
              <span className="flex-[1]">{res.marks}</span>
              <span className="flex-[1]">{res.totalMarks}</span>
              <span className="flex-[1]">{res.unit}</span>
              <span className="flex-[2]">
                {computeGrade(res.marks, res.totalMarks)}
              </span>
            </div>
          ))}
          {/* Optional Error Display */}
          {error && error.someError && (
            <div className="text-red-500 text-center font-bold mt-4">
              {error.someError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
