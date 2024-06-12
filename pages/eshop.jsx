import Header from "../components/header";
import Footer from "../components/footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CategoryProduct } from "./api/categoryProducts";
import React, { useEffect, useState } from "react";
import { FilterProvider } from "./hooks/useFilter";
import FilterEshop from "../components/filterEshop";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Categorie from "../components/categorie";
export default function Eshop() {
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [categories, setCategories] = useState();
  const [marques, setMarques] = useState([]);

  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const categoryIds = [8, 9];
  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const results = await Promise.all(
          categoryIds.map((id) => CategoryProduct(id))
        );

        const combinedProducts = results.flatMap((result) => result.products);
        const combinedFacets = results.flatMap((result) => result.facets);
        const combinedBreadcrumbs = ["Accueil", "Produits"];
       
        const tabCatgories = results.map(element => ({
          id: element.id,
          name: element.name
        }));
       
        const tabMarques=combinedFacets.find(element=>element.label=="Marque");
        
        setMarques(tabMarques.filters);
        setCategories(tabCatgories);
        setProducts(combinedProducts);
        setFacets(combinedFacets);
        setCount(combinedProducts.length);
        setBreadCrumbs(combinedBreadcrumbs);
      } catch (err) {
        console.log("Erreur de chargement des produits");
      }
    }
    fetchCategoryProducts();
  }, []);

  return (
    <>
      <Header />
      <FilterProvider>
        <div className="container-fluid">
          <nav
            className="text-purple"
            style={{ "--bs-breadcrumb-divider": ">" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb breadcrumb-style">
              {breadCrumbs &&
                breadCrumbs.length > 0 &&
                breadCrumbs.map((title, index) => (
                  <li className="breadcrumb-item" key={index}>
                    <a className="text-decoration-none text-purple" href="/">
                      {title}
                    </a>
                    <span>{index < breadCrumbs.length - 1 && " >"}</span>
                  </li>
                ))}
            </ol>
          </nav>
          <div className="row">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
            {categories && (
              <FilterEshop categories={categories} marques={marques}/>
            )}
              
            </div>
            <div className="col-12 col-md-8">
              <div className="row m-1 select-style align-items-center">
                <div className="col-12 col-md-3 mb-2 mb-md-0">
                  <div className="qt-product">Il y a {count} produits</div>
                </div>
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      name="search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      <i className="bi bi-search" />
                    </button>
                  </form>
                </div>
                <div className="col-12 col-md-3">
                  <form>
                    <select className="form-select">
                      <option></option>
                      <option>Meilleures Ventes</option>
                      <option>Pertinence</option>
                      <option>Prix croissant</option>
                      <option>Prix décroissant</option>
                    </select>
                  </form>
                </div>
              </div>

              <div className="row gy-4 align-items-center">
                <Categorie
                  products={products}
                  categories={categoryIds}
                />
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
