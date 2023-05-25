let yoyo =
  "font-size: 1.5em; text-decoration: underline; color: blue; font-weight: 200;margin: 0;padding: 0;text-align: center; ";
export const registrationWelcome = (headers, emailToken) => {
  console.log(emailToken, "req.body registration dans template");
  let result = `<div style="${yoyo}">Bienvenue sur notre plateforme de Trading-book</div> 
   `;
  return result;
};