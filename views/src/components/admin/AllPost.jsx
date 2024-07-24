import React, { useEffect, useState } from "react";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [editPost, setEditPost] = useState({
    poserPost: "",
    poserImage: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [isImageClick, setIsImageClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  useEffect(() => {
    fetch("/allPost")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDeleteClick = (id) => {
    setPostId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (post) => {
    setPostId(post._id);
    setEditPost({ poserPost: post.poserPost, poserImage: post.poserImage });
    setShowEditModal(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`/post/deletePost/${postId}`, { method: "DELETE" })
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
        setShowDeleteModal(false);
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`/post/editPost/${postId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setPosts(
          posts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
        setShowEditModal(false);
        setEditPost({ poserPost: "", poserImage: "" });
        setNewImage(null);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setNewImage(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "deleteModal") {
      setShowDeleteModal(false);
    } else if (event.target.id === "editModal") {
      setShowEditModal(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImage(null);
    }
  };

  const handleImageClick = (imageSrc) => {
    setClickedImage(imageSrc);
    setIsImageClick(true);
  };

  const closeModal = () => {
    setIsImageClick(false);
    setClickedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center p-4">
      <h1 className="text-4xl text-white font-bold mb-8">All Posts</h1>
      <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
          >
            <img
              src={`/uploads/posts/${post.poserImage}`}
              alt={`Post by ${post.poserName}`}
              className="w-32 h-32 object-cover mb-4 mx-auto cursor-pointer"
              onClick={() =>
                handleImageClick(`/uploads/posts/${post.poserImage}`)
              }
            />
            <p className="text-gray-700 mb-4">{post.poserPost}</p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleEditClick(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDeleteClick(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div
          id="deleteModal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <p className="mb-4">Are you sure you want to delete this post?</p>
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

      {showEditModal && (
        <div
          id="editModal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <form
              id="editForm"
              onSubmit={handleEditSubmit}
              encType="multipart/form-data"
            >
              <img
                id="editImage"
                src={newImage || `/uploads/posts/${editPost.poserImage}`}
                alt="Post"
                className="w-32 h-32 object-cover mb-4 mx-auto"
              />
              <textarea
                id="editText"
                name="poserPost"
                value={editPost.poserPost}
                onChange={(e) =>
                  setEditPost({
                    ...editPost,
                    poserPost: e.target.value,
                  })
                }
                className="border rounded p-2 mb-4 w-full"
                rows="4"
              />
              <input
                type="file"
                name="poserImage"
                className="hidden"
                id="fileInput"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 block text-center hover:bg-blue-700 cursor-pointer"
              >
                Choose File
              </label>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isImageClick && clickedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={clickedImage}
              alt="Clicked post"
              className="w-auto max-h-screen object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPost;
