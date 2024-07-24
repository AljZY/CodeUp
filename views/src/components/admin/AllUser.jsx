import React, { useEffect, useState } from "react";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("/allUser")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDeleteClick = (id) => {
    setUserId(id);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`/user/deleteUser/${userId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== userId));
          setShowModal(false);
        } else {
          console.error("Error deleting user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "deleteModal") {
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center p-4">
      <h1 className="text-4xl text-white font-bold mb-8">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            <h2 className="text-xl font-bold mb-2">{user.username}</h2>

            <p className="text-gray-700 mb-4">{user.email}</p>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleDeleteClick(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          id="deleteModal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded shadow-lg w-90">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
              >
                Yes
              </button>

              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
