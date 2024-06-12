import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [erreur, setErreur] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        console.log("prénom", { value });
        break;
      case "lastName":
        setLastName(value);
        console.log("nom", { name, value });
        break;
      case "email":
        setEmail(value);
        console.log("email", { name, value });
        break;
      case "phone":
        setPhone(value);
        console.log("phone", { name, value });
        break;
      case "password":
        setPassword(value);
        console.log("password", { name, value });
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        console.log("confirmPassword", { name, value });
      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profil = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    };
    if (password === confirmPassword && isChecked) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profil),
        });
        const userdata = await response.json();
        console.log("pwd", password);
        console.log("confpwd", confirmPassword);
        console.log(response.code);
        if (response.ok) {
          if (userdata.code === 308) {
            console.error("Utilisateur déjà existant");
            setErreur("Utilisateur déjà existant");
          } else {
            console.log("Profil ajouté avec succès");
            router.push("/login");
          }
        } else {
          console.error("Erreur lors de l'ajout du profil");
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    } else {
      if (password !== confirmPassword) {
        console.error("Mot de passe incorrect");
        setErreur("Le mot de passe et la confirmation ne sont pas identiques");
      } else {
        setErreur("Condition générales non accepter");
      }
    }
  };

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
          <div className="col-lg-6 login-form bg-white justify-content-center">
            <div className="form-register">
              <div className="page_title_account text-center">
                Créez votre compte
              </div>
              <p className="titleDesc mb-15 text-center">
                Insérez vos informations de compte :
              </p>

              <form className="" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-">
                  <label htmlFor="lastName" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-">
                  <label htmlFor="email" className="form-label">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-">
                  <label htmlFor="phone" className="form-label">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {erreur && (
                  <div
                    style={{ color: "red" }}
                    id="erreur"
                    className="form-text pb-3"
                  >
                    {erreur}
                  </div>
                )}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheckbox">
                    J'accepte les conditions générales et la politique de
                    confidentialité
                  </label>
                </div>
                <button type="submit" className="btn btn-primary bg-purple">
                  S'inscrire
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
