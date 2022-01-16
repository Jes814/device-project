import React from "react";
import { Routes, Route } from "react-router-dom";
import AddDevice from "./components/AddDevice";
import Dashboard from "./components/Dashboard";
import EditDevice from "./components/EditDevice";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/edit-device/:editId" element={<EditDevice />} />
        <Route path="/add-new-device" element={<AddDevice />} />
        <Route index element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
