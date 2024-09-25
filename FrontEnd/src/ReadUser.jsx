import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null); // Initialize as null for loading state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/read/${id}`);
      setUserData(res.data);
    } catch (err) {
      setError("Failed to fetch user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const downloadCSV = () => {
    if (!userData) return;

    const csvData = [
      ["Name", "Email", "Phone Number", "Position", "Date of Joining", "Salary"],
      [userData.name, userData.email, userData.phoneNumber, userData.position, userData.dateOfJoining, userData.salary],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${userData.name}_data.csv`);
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5 text-center">Employee Detail</h2>
        {userData && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{userData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{userData.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Position:</span>
              <span>{userData.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date of Joining:</span>
              <span>{userData.dateOfJoining}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Salary:</span>
              <span>{userData.salary}</span>
            </div>
          </div>
        )}

        <button
          onClick={downloadCSV}
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 transition duration-200"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default ReadUser;
