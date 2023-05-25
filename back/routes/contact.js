import express from "express";
import {
    getContactController,
    createContactController,
    contactResponseMsgController,
    deleteContactController,
    contactMessageReceived,
    allContactMessageReceived,
    
} from "../controllers/contact.js";
const router = express.Router();

import { contactSendMsgToAdmin, confirmationClientEmail, SendMailToContact }  from "../helpers/mailer.js";
import {
  generateAccessToken,
  passToken,
  verifyToken,
  generateNewPasswordToken,
} from "../helpers/jwt.js";
import upload  from "../helpers/multer.js";


router.get("/", (req, res, next) => {
  res.send("We are on contact");
});

router.get("/message", getContactController); // Get Form Send Message by client
router.post("/message", upload, createContactController, confirmationClientEmail, contactSendMsgToAdmin); // Post Form Send Message
router.get("/allContactMessageReveived", allContactMessageReceived); // Get All Form Message Received by Admin
router.get("/contactMessageReveived/:id", contactMessageReceived); // Get Form Message Received by Admin and by ID
router.put("/contactResponseMsg/:id", contactResponseMsgController); // Put Form Message Received by Admin
router.delete("/contact/:id", deleteContactController); // Delete Form Message Received by Admin

router.post ("/messageContact", SendMailToContact )

export default router;
