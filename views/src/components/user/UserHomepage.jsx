import React, { useState, useEffect } from "react";

const UserHomepage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isImageClick, setIsImageClick] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [isLikesHovered, setIsLikesHovered] = useState(false);
  const [showAllComments, setShowAllComments] = useState({});

  useEffect(() => {
    fetch("/userHomepage")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
        setUserId(data.user._id);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleLogout = () => {
    fetch("/logoutUser")
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        }
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const imageClick = (imageSrc) => {
    setClickedImage(imageSrc);
    setIsImageClick(true);
  };

  const closeModal = () => {
    setIsImageClick(false);
    setClickedImage(null);
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
        {user ? (
          <button className="text-lg" onClick={() => window.location.reload()}>
            {user.username}
          </button>
        ) : (
          <p>Loading...</p>
        )}

        <button
          className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600 shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
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
                  type="button"
                  className={`px-3 py-1 text-white rounded-md ${
                    post.likedByUsers.some(
                      (user) => user._id.toString() === userId
                    )
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                  onClick={() => handleLikeToggle(post._id)}
                >
                  {post.likedByUsers.some(
                    (user) => user._id.toString() === userId
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
                      comment.commenterId.toString() === userId
                        ? "end"
                        : "start"
                    }`}
                  >
                    <div
                      className={`${
                        comment.commenterId.toString() === userId
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

export default UserHomepage;
