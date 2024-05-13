import AdresseList from "../components/adresseList";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";

export default function Commande() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [profil, setProfil] = useState({});
  const [adresse, setAdresse] = useState();

  async function getInfoProfil() {
    const response = await fetch("/api/auth/profil", {
      method: "GET",
    });
    console.log("**response**", response);
    const data = await response.json();
    console.log("***data***", data);
    console.log("***psdata***", data.psdata);
    return data;
  }
  async function getAllAdressUser() {
    const response = await fetch(`/api/auth/adresse`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("getAllAdressUser", data);
    return data;
  }
  // Get the products list when the page is loaded
  useEffect(() => {
    console.log("ici useeffect");
    //getInfoProfil();
    const fetchProfil = async () => {
      const profilInfo = await getInfoProfil();
      setProfil(profilInfo.psdata);
      const adresses = await getAllAdressUser();
      console.log("adresses", adresses);
      setAdresse(adresses.psdata);

      // //setAdresse(await getAllAdressUser());
      // console.log("adresses", adresses.psdata);
      // adresses.forEach((adresse) => {
      //   console.log("address1", adresse.address1);
      //   const nouvellesAdresses = [...adresse, adresse.address1];
      //   setAdresse(nouvellesAdresses);
      //   console.log("nouvelle adresse",nouvellesAdresses)
      // });
      //console.log("profilInfo", profilInfo);
    };
    fetchProfil();
  }, []);
  console.log("adresse de ce profil", adresse);
  //console.log(adresse.psdata)
  //   console.log("profil",profil.firstname , profil.lastname);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };
  const handleAddPromoCode = () => {
    // Mettez ici la logique pour ajouter le code promo
    console.log("Code promo ajouté :", promoCode);
  };
  return (
    <>
      <Header />
      <div className="container-fluid pt-5">
        <div className="row gy-5 gx-3">
          <div className="col-md-8">
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
                                  value={`option${index}`}
                                />
                                <label
                                  className="form-check-label pb-2"
                                  htmlFor={`radio${index}`}
                                >
                                  Option {index + 1}
                                </label>
                              </div>
                            </div>
                            <div className="col d-flex justify-content-end">
                              <i className="bi bi-pencil-fill px-3"></i>
                              <i className="bi bi-trash"></i>
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
                        <button className="btn btn-adress"><b>+</b> Ajouter une adresse</button>
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
                        It is hidden by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 req-cmd">
            <div className="bg-detail-product p-3 d-flex flex-column shadow mb-5 rounded">
              <h3 className="text-purple">Récapitulatif de commande</h3>
              <p>
                Il y a <b>qty </b>articles dans votre panier.
              </p>
              <hr />
              <div className="row">
                <div className="col text-start fw-bold">Total</div>
                <div className="col text-end">totalPrice,000 TND</div>
              </div>
              <div className="row pt-2 pb-3">
                <div className="col text-start fw-bold">Total livraison</div>
                <div className="col text-end fw-bold">gratuit</div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn pb-2 collapsible"
                  onClick="{toggleCollapse}"
                >
                  {collapsed
                    ? "Vous avez un code Promo ?"
                    : "Vous avez un code Promo ?"}
                </button>
                <div className={collapsed ? "content" : "content active"}>
                  {!collapsed && (
                    <div className="row">
                      <div className="col">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez votre code promo"
                          value={promoCode}
                          onChange={handlePromoCodeChange}
                        />
                      </div>
                      <div className="col">
                        <button className="btn" onClick={handleAddPromoCode}>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col">
                  <b>TOTAL</b> <span>( TTC )</span>
                </div>
                <div className="col text-end">
                  <b>{totalPrice} TND</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
