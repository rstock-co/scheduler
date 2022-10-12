/* eslint-disable import/first */
import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

import "index.scss";

import Application from "./components/Application";

ReactDOM.render(<Application />, document.getElementById("root"));
