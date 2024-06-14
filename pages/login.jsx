import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Authentication from "./api/auth/login";
import { useDispatch } from "react-redux";

export default function Login() {
  const [isloged, setIsloged] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    // Get the token from the form data
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    //const response = await Authentication(email, password);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const userdata = await response.json();
    if (response.ok) {
      setIsloged(true);
      console.log(userdata);
      console.log(userdata.data.psdata);
      localStorage.setItem("user", JSON.stringify(userdata.data.psdata.user));
      dispatch({ type: "LOGIN_SUCCESS", payload: userdata.data.psdata.user });
      router.push("/profile");
    } else {
      console.log("Failed to log in");
      setError("Echec d'authentication");
      setIsloged(false);
      // setError(true);
    }
    // const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);
    // const token = response.token;
    // document.cookie = `token=${token}; path=/`;
    // // router.push("/profile")
  }
  useEffect(() => {
    //console.log("L'état de isloged a changé :", isloged);
  }, [isloged]);
  console.log("etat de login after effect", isloged);
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-purple">
          <div className="col-lg-6 text-white d-flex flex-column justify-content-center">
            <h1 className="welcome pt-4">Bienvenue</h1>
            <h1 className="pb-3">dans notre espace client</h1>
            <h4 className="pt-5 pb-5">
              L’espace client vous permet de consulter vos données personnelles,
              payer vos factures, passer vos réclamations..
            </h4>
            <div>
              <button
                onClick={() => router.push("/")}
                className="btn btn-primary bg-purple"
              >
                <b>Revenir au site</b>
              </button>
              <style jsx>{`
                .bg-purple:hover {
                  background-color: #fceb26 !important;
                  color: #000 !important;
                }
              `}</style>
            </div>
            <div className="imgLeft justify-content-center">
              <img
                src="/image/cnx.png"
                className="imgLeft"
                alt="Image de connexion"
              />
            </div>
          </div>

          <div className="col-lg-6 login-form bg-white justify-content-center ">
            <div className="form-connecter">
              <div className="page_title_account">Se connecter</div>
              <p className="titleDesc mb-15 pb-5">
                Connectez-vous à votre compte
              </p>

              <form className="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    required
                  />
                </div>
                {error && !isloged && (
                  <div
                    style={{ color: "red" }}
                    id="erreur"
                    className="form-text pb-3"
                  >
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-primary bg-purple">
                  <b>Se connecter</b>
                </button>
                <style jsx>{`
                  .bg-purple:hover {
                    background-color: #fceb26 !important;
                    color: #000 !important;
                  }
                `}</style>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
