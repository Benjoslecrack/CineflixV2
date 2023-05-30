"use client";

// Librairies
import { useEffect, useState } from "react";
import Link from "next/link";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar/Avatar";

// consts
import { useAppContext } from "../context/context";

const Navbarr = () => {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const { sharedState, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    cookies.remove("access_token");
    dispatch("user", null);
    router.push("/");
    toggleDropdown();
  };

  return (
    <header>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <div className="w-3/12 md:w-auto mb-2 md:mb-0">
            <Link href="/" className="inline-flex items-center">
              <img
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt="Cineflix"
                className="h-[70px]"
              />
            </Link>
          </div>

          <ul className="nav col-12 md:col-auto mb-2 justify-center md:mb-0 flex flex-row">
            <li>
              <Link href="#" className="px-2">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="#" className="px-2">
                Films
              </Link>
            </li>
            <li>
              <Link href="#" className="px-2">
                Playlists
              </Link>
            </li>
            <li>
              <Link href="#" className="px-2">
                Acteurs
              </Link>
            </li>
            <li>
              <Link href="#" className="px-2">
                Membres
              </Link>
            </li>
          </ul>

          {sharedState.user === null ? (
            <div className="w-3/12 md:w-auto text-right flex flex-row gap-1">
              <Link href="/login" className="btn btn-outline-secondary">
                Login
              </Link>
              <Link href="/register" className="btn btn-secondary">
                Sign-up
              </Link>
            </div>
          ) : (
            <>
              {console.log(sharedState.user)}
              <Avatar src={sharedState.user.profil_pic} alt={sharedState.user.name} size="medium" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbarr;
