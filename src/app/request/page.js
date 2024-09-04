"use client";
import React, { useEffect, useState } from "react";
import RequestList from "../components/RequestList";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { title } from "process";

const Request = () => {
  const [user, setUser] = useState(null);

  const fetchRequests = async (showToast = true) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://book-exchange-portal-backend.onrender.com/api/v1/exchange",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("My Requests...", response);
      if (response.status === 200) {
        setRequests(response.data.data);
      } else {
        toast.error(
          response.data.message || "Error occurred while fetching requests"
        );
        console.error(
          response.data.message || "Error occurred while fetching requests"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to get tasks. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Failed to get tasks. Please try again later"
      );
    }
  };

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
    }
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
    fetchRequests(token);
  }, []);

  const deleteRequest = async (e, id) => {
    console.log(id);
    e.stopPropagation();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://book-exchange-portal-backend.onrender.com/api/v1/exchange/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Request deleted successfully"); // Getting this two times
        fetchRequests(token, false);
      } else {
        toast.error(
          response.data.message || "Error occurred while deleting request"
        );
        console.error(response || "Error occurred while deleting request");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error deleting request. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Error deleting request. Please try again later"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav selected="Your Requests" user={user} />
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Your Requests</h1>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <RequestList requests={requests} deleteRequest={deleteRequest} />
        </div>
      </main>
    </div>
  );
};

export default Request;
