import React, { useState } from 'react';
import "../styles/dialog.css";
import imageCompression from 'browser-image-compression';
import { toast } from "react-toastify";





const DialogBox = ({ onClose }) => {
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!pic) {
    alert("Please upload an image");
    return;
  }

  try {
    const options = {
      maxSizeMB: 0.01,              // ~100 KB
      maxWidthOrHeight: 800,      // Optional: resize image
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(pic, options);

    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    const useremail = localStorage.getItem("userEmail");

    reader.onloadend = async () => {
      const base64Image = reader.result; // data:image/*;base64,xxxx

      const payload = {
        useremail,
        image: base64Image,
        price,
        location,
        description,
        email,
      };

      try {
        const res = await fetch("https://homeeasy.onrender.com/homeeasy/add-home", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit");

        const data = await res.json();
        console.log("Success:", data);

        toast.success("Data Uploaded Successfully");
        onClose(); // close dialog after submit
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      }
    };
  } catch (error) {
    console.error("Compression failed:", error);
    alert("Image compression failed");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add House</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Upload Picture:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPic(e.target.files[0])}
              required
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <label>
            Location:
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
           <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DialogBox;
