import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProductAvailability } from "../../components/productAvailability";
export default function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [qty, setQty] = useState(0);
  const [stock, setStock] = useState();
  const [difference, setDifference] = useState();
  const [message, setMessage]=useState();
  const [curentProduct, setCurentProduct] = useState({});
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    setMessage("")
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChangePanier = () => {
    router.push("/panier");
  };
  const handleChangeCommande = (e) => {
    router.push("/commande");
  };
  async function getDetailsProduct(product_id) {
    try {
      const response = await fetch(
        `/api/productDetails?product_id=${product_id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des détails du produit"
        );
      }
      const detailsdata = await response.json();

      return detailsdata;
    } catch (erreur) {
      console.error(erreur);
      return null;
    }
  }

  useEffect(() => {
    setDifference(stock - quantity);
    console.log("here", stock - quantity);
  }, [quantity]);
  useEffect(() => {
    const fetchDetail = async () => {
      if (productId) {
        const detailProduct = await getDetailsProduct(productId);
        setProduct(detailProduct.psdata);
      }
    };
    fetchDetail();
  }, [productId]);

  useEffect(() => {
    setStock(product.quantity);
  }, [product]);
  const getListCart = () => {
    if (typeof window !== "undefined") {
      const panierJSON = localStorage.getItem("panier");
      return JSON.parse(panierJSON);
    } else {
      return [];
    }
  };

  const addToList = (product) => {
    const item = {
      id: product.id_product,
      qte: quantity,
      stockQte: difference,
      remise: product.discount_float_price,
      remisePrix: product.discount_price,
      prixFinal: product.price,
      prix: product.float_price,
      nom: product.name,
      img: product.images[0].src,
      couleur:
        product.groups &&
        product.groups[1]?.attributes &&
        product.groups[1].attributes[1]?.name,
    };
    console.log(typeof product.discount_float_price);
    console.log(typeof product.discount_price);
    console.log(typeof product.price);
    console.log(typeof product.float_price);

    setCurentProduct(item);
    let stockQuantity = stock - quantity;

    let exist = false;
    let available = false;
    let newQte;
    const panierJSON = localStorage.getItem("panier");
    let listNew = [];
    if (panierJSON) {
      let list = JSON.parse(panierJSON);
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
          newQte = list[i].qte + item.qte;
          stockQuantity = stock - newQte;
          exist = true;
          if (stockQuantity >= 0) {
            list[i].qte = newQte;
            list[i].stockQte = stockQuantity;
            available = true;
          }
        }
      }
      listNew = list;
      if (available) {
        if (!exist) {
          listNew.push(item);
        }
      } else {
        setMessage("Stock insuffisant");
      }
    } else {
      console.log("here else");
      listNew.push(item);
    }

    console.log("test", listNew);
    let totalQte = 0;

    listNew.forEach((items) => {
      totalQte += items.qte;
    });
    setQty(totalQte);
    console.log("Quantité totale:", totalQte);
    const cartJSON = JSON.stringify(listNew);

    localStorage.setItem("panier", cartJSON);
  };
  const handleCloseModalAndAddToList = (product) => {
    setShowModal(true);
    addToList(product);
  };

  return (
    <>
      <Header />
      <nav className="d-flex p-3">
        <h6 className="mb-0">
          <a href="/" className="text-decoration-none text-dark-50">
            Home
          </a>
          <span className="text-dark-50 mx-2">{" > "}</span>
          <a href="/phone" className="text-decoration-none text-dark-50">
            Produits
          </a>
          <span className="text-dark-50 mx-2">{" > "}</span>
          <a className="text-dark text-decoration-none">
            <u className="text-decoration-none">{product.name}</u>
          </a>
        </h6>
      </nav>
      <div className="container-fluid bg-detail-product pt-2 pb-4">
        <div className="row mt-5">
          <div className="col-4">
            <img
              src={product.cover_image}
              className="cadre-img-detail card-img-top border"
              alt="..."
            />
          </div>
          <div className="col">
            <h2>{product.name}</h2>
            {message && <p className="messagestock">{message}</p>}
            <div className="price-container">
              <h3 className="price-details">{product.discount_price}</h3>
              <p className="price-piscount">{product.price}</p>
            </div>
            <div class=" instock mb-3 product-add-to-cart pt-0 pb-0 largeAvailable">
              <span>
                <div className="product-availability" id="product-availability">
                  <ProductAvailability quantity={product.quantity} />
                </div>
              </span>
            </div>
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: product.description_short
                  ? product.description_short
                  : product.description,
              }}
            />
            <div className="row justify-content-end">
              <div className="col-3 mb-3 d-flex ">
                <div className="input-group" style={{ maxWidth: "160px" }}>
                  <button
                    className="btn btn-white border border-secondary px-3"
                    type="button"
                    id="button-addon1"
                    onClick={decrementQuantity}
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="text"
                    className="form-control text-center border border-secondary"
                    placeholder="1"
                    aria-label="Quantity"
                    value={quantity}
                    aria-describedby="button-addon1"
                  />
                  <button
                    className="btn btn-white border border-secondary px-3"
                    type="button"
                    id="button-addon2"
                    onClick={incrementQuantity}
                    disabled={difference < 0}
                    data-mdb-ripple-color="dark"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="col-md-4 col-6 mb-3 justify-content-center align-items-center">
                <button
                  disabled={difference < 0}
                  onClick={() => handleCloseModalAndAddToList(product)}
                  className="btn btn-primary"
                >
                  <i className="bi bi-cart3" />
                  <b> Ajouter au panier</b>
                </button>
                
                {/* Modal */}
                {showModal && (
                  <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: "block" }}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header modal-header-panier">
                          <b className="text-white">
                            Produit ajouté au panier avec succès
                          </b>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handleCloseModal}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {/* Modal body content */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-5">
                                  <img
                                    className="img-panier"
                                    src={curentProduct.img}
                                  ></img>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <b>{curentProduct.name}</b>
                                  </div>
                                  <div>
                                    <span>
                                      Couleur: {curentProduct.couleur}
                                    </span>
                                  </div>
                                  <div>
                                    <span>Quantité: {curentProduct.qte}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5 col-modal-edit">
                              <div>
                                <b>Il y a {qty} articles au panier</b>
                              </div>
                              <div>{curentProduct.price}</div>
                              <div className="pt-2 pb-1">
                                <button
                                  type="button"
                                  className="btn btn-modal-panier"
                                  onClick={handleChangePanier}
                                >
                                  <b>Voir panier</b>
                                </button>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-modal-achat"
                                  onClick={handleChangeCommande}
                                >
                                  <b className="">Continuer mes achats</b>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
