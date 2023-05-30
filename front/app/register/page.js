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
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [error, setError] = useState("");

  // Fonction d'actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(email, password, username)) return;

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
        console.log(user);
        // Enregistrer le token JWT dans le contexte utilisateur
        dispatch("user", user);
        // Rediriger l'utilisateur vers la page de trading-book
        router.push("/");
      } else {
        const errorJson = await response.text();
        console.log("Erreur: ", errorJson);
        // Afficher l'erreur de connexion dans le formulaire
        setError(errorJson);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log("There was a SyntaxError", error);
      } else {
        console.log("There was an error", error);
      }
    }
  };

  // Fonction validation du formulaire
  function validate(email, password, username) {
    // Champs vides
    let hasErrors = false;
    if (!email) {
      setErrorEmail("Veuillez saisir une adresse e-mail.");
      hasErrors = true;
    }

    if (!password) {
      console.log(password);
      setErrorPassword("Veuillez saisir un mot de passe.");
      hasErrors = true;
    }

    if (!username) {
      setErrorUsername("Veuillez saisir un nom d'utilisateur.");
      hasErrors = true;
    }

    if (hasErrors) return false;

    // Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[a-z0-9_]{1,15}$/;
    // regex de mot de passe contient :
    // au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial

    if (!emailRegex.test(email)) {
      hasErrors = true;
      setErrorEmail("L'adresse email n'est pas valide.");
    }

    if (!passwordRegex.test(password)) {
      hasErrors = true;
      setErrorPassword(
        "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial."
      );
    }

    if (!usernameRegex.test(username)) {
      hasErrors = true;
      setErrorUsername("Le nom d'utilisateur n'est pas valide!");
    }

    if (hasErrors) return false;

    return true; // retourne null si les trois sont valides
  }

  return (
    <main className="w-full flex justify-center items-center h-screen text-center">
      <div className="rounded-lg shadow-lg">
        <div className="p-5 pb-4 border-b-0">
          <h3 className="font-bold mb-0">Inscrivez-vous gratuitement !</h3>
          <small>Pour accéder à l'ensemble du contenu CinéFlix</small>
        </div>
        <div className="modal-body p-5 pt-0">
          <form>
            <div className="mb-3">
              <label htmlFor="email">Adresse Mail</label>
              {errorEmail ? (
                <>
                  <input
                    type="email"
                    className="form-input rounded-md w-full border-2 border-red-500"
                    id="email"
                    name="email"
                    placeholder="nom@exemple.fr"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-red-500">{errorEmail}</p>
                </>
              ) : (
                <input
                  type="email"
                  className="form-input rounded-md w-full"
                  id="email"
                  name="email"
                  placeholder="nom@exemple.fr"
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Mot de Passe</label>
              {errorPassword ? (
                <>
                  <input
                    type="password"
                    className="form-input rounded-md w-full border-2 border-red-500"
                    id="password"
                    name="password"
                    placeholder="Votre mot de passe"
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-red-500">{errorPassword}</p>
                </>
              ) : (
                <input
                  type="password"
                  className="form-input rounded-md w-full"
                  id="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="username">Nom d'utilisateur</label>
              {errorUsername ? (
                <>
                  <input
                    type="text"
                    className="form-input rounded-md w-full border-2 border-red-500"
                    id="username"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    autoComplete="on"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p className="text-red-500">{errorUsername}</p>
                </>
              ) : (
                <input
                  type="text"
                  className="form-input rounded-md w-full"
                  id="username"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  autoComplete="on"
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
            </div>
            <button
              className="btn-secondary w-full my-4 px-4 py-2 text-lg rounded-md"
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
            {error && (
              <div className="invalid-feedback text-red-500">{error}</div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
