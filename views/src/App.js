import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./components/auth/LoginUser";
import SignupUser from "./components/auth/SignupUser";
import UserHomepage from "./components/user/UserHomepage";
import LoginPoser from "./components/auth/LoginPoser";
import SignupPoser from "./components/auth/SignupPoser";
import PoserHomepage from "./components/poser/PoserHomepage";
import AdminHomepage from "./components/admin/AdminHomepage";
import AllUser from "./components/admin/AllUser";
import AllPoser from "./components/admin/AllPoser";
import AllPost from "./components/admin/AllPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginUser />} />
      <Route path="/signupUser" element={<SignupUser />} />
      <Route path="/userHomepage" element={<UserHomepage />} />
      <Route path="/loginPoser" element={<LoginPoser />} />
      <Route path="/signupPoser" element={<SignupPoser />} />
      <Route path="/poserHomepage" element={<PoserHomepage />} />
      <Route path="/admin" element={<AdminHomepage />} />
      <Route path="/allUser" element={<AllUser />} />
      <Route path="/allPoser" element={<AllPoser />} />
      <Route path="/allPost" element={<AllPost />} />
    </Routes>
  );
}

export default App;
