import React from "react";

export function NoPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <img
          src="../Images/error-404.avif"
          alt="Error 404"
          className="max-w-[200px] mb-8"
        />
        <a href="/" className="mx-auto text-lg text-blue-500 hover:underline">
          Go back to homepage
        </a>
      </div>
    </>
  );
}

export default NoPage();
