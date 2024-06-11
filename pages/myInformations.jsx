import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useRouter } from "next/router";


export default function MyInformations() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword]= useState();
  const router = useRouter();
  async function getInfo() {
    const response = await fetch("/api/auth/profil", {
      method: "GET",
    });
    //console.log(response);
    console.log("*******", response);
    const data = await response.json();
    console.log("*******", data);
    return data;
  }
 
  
  async function resetPassword() {
    let newPass = {
      email : email,
      old_password : oldPassword,
      new_password : newPassword,
    }
    if(newPassword === confirmPassword)
      {
    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPass),
        //body: JSON.stringify({ email, old_password: oldPassword, new_password: newPassword })
      });
      console.log("response",response);
      const data = await response.json();
      if(data.status==='success'){
      console.log("ccccccccccc",data);
      router.push("/logout");
      }
      else{
        console.log("Old password is incorrect.")
        setMessage(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  else{
    setMessage("Les deux mot de pass ne sont pas identique.")
  }
  }
  async function updateInfos() {
    let userData = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
    };
    console.log("ici");
    console.log(userData)
    const response = await fetch("/api/auth/myInformation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      //window.location.reload();
    }
  }

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

 

  const handleChangePassword = (e) => {
    setOldPassword(e.target.value);
  }
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }
  const handleChangeconfPassword = (e) => {
    setConfirmPassword(e.target.value);
  }
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    try {
      await updateInfos(); // Appel de la fonction pour mettre à jour les informations
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la soumission du formulaire :",
        error
      );
    }
  };
 

  return (
    <>
      <Header />
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
                        required
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
                        required
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
                        required
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
                    value="Enregistrer"
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
                        onChange={handleChangePassword}
                        required
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
                        onChange={handleChangeNewPassword}
                        required
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
                        onChange={handleChangeconfPassword}
                        required
                      />
                    </div>
                    <div style={{ color: "red" }} id="erreur" className="form-text pb-3">
                  {message}
                </div>
                  </div>
                </form>
              </div>
              <div className="card-footer d-flex justify-content-start">
                <input
                  className="input-submit"
                  type="submit"
                  value="Enregistrer"
                  onClick={() => resetPassword()}
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
