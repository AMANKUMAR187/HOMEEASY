import React, { useContext, useState } from "react";
import "../styles/Auth.css";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import videohome from "../assets/home2.mp4"

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
       {/* <div className="main"> */}

          <div className="auth-page">

               <video src ={videohome} autoPlay muted loop/>
                                              
                <div className="homeeasy">
               <h1>Home Easy</h1>
                </div>

         <div>
               <div className="auth-container">
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
         </div>
        
      </div>
       {/* </div> */}
     
    </>
  );
};

export default Auth;