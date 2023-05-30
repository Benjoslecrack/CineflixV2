"use client";

import { useState, useEffect } from "react";

export default function App({ params }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const url = `${process.env.NEXT_PUBLIC_API}/users/${params.id}`;
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
                setUser(result);
            } catch (error) {
                setError(error);
                console.error(error);
            }
        }

        // Call fonction APIs
        fetchData();
    }, []);

    // Chargement de l'api
    if (user === null) {
        return <div className="mt-[150px]">Chargement en cours ...</div>;
    }

    return (
        <div className="mt-[150px] max-w-md mx-auto p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <p><span className="font-bold">Email:</span> {user.email}</p>
            <img src={user.profil_pic} alt="Profile Picture" className="w-32 h-32 rounded-full my-4" />
            <p><span className="font-bold">Roles:</span> {user.roles}</p>
            <p><span className="font-bold">Username:</span> {user.username}</p>
        </div>
    );
}
