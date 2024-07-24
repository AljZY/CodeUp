import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/signupUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-blue-900 via-red-900 to-yellow-600 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-t from-transparent via-blue-900 to-transparent opacity-20 rounded-full transform rotate-45"></div>
      <div className="absolute w-full h-full bg-gradient-to-l from-transparent via-red-900 to-transparent opacity-20 rounded-full transform -rotate-45"></div>
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-yellow-600 to-transparent opacity-20 rounded-full transform rotate-30"></div>
      <div className="absolute w-52 h-52 bg-white opacity-10 rounded-full top-1/4 left-1/4 transform rotate-45"></div>
      <div className="absolute w-80 h-80 bg-black opacity-10 rounded-full top-2/3 left-2/3 transform -rotate-45"></div>
      <div className="absolute w-40 h-40 bg-white opacity-15 rounded-full top-4/5 left-1/3 transform rotate-30"></div>

      <div className="relative h-screen flex flex-col justify-center items-center z-10">
        <div className="w-full md:w-1/2 px-4 sm:p-4 md:p-8 lg:p-12 xl:p-16">
          <div className="bg-white shadow-2xl rounded-lg p-8">
            <div className="flex flex-row">
              <img src="/logo.png" alt="logo" className="w-7 h-7 mr-1" />
              <div className="text-lg font-bold">CodeUp</div>
            </div>
            <div className="flex justify-end">
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded shadow mb-4"
              >
                Back
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-center uppercase">
              Sign up
            </h1>

            <form
              method="post"
              action="/signupUser"
              onSubmit={handleSignupSubmit}
              className="flex flex-col"
            >
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 mt-1  focus:outline-none"
                />
              </div>

              {error && <div className="text-red-500">{error}</div>}

              <button
                type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 py-2 px-4 mt-4"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Signup Successful</h2>
            <p className="mb-4">You have successfully signed up!</p>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupUser;
