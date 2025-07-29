import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getuser,
  forgotPassword,
  resetPassword,
  addhome,
  fetchhome,
} from "../controller/usercontroller.js";
import { getMyHomes } from "../controller/usercontroller.js"; // <- Add this line
import { isAuthenticated } from "../utils/auth.js";
import { deleteHome } from "../controller/usercontroller.js";


const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getuser);
router.post("/forget/password", forgotPassword);
router.post("/password/reset/:token", resetPassword);

router.post("/add-home", addhome);
router.get("/fetch-home", fetchhome);

// ✅ New Route for user's own homes
router.get("/user/myhomes", isAuthenticated, getMyHomes);
router.delete("/delete-home/:id", isAuthenticated, deleteHome);

export default router;
