import { FormEvent } from "react";
import { useRouter } from "next/router";
import Authentication from "./api/auth/login";
import { useDispatch } from 'react-redux';

export default function Login() {
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
    const userdata=await response.json();
    if (response.ok) {
      console.log(userdata.data.psdata)
      localStorage.setItem('user', JSON.stringify( userdata.data.psdata.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: userdata.data.psdata.user });
      router.push("/profile");
      
    } else {
      console.log("Failed to log in");
    }
    // const responseData = await response.json();
    // console.log(response);
    // console.log(responseData);
    // const token = response.token;
    // document.cookie = `token=${token}; path=/`;
    // // router.push("/profile")
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 bg-purple text-white min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
            <h1>Bienvenue dans notre espace client</h1>
            <p>
              L’espace client vous permet de consulter vos données personnelles,
              payer vos factures, passer vos réclamations..
            </p>
            <button onClick={() => router.push("/")} className="btn-primary">
              Revenir au site
            </button>
            <div className="imgLeft d-flex justify-content-center">
              <img
                src="/image/cnx.png"
                className="imgLeft"
                style={{ objectFit: "contain", paddingTop: "100px" }}
                alt="Image de connexion"
              />
            </div>
          </div>

          <div className="col-lg-6 vh-100  justify-content-center ">
            <div className="pb-30">
              <div className="page_title_account">Se connecter</div>
              <p className="titleDesc mb-15">Connectez-vous à votre compte</p>
            </div>
            <form onSubmit={handleSubmit}>
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
                />
                <div id="emailHelp" className="form-text">
                  Nous ne partagerons jamais votre adresse e-mail avec qui que
                  ce soit.
                </div>
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
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Se souvenir de moi
                </label>
              </div>
              <button type="submit" className="btn btn-primary bg-purple">
                Se connecter
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
    </>
  );
}
