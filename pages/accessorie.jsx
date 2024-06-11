import Footer from "../components/footer";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { CategoryProduct } from "./api/categoryProducts";
//import accessoriesData from "/public/accessories-mocks.json";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Filter from "../components/filter";
import { FilterProvider } from "./hooks/useFilter";
import ProductCategorie from "../components/productCategorie";

export default function Accessorie() {
  const categorie_id = 9;
  const [accessories, setAccessories] = useState([]);
  const [facets, setFacets] = useState([]);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Fonction pour obtenir les produits de la catégorie
    async function fetchCategoryProducts() {
      try {
        const categoryProducts = await CategoryProduct(categorie_id); // Remplacez 9 par l'ID de votre catégorie
        setAccessories(categoryProducts.products);
        setFacets(categoryProducts.facets);
        setCount(categoryProducts.products.length);
        console.log(categoryProducts.breadcrumbs.links);
        setBreadCrumbs(categoryProducts.breadcrumbs.links);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits de la catégorie :",
          error
        );
      }
    }

    fetchCategoryProducts(); // Appel de la fonction au chargement du composant
  }, []);

  return (
    <>
      <Header />
      <FilterProvider>
        <div id="js-product-list-header Pub">
          <img
            src="/image/accessoires.png"
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="container-fluid pt-3">
          <nav
            className="text-purple"
            style={{ "--bs-breadcrumb-divider": ">" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb breadcrumb-style">
              {breadCrumbs &&
                breadCrumbs.length > 0 &&
                breadCrumbs.map((link, index) => {
                  return (
                    <li className="breadcrumb-item" key={index}>
                      <a className="text-decoration-none text-purple" href={link.url}>{link.title}</a>
                      <span>{index < breadCrumbs.length - 1 && " >"}</span>
                    </li>
                  );
                })}
            </ol>
          </nav>

          <div className="d-flex">
            <div className="row p-2 justify-content-center">
              <div className="col-4" id="filter">
                <Filter facets={facets} />
              </div>
              <div className="col-8">
                <div className="hstack select-style gap-2">
                <div className="p-2 qt-product">Il ya {count} produits</div>                  <div className="p-2 ms-auto">
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
                    <ProductCategorie
                      products={accessories}
                      categorie_id={categorie_id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FilterProvider>
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
