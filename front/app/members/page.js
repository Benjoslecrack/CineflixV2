"use client";

import { useState, useEffect } from "react";

export default function App() {
  // const
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      const url = `${process.env.NEXT_PUBLIC_API}/users/get/all`;
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMembers(result);
        console.log("members", members);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    fetchMembers();
  }, []);

  // En attente des données
  if (members === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <main className="mt-[150px]">
      <h1 className="text-2xl font-bold mb-4">Liste des membres</h1>
      <div className="grid grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <img
              src={member.profil_pic}
              alt={member.username}
              className="w-20 h-20 rounded-full mb-2"
            />
            <p className="text-lg font-semibold">{member.username}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
