import Link from "next/link";
import Dropdown from "./dropdown";
import React, { useState } from "react";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

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
