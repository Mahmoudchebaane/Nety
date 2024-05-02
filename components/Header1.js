import Link from "next/link";
import Dropdown from "./dropdown";
import React, { useState } from "react";
const menuItemsProducts = {
  title: "Produits",
  children: [
    {
      title: "Smartphones",
      route: "phone",
    },
    {
      title: "Accessoires",
      route: "/",
    },
  ],
};
const menuItemsServices = {
  title: "Services",
  children: [
    {
      title: " Nety Security",
      route: "/products/hinkle-horns",
    },
    {
      title: "Nety Service de Contenu",
      route: "/products/doozers",
    },
  ],
};
const menuItemsOffres = {
  title: "Offres Internet",
  children: [
    {
      title: "Offres Net's Go",
      route: "/products/hinkle-horns",
    },
  ],
};

export default function Header1({ locale }) {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu déroulant
  // Fonction pour basculer l'état isOpen
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-purple header-purple">
        <div className="container-fluid center-container">
          <Link href="#" className="navbar-brand">
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
          <div
            id="collapsibleNavbar"
            className={`collapse navbar-collapse justify-content-end ${isOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav">
              <Dropdown key="offres" items={menuItemsOffres} locale={locale} />
              <Dropdown
                key="products"
                items={menuItemsProducts}
                locale={locale}
              />
              <Dropdown
                key="services"
                items={menuItemsServices}
                locale={locale}
              />
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Nos boutiques
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
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
