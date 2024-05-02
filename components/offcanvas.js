import React, { useState } from "react";
import Header from "./header";
import Dropdown from "./dropdown";
import Link from "next/link";


export default function Offcanvas({ locale,open }) {
  const [isOpen, setIsOpen] = useState(open);
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
  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}>
        <div className="bg-red  offcanvas-header">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" onClick={toggleOffcanvas}></button>
        </div>
      <div
            
            className={`bg-dark collapse navbar-collapse justify-content-end ${isOpen ? "show" : ""}`}
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
        )}
    </>
  );
}
