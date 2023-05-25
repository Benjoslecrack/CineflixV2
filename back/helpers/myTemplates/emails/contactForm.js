export const messageFromLucy = (infos) => {
    let result = `
    <h3>Message de ${infos.firstName} ${infos.name}</h3>
    <h4>Email: ${infos.email}</h4>
    <p>${infos.message}</p>
     `;
    return result;
  };