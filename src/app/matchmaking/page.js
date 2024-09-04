// pages/todo.js
"use client";
import React, { useEffect, useState } from "react";
import MatchMakingList from "../components/MatchMakingList";
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
import RequestModal from "../components/RequestModal";

const Matchmaking = () => {
  const [user, setUser] = useState(null);

  const fetchMatchmakingBooks = async (showToast = true) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "http://localhost:3000/api/v1/books/matchmaking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setMatchmakingBooks(response.data.data);
      } else {
        toast.error(
          response.data.message ||
            "Error occurred while fetching matchmaking books"
        );
        console.error(
          response.data.message ||
            "Error occurred while fetching matchmaking books"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to get matchmaking books. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Failed to get matchmaking books. Please try again later"
      );
    }
  };

  const [matchmakingBooks, setMatchmakingBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
    }
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setUser(userDetails);
    fetchMatchmakingBooks(token);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav selected="Matchmaking" user={user} />
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="align-top">Recommended Books</span>
            </h1>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RequestModal
            open={isModalOpen}
            setOpen={handleModalClose}
            bookId={bookId}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <MatchMakingList
              matchmakingBooks={matchmakingBooks}
              setIsModalOpen={setIsModalOpen}
              setBookId={setBookId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matchmaking;
