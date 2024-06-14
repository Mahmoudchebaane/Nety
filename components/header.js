import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Dropdown from "./dropdown";
import React, { useState, useEffect } from "react";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const menuItemsLogout = {
  title: "My Nety",
  icon: "bi bi-person-fill",
  children: [
    {
      title: "My Nety",
      route: "/profile",
    },
    {
      title: "Mes informations",
      route: "/myInformations",
    },
    {
      title: "Mes commandes",
      route: "/orders",
    },
    {
      title: "Déconnexion",
      route: "/logout",
    },
  ],
};

const menuItemsProducts = {
  title: "Produits",
  children: [
    {
      title: "Smartphones",
      route: "/phone",
      id_category: 8,
    },
    {
      title: "Accessoires",
      route: "/accessorie",
      id_category: 9,
    },
  ],
};
const menuItemsServices = {
  title: "Services",
  children: [
    {
      title: " Nety Security",
      route: "/nety_security",
    },
    {
      title: "Nety Service de Contenu",
      route: "/nety_service",
    },
  ],
};
const menuItemsOffres = {
  title: "Offres Internet",
  children: [
    {
      title: "Offres Net's Go",
      route: "/offre-net-s-go",
    },
  ],
};
const menuItemsMyNety = {
  title: "My Nety",
  icon: "bi bi-person-fill",
  children: [
    {
      title: "Se connecter",
      route: "/login",
    },
    {
      title: "S'inscrire",
      route: "/register",
    },
  ],
};
export default function Header({}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu déroulant
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const handleChangePanier = () => {
    router.push("/panier");
  };
  const handleChangeCommande = (e) => {
    router.push("/commande");
  };
  const goToAbonnerVous = ()=>{
    router.push("/demandeabonnement")
  }

  const { t } = useTranslation();
  useEffect(() => {
    let totalPrice = 0;
    let totalQte = 0;

    const listPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setProducts(listPanier);
    console.log(listPanier);
    listPanier.forEach((item) => {
      totalQte = totalQte + item.qte;
      totalPrice +=
        parseFloat(item.qte) * (item.remise ? item.remise : item.prix);
    });
    setTotalPrice(totalPrice);
    setQty(totalQte);
    //console.log("QTE", totalQte);
    //console.log("QTE", totalPrice);
    // Vérifie si des données d'utilisateur sont présentes dans le localStorage
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      dispatch({ type: "LOGIN", payload: JSON.parse(userFromStorage) });
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const deletProductFromPanier = (productId) => {
    let totalPrice = 0;
    let productsAfterDeletion = products.filter(
      (prod) => prod.id !== productId
    );
    setProducts(productsAfterDeletion);
    console.log("--header--", productsAfterDeletion);
    totalPrice = productsAfterDeletion.reduce(function (acc, obj) {
      return acc + obj.qte * (obj.remise ? obj.remise : obj.prix);
    }, 0);
    setTotalPrice(totalPrice);
    console.log("/header/", totalPrice);
    localStorage.setItem("panier", JSON.stringify(productsAfterDeletion));
  };

  return (
    <>
    
      <div className="navbar navbar-expand-lg navbar-purple navbar-padding">
        <div className="container-fluid center-container">
          <div className="col-3 d-flex align-items-center font-size-18 ">
            <a className="titleB2C b2cActive text-decoration-none" href="">
              {t("particular")}
            </a>
            <a
              className="titleB2B text-decoration-none"
              href="https://business.nety.tn"
            >
              {t("professional")}
            </a>
          </div>
          <div className="nav-bar-hidden d-flex col-9">
          
            <div className="d-flex col-6 align-items-center">
              <div className="nov_button nety-secondary mx-2 ">
                <a
                  href="https://www.nety.tn/fr/module/paiementfacture/nouveau"
                  id="paiementfacture"
                  className="text-decoration-none"
                >
                  {t("invoice_payment")}
                </a>
              </div>
              <div className="nov_button nety-primary mx-2">
                <a
                  onClick={goToAbonnerVous}
                  id="DAHeader"
                  className="nov_button nety-primary mx-2 text-decoration-none"
                >
                  {t("subscribe")}
                </a>
              </div>
            </div>
            <div className="col d-flex align-items-center justify-content-end text-decoration-none">
              <div className="d-flex align-items-center text-decoration-none">
                <div
                  className="px-4 text-decoration-none"
                  style={{
                    color: "#fdec25",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                  }}
                >
                  <a className="text-decoration-none" href="/eshop">
                    <i className="bi bi-shop link"></i>
                    <span className="text-decoration-none link">
                      &nbsp; E-shop
                    </span>
                  </a>
                </div>
                {user ? (
                  <div className="dropdown myAccountDropdown">
                    <Dropdown
                      items={menuItemsLogout}
                      username={user.firstname + " " + user.lastname}
                    />
                  </div>
                ) : (
                  <div className="dropdown myAccountDropdown">
                    <Dropdown items={menuItemsMyNety} />
                  </div>
                )}
                {/* Panier */}
                
                <div className="px-3">
                  <div id="_desktop_cart">
                    <div
                      className="blockcart cart-preview"
                      data-refresh-url="//www.nety.tn/fr/module/ps_shoppingcart/ajax"
                    >
                      <div className="header-cart d-flex flex-row align-items-center">
                        <div className="cart-left">
                        </div>
                        {qty!==0 ? (
                          <span className="cart-products-count">{qty}</span>
                          ):
                          null}
                          <i
                            className="bi bi-cart-fill"
                            style={{ color: "white" }}
                            onClick={() => setShowModal(true)}
                          />
                          {/* Modal */}

                          {showModal && (
                            <div
                              className="modal fade show"
                              tabIndex="-1"
                              style={{ display: "block" }}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <button
                                      type="button"
                                      className="btn-close"
                                      onClick={handleCloseModal}
                                      aria-label="Close"
                                    ></button>
                                  </div>

                                  {/* Modal body content */}

                                  {Array.isArray(products) &&
                                  products.length > 0 ? (
                                    products.map((product, index) => (
                                      <div className="modal-body">
                                        <div
                                          key={index}
                                          className="row align-items-center justify-content-center"
                                        >
                                          <div className="col justify-content-center">
                                            <img
                                              className="img-modal"
                                              src={product.img}
                                            />
                                          </div>
                                          <div className="col-6">
                                            <b>{product.nom} </b>
                                            <div>
                                              <span>
                                                {" "}
                                                Nombre : {product.qte}
                                              </span>
                                            </div>
                                            <div>
                                              <b>
                                                {product.remisePrix
                                                  ? product.remisePrix
                                                  : product.prixFinal}
                                              </b>{" "}
                                              x {product.qte}
                                            </div>
                                          </div>

                                          <div className="col text-end">
                                            <i
                                              class="bi modal-icon bi-trash3"
                                              onClick={() =>
                                                deletProductFromPanier(
                                                  product.id
                                                )
                                              }
                                            ></i>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <tr>
                                      <td className="p-3">
                                        <img src="/image/sad.png"></img> Aucun
                                        produit dans le panier.
                                      </td>
                                    </tr>
                                  )}
                                  <hr />

                                  <div className="row total-prix-modal">
                                    <div className="col">
                                      <b>TOTAL</b>
                                    </div>
                                    <div className="col text-end">
                                      <span className="prix-modal">
                                        {totalPrice} TND
                                      </span>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-modal-achat"
                                      onClick={handleChangePanier}
                                    >
                                      Voir panier
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-modal-panier"
                                      onClick={handleChangeCommande}
                                    >
                                      Commander
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown langDropdown">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-purple header-purple">
        <div className="container-fluid center-container">
        <div className="col-3 d-flex align-items-center ">
          <Link href="/" className="navbar-brand">
            <img className="logo img-fluid" src="/image/logo.jpg" alt="logo" />
          </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            onClick={toggleDropdown}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {isOpen && (
            <div
              className={`offcanvas offcanvas-mobile offcanvas-end ${
                isOpen ? "show" : ""
              }`}
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  onClick={toggleOffcanvas}
                ></button>
              </div>
              <div
                className={`collapse navbar-collapse justify-content-end ${
                  isOpen ? "show" : ""
                }`}
              >
                <ul className="navbar-nav">
                  <Dropdown key="offres" items={menuItemsLogout} />
                  <Dropdown key="offres" items={menuItemsOffres} />
                  <Dropdown key="products" items={menuItemsProducts} />
                  <Dropdown key="services" items={menuItemsServices} />
                  <li className="nav-item">
                    <Link href="/boutique" className="nav-link text-dark">
                      Nos boutiques
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/contact" className="nav-link text-dark">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div
            id="collapsibleNavbar"
            className={`collapse navbar-collapse justify-content-end `}
          >
            <ul className="navbar-nav">
              <Dropdown key="offres" items={menuItemsOffres} />
              <Dropdown key="products" items={menuItemsProducts} />
              <Dropdown key="services" items={menuItemsServices} />
              <li className="nav-item">
                <Link href="/nosboutique" className="nav-link">
                  Nos boutiques
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}