
import { createError } from "../helpers/errors.js";
import dotenv from "dotenv";
import { createWord, deleteWord, getAllWord, getAllWordByUserId, getWord, updateWord } from "../requests/lexicon.js";
dotenv.config();


// GET ALL WORD
export const getAllWordController = async (req, res) => {
  try {
    const words = await getAllWord();
    console.log("words", words);
    res.status(200).json(words);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// GET LEXICON BY ID
export const getWordController = async (req, res) => {
  const id = req.params.id;
  const word = await getWord(id);
  if (!word) {
    res.status(404).json({ error: "Word not found" });
  } else {
    res.status(200).send(word);
  }
};


//POST WORD
export const postWordController = async (req, res) => {
  try {
    /* On check si l'utilisateur existe déjà */
    const isWordAlreadyCreated = await getWord(req.body.word);
    if (isWordAlreadyCreated) return next(createError(400, "Le mot existe déjà"));
    console.log("word no exist so next")
    const idWord = await createWord({ ...req.body });
    if (!idWord) return next(createError(1001, "Problème à la création du compte de l'utilisateur : "));
    res.status(200).json(idWord);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const postWordUpdateController = async (req, res, next) => {
  const id = req.params.id;
  const word = await getWord(id);
  console.log("word is", word)
  try {
    let words = await updateWord(req.body, id);
    res.status(200).json(words);
    next();
  } catch (error) {
    res.status(404).json(error.message);
  }
}

export const getWordByUserIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const myword = await getAllWordByUserId(id);
    res.status(200).json(myword);
  } catch (error) {
    res.status(404).json(error.message);
  }
};



// DELETE ONE Word
export const DeleteWordController = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteWord(id);
    res.status(200).json("word deleted");
  } catch (error) {
    res.status(404).json(error);
  }
};