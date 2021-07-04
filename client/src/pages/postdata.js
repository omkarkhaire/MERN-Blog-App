import React from "react";
import Sidebar from "../sidebar";
import Singlepost from "./singlepost";
import "./postdata.css";

const Postdata = () => {
  return (
    <div className="mainpostdata">
      <Singlepost />
      <Sidebar />
    </div>
  );
};

export default Postdata;
