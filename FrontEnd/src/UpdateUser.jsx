import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    dateOfJoining: "",
    salary: "",
  });

  const { id } = useParams();

  // Data fetching for single user
  const fetchSingleUser = async () => {
    const res = await axios.get(`http://localhost:5000/read/${id}`);
    console.log(res);
    setInputUser({
      name: res.data.name,
      email: res.data.email,
      phoneNumber: res.data.phoneNumber,
      position: res.data.position,
      dateOfJoining: res.data.dateOfJoining,
      salary: res.data.salary,
    });
  };

  useEffect(() => {
    fetchSingleUser();
  }, []);
  
  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputUser);
    const res = await axios.put(
      `http://localhost:5000/updateuser/${id}`,
      inputUser
    );
    console.log(res);
    if (res.status === 200) {
      window.location = "/";
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Update User</h1>

        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="email"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email"
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label className=" text-sm text-gray-500 ">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter phone number"
            required
            value={inputUser.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label className=" text-sm text-gray-500 ">Position</label>
          <input
            type="text"
            name="position"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter position"
            required
            value={inputUser.position}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label className=" text-sm text-gray-500 ">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            required
            value={inputUser.dateOfJoining}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label className=" text-sm text-gray-500 ">Salary</label>
          <input
            type="number"
            name="salary"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter salary"
            required
            value={inputUser.salary}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
