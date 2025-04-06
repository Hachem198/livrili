import React from "react";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="text-center px-6 py-8 max-w-md mx-auto rounded-lg bg-gray-800 shadow-xl border border-gray-700">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          We're sorry, but we couldn't complete your request.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium transition-colors w-full"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
