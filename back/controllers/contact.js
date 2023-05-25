import dotenv from "dotenv";
dotenv.config();
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getAllContactsMessages,
} from "../requests/contact.js";

// GET CONTACT MESSAGE PAGE
export const getContactController = async (req, res) => {
  const [contacts, error] = await getContacts();
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contacts);
  }
};

// POST CREATE CONTACT SEND MESSAGE
export const createContactController = async (req, res, next) => {
  console.log(req.body, "req.body");
  const {  email, message } = req.body;
  try {
    console.log(      
      email,     
      message,
      "dossier Controller, contact"
    );
    if(req.files){
      req.body.cv = req.files.cv[0].filename;
    }
    if(req.files.pp){
      req.body.pp = req.files.pp[0].filename;
    }
    // ici contact c'est l'id du contact créé
    const contact = await createContact({ ...req.body });
    res.status(200).json(contact);
    next();
    console.log(contact, "contact controller");
  } catch (error) {
    console.log(error);
  }
};

export const getContactByIdController = async (req, res) => {
  const id = req.params.id;
  const [contact, error] = await getContactById(id);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contact);
  }
};

export const contactResponseMsgController = async (req, res) => {
  const id = req.params.id;
  const { name, email, message } = req.body;
  const [contact, error] = await updateContact(id, name, email, message);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contact);
  }
};

export const deleteContactController = async (req, res) => {
  const id = req.params.id;
  const [contact, error] = await deleteContact(id);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contact);
  }
};

export const contactMessageReceived = async (req, res) => {
  const id = req.params.id;
  const [contact, error] = await getContactById(id);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contact);
  }
};

export const allContactMessageReceived = async (req, res) => {
  try {
    const contact = await getAllContactsMessages();
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const contactMessageSent = async (req, res) => {
  const id = req.params.id;
  const [contact, error] = await getContactById(id);
  if (error) {
    res.status(404).json({ error: error });
  } else {
    res.status(200).json(contact);
  }
};
