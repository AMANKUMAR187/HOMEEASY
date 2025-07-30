


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import Header from "../components/header"
import Footer from "../layout/Footer"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    fetchUserHomes();
  }, [isAuthenticated]);

  const fetchUserHomes = async () => {
    try {
      const res = await axios.get(
        "https://homeeasy.onrender.com/homeeasy/user/myhomes",
        {
          withCredentials: true,
        }
      );
      setHomes(res.data.homes);
    } catch (err) {
      toast.error("Could not fetch your listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://homeeasy.onrender.com/homeeasy/delete-home/${id}`, {
        withCredentials: true,
      });
      toast.success("Deleted successfully");
      setHomes((prev) => prev.filter((home) => home._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete home");
    }
  };

  if (loading) return <p>Loading your homes...</p>;

  return (
    <div>
           <Header/>
          <div className="profile-container">
      <h2>My Uploaded Homes</h2>
      <div className="homes-list">
        {homes.length === 0 ? (
          <p>No homes uploaded yet.</p>
        ) : (
          homes.map((home) => (
            <div key={home._id} className="home-card">
              <img src={home.image?.url} alt="Home" />
              <div className="home-details">
                <h3>{home.location}</h3>
                <p>{home.description}</p>
                <p>₹{home.price}</p>
                <button onClick={() => handleDelete(home._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
     <Footer/>
    </div>
    
  );
};

export default Profile;
