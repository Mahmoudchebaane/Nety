import { useEffect, useState } from "react";
import Footer from "../components/footer";
import HeaderProfile from "../components/headerProfile";


export default function MyInformations() {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function getInfo() {
    const response = await fetch("/api/auth/profil", {
      method: "GET",
    });
    //console.log(response);
    const data = await response.json();
    return data;
  }
  // async function updateInfos() {
  //   const userData = {
  //     firstname: firstName,
  //     lastname: lastName,
  //     phone: phone
  //   };
  //   try {
  //     const response = await fetch("/rest/accountedit", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' 
  //     },
  //       body: JSON.stringify(userData),
  //     });
  //     if (response.ok) {
  //       console.log("Les modifications ont été enregistrées avec succès !");
  //       window.location.reload(); // Recharger la page après la mise à jour
  //     } else {
  //       console.error("Erreur lors de l'enregistrement des modifications :", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la communication avec l'API :", error);
  //   }
  // }
  // async function updateInfos() {
  //   let userData = { 
  //     firstname: first,
  //     lastname : last,
  //     phone : phone 
  //   };
  //     if (firstName !== undefined && firstName != null) userData["firstname"]=firstName;
  //     if (lastName !== undefined && lastName != null) userData["lastname"]=lastName;
  //     console.log(lastName);
  //   const reponse = await fetch("/api/users/" + user.id, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(userData),
  //   })
  //   window.location.reload();
  // }
  async function updateInfos() {
    let userData = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email
    };
    console.log("ici");
    const response = await fetch("/api/auth/myInformation", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      window.location.reload();
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userData = await getInfo();
  //     setUser(userData.psdata || {});
  //     setFirstName(userData.psdata?.firstname || "");
  //     setLastName(userData.psdata?.lastname || "");
  //     setPhone(userData.psdata?.phone || "");
  //     setEmail(userData.psdata?.email || "");
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getInfo();
      setUser(userData.psdata);
      setFirstName(userData.psdata.firstname);
      setLastName(userData.psdata.lastname);
      setPhone(userData.psdata.phone);
      setEmail(userData.psdata.email);
      
    };
    fetchData();
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    //console.log(firstName);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    //console.log(lastName);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    //console.log(phone);
  };
const handleEmailChange = (e) =>{
  setEmail(e.target.value);
}
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    try {
      await updateInfos(); // Appel de la fonction pour mettre à jour les informations
    } catch (error) {
      console.error("Une erreur s'est produite lors de la soumission du formulaire :", error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await fetch("/api/auth/profil", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ firstName, lastName, phone }),
  //     });
      
  //     // Vérifier la réussite de la requête
  //     if (response.ok) {
  //       console.log("Les modifications ont été enregistrées avec succès !");
  //     } else {
  //       console.error(
  //         "Erreur lors de l'enregistrement des modifications :",
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la communication avec l'API :", error);
  //   }
  // };

  return (
    <>
      <HeaderProfile />
      <div className="container">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-7">
            {user && (
              <div className="card card-info-profil">
                <div className="card-header">
                  <h2>Modifier mes informations</h2>
                </div>
                <div className="card-body">
                  
                    <div className="row">
                      <div className="col-25">
                        <label htmlFor="fname" className="form-control-label">
                          Prénom*
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          className="input-text"
                          type="text"
                          id="fname"
                          name="firstname"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-25">
                        <label htmlFor="lname" className="form-control-label">
                          Nom*
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          className="input-text"
                          type="text"
                          id="lname"
                          name="lastname"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-25">
                        <label htmlFor="country" className="form-control-label">
                          Téléphone *
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          className="input-text"
                          type="text"
                          id="fphone"
                          name="fixphone"
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-25">
                        <label htmlFor="email" className="form-control-label">
                          Email
                        </label>
                      </div>
                      <div className="col-75">
                        <input
                          className="input-text input-email-none"
                          type="text"
                          id="email"
                          name="email"
                          value={user.email}
                        />
                      </div>
                    </div>
                 
                </div>
                <div className="card-footer d-flex justify-content-start">
                  <input
                    className="input-submit"
                    type="submit"
                    value="Enregitrer"
                    onClick={handleSubmit}
                  />
                  <style jsx>{`
                    .input-submit:hover {
                      background-color: #fceb26 !important;
                      color: #000 !important;
                    }
                  `}</style>
                </div>
              </div>
            )}
          </div>
          <div className="col-5">
            <div className="card card-info-profil">
              <div className="card-header">
                <h2>Modifer Mot de Passe</h2>
              </div>
              <div className="card-body">
                <form action="/action_page.php">
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="fname" className="form-control-label">
                        Ancien mot de passe*
                      </label>
                    </div>
                    <div className="col-75">
                      <input
                        className="input-password"
                        type="password"
                        id="oldpass"
                        name="oldpassword"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="lname" className="form-control-label">
                        Nouveau mot de passe*
                      </label>
                    </div>
                    <div className="col-75">
                      <input
                        className="input-password"
                        type="password"
                        id="newpass"
                        name="newpassword"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label htmlFor="country" className="form-control-label">
                        Confirmation mot de passe*
                      </label>
                    </div>
                    <div className="col-75">
                      <input
                        className="input-password"
                        type="password"
                        id="confpass"
                        name="confirmpassword"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer d-flex justify-content-start">
                <input
                  className="input-submit"
                  type="submit"
                  value="Enregitrer"
                />
                <style jsx>{`
                  .input-submit:hover {
                    background-color: #fceb26 !important;
                    color: #000 !important;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
