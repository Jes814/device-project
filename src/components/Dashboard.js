import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../service/axios";

function Dashboard() {
  useEffect(() => {
    const response = async () => {
      let result = await axiosInstance.get("/devices");
      setDeviceList(result.data);
    };
    response();
  }, []);
  const [deviceList, setDeviceList] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const navigate = useNavigate();

  const editModalFunction = (deviceId) => {
    navigate(`/edit-device/${deviceId}`);
  };

  const deleteSelectedDevice = async (id) => {
    await axiosInstance.delete(`/devices/${id}`);
    window.location.reload();
  };

  const filterByType = () => {
    if (filterType === "ALL") {
      return deviceList.map((dev) => {
        return (
          <div
            key={dev.id}
            className="flex items-center justify-between py-5 text-center hover:bg-gray-100"
          >
            <h2 className="w-1/5 border-r-2">{dev.id}</h2>
            <h2 className="w-1/5 border-r-2">{dev.system_name}</h2>
            <h2 className="w-1/5 border-r-2">{dev.type}</h2>
            <h2 className="w-1/5 border-r-2">{dev.hdd_capacity}</h2>
            <h2 className="w-1/5">
              <div>
                <button
                  onClick={() => editModalFunction(dev.id)}
                  className="px-6 py-2 mx-5 text-gray-200 bg-blue-400 border-2 rounded-lg hover:text-blue-500 hover:bg-gray-200"
                >
                  Edit
                  <i className="pl-2 text-blue-500 far fa-edit hover:text-blue-500"></i>
                </button>
                <button
                  onClick={() => deleteSelectedDevice(dev.id)}
                  className="px-6 py-2 text-gray-100 bg-red-400 border-2 rounded-lg hover:text-red-500 hover:bg-gray-200"
                >
                  Delete
                  <i className="pl-2 text-red-500 fas fa-ban hover:text-red-500"></i>
                </button>
              </div>
            </h2>
          </div>
        );
      });
    } else {
      return deviceList
        .filter((device) => {
          return device.type.includes(filterType);
        })
        .sort((a, b) => a.system_name.localeCompare(b.system_name))
        .map((dev) => {
          return (
            <div
              key={dev.id}
              className="flex items-center justify-between py-5 text-center hover:bg-gray-100"
            >
              <h2 className="w-1/5 border-r-2">{dev.id}</h2>
              <h2 className="w-1/5 border-r-2">{dev.system_name}</h2>
              <h2 className="w-1/5 border-r-2">{dev.type}</h2>
              <h2 className="w-1/5 border-r-2">{dev.hdd_capacity}</h2>
              <h2 className="w-1/5">
                <div>
                  <button
                    onClick={() => editModalFunction(dev.id)}
                    className="px-6 py-2 mx-5 text-gray-200 bg-blue-400 border-2 rounded-lg hover:text-blue-500 hover:bg-gray-200"
                  >
                    Edit
                    <i className="pl-2 text-blue-500 far fa-edit hover:text-blue-500"></i>
                  </button>
                  <button
                    onClick={() => deleteSelectedDevice(dev.id)}
                    className="px-6 py-2 text-gray-100 bg-red-400 border-2 rounded-lg hover:text-red-500 hover:bg-gray-200"
                  >
                    Delete
                    <i className="pl-2 text-red-500 fas fa-ban hover:text-red-500"></i>
                  </button>
                </div>
              </h2>
            </div>
          );
        });
    }
  };

  return (
    <div>
      <h1 className="py-6 text-3xl text-center uppercase">List of Devices</h1>
      <div className="flex justify-end p-5">
        <Link to="/add-new-device">
          <button className="px-8 py-2 text-gray-100 uppercase bg-blue-600 border-2 border-blue-500 rounded-lg hover:text-gray-100 hover:bg-blue-500">
            Add New Device
            <i className="pl-2 text-white fa fa-plus"></i>
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-end">
        <div className="m-5 border-2 border-green-400">
          <select
            className="uppercase"
            onChange={(e) => setFilterType(e.currentTarget.value)}
          >
            <option value="ALL">ALL</option>
            <option value="WINDOWS_WORKSTATION">WINDOWS_WORKSTATION</option>
            <option value="MAC">MAC</option>
            <option value="WINDOWS_SERVER">WINDOWS_SERVER</option>
          </select>
        </div>
        <div className="m-5 border-2 border-green-400">
          <select
            className="uppercase"
            onChange={(e) => setFilterType(e.currentTarget.value)}
          >
            <option hidden>SORT FROM A-Z</option>
            <option value="WINDOWS_WORKSTATION">WINDOWS_WORKSTATION</option>
            <option value="MAC">MAC</option>
            <option value="WINDOWS_SERVER">WINDOWS_SERVER</option>
          </select>
        </div>
      </div>

      <div className="px-5">
        <div className="flex justify-between text-center border-2 border-blue-400">
          <h2 className="w-1/5 border-r-2">Id</h2>
          <h2 className="w-1/5 border-r-2">System Name</h2>
          <h2 className="w-1/5 border-r-2">Type</h2>
          <h2 className="w-1/5 border-r-2">HDD Capacity</h2>
          <h2 className="w-1/5">Actions</h2>
        </div>
      </div>
      <div className="px-5">
        <div className="mt-3 border-2 border-blue-400">{filterByType()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
