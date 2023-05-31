"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { sharedState, dispatch } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setUser(sharedState.user);
  }, [sharedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      profil_pic: `default${value}.jpg`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/update/${sharedState.user.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        console.log("Modifications enregistrées :", user);
        // Mettre à jour les informations utilisateur dans le contexte
        dispatch({ type: "UPDATE_USER", payload: user });
        router.push("/");
      } else {
        console.error("Erreur lors de l'enregistrement des modifications");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur", error);
    }
  };

  // En attente des données
  if (user === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <main className="mt-[150px]">
      <div className="max-w-md mx-auto p-4 shadow">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <small>Les modifications seront prises en compte à votre prochaine connexion</small>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-bold" htmlFor="profil_pic">
              Profile Picture:
            </label>
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="profil_pic"
                  value="0"
                  checked={user.profil_pic === "images/default0.jpg"}
                  onChange={handleImageChange}
                />
                <img
                  src="images/default0.jpg"
                  alt="Profile Picture 0"
                  className="w-[70px] h-[70px] rounded-full"
                />
              </label>
              <label className="mr-2">
                <input
                  type="radio"
                  name="profil_pic"
                  value="1"
                  checked={user.profil_pic === "images/default1.jpg"}
                  onChange={handleImageChange}
                />
                <img
                  src="images/default1.jpg"
                  alt="Profile Picture 1"
                  className="w-[70px] h-[70px] rounded-full"
                />
              </label>
              <label>
                <input
                  type="radio"
                  name="profil_pic"
                  value="2"
                  checked={user.profil_pic === "images/default2.jpg"}
                  onChange={handleImageChange}
                />
                <img
                  src="images/default2.jpg"
                  alt="Profile Picture 2"
                  className="w-[70px] h-[70px] rounded-full"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
