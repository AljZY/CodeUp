import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPoser = () => {
  const [poserName, setPoserName] = useState("");
  const [poserEmail, setPoserEmail] = useState("");
  const [poserPassword, setPoserPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/signupPoser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poserName, poserEmail, poserPassword }),
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
    <div className="relative w-screen h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-bl from-transparent via-purple-500 to-transparent opacity-25 rounded-full transform rotate-45"></div>

      <div className="absolute w-full h-full bg-gradient-to-tr from-transparent via-teal-400 to-transparent opacity-25 rounded-full transform -rotate-45"></div>

      <div className="absolute w-full h-full bg-gradient-to-br from-transparent via-pink-500 to-transparent opacity-25 rounded-full transform rotate-30"></div>

      <div className="absolute w-32 h-32 bg-teal-400 opacity-20 rounded-full top-10 left-10 transform rotate-45"></div>

      <div className="absolute w-48 h-48 bg-purple-500 opacity-20 rounded-full top-1/3 left-1/2 transform -rotate-45"></div>

      <div className="absolute w-24 h-24 bg-pink-500 opacity-25 rounded-full bottom-20 right-20 transform rotate-30"></div>

      <div className="absolute w-64 h-64 bg-gradient-to-b from-teal-400 via-purple-500 to-pink-500 opacity-15 rounded-full top-2/3 right-1/4 transform rotate-45"></div>

      <div className="absolute w-40 h-40 bg-gradient-to-t from-pink-500 via-purple-500 to-teal-400 opacity-20 rounded-full bottom-1/4 left-1/3 transform -rotate-45"></div>

      <div className="relative h-screen flex flex-col justify-center items-center z-10">
        <div className="w-full md:w-1/2 px-4 sm:p-4 md:p-8 lg:p-12 xl:p-16">
          <div className="bg-white shadow-2xl rounded-lg p-8">
            <div className="flex flex-row">
              <img src="/logo.png" alt="logo" className="w-7 h-7 mr-1" />
              <div className="text-lg font-bold">CodeUp</div>
            </div>
            <div className="flex justify-end">
              <Link
                to="/loginPoser"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded shadow mb-4"
              >
                Back
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-center uppercase">
              Sign up Poser
            </h1>

            <form
              method="post"
              action="/signupPoser"
              onSubmit={handleSignupSubmit}
              className="flex flex-col"
            >
              <div className="flex flex-col mb-4">
                <label htmlFor="poserName" className="text-lg">
                  Username
                </label>
                <input
                  type="text"
                  name="poserName"
                  id="poserName"
                  placeholder="Poser Name"
                  autoComplete="off"
                  value={poserName}
                  onChange={(e) => setPoserName(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="poserEmail" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="poserEmail"
                  id="poserEmail"
                  placeholder="Email"
                  autoComplete="off"
                  value={poserEmail}
                  onChange={(e) => setPoserEmail(e.target.value)}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-1 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="poserPassword" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  name="poserPassword"
                  id="poserPassword"
                  placeholder="Password"
                  autoComplete="off"
                  value={poserPassword}
                  onChange={(e) => setPoserPassword(e.target.value)}
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
              to="/loginPoser"
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

export default SignupPoser;
