export const messageFromLucy = (firstName, name, email, message) => {
  let result = `
  <h3>Message de ${firstName} ${name}</h3>
  <h4>Email: ${email}</h4>
  <p>${message}</p>
   `;
  return result;
};