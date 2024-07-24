import React from "react";
import { Link } from "react-router-dom";

const AdminHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl text-white font-bold mb-8">Welcome Admin!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link
          to="/allUser"
          className="transform transition-transform hover:scale-105"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">All User</h2>
            <p className="text-gray-700">View and manage all users.</p>
          </div>
        </Link>
        <Link
          to="/allPoser"
          className="transform transition-transform hover:scale-105"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">All Poser</h2>
            <p className="text-gray-700">View and manage all posers.</p>
          </div>
        </Link>
        <Link
          to="/allPost"
          className="transform transition-transform hover:scale-105"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">All Post</h2>
            <p className="text-gray-700">View and manage all posts.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomepage;
