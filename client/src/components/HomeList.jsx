import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from "react-icons/fa";
import "../styles/homeslist.css";

const AllHomes = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/homeeasy/fetch-home");
        setHomes(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };

    fetchHomes();
  }, []);

  return (
    <div className="home-list">
      {homes.map((home, index) => (
        <div className="home-card" key={index}>
          <img src={home.image?.url} alt="Home" className="home-image" />
          <div className="home-info">
            <p className="price">₹{home.price.toLocaleString()}</p>
            <p className="location">
              <FaMapMarkerAlt className="icon" /> {home.location}
            </p>
            <p className="description">{home.description}</p>
            <p className="email">{home.email} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllHomes;
