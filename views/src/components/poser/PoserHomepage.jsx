import React, { useState, useEffect } from "react";

const PoserHomepage = () => {
  const [poser, setPoser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [poserId, setPoserId] = useState(null);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isPostConfirm, setPostConfirm] = useState(false);
  const [isImageClick, setIsImageClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [isLikesHovered, setIsLikesHovered] = useState(false);
  const [showAllComments, setShowAllComments] = useState({});

  useEffect(() => {
    fetch("/poserHomepage")
      .then((response) => response.json())
      .then((data) => {
        setPoser(data.poser);
        setPosts(data.posts);
        setPoserId(data.poser._id);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleLogout = () => {
    fetch("/logoutPoser")
      .then((response) => {
        if (response.ok) {
          window.location.href = "/loginPoser";
        }
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const togglePost = () => {
    setIsPostOpen(!isPostOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmPost = (event) => {
    event.preventDefault();
    setPostConfirm(true);
  };

  const cancelPost = () => {
    setPostConfirm(false);
  };

  const submitPost = () => {
    const postForm = document.getElementById("post-form");
    postForm.submit();
  };

  const imageClick = (imageSrc) => {
    setClickedImage(imageSrc);
    setIsImageClick(true);
  };

  const closeModal = () => {
    setIsImageClick(false);
    setClickedImage(null);
  };

  const handleLikeToggle = async (postId) => {
    try {
      const response = await fetch(`/toggleLike/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Toggle Like Error:", error);
    }
  };

  const handleLikesMouseEnter = () => {
    setIsLikesHovered(true);
  };

  const handleLikesMouseLeave = () => {
    setIsLikesHovered(false);
  };

  const handleShowAllComments = (postId) => {
    setShowAllComments((prevShowAllComments) => ({
      ...prevShowAllComments,
      [postId]: !prevShowAllComments[postId],
    }));
  };

  const handleCommentSubmit = async (postId, commentText) => {
    try {
      const response = await fetch(`/addComment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      });
      const newComment = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div className="bg-gray-200">
      <div className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg z-10">
        {poser ? (
          <button className="text-lg" onClick={() => window.location.reload()}>
            {poser.poserName}
          </button>
        ) : (
          <p>Loading...</p>
        )}
        <button
          className="bg-green-500 px-2 py-1 rounded text-sm hover:bg-green-600 shadow"
          onClick={togglePost}
        >
          Add Post
        </button>
        <button
          className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600 shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isPostOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4 text-gray-800">Add Post</h2>
            <form
              method="post"
              id="post-form"
              action="/poserHomepage"
              encType="multipart/form-data"
              onSubmit={confirmPost}
              className="mt-4"
            >
              <div
                className="flex flex-col items-center bg-blue-500 rounded p-2 hover:bg-blue-600 cursor-pointer"
                onClick={() => document.getElementById("poserImage").click()}
              >
                <span htmlFor="poserImage" className="text-white">
                  Select an image*
                </span>
                <input
                  type="file"
                  name="poserImage"
                  id="poserImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </div>
              {preview && (
                <div className="flex justify-center items-center w-100 h-100 border px-8">
                  <img src={preview} alt="Selected" className="object-cover" />
                </div>
              )}
              <textarea
                type="text"
                name="poserPost"
                id="poserPost"
                placeholder="Write your post..."
                autoComplete="off"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                rows="4"
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 p-2 rounded hover:bg-blue-600 text-white shadow"
                >
                  Post
                </button>
                <button
                  type="button"
                  className="bg-gray-500 p-2 rounded hover:bg-gray-600 text-white shadow"
                  onClick={togglePost}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        id="confirmation-post"
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${
          isPostConfirm ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white border p-4 shadow-lg rounded">
          <p>Are you sure you want to post this?</p>
          <div className="flex justify-end m-2">
            <button
              onClick={submitPost}
              className="bg-blue-500 text-white px-2 py-1 rounded m-1 hover:bg-blue-600"
            >
              Yes
            </button>
            <button
              onClick={cancelPost}
              className="bg-gray-500 text-white px-2 py-1 rounded m-1 hover:bg-gray-600"
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-4 border-b-2 bg-gray-100 my-4 rounded-lg shadow-md"
            >
              <p className="text-gray-800 font-semibold">{post.poserName}</p>
              <p className="text-gray-500 text-sm">
                {formatDateTime(post.createdAt)}
              </p>

              <div className="mt-4">
                {post.poserImage && (
                  <img
                    src={`/uploads/posts/${post.poserImage}`}
                    alt={`Post by ${post.poserName}`}
                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                    onClick={() =>
                      imageClick(`/uploads/posts/${post.poserImage}`)
                    }
                  />
                )}
              </div>

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
              <p className="mt-4 text-gray-800 whitespace-pre-wrap">
                {post.poserPost}
              </p>
              <form
                className="mt-4"
                data-post-id={post._id}
                onSubmit={(e) => e.preventDefault()}
              >
                <button
                  className={`px-3 py-1 text-white rounded-md ${
                    post.likedByPosers.some(
                      (poser) => poser._id.toString() === poserId
                    )
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                  onClick={() => handleLikeToggle(post._id)}
                >
                  {post.likedByPosers.some(
                    (poser) => poser._id.toString() === poserId
                  )
                    ? "Liked"
                    : "Like"}
                </button>
              </form>

              {post.likes > 0 && (
                <div className="mb-1">
                  <p
                    className="text-gray-600 cursor-pointer inline-block mt-2"
                    onMouseEnter={handleLikesMouseEnter}
                    onMouseLeave={handleLikesMouseLeave}
                  >
                    Likes: <span>{post.likes}</span>
                  </p>

                  {isLikesHovered && (
                    <div className="absolute bg-black opacity-90 border rounded-md p-2 mt-1 z-10">
                      <div className="text-gray-100">
                        {post.likedByUsers.map((user) => (
                          <div key={user._id}>{user.username}</div>
                        ))}
                        {post.likedByPosers.map((poser) => (
                          <div key={poser._id}>{poser.poserName}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <h3 className="text-lg font-bold mt-4">
                Comments ({post.comments.length})
              </h3>
              <div className="bg-white rounded mt-1 shadow-lg">
                {(showAllComments[post._id]
                  ? post.comments
                  : post.comments.slice(0, 3)
                ).map((comment) => (
                  <div
                    key={comment._id}
                    className={`flex justify-${
                      comment.commenterId.toString() === poserId
                        ? "end"
                        : "start"
                    }`}
                  >
                    <div
                      className={`${
                        comment.commenterId.toString() === poserId
                          ? "bg-blue-200"
                          : "bg-gray-200"
                      } rounded shadow-md px-4 py-1 m-2`}
                    >
                      <div className="font-medium">
                        {comment.commenterName} ({comment.commenterType})
                      </div>
                      <div className="text-gray-800 whitespace-pre-wrap">
                        {comment.commentText}
                      </div>
                    </div>
                  </div>
                ))}
                {post.comments.length > 3 && (
                  <div className="flex justify-end m-2">
                    <button
                      onClick={() => handleShowAllComments(post._id)}
                      className="mt-2 text-blue-500"
                    >
                      {showAllComments[post._id]
                        ? "Show Less"
                        : "Show All Comments"}
                    </button>
                  </div>
                )}
              </div>

              <form
                className="mt-2"
                data-post-id={post._id}
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentText = e.target.commentText.value;
                  handleCommentSubmit(post._id, commentText);
                  e.target.commentText.value = "";
                }}
              >
                <textarea
                  name="commentText"
                  placeholder="Write your comment..."
                  required
                  className="block w-full border border-gray-300 p-2 mb-2 rounded-lg shadow focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Add Comment
                </button>
              </form>
            </div>
          ))
        ) : (
          <p className="text-center italic">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PoserHomepage;
