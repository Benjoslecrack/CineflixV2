export default function App() {
  return (
    <main className="w-full flex justify-center items-center h-screen">
      <div className="rounded-lg shadow-lg">
        <div className="p-5 pb-4 border-b-0">
          <h3 className="font-bold mb-0">Connectez-vous!</h3>
          <small>Pour accéder à l'ensemble du contenu CinéFlix</small>
        </div>
        <div className="modal-body p-5 pt-0">
          <form method="POST" action="/auth/login">
            <div className="mb-3">
              <input
                type="email"
                className="form-input rounded-md w-full"
                id="email"
                name="email"
                placeholder="nom@exemple.fr"
              />
              <label for="email">Adresse Mail</label>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-input rounded-md w-full"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
              />
              <label for="password">Mot de Passe</label>
            </div>
            <button
              className="w-full mb-2 px-4 py-2 text-lg rounded-md bg-secondary text-white"
              type="submit"
            >
              Se connecter
            </button>
            <hr className="my-4" />
            <h2 className="text-sm font-bold mb-3">
              Ou utilisez une autre méthode
            </h2>
            <button
              className="w-full py-2 mb-2 px-4 rounded-md border border-secondary text-secondary flex items-center"
              type="submit"
            >
              <i className="bi bi-twitter mr-2"></i>
              Se connecter avec Twitter
            </button>
            <button
              className="w-full py-2 mb-2 px-4 rounded-md border border-primary text-primary flex items-center"
              type="submit"
            >
              <i className="bi bi-facebook mr-2"></i>
              Se connecter avec Facebook
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
