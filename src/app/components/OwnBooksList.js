"use client";
import { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
const OwnBooksList = ({ bookListingBooks, editTd, deleteTodo }) => {
  return (
    <div>
      <ul role="list" className="space-y-4">
        {bookListingBooks.length === 0 ? (
          <div className="flex items-center justify-center h-1/2 w-full text-black-900 font-bold text-3xl">
            No Books Found!
          </div>
        ) : (
          bookListingBooks.map((book) => (
            <li
              key={book._id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-x-4">
                <img
                  alt={`${book.title} cover`}
                  src="https://images.unsplash.com/photo-1546521677-b3a9b11bee6f?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                      {book.author}
                    </span>
                    <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                      {book.genre}
                    </span>
                  </div>
                </div>
                <button
                  aria-label="Edit"
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200 ease-in-out"
                  onClick={(e) => editTd(e, book)}
                >
                  <PencilSquareIcon className="h-6 w-6" />
                </button>
                <button
                  aria-label="Delete"
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200 ease-in-out"
                  onClick={(e) => deleteTodo(e, book._id)}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OwnBooksList;
