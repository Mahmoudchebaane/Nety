import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Panier() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let qteProduct = 0;
    let totalPrice = 0;
    const listPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setProducts(listPanier);
    //setQuantity(listPanier.qte);
    console.log("contenur de listPanier", listPanier);
    //console.log("contenur de listPanier",listPanier.qte);
    // Qte au panier
    listPanier.forEach((item) => {
      qteProduct += item.qte;
      totalPrice +=
        parseFloat(item.qte) * (item.remise ? item.remise : item.prix);
    });
    setQty(qteProduct);

    setTotalPrice(totalPrice);
    console.log("Quantité totale:", qteProduct);
  }, []);

  const incrementQuantity = (productId) => {
    let qteProduct = 0;
    let totalPrice = 0;
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          console.log(product.qte);
          //setTotalPrice(totalPrice + product.remise);
          return { ...product, qte: product.qte + 1 };
        }

        return product;
      });
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      setQty(qty + 1);
      //setTotalPrice(totalPrice + product.remise);
      // console.log(totalPrice)
      updatedProducts.forEach((item) => {
        qteProduct += item.qte;
        totalPrice +=
          parseFloat(item.qte) * (item.remise ? item.remise : item.prix);
      });
      setQty(qteProduct);
      setTotalPrice(totalPrice);
      return updatedProducts;
    });
  };
  async function getCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem("panier")) || [];
    console.log(cartItems);
    if (cartItems.length > 0) {
      try {
        const data = await AddCart(cartItems);
        console.log("produit dans panier", data);
      } catch (error) {
        console.log("Erreur lors de la recuperation du panier", error);
      }
    } else {
      console.log("Aucun articles trouvé");
    }
  }
  async function AddCart(items) {
    try {
      const response = await fetch(`/api/auth/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });
      console.log(typeof response);
      if (!response.ok) {
        throw new Error("Error lors de l'ajout de panier");
      }
      const data = await response.json();
      console.log("data de panier", data);
      setCart(data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la recuperation de panier", error);
      return [];
    }
  }
  const decrementQuantity = (productId) => {
    let qteProduct = 0;
    let totalPrice = 0;
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId && product.qte > 1) {
          //setQty(qty - 1);
          return { ...product, qte: product.qte - 1 };
        }
        return product;
      });
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      updatedProducts.forEach((item) => {
        qteProduct += item.qte;
        totalPrice +=
          parseFloat(item.qte) * (item.remise ? item.remise : item.prix);
      });
      setQty(qteProduct);
      setTotalPrice(totalPrice);
      return updatedProducts;
    });
  };

  const deletProductFromPanier = (productId) => {
    let totalPrice = 0;
    let productsAfterDeletion = products.filter(
      (prod) => prod.id !== productId
    );
    setProducts(productsAfterDeletion);
    console.log("--panier--", productsAfterDeletion);
    totalPrice = productsAfterDeletion.reduce(
      (acc, currProd) =>
        acc +
        (currProd.remise ? currProd.remise : currProd.prix) * currProd.qte,
      0
    );
    setTotalPrice(totalPrice);
    console.log("/panier/", totalPrice);
    localStorage.setItem("panier", JSON.stringify(productsAfterDeletion));
  };
  const [cart, setCart] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };
  const handleAddPromoCode = () => {
    // Mettez ici la logique pour ajouter le code promo
    console.log("Code promo ajouté :", promoCode);
  };
  const router = useRouter();
  const handleChangeCommande = () => {
    //AddCart(cart);
    getCartFromLocalStorage();
    router.push("/commande");
  };

  return (
    <>
      <Header />
      <div className="p-3">
        <i className="bi bi-cart-fill panier-icone" />
        <span className="panier_titre">Panier</span>
      </div>
      <div className="container-fluid pt-3 pb-5">
        <div className="row gy-5">
          <div className="col-md-8 mr-3">
            <div className="panier-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Prix</th>
                    <th>Qté</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <img className="img-panier" src={product.img} />
                          <p>{product.nom}</p>
                          <p>{product.couleur}</p>
                        </td>
                        <td>
                          <p
                            className={product.remisePrix ? "remise-prix" : ""}
                          >
                            {product.prixFinal}
                          </p>
                          {product.remisePrix && (
                            <>
                              <p>{product.remisePrix}</p>
                            </>
                          )}
                        </td>

                        <td>
                          <div
                            className="input-group"
                            style={{ maxWidth: "140px" }}
                          >
                            <button
                              className="btn btn-white border border-secondary px-3"
                              type="button"
                              onClick={() => decrementQuantity(product.id)}
                              data-mdb-ripple-color="dark"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input
                              type="text"
                              className="form-control text-center border border-secondary"
                              placeholder="1"
                              aria-label="Quantity"
                              value={product.qte}
                              readOnly
                            />
                            <button
                              className="btn btn-white border border-secondary px-3"
                              type="button"
                              onClick={() => incrementQuantity(product.id)}
                              data-mdb-ripple-color="dark"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <p>
                            {parseFloat(
                              parseInt(product.qte) *
                                (product.remise ? product.remise : product.prix)
                            )}{" "}
                            TND
                          </p>
                        </td>
                        <td>
                          <i
                            class="bi bi-trash3"
                            onClick={() => deletProductFromPanier(product.id)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Aucun produit dans le panier.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4 req-cmd">
            <div className="bg-detail-product p-3 d-flex flex-column shadow mb-5 rounded">
              <h3 className="text-purple">Récapitulatif de commande</h3>
              <p>
                Il y a <b>{qty} </b>articles dans votre panier.
              </p>
              <hr />
              <div className="row">
                <div className="col text-start fw-bold">Total</div>
                <div className="col text-end">{totalPrice},000 TND</div>
              </div>
              <div className="row pt-2 pb-3">
                <div className="col text-start fw-bold">Total livraison</div>
                <div className="col text-end fw-bold">gratuit</div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn pb-2 collapsible"
                  onClick={toggleCollapse}
                >
                  {collapsed
                    ? "Vous avez un code Promo ?"
                    : "Vous avez un code Promo ?"}
                </button>
                <div className={collapsed ? "content" : "content active"}>
                  {!collapsed && (
                    <div className="row">
                      <div className="col">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez votre code promo"
                          value={promoCode}
                          onChange={handlePromoCodeChange}
                        />
                      </div>
                      <div className="col">
                        <button className="btn" onClick={handleAddPromoCode}>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col">
                  <b>TOTAL</b> <span>( TTC )</span>
                </div>
                <div className="col text-end">
                  <b>{totalPrice} TND</b>
                </div>
              </div>
              <div className="row justify-content-center pt-4">
                <div className="col justify-content-center">
                  <button
                    onClick={totalPrice !== 0 ? handleChangeCommande : null}
                    className="btn btn-modal-panier"
                  >
                    Commander
                  </button>
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
