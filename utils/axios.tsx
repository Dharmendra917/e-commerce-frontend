"use client";

import axios from "axios";

const loginapp = axios.create({
  // baseURL: "https://e-commerce-backend-g96o.onrender.com/",
  baseURL: "http://localhost:4999/",
  withCredentials: true,
  // headers: {
  //   Authorization: token ? token : "",
  // },
});

export default loginapp;
