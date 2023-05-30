"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";

export default function App() {

  // const
  const [user, setUser] = useState(null);
  const { sharedState, dispatch } = useAppContext();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enregistrer les modifications de l'utilisateur
    console.log('Modifications enregistrées :', user);
  };

  // En attente des données
  if (user === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <main className="mt-[150px]">
      <div className="max-w-md mx-auto p-4 shadow">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-bold" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={user.id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="is_verified">Is Verified:</label>
            <select
              id="is_verified"
              name="is_verified"
              value={user.is_verified}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="profil_pic">Profile Picture:</label>
            <input
              type="text"
              id="profil_pic"
              name="profil_pic"
              value={user.profil_pic}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="roles">Roles:</label>
            <input
              type="text"
              id="roles"
              name="roles"
              value={user.roles}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  )
}
