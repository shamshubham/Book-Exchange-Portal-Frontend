"use client";
import { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";

const ExchangeList = ({ requests, fullfilledRequest }) => {
  return (
    <div>
      <ul role="list" className="space-y-4">
        {requests.length === 0 ? (
          <div className="flex items-center justify-center h-1/2 w-full text-black-900 font-bold text-3xl">
            No Requests Found!
          </div>
        ) : (
          requests.map((request) => (
            <li
              key={request._id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-x-4">
                <img
                  alt={`${request.bookDetails.title} cover`}
                  src="https://images.unsplash.com/photo-1546521677-b3a9b11bee6f?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {request.bookDetails.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                      {request.bookDetails.genre}
                    </span>
                    <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                      {request.bookDetails.author}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    {request.note}
                  </p>
                </div>
                {request.status === "accepted" ||
                request.status === "rejected" ||
                request.status === "cancelled" ? (
                  <div className="mt-2 flex items-center text-gray-700 text-sm">
                    <span className="font-semibold mr-2">Status:</span>{" "}
                    <div className="text-[18px] font-bold tracking-wider uppercase bg-gray-100 px-2 py-1 rounded-md">
                      {request.status}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      className={`${
                        request.status === "accepted" ||
                        request.status === "rejected"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2`}
                      onClick={() => fullfilledRequest(request._id, "accepted")}
                      disabled={
                        request.status === "accepted" ||
                        request.status === "rejected"
                      }
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      <span>Accept</span>
                    </button>
                    <button
                      className={`${
                        request.status === "accepted"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2`}
                      onClick={() => fullfilledRequest(request._id, "rejected")}
                      disabled={
                        request.status === "accepted" ||
                        request.status === "rejected"
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ExchangeList;
