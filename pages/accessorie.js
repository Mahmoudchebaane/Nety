import Footer from "../components/footer";
import Header from "../components/header";
import React, { useState } from "react";
import FilterAccessories from "../components/filter_accessories";
import accessoriesData from "/public/accessories-mocks.json";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Accessorie() {
  const [accessories] = useState(accessoriesData.accessories);
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div id="js-product-list-header Pub">
        <img src="/image/accessoires.png" className="card-img-top" alt="..." />
      </div>
      <div className="container">
        <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Accueil</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bibliothèque
            </li>
          </ol>
        </nav>

        <div className="d-flex">
          <div className="row p-2 justify-content-center">
            <div className="col-4" id="filter">
              <FilterAccessories />
            </div>
            <div className="col-8">
              <div className="hstack gap-2">
                <div className="p-2">Nombre de produit</div>
                <div className="p-2 ms-auto">
                  <form>
                    <select className="form-select mt-2">
                      <option></option>
                      <option>Meilleures Ventes</option>
                      <option>Pertinence</option>
                      <option>Prix croissant</option>
                      <option>Prix décroissant</option>
                    </select>
                  </form>
                </div>
              </div>

              <div id="produit">
                <div className="row gap-3 justify-content-center align-items-center">
                  {accessories.map((accessorie, index) => (
                    <div key={index} className="card card-product-home">
                      <div className="card-header card-header-product">
                        <a className="text-dark" href="#">
                          <i className="bi bi-cart-fill"></i>
                        </a>
                      </div>
                      <div className="card-body text-center">
                        <a
                          className="text-center text-dark text-decoration-none"
                          href="#"
                        >
                          <img
                            src={accessorie.cover.url}
                            className="card-img-top"
                            alt="..."
                          />
                          <h3 className="">{accessorie.name}</h3>
                          <p className="">{accessorie.availability_message}</p>
                          <p className="regular_price">
                            {accessorie.regular_price}
                          </p>
                          <p className="price">{accessorie.price}</p>
                        </a>
                      </div>
                    </div>
                  ))}
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
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
