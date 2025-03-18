import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  // Get test results from Redux (may be cleared later)
  const testResultFromStore = useSelector(
    (state) => state.student.testResult.result
  );

  // Sample test results to display if Redux doesn't have any data
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

  // Compute a derived value for display.
  // If Redux test results exist and are nonempty, use them; otherwise use sample data.
  const displayResult =
    testResultFromStore && testResultFromStore.length > 0
      ? testResultFromStore
      : sampleTestResult;

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  // Helper function to calculate grade based on percentage
  const computeGrade = (totalMarks) => {
    const percentage = totalMarks;
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    if (percentage >= 30) return "E";
    return "F";
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Courses</h1>
        </div>
        <div className="mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            {/* Conditions commented out for display */}
            {true && (
              <div className={classes.adminData}>
                {/* Updated grid columns to 9 */}
                <div className="grid grid-cols-9">
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Sr no.
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Course Code
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Course Name
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Test
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Marks Obtained
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Total Marks
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Grade
                  </h1>
                </div>
                {displayResult.map((res, idx) => (
                  <div
                    key={idx}
                    className={`${classes.adminDataBody} grid grid-cols-9`}
                  >
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {idx + 1}
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.subjectCode}
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {res.subjectName}
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.test}
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.marks}
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {res.totalMarks}
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {computeGrade(res.totalMarks)}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
