import express from "express";
import { isSignedIn, isAuthenticated } from "../controllers/auth.js";
import { makePayment } from "../controllers/paymentb.js";
const router = express.Router();

router.post("/stripepayment", isSignedIn, makePayment)

export default router;