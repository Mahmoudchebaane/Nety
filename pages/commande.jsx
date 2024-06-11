import AdresseList from "../components/adresseList";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { getAdresse } from "./api/auth/adresse";
import RecapPanier from "../components/recapPanier";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Commande() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [profil, setProfil] = useState({});
  const [adresse, setAdresse] = useState();
  const [selectedDeliveryAdress, setSelectedDeliveryAdress] = useState(null);
  const [selectedInvoiceAdress, setSelectedInvoiceAdress] = useState(null);
  // **************** adresse
  const [currentAdress, setCurrentAdress] = useState();
  const [alias, setAlias] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [idAdress, setIdAdress] = useState(""); // Assurez-vous que le nom de cet état correspond à votre API
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  // ******************

  async function getInfoProfil() {
    const response = await fetch("/api/auth/profil", {
      method: "GET",
    });
    //console.log("**response**", response);
    const data = await response.json();
    // console.log("***data***", data);
    // console.log("***psdata***", data.psdata);
    return data;
  }

  async function getAllAdressUser() {
    const response = await fetch(`/api/auth/adresse`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const nouvelleAdresse = {
        alias: data.get("alias"),
        postcode: data.get("codePostal"),
        address1: data.get("adresse"),
        id_country: 208,
        country: "Tunisie",
        city: data.get("ville"),
      };
      //console.log("new adresse", nouvelleAdresse);
      const url = await fetch(`/api/auth/adresse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nouvelleAdresse),
      });
      const newAdr = await url.json();
      if (url.ok) {
        console.log(newAdr);
        console.log("newAdr after add", newAdr);
        document.location.reload();
      }
    } catch {
      alert("Une erreur est survenue lors de l'ajout d'une nouvelle adresse");
    }

    setShowAddForm(false);
  }

  async function getAdressById(id_adresse) {
    try {
      //console.log("***************", id_adresse);
      const response = await fetch(
        `/api/auth/adresse?id_address=${id_adresse}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'adresse");
      }
      const data = await response.json();
      //console.log("Adresse récupérée :", data.psdata);

      // Mise à jour des états avec les données récupérées
      setIdAdress(data.psdata.id);
      //console.log("iddddddddddd", data.psdata.id);
      setAlias(data.psdata.alias);
      setAddress1(data.psdata.address1);
      setCity(data.psdata.city);
      setPostcode(data.psdata.postcode);
      setCountry(data.psdata.country);

      // Affichage du formulaire d'édition
      setShowEditForm(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error);
      return [];
    }
  }
  
  function handleSubmitAdress() {}
  async function updateUserAddress(id_adresse) {
    try {
      //console.log("iddddddddd", id_adresse);
      // Création de l'objet représentant les données à envoyer
      const updatedAddressData = {
        id_address: id_adresse,
        alias: alias,
        address1: address1,
        city: city,
        id_country: 208,
        postcode: postcode,
        country: country,
      };
      // Envoi des données mises à jour au serveur
      const response = await fetch(`/api/auth/adresse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddressData),
      });
      //console.log("/////", JSON.stringify(updatedAddressData));
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'adresse");
      }
      // Affichage d'un message de succès ou redirection vers une autre page, etc.
      console.log("Adresse mise à jour avec succès");
      document.location.reload();
    } catch (error) {
      console.error("Erreur lors de la modification de l'adresse :", error);
      // Affichage d'un message d'erreur pour informer l'utilisateur
      alert(
        "Erreur lors de la modification de l'adresse. Veuillez réessayer plus tard."
      );
    }
  }

  async function handleDeleteAdresse(id) {
    try {
      //console.log("???????", id, JSON.stringify(id));
      const url = `/api/auth/adresse`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        throw new Error("Impossible de supprimer cette Adresse");
      }

      // Confirmation visuelle de la suppression réussie
      alert("L'adresse a été supprimée avec succès.");

      document.location.reload();

      // Rechargement de la page pour refléter les changements
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse :", error);
      // Affichage d'un message d'erreur pour informer l'utilisateur
      alert(
        "Erreur lors de la suppression de l'adresse. Veuillez réessayer plus tard."
      );
    }
  }

  useEffect(() => {
    //console.log("ici useeffect");
    const fetchProfil = async () => {
      const profilInfo = await getInfoProfil();
      setProfil(profilInfo.psdata);
      const adresses = await getAllAdressUser();

      setAdresse(adresses.psdata);
      setSelectedDeliveryAdress(adresses.psdata[0].id);
      setSelectedInvoiceAdress(adresses.psdata[0].id);
    };
    fetchProfil();
  }, []);
  //console.log("adresse de ce profil", adresse);
  //console.log(adresse.psdata)
  //   console.log("profil",profil.firstname , profil.lastname);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  async function confirmCommande(items) {
    try {
      const response = await fetch(`/api/auth/confirmeOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });
      if (!response.ok) {
        throw new Error("Impossible de confirmer la commande");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande :", error);
      return [];
    }
  }

  const handelUpdateAdress = () => {
    setShowEditForm(true);
  };

  const handleAddAdress = () => {
    setShowAddForm(true); // Afficher le formulaire
  };

  const handleCancel = () => {
    setShowAddForm(false); // C
    setShowEditForm(false);
  };

  const handleChangeAdress = (e) => {
    setAddress1(e.target.value);
  };
  const handleChangeCodePostal = (e) => {
    setPostcode(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeAlias = (e) => {
    setAlias(e.target.value);
  };

  const handleConfirmCommande = () => {
    console.log("adres liste", adresse);
    const items = {
      id_cart: "939",
      id_address_delivery: selectedDeliveryAdress,
      id_address_invoice: selectedInvoiceAdress,
      id_carrier: "35",
    };
    console.log("///////", items);
    confirmCommande(items);
  };
  const changeInvoiceAdress = (e) => {
    console.log("Invoice Adress", e.target.value);
    setSelectedInvoiceAdress(e.target.value);
  };
  function changeDeliveryadress(e) {
    console.log("delivery adress", e.target.value);
    setSelectedDeliveryAdress(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row gy-5 gx-3">
          <div className="col-lg-8 gx-5">
            <div className="accordion" id="accordionExample">
              <div className="row pb-3">
                <div className="col-md-12 panier-table">
                  <div className="accordion-item commande-collapse">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeIndex === 0 ? "collapsed" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(0)}
                        aria-expanded={activeIndex === 0}
                        aria-controls="collapseOne"
                      >
                        <h6>1- INFORMATIONS PERSONNELLES </h6>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className={`accordion-collapse collapse ${
                        activeIndex === 0 ? "show" : ""
                      }`}
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <span>
                          {" "}
                          Connecter en tant que :{" "}
                          <b>
                            {profil.firstname} {profil.lastname}
                          </b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-md-12 panier-table">
                  <div className="accordion-item commande-collapse">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeIndex === 1 ? "collapsed" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(1)}
                        aria-expanded={activeIndex === 1}
                        aria-controls="collapseOne"
                      >
                        <h6>2- ADRESSES</h6>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className={`accordion-collapse collapse ${
                        activeIndex === 1 ? "show" : ""
                      }`}
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      {!showAddForm && !showEditForm && (
                        <>
                          <b className="titre-adress">Adresse de livraison :</b>

                          {adresse?.map((adresse, index) => (
                            <div className="accordion-body">
                              <div className="row align-items-center collapse-livraison">
                                <div key={index} className="col m-2">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id={`radio${index}`}
                                      name="optradio"
                                      value={adresse.id}
                                      onChange={changeDeliveryadress}
                                      checked={
                                        selectedDeliveryAdress === adresse.id
                                      }
                                      required
                                    />
                                    <label
                                      className="form-check-label pb-2"
                                      htmlFor={`radio${index}`}
                                    >
                                      {adresse.address1}
                                    </label>
                                  </div>
                                </div>
                                <div className="col d-flex justify-content-end">
                                  <i
                                    className="bi bi-pencil-fill px-3"
                                    onClick={() => getAdressById(adresse.id)}
                                  />
                                  <i
                                    className="bi bi-trash"
                                    onClick={() =>
                                      handleDeleteAdresse(adresse.id)
                                    }
                                  />
                                </div>
                                <div className="row">
                                  <p>
                                    <b>Adresse :</b> {adresse.address1}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-adress"
                              onClick={() => handleAddAdress()}
                            >
                              <b>+</b> Ajouter une adresse
                            </button>
                          </div>
                        </>
                      )}
                      {/* Affichez le formulaire d'ajout si showAddForm est vrai */}
                      {showAddForm && (
                        <form onSubmit={handleSubmit}>
                          {/* Votre formulaire d'ajout ici */}
                          <div className="row m-2">
                            <div className="col-sm-6">
                              <label className="form-label">Alias</label>
                              <input
                                type="text"
                                id="alias"
                                name="alias"
                                value={adresse.alias}
                                className="form-control"
                                placeholder="Alias"
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label">Adresse</label>
                              <input
                                type="text"
                                name="adresse"
                                className="form-control"
                                placeholder="Adresse"
                              />
                            </div>
                          </div>
                          <div className="row m-2">
                            <div className="col-sm-6">
                              <label className="form-label">Code postal</label>
                              <input
                                type="text"
                                name="codePostal"
                                className="form-control"
                                placeholder="Code postal"
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label">Ville</label>
                              <input
                                type="text"
                                name="ville"
                                className="form-control"
                                placeholder="Ville"
                              />
                            </div>
                          </div>
                          <div className="d-flex m-2 justify-content-start">
                            <button
                              type="button"
                              className="btn btn-adress"
                              onClick={() => handleCancel()}
                            >
                              Annuler
                            </button>
                            <button type="submit" className="btn btn-adress">
                              <b> Ajouter </b>
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Affichez le formulaire de modification si showEditForm est vrai */}
                      {showEditForm && (
                        <form onSubmit={handleSubmit}>
                          {/* Votre formulaire d'ajout ici */}
                          <div className="row m-2">
                            <div className="col-sm-6">
                              <label className="form-label">Alias</label>
                              <input
                                type="text"
                                id="alias"
                                name="alias"
                                value={alias}
                                className="form-control"
                                placeholder="Alias"
                                onChange={handleChangeAlias}
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label">Adresse</label>
                              <input
                                type="text"
                                value={address1}
                                name="address1"
                                className="form-control"
                                placeholder="Adresse"
                                onChange={handleChangeAdress}
                              />
                            </div>
                          </div>
                          <div className="row m-2">
                            <div className="col-sm-6">
                              <label className="form-label">Code postal</label>
                              <input
                                type="text"
                                value={postcode}
                                name="codePostal"
                                className="form-control"
                                placeholder="Code postal"
                                onChange={handleChangeCodePostal}
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label">Ville</label>
                              <input
                                type="text"
                                value={city}
                                name="ville"
                                className="form-control"
                                placeholder="Ville"
                                onChange={handleChangeCity}
                              />
                            </div>
                          </div>
                          <div className="d-flex m-2 justify-content-start">
                            <button
                              type="button"
                              className="btn btn-adress"
                              onClick={() => handleCancel()}
                            >
                              Annuler
                            </button>
                            <button
                              type="button"
                              className="btn btn-adress"
                              onClick={() => updateUserAddress(idAdress)}
                            >
                              <b> Enregistrer </b>
                            </button>
                          </div>
                        </form>
                      )}

                      {!showAddForm && !showEditForm && (
                        <>
                          <b className="titre-adress">
                            Adresse de facturation :
                          </b>

                          {adresse?.map((adresse, index) => (
                            <div className="accordion-body">
                              <div className="row align-items-center collapse-livraison">
                                <div key={index} className="col m-2">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id={`radio${index}`}
                                      name="optradiofacturation"
                                      value={adresse.id}
                                      onChange={changeInvoiceAdress}
                                      checked={
                                        selectedInvoiceAdress === adresse.id
                                      }
                                    />
                                    <label
                                      className="form-check-label pb-2"
                                      htmlFor={`radio${index}`}
                                    >
                                      {adresse.address1}
                                    </label>
                                  </div>
                                </div>
                                <div className="col d-flex justify-content-end">
                                  <i
                                    className="bi bi-pencil-fill px-3"
                                    onClick={() => getAdressById(adresse.id)}
                                  />
                                  <i
                                    className="bi bi-trash"
                                    onClick={() =>
                                      handleDeleteAdresse(adresse.id)
                                    }
                                  />
                                </div>
                                <div className="row">
                                  <p>
                                    <b>Adresse :</b> {adresse.address1}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      <button
                        className="m-2 btn btn-env-order "
                        onClick={() => {
                          toggleAccordion(1);
                          toggleAccordion(2);
                          handleSubmitAdress;
                        }}
                      >
                        Continuer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pb-3">
                <div className="col-md-12 panier-table">
                  <div className="accordion-item commande-collapse">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeIndex === 2 ? "collapsed" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(2)}
                        aria-expanded={activeIndex === 2}
                        aria-controls="collapseTwo"
                      >
                        <h6>3- MODE DE LIVRAISON</h6>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className={`accordion-collapse collapse ${
                        activeIndex === 2 ? "show" : ""
                      }`}
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row align-items-center collapse-livraison">
                          <div className="col">
                            <img src="/image/delivery.png"></img>
                          </div>
                          <div className="col">
                            <b>Domicile</b>
                          </div>
                          <div className="col">48h</div>
                          <div className="col">
                            <b>7.000 TND</b> TTC
                          </div>
                        </div>
                        <div className="m-2 pt-3">
                          <span>
                            Si vous avez des remarques ou des commentaires à
                            propos de votre commande, veuillez les indiquer dans
                            le champ prévu à cet effet.
                          </span>
                        </div>
                        <div className="m-3">
                          <label
                            for="exampleFormControlTextarea1"
                            className="form-label"
                          />
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>
                        <button
                          className="m-2 btn btn-env-order"
                          onClick={() => {
                            toggleAccordion(2);
                            toggleAccordion(3);
                          }}
                        >
                          Continuer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-md-12 panier-table">
                  <div className="accordion-item commande-collapse">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeIndex === 3 ? "collapsed" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(3)}
                        aria-expanded={activeIndex === 3}
                        aria-controls="collapseThree"
                      >
                        <h6>4- PAIEMENT</h6>
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className={`accordion-collapse collapse ${
                        activeIndex === 3 ? "show" : ""
                      }`}
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <strong>
                          This is the third item's accordion body.
                        </strong>{" "}
                        <button
                          className="m-2 btn btn-env-order"
                          onClick={() => handleConfirmCommande()}
                        >
                          Confirmer votre commande
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 req-cmd">
            <RecapPanier />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}