// Imports
import dotenv from "dotenv";
import { createError } from "./errors.js";
import { registrationWelcome } from "./myTemplates/emails/register.js";
import { messageFromLucy } from "./myTemplates/emails/contactForm.js";

// Configs
import { Transport } from "./configs/mailer.config.js";

dotenv.config();

// Middlewares

/** SendMailWithConfirmationLink
 * Fonction qui envoie un lien de validation pour l'adresse mail
 */
export const SendMailWithConfirmationLink = async (req, res) => {
  console.log("process", process.env);
  console.log("req", req.body);
  /* Configure les options de l'email */
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_ADDRESS}`,
    from: `${process.env.EMAIL_ADDRESS}`,
    subject: "Confirmation de création de compte",
    text: "",
    html: registrationWelcome(req.headers.host, req.body.email_token),
  };

  /* Envoie le mail via le protocole smtp */
  try {
    Transport.sendMail(mailOptions);
    res
      .status(200)
      .json({
        message: `Un email vient de vous être envoyé a l'adresse mail suivante : ${req.body.email}`,
      });
  } catch (err) {
    createError(
      404,
      "L'email n'a pas pu être envoyé, veuillez vérifier que vous avez rentré une adresse valide"
    );
  }
};

/** SendMailWithResetPasswordLink
 * Fonction qui envoie avec un lien vers le renouvellement de mdp
 * @param {*} req
 * @param {*} res
 */
export const SendMailWithResetPasswordLink = async (req, res) => {
  /* Configure les options de l'email */

  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_ADDRESS}`,
    from: `${process.env.EMAIL_ADDRESS}`,
    subject: "Lien de changement de mot de passe pour Le Hub de l'assurance",
    text: "",
    html: `Voici votre lien de changement de mot de passe : <br>
    <a href="${req.headers.origin}/changerMotDePasse/${req.body.email_token}"> Cliquez ici pour changer votre mot de passe</a> <br>`,
  };
  /* Envoie le mail via le protocole smtp */
  try {
    Transport.sendMail(mailOptions);
    res
      .status(201)
      .json({
        message: `Un email vient de vous être envoyé a l'adresse mail suivante : ${req.body.email}`,
      });
  } catch (err) {
    createError(
      404,
      "L'email n'a pas pu être envoyé, veuillez vérifier votre adresse mail"
    );
  }
};

export const SendMailToContact = async (req, res) => {
  console.log("messgae:", req.body);
  const mailOptions = {
    to: `${process.env.EMAIL_ADDRESS}`,
    bcc: `${process.env.EMAIL_ADDRESS}`,
    from: "info@mayak-conseil.com",
    subject: `Nouveau message de contact reçu depuis le formulaire de contact du HubDeLassurance`,
    text: `${req.body.subject}`,
    html: `<p> </p>
    <p><br></p>
    <p>Bonjour,</p>
    <p>Nous vous informons qu&apos;un nouvel utilisateur a rempli le formulaire de contact sur notre site internet. Voici les informations qu&apos;il a fourni :</p>
    <p>Nom : ${req.body.lastname}</p>
    <p>Pr&eacute;nom : ${req.body.firstname}</p>
    <p>Adresse email : ${req.body.email}</p>
    <p>Num&eacute;ro de t&eacute;l&eacute;phone : ${req.body.phoneNumber}</p>
    <p>Sujet : ${req.body.subject}</p>
    <p>Message : ${req.body.message}</p>
    <p>Merci de prendre en compte ce nouveau message et de r&eacute;pondre &agrave; l&apos;utilisateur dans les plus brefs d&eacute;lais.</p>
    <p>Cordialement,</p>
    <p>L&apos;&eacute;quipe du Hub de l&apos;assurance</p>`,
  };
  try {
    Transport.sendMail(mailOptions);
    res.status(201).json(mailOptions);
  } catch (err) {
    createError(
      404,
      "L'email n'a pas pu être envoyé, veuillez vérifier votre adresse mail"
    );
  }
};

// réception d'une demande de contact à partir du formulaire de contact
export const contactSendMsgToAdmin = async (req, res, next) => {
  await console.log(
    msgSendToAdmin(
      req.body.name,
      req.body.message,
      req.body.email,
      req.body.subject
    )
  );
  const mailOptions = {
    //to: `${req.body.email}`,
    bcc: "info@mayak-conseil.com",
    //from: "info@mayak-conseil.com",
    subject: "Message du site XXXXX",
    text: "",
    html: ` ${msgSendToAdmin(
      req.body.name,
      req.body.email,
      req.body.message,
      req.body.phone,
      req.body.subject
    )} `,
    // html: `${req.body.name} vous a envoyé un message : <br> <br>
    // ${req.body.message} <br> <button style="background-color:red"> <a href="mailto:${req.body.email}"> Répondre à ${req.body.name} </a> </button> <br> <br>`,
  };
  /* Envoie le mail via le protocole smtp */
  try {
    Transport.sendMail(mailOptions);
    res
      .status(201)
      .json({
        message: `Un email vient de vous être envoyé a l'adresse mail suivante : ${req.body.email}`,
      });
  } catch (err) {
    createError(
      404,
      "L'email n'a pas pu être envoyé, veuillez vérifier votre adresse mail"
    );
  }
};

export const confirmationClientEmail = async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  const mailOptions = {
    to: `${req.body.email}`,
    bcc: `${process.env.EMAIL_USER}`,
    from: `${process.env.EMAIL_USER}`,
    subject: "Mail de confirmation",
    text: "",
    html: `Bonjour ${req.body.name} ${req.body.email}, <br>
    Nous avons bien reçu votre demande de devis. <br>
    Nous vous recontacterons dans les plus brefs délais. <br>
    Cordialement, <br>
    L'équipe Mayak Conseil`,
  };
  /* Envoie le mail via le protocole smtp */
  try {
    Transport.sendMail(mailOptions);
    res
      .status(201)
      .json({
        message: `Un email vient de vous être envoyé a l'adresse mail suivante : ${req.body.email}`,
      });
  } catch (err) {
    createError(
      404,
      "L'email n'a pas pu être envoyé, veuillez vérifier votre adresse mail"
    );
  }
};

// Envoie un mail pour un formulaire de contact
export const sendMailContactForm = async (req, res) => {

  /* Configure les options de l'email */
  const mailOptions = {
    to: `${process.env.EMAIL_ADDRESS}`,
    from: `${process.env.EMAIL_ADDRESS}`,
    subject: "Message de Lucy Health Care",
    text: "",
    html: messageFromLucy(req.body),
  };

  /* Envoie le mail via le protocole smtp */
  try {
    const response = await Transport.sendMail(mailOptions);
    res
      .send({message: "Votre message a bien été envoyé. Merci 😃", response: response});
  } catch (err) {
    console.log("Erreur: ", err.response);
    res.send({message: "Une erreur s'est produite avec le serveur, nous travaillons sur le problème"})
  }
};
