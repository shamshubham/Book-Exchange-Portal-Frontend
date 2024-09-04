// pages/todo.js
"use client";
import React, { useEffect, useState } from "react";
import BookDiscoveryList from "../components/BookDiscoveryList";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import axios from "axios";
import RequestModal from "../components/RequestModal";

const BookDiscovery = () => {
  const [user, setUser] = useState(null);
  const [bookDiscovery, setBookDiscovery] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const fetchBookDiscoveryList = async (showToast = true) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:3000/api/v1/books/search?title=${searchTitle}&author=${searchAuthor}&genre=${searchGenre}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setBookDiscovery(response.data.data);
      } else {
        toast.error(
          response.data.message ||
            "Error occurred while fetching book discovery"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to get book discovery. Please try again later"
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
    fetchBookDiscoveryList();
  }, []);

  const handleSearch = () => {
    fetchBookDiscoveryList();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav selected="Book Discovery" user={user} />
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Find Your Book
            </h1>
            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="Search By Title ..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full sm:w-64 rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="search"
                placeholder="Search By Author ..."
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                className="w-full sm:w-64 rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="search"
                placeholder="Search By Genre ..."
                value={searchGenre}
                onChange={(e) => setSearchGenre(e.target.value)}
                className="w-full sm:w-64 rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RequestModal
            open={isModalOpen}
            setOpen={handleModalClose}
            onClose={handleModalClose}
            bookId={bookId}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BookDiscoveryList
              bookDiscovery={bookDiscovery}
              setIsModalOpen={setIsModalOpen}
              setBookId={setBookId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDiscovery;
