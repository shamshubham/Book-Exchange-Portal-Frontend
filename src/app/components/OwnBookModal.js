"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";
import { title } from "process";

export default function OwnBookModal({
  open,
  setOpen,
  bookListing,
  editBookDetails,
  onClose,
  fetchBookListing,
}) {
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
  }, []);

  useEffect(() => {
    console.log("editBookDetails", editBookDetails);
    if (editBookDetails) {
      fillEditBookDetails(editBookDetails);
    }
  }, [editBookDetails]);

  if (!open) return null;

  const addTodo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://book-exchange-portal-backend.onrender.com/api/v1/books",
        {
          title: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchBookListing(token);
      if (response.status == 201) {
        fetchBookListing(token);
        console.log("Response Status for update book ...", response.status);
        toast.success("Book added successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add task. Please try again later"
      );
      console.error(
        error.response || "Failed to add task. Please try again later"
      );
    }

    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
    onClose();
  };

  const fillEditBookDetails = (book) => {
    setEditBook(book);
    setBookTitle(book?.title || "");
    setBookAuthor(book?.author || "");
    setBookGenre(book?.genre || "");
  };

  const updateBook = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://book-exchange-portal-backend.onrender.com/api/v1/books/${editBook._id}`,
        {
          title: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        fetchBookListing(token);
        console.log("Response Status for update book ...", response.status);
        toast.success("Book updated successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update Book. Please try again later"
      );
      console.error(
        error.response || "Failed to update Book. Please try again later"
      );
    }
    setEditBook(null);
    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
    onClose();
  };

  const handleFormSubmit = (e) => {
    console.log("editBook", editBook);

    e.preventDefault();

    if (editBook) {
      updateBook();
    } else {
      addTodo();
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {editBook ? "Edit Book Details" : "Add Book Details"}
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      onSubmit={handleFormSubmit}
                      name="todoForm"
                      id="todoForm"
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Enter Book Title Name..."
                          value={bookTitle}
                          className="block w-[200%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400 sm:text-sm"
                          onChange={(e) => setBookTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Enter Book Author Name..."
                          value={bookAuthor}
                          className="block w-[200%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400 sm:text-sm"
                          onChange={(e) => setBookAuthor(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Enter Book Genre..."
                          value={bookGenre}
                          className="block w-[200%] rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400 sm:text-sm"
                          onChange={(e) => setBookGenre(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="todoForm"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {editBook ? "Update Book" : "Add Book"}
              </button>
              <button
                type="cancel"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
