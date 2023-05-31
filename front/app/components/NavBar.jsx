"use client";

// Librairies
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar/Avatar";

// consts
import { useAppContext } from "../context/context";

const Navbarr = () => {
  const { sharedState, dispatch } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    cookies.remove("access_token");
    dispatch("user", null);
    router.push("/");
    toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <Link href="/" className="px-2">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/movies" className="px-2">
                Films
              </Link>
            </li>
            <li>
              <Link href="/watchlists" className="px-2">
                WatchLists
              </Link>
            </li>
            <li>
              <Link href="/members" className="px-2">
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
              <div className="relative cursor-pointer" onClick={handleAvatarClick} ref={dropdownRef}>
                <Avatar
                  src={`images/${sharedState.user.profil_pic}`}
                  alt={sharedState.user.name}
                  size="medium"
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg text-[#14181c]">
                    <ul className="py-2">
                      <li
                      >
                        <Link href="/profile" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Profil
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbarr;
