import { NextResponse } from "next/server";

export function middleware(request) {
  let url = request.url;

  // if (url.startsWith("http://localhost:3010/register")) {
  //   return NextResponse.redirect("http://localhost:3010/");
  // }

  /* Déconnecté */
  if (!request.cookies.get("access_token")?.value) {
    switch (url) {
      case "http://localhost:3010/formations":
        return NextResponse.redirect("https://monparcoursformation.fr/");
      case "http://localhost:3010/actus":
        return NextResponse.redirect("https://monparcoursformation.fr/");
      case "http://localhost:3000/modifierMotDePasse":
        return NextResponse.redirect("http://localhost:3010/");
      case "http://localhost:3000/profil":
        return NextResponse.redirect("http://localhost:3010/");
      case "http://localhost:3000/trading-book":
        return NextResponse.redirect("http://localhost:3010/inscription");
      default:
        return null;
    }
  }

  // Connecté
  if (request.cookies.get("access_token")?.value) {
    switch (url) {
      case "http://localhost:3010/connexion":
        return NextResponse.redirect("http://localhost:3010/");
      case "http://localhost:3010/formations":
        return NextResponse.redirect("https://monparcoursformation.fr/");
      case "http://localhost:3010/actus":
        return NextResponse.redirect("http://localhost:3010/");
      default:
        return null;
    }
  }
}
