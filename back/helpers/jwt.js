// Imports
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Configs
dotenv.config();

// Middlewares

/** generateAccessToken
 * génère un token d'acces et le stock dans la requete
 * Expire après 24 heures
 */
export const generateAccessToken = (req, res, next) => {
  req.body.email_token = jwt.sign({ userId: req.body.userId }, process.env.SECRET_KEY, {
    expiresIn: "86400s",
  });
  next();
};

export const generateNewPasswordToken = (req, res, next) => {
  req.token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: "900s",
  });
  console.log(req.token, "req.token, dans jwt generateNewPasswordToken");
  next();
};

export const passToken = (req, res, next) => {
  const accessToken = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "5d" });
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.render("resetPassword", { token: req.token });
  // res.status(200).json(req.body.message);
};


/* Vérifie si l'utilisateur est Admin */
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === 1) {
      next();
    } else {
      return next(
        createError(403, "Vous n'êtes pas autoriser à effectuer cette action.")
      );
    }
  });
};

/* Vérifie si l'utilisateur est bien associé au info du Token */
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.idUser === req.params.id || req.user.isAdmin === 1) {
      next();
    } else {
      return next(
        createError(401, "Vous n'êtes pas autoriser à effectuer cette action.")
      );
    }
  });
};

export const createJwt = (idUser) => {
  const token = jwt.sign({ idUser }, process.env.SECRET_KEY, { expiresIn: "5d" });
  return token;
};

export const verifyToken = (req, res, next) => {
  // on récupère le token dans les cookies de la requête
  const access_token = req.cookies.access_token ?? req.headers?.authorization?.split(' ')[1];
  // si il n'a pas de token, on retourne un 401
  if (!access_token) {
    console.log("Missing user token");
    return res.status(401).send({ message: "Missing user token" });
  }
  // on va vérifier si le token est valide
  try {
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);
    console.log("decodedd" ,decoded)
    delete decoded.iat;
    delete decoded.exp;
    req.token = decoded
    next()
  } catch (err) {
    console.log(err, "err");
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    }
    return res.status(401).send({ message: "Invalid token" });
  }
};