import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../service/axios";

function AddDevice() {
  const navigate = useNavigate();
  const [systemNameInfo, setSytemName] = useState("");
  const [systemType, setSytemType] = useState("");
  const [systemMemory, setSytemMemory] = useState("");

  const onSubmit = async () => {
    if (systemNameInfo === "" || systemType === "" || systemMemory === "") {
      return alert("fields are required");
    } else {
      await axiosInstance.post("/devices", {
        system_name: systemNameInfo,
        type: systemType,
        hdd_capacity: systemMemory,
      });
      navigate("/");
    }
  };
  return (
    <div className="p-14">
      <div className="pb-3 text-3xl text-center uppercase border-b-2 border-gray-400">
        <h2>Add New Device</h2>
      </div>
      <div className="flex items-center justify-between py-5">
        <h2 className="w-2/5 text-lg">System Name:</h2>
        <input
          onChange={(e) => setSytemName(e.currentTarget.value)}
          className="w-3/5 p-2 text-sm border-2 border-gray-300 rounded-lg"
          type="text"
          placeholder="input system name"
        />
      </div>
      <div className="flex items-center justify-between py-5">
        <h2 className="w-2/5 text-lg">Type:</h2>
        <select
          onChange={(e) => setSytemType(e.currentTarget.value)}
          className="w-3/5 p-2 text-sm border-2 border-gray-300 rounded-lg"
        >
          <option hidden>Choose</option>
          <option value="WINDOWS_WORKSTATION">WINDOWS_WORKSTATION</option>
          <option value="MAC">MAC</option>
          <option value="WINDOWS_SERVER">WINDOWS_SERVER</option>
        </select>
      </div>
      <div className="flex items-center justify-between py-5">
        <h2 className="w-2/5 text-lg">HDD Capacity:</h2>
        <input
          onChange={(e) => setSytemMemory(e.currentTarget.value)}
          className="w-3/5 p-2 text-sm border-2 border-gray-300 rounded-lg"
          type="text"
          placeholder="input hdd capacity"
        />
      </div>
      <div className="flex justify-end">
        <Link to="/">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Back
          </button>
        </Link>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddDevice;
