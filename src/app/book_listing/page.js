// pages/todo.js
"use client";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import OwnBookList from "../components/OwnBooksList";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import OwnBookModal from "../components/OwnBookModal";
import axios from "axios";
import { title } from "process";

const BookListing = () => {
  const [user, setUser] = useState(null);

  const fetchBookListing = async (showToast = true) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://book-exchange-portal-backend.onrender.com/api/v1/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setBookListing(response.data.data);
      } else {
        toast.error(
          response.data.message || "Error occurred while fetching tasks"
        );
        console.error(
          response.data.message || "Error occurred while fetching tasks"
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

  const [bookListing, setBookListing] = useState([]);

  const [editBook, setEditBook] = useState(null);

  const deleteTodo = async (e, id) => {
    console.log(id);
    e.stopPropagation();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://book-exchange-portal-backend.onrender.com/api/v1/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Book deleted successfully"); // Getting this two times
        fetchBookListing(token, false);
      } else {
        toast.error(
          response.data.message || "Error occurred while deleting Book"
        );
        console.error(response || "Error occurred while deleting Book");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error deleting Book. Please try again later"
      );
      console.error(
        error.response?.data?.message ||
          "Error deleting Book. Please try again later"
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
    fetchBookListing(token);
  }, []);

  const editTd = (e, book) => {
    e.stopPropagation();
    setEditBook(book);
    if (book) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditBook(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav selected="Book Listing" user={user} />
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Add Book</h1>
            <div className="flex items-center space-x-4">
              <PlusCircleIcon
                aria-hidden="true"
                className="h-8 w-8"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <OwnBookModal
            open={isModalOpen}
            setOpen={handleModalClose}
            bookListing={bookListing}
            editBookDetails={editBook}
            onClose={handleModalClose}
            fetchBookListing={fetchBookListing}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <OwnBookList
              bookListingBooks={bookListing}
              editTd={editTd}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookListing;
