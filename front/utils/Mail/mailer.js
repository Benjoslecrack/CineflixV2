import { Transport } from "./mailer.config";
import { messageFromLucy } from './mailer.template';

export default sendMail = async (firstName, name, email, message) => {

  /* Configure les options de l'email */
  const mailOptions = {
    to: `${process.env.EMAIL_ADDRESS}`,
    bcc: `${process.env.EMAIL_ADDRESS}`,
    from: `${process.env.EMAIL_ADDRESS}`,
    subject: "Message de Lucy Health Care",
    text: "",
    html: messageFromLucy(firstName, name, email, message),
  };

  /* Envoie le mail via le protocole smtp */
  try {
    const response = await Transport.sendMail(mailOptions);
    return response
  } catch (err) {
    console.log(err.response.data);
  }
};
