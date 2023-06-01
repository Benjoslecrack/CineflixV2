import { NextResponse } from "next/server";

export function middleware(request) {
  let url = request.url;

  // if (url.startsWith("http://localhost:3010/register")) {
  //   return NextResponse.redirect("http://localhost:3010/");
  // }

  /* Déconnecté */
  if (!request.cookies.get("access_token")?.value) {
    switch (url) {
      case "http://localhost:3010/watchlists":
        return NextResponse.redirect("http://localhost:3010");
      case "http://localhost:3010/profile":
        return NextResponse.redirect("http://localhost:3010");
        case "http://localhost:3010/logout":
          return NextResponse.redirect("http://localhost:3010");
      case "http://localhost:3000/members":
        return NextResponse.redirect("http://localhost:3010");
      default:
        return null;
    }
  }

  // Connecté
  if (request.cookies.get("access_token")?.value) {
    switch (url) {
      case "http://localhost:3010/login":
        return NextResponse.redirect("http://localhost:3010/");
      case "http://localhost:3010/register":
        return NextResponse.redirect("http://localhost:3010/");
      default:
        return null;
    }
  }
}
