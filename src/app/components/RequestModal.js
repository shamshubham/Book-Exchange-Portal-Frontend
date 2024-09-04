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

export default function RequestModal({
  open,
  setOpen,
  bookListing,
  editBookDetails,
  onClose,
  fetchBookListing,
  bookId,
}) {
  const [requestMessage, setRequestMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
  }, []);

  if (!open) return null;

  const createRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      console.log(requestMessage, bookId);
      const response = await axios.post(
        "https://book-exchange-portal-backend.onrender.com/api/v1/exchange",
        {
          note: requestMessage,
          bookId: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 201) {
        console.log("Response Status for create request ...", response.status);
        toast.success("Request sent successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send request. Please try again later"
      );
      console.error(
        error.response || "Failed to send request. Please try again later"
      );
    }
    setRequestMessage("");
    onClose();
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
                  ></DialogTitle>
                  <div className="mt-2">
                    <form
                      onSubmit={createRequest}
                      name="todoForm"
                      id="todoForm"
                    >
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        Type Your Message
                      </div>
                      <textarea
                        placeholder="Enter your message..."
                        value={requestMessage}
                        className="block w-[265%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        onChange={(e) => setRequestMessage(e.target.value)}
                        rows={4}
                      />
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
                Send Request
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
