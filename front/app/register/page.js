"use client";

// Imports
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/context";

// Imports
import { useState, useEffect } from "react";

export default function App() {

  // User
  const { sharedState, dispatch } = useAppContext();

  // Router
  const router = useRouter();

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  // Fonction d'actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, username }),
        }
      );
      if (response.ok) {
        // User
        const { user } = await response.json();
        console.log(user)
        // Enregistrer le token JWT dans le contexte utilisateur
        dispatch("user", user);
        // Rediriger l'utilisateur vers la page de trading-book
        router.push("/");
      } else {
        const errorJson = await response.text();
        console.log("Erreur: ", errorJson);
        // Afficher l'erreur de connexion dans le formulaire
        setError(error);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
      }
    }
  };

  // Fonction validation du formulaire
  function validate(formData) {
    let errors = {};
    let hasErrors = false;
    if (!formData.email) {
      errors.email = "Veuillez saisir une adresse e-mail.";
      hasErrors = true;
    }

    if (!formData.password) {
      errors.password = "Veuillez saisir un mot de passe.";
      hasErrors = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // regex de mot de passe contient :
    // au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial

    if (hasErrors) {
      return "Veuillez compléter les champs.";
    }

    if (!emailRegex.test(email)) {
      return "L'adresse email n'est pas valide.";
    }

    if (!passwordRegex.test(password)) {
      return "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial.";
    }

    return null; // retourne null si les deux sont valides
  }

  return (
    <main className="w-full flex justify-center items-center h-screen">
      <div className="rounded-lg shadow-lg">
        <div className="p-5 pb-4 border-b-0">
          <h3 className="font-bold mb-0">Inscrivez-vous gratuitement!</h3>
          <small>Pour accéder à l'ensemble du contenu CinéFlix</small>
        </div>
        <div className="modal-body p-5 pt-0">
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-input rounded-md w-full"
                id="email"
                name="email"
                placeholder="nom@exemple.fr"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Adresse Mail</label>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-input rounded-md w-full"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Mot de Passe</label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-input rounded-md w-full"
                id="username"
                name="username"
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Nom d'utilisateur</label>
            </div>
            <button
              className="w-full mb-2 px-4 py-2 text-lg rounded-md bg-secondary text-white"
              type="submit"
              onClick={handleSubmit}
            >
              S'inscrire
            </button>
            <small className="block">
              En cliquant sur "S'inscrire", vous acceptez les{" "}
              <a className="text-primary underline" href="#">
                Termes Généraux.
              </a>
            </small>
            <hr className="my-4" />
            <h2 className="text-sm font-bold mb-3">
              Ou utilisez une autre méthode
            </h2>
            <button
              className="w-full py-2 mb-2 px-4 rounded-md border border-secondary text-secondary flex items-center"
              type="submit"
            >
              <i className="bi bi-twitter mr-2"></i>
              S'inscrire avec Twitter
            </button>
            <button
              className="w-full py-2 mb-2 px-4 rounded-md border border-primary text-primary flex items-center"
              type="submit"
            >
              <i className="bi bi-facebook mr-2"></i>
              S'inscrire avec Facebook
            </button>
            {formErrors.password && (
              <div className="invalid-feedback">{formErrors.password}</div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
