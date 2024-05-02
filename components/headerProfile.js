import Link from "next/link";
import Dropdown from "./dropdown";
import React, { useState } from "react";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

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
export default function HeaderProfile({}) {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu déroulant
  // Fonction pour basculer l'état isOpen
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <>
      <div className="header-top hidden-lg-down navbar-purple navbar-padding ">
        <div className="container center-container row">
          <div className="d-flex align-items-center font-size-16 no-gutters justify-content-between ">
            <div className="d-flex align-items-center font-size-18 ">
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

            <div className="d-flex nav-bar-hidden col-8">
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
                  href="https://www.nety.tn/fr/module/demandeabonnement/nouveau?"
                  id="DAHeader"
                  className="nov_button nety-primary mx-2 text-decoration-none"
                >
                  {t("subscribe")}
                </a>
              </div>

              <div className="d-flex align-items-center text-decoration-none">
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
                    <i className="bi bi-shop"></i>
                    <span className="text-decoration-none">&nbsp; E-shop</span>
                  </div>
                  <div className="dropdown myAccountDropdown">
                    <Dropdown items={menuItemsMyNety} />
                  </div>
                  <div className="px-2">
                    <div id="_desktop_cart">
                      <div
                        className="blockcart cart-preview"
                        data-refresh-url="//www.nety.tn/fr/module/ps_shoppingcart/ajax"
                      >
                        <div className="header-cart d-flex flex-row align-items-center">
                          <div className="cart-left">
                            <span>
                              <i
                                className="bi bi-cart-fill"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                          </div>
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
      </div>
      <nav className="navbar navbar-expand-lg bg-purple header-purple">
        <div className="container-fluid center-container">
          <Link href="/" className="navbar-brand">
            <img className="logo img-fluid" src="/image/logo.jpg" alt="logo" />
          </Link>
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
            <div className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}>
              <div className="bg-red  offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  onClick={toggleOffcanvas}
                ></button>
              </div>
              <div
                className={`bg-dark collapse navbar-collapse justify-content-end ${
                  isOpen ? "show" : ""
                }`}
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      My Nety
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/myInformations" className="nav-link">
                      Mes informations
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/orders" className="nav-link">
                      Mess commandes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className="nav-link">
                      Logout
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
              <li className="nav-item">
                <Link href="/profile" className="nav-link">
                  My Nety
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/myInformations" className="nav-link">
                  Mes informations
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/orders" className="nav-link">
                  Mes commandes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
