import express from "express";
import { getAllWordController, postWordController, getWordController, getWordByUserIdController, postWordUpdateController, DeleteWordController } from "../controllers/lexiconController.js";
import { verifyToken } from "../helpers/jwt.js";
const router = express.Router();



router.get("/", (req, res, next) => {
  res.send("We are on lexicon");
});


router.post("/add", verifyToken, postWordController); // ADD WORD  (POST)

router.get("/get/all", getAllWordController); // ALL WORD (GET)

router.delete("/:id", DeleteWordController); // DELETE WORD

router.get("/get/alluserid/:id", getWordByUserIdController)

router.post("/update/:id", verifyToken, postWordUpdateController ); // UPDATE WORD (POST)

router.get("/get/:id", getWordController ); // WORD BY ID (GET)


export default router;
