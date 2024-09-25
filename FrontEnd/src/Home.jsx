import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    dateOfJoining: "",
    salary: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:5000/createuser", inputUser);
    console.log(res);
    fetchAllUser();
  };

  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:5000/readalluser");
    console.log(res);
    setUserData(res.data);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <div className="bg-orange-100">
      {/* Creating Employee form */}
      <div className="w-full items-center  lg:px-0">
        <h1 className="text-4xl font-bold mt-10 text-center">Task-5</h1>
        <h1 className=" text-center">
          Create an application that enables users to input and manage employee
          data. Additionally, provide a feature to download the list of all
          employees as a CSV file.
        </h1>
        <div className=" bg-white border shadow sm:rounded-lg flex justify-center flex-1 mx-60 my-10">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr1o-lrNo2SpV6vK3B9__fzC4LCVnIlfLRjQztrM7Lt4kyNgBh7ADI2bEM6KTApx1dJg&usqp=CAU"
              alt=""
            />
          </div>
          <div className="w-2/5 mx-auto my-5">
            <h1 className="text-4xl font-bold  text-center">
              Employee Details
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              {/* Form Fields */}
              {[
                {
                  label: "Name",
                  type: "text",
                  name: "name",
                  placeholder: "Enter name",
                },
                {
                  label: "Email",
                  type: "email",
                  name: "email",
                  placeholder: "Enter email",
                },
                {
                  label: "Phone Number",
                  type: "text",
                  name: "phoneNumber",
                  placeholder: "Enter phone number",
                },
                {
                  label: "Position",
                  type: "text",
                  name: "position",
                  placeholder: "Enter position",
                },
                {
                  label: "Date of Joining",
                  type: "date",
                  name: "dateOfJoining",
                },
                {
                  label: "Salary",
                  type: "number",
                  name: "salary",
                  placeholder: "Enter salary",
                },
              ].map((field, index) => (
                <div key={index} className="flex justify-between items-center">
                  <label className="text-sm text-gray-500 w-1/3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="block py-2.5 px-3 w-2/3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded"
                    placeholder={field.placeholder}
                    required
                    value={inputUser[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-center my-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Displaying all users in Table */}
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th className="px-6 py-3">SN</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Date of Joining</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr
                key={item._id}
                className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{item?.name}</td>
                <td className="px-6 py-4">{item?.email}</td>
                <td className="px-6 py-4">{item?.phoneNumber}</td>
                <td className="px-6 py-4">{item?.position}</td>
                <td className="px-6 py-4">{item?.dateOfJoining}</td>
                <td className="px-6 py-4">{item?.salary}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
