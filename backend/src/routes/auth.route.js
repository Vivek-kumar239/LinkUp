import express from "express";
import { signup, login, logout, sendOtp, verifyOtp, changePassword, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


router.post('/sendOtp' , sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/changePassword' , changePassword);







router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;
