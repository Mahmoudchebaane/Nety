import Footer from "../components/footer";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { CategoryProduct } from "./api/categoryProducts";
import Filtre from "../components/filter";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Phone() {
  //const [products] = useState(productsData.products);

  CategoryProduct(8);
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const categoryProducts = await CategoryProduct(8);
        //console.log("ici ", categoryProducts);
        setProducts(categoryProducts);
      } catch (err) {
        console.log("Erreur de chargement des produits");
      }
    }
    fetchCategoryProducts();
  }, []);
  const router = useRouter();
  const handelChangeDetail = (product_id) => {
    router.push('productDetails/' + product_id);
  };

  const getListCart = () => {
    if (typeof window !== "undefined") {
      const panierJSON = localStorage.getItem('panier');
      return JSON.parse(panierJSON);
    }
     else {
      return [];
    }
  }
  
 const listPanier = getListCart();
 console.log("!!!!!!!!",listPanier);
//  console.log(listPanier.cover.url);
  const addToList = (product) =>{
    const item = {
      "id": product.id_product,
      "qte": 1,
      "price": product.price,
      "name": product.name,
      // "img": product.cover.url,
      // "couleur": product.attributes["1"].name,
    }
    console.log("itemmmmmmm",item)
    const panierJSON = JSON.stringify(item)
    console.log(panierJSON)
    localStorage.setItem('panier', panierJSON)
  }
  
  return (
    <>
      <Header />
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
              <Filtre />
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
                  {products &&
                    products.map((product, index) => (
                      <div key={index} className="card card-product-home">
                        <div className="card-header card-header-product">
                          <a className="text-dark">
                            <i className="bi bi-cart-fill"
                            onClick = {() =>addToList(product)}></i>
                          </a>
                        </div>
                        <div className="card-body text-center">
                          <a
                            className="text-center text-dark text-decoration-none"
                            onClick={() =>
                              handelChangeDetail(product.id_product)
                            }
                          >
                            <img
                              src={product.cover.url}
                              className="card-img-top"
                              alt="..."
                            />
                            <h3 className="">{product.name}</h3>
                            <p className="">{product.availability_message}</p>
                            <p className="regular_price">
                              {product.regular_price}
                            </p>
                            <p className="price">{product.price}</p>
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

