"use client";

import axios from "axios";
const token = localStorage.getItem("token");
console.log(token, "axios file");

const loginapp = axios.create({
  baseURL: "https://e-commerce-backend-g96o.onrender.com/",
  // baseURL: "http://localhost:4999/",
  withCredentials: true,
  headers: {
    Authorization: token ? token : "",
  },
});

export default loginapp;
