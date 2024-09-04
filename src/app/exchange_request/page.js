// pages/todo.js
"use client";
import React, { useEffect, useState } from "react";
import ExchangeRequestList from "../components/ExchangeRequestList";
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

const ExchangeRequest = () => {
  const [user, setUser] = useState(null);

  const fetchExchangeRequests = async (showToast = true) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "http://localhost:3000/api/v1/exchange/exchange-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("My exchange requests: ", response);
      if (response.status === 200) {
        setExchangeRequests(response.data.data);
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
          "Failed to getting exchange request. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Failed to getting exchange request. Please try again later"
      );
    }
  };

  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [accept, setAccept] = useState("");
  const [reject, setReject] = useState("");

  const fullfilledRequest = async (requestId, status) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `http://localhost:3000/api/v1/exchange/${requestId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("My exchange requests: ", response);
      if (response.status === 200) {
        fetchExchangeRequests();
      } else {
        toast.error(
          response.data.message ||
            "Error occurred while fullfilling exchange requests"
        );
        console.error(
          response.data.message ||
            "Error occurred while fullfilling exchange requests"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to getting fullfilling exchange requests. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Failed to getting fullfilling exchange requests. Please try again later"
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
    }
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
    fetchExchangeRequests(token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav selected="Exchange Requests" user={user} />
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Exchange Requests
            </h1>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ExchangeRequestList
            requests={exchangeRequests}
            fetchExchangeRequests={fetchExchangeRequests}
            fullfilledRequest={fullfilledRequest}
          />
        </div>
      </main>
    </div>
  );
};

export default ExchangeRequest;
