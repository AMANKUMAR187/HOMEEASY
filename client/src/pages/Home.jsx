import React, { useContext, useState } from "react";
import Hero from "../components/Hero";
import Header from "../components/header";
import AllHomes from "../components/HomeList";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import DialogBox from "../components/dialog";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const logout = async () => {
    await axios
      .get("https://homeeasy.onrender.com/homeeasy/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Logout failed");
        console.error(err);
      });
  };

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <>
      <section className="home">
        <Header />
        <AllHomes />
        <Footer />

        <div className="floating-buttons">
          <button className="btn2" onClick={logout}>
            Log-Out
          </button>

          <button className="btn1" onClick={() => setShowDialog(true)}>
            Add
          </button>

          <button className="btn3" onClick={() => navigateTo("/profile")}>
            Profile
          </button>

          {showDialog && <DialogBox onClose={() => setShowDialog(false)} />}
        </div>
      </section>
    </>
  );
};

export default Home;
