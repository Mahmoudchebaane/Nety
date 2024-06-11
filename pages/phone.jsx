import Footer from "../components/footer";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { CategoryProduct } from "./api/categoryProducts";
import Filtre from "../components/filter";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FilterProvider } from './hooks/useFilter';
import ProductCategorie from "../components/productCategorie";

export default function Phone() {
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);
  const [breadCrumbs,setBreadCrumbs]= useState([]);
  const [count,setCount]=useState(0);
  const { t } = useTranslation();
  const categorie_id=8;
  
  useEffect(() => {
    
    async function fetchCategoryProducts() {
      try {
        
        const categoryProducts = await CategoryProduct(categorie_id);
        setProducts(categoryProducts.products);
        setFacets(categoryProducts.facets);
        setCount(categoryProducts.products.length);
        console.log(categoryProducts.breadcrumbs.links)
        setBreadCrumbs(categoryProducts.breadcrumbs.links)
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

      <div id="js-product-list-header Pub">
        <div className="block-category">
          <div className="block-category-inner"></div>
          <div id="category-description" className="text-muted">
            <div className="pubBlock">
              <div className="fullDescr">
                <div className="row">
                  <img
                    src="/image/Vivo_logo_2019-svg.png"
                    alt="barndVivo"
                    width="250"
                    height="62"
                    className="col-8"
                  />
                  <p className="vivoy50 col-">Y22</p>
                </div>
                <h4 className="text-dark">
                  <b>Savourer chaque instant</b>
                </h4>
                <ul className="desc ul-list-vivo text-dark">
                  <li>
                    <b>Batterie 5000mAh</b>
                  </li>
                  <li>
                    <b>ROM 64GO</b>
                  </li>
                  <li>
                    <b>Processeur helio G85 OCTA CORE</b>
                  </li>
                </ul>
                <div className="d-flex">
                  <div className="camera">
                    <p className="cameraValue">2M</p>
                    <p className="cameraName">Macro Camera</p>
                  </div>
                  <div className="camera">
                    <p className="cameraValue">8M</p>
                    <p className="cameraName">Front Camera</p>
                  </div>
                  <div className="camera">
                    <p className="cameraValue">50M</p>
                    <p className="cameraName">Main Camera</p>
                  </div>
                </div>
              </div>
              <div className="descImg">
                <img src="/image/vivoy22.png" alt="vivo bg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <nav className="text-purple" style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style">
          
          {breadCrumbs && breadCrumbs.length > 0 && breadCrumbs.map((link, index) => {
            return (
              <li className="breadcrumb-item" key={index}>
                <a className="text-decoration-none text-purple" href={link.url}><b>{link.title}</b></a>
                <span>{index < breadCrumbs.length - 1 && " >"}</span>
              </li> 
            );
          })}
            
            
          </ol>
        </nav>
        <div className="d-flex">
          <div className="row p-2 justify-content-center">
            <div className="col-4">
              <Filtre facets={facets} />
            </div> 
            
            <div className="col-8">
              <div className="hstack select-style gap-2">
                <div className="p-2 qt-product">Il ya {count} produits</div>
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
             
                <ProductCategorie products={products} categorie_id={categorie_id}/>
              
              
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
