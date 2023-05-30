"use client";

import "./styles/globals.css";
import { AppWrapper } from "./context/context";
import { Navbar } from "./components";

export const metadata = {
  title: "Mayak Finance",
  description: "Le meilleur de la finance en ligne.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="fr">
        <body>
          <AppWrapper>
              <Navbar />
              <div className="container">
              {children}
              </div>
          </AppWrapper>
        </body>
      </html>
    </>
  );
}
