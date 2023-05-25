import express from "express";
import { sendMailContactForm } from '../helpers/mailer.js';

const router = express.Router();

router.post("/contact", sendMailContactForm);

export default router;