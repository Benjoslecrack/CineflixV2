"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "../components";
import { Button, Text, Input } from "@nextui-org/react";
import MyModal from "../components/Modal/Modal";

export default function Hero() {
  const modalContent = (
    <div className="modal-body p-5 pt-0">
      <form method="POST" action="/auth/register">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control rounded-3"
            id="email"
            name="email"
            placeholder="nom@exemple.fr"
          />
          <label for="email">Adresse Mail</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control rounded-3"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
          />
          <label for="password">Mot de Passe</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control rounded-3"
            id="username"
            name="username"
            placeholder="Votre mot de passe"
          />
          <label for="username">Nom d'utilisateur</label>
        </div>
        <button
          className="w-full mb-2 btn btn-lg rounded-3 btn-secondary"
          type="submit"
        >
          S'inscrire
        </button>
        <small className="">
          En cliquant sur "S'inscrire", vous acceptez les{" "}
          <Link className="underline" href="#">
            Termes Généraux.
          </Link>
        </small>
        <hr className="my-4" />
        <h2 className="text-sm font-bold mb-3">Ou utilisez une autre méthode</h2>
        <button
          className="w-full py-2 mb-2 btn btn-outline-secondary rounded-3"
          type="submit"
        >
          <i className="bi bi-twitter"></i>
          S'inscrire avec Twitter
        </button>
        <button
          className="w-full py-2 mb-2 btn btn-outline-primary rounded-3"
          type="submit"
        >
          <i className="bi bi-facebook"></i>
          S'inscrire avec Facebook
        </button>
      </form>
    </div>
  );

  return (
    <section id="hero">
      <div className="backdrop-container">
        <div className="backdrop-wrapper">
          <div className="hero-text mx-auto max-w-3xl text-center py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Suivez les films que vous avez regardés. <br />
              Dites à vos amis ce qui est bon. <br />
              Sauvegardez ceux que vous voulez voir. <br />
            </h2>
            <MyModal
              buttonText={"Commencez-maintenant - C'est gratuit!"}
              buttonStyle={"btn btn-secondary"}
              modalTitle={"Inscrivez-vous!"}
              modalContent={modalContent}
            />
            <p className="mt-6">
              <strong className="block">
                Le réseau social des amoureux de films.
              </strong>
              Bientôt disponible sur{" "}
              <a href="/apps/" className="icons">
                <i className="bi bi-android2"></i> &{" "}
                <i className="bi bi-apple"></i> *
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
