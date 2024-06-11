import { useEffect, useState } from "react";

export default function RecapPanier() {
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let qteProduct = 0;
    let total = 0;
    const listPanier = JSON.parse(localStorage.getItem("panier")) || [];
    console.log("recap component", listPanier);
    setProducts(listPanier);
    listPanier.forEach((item) => {
      qteProduct += item.qte;
      total += item.qte * item.prix;
    });
    setQty(qteProduct);
    setTotalPrice(total);
    console.log("total prix =", total);
    console.log("qte de produit dans le panier", qteProduct);
  }, []);

  return (
    <>
      <div className="bg-detail-product p-3 d-flex flex-column shadow mb-5 rounded">
        <h4 className="text-purple"> Récapitulatif de commande</h4>
        <p>
          Il y a <b>{qty} </b>articles dans votre panier.
        </p>

        <div className="row">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div className="row d-flex">
                <div className="col-lg" key={index}>
                  <img className="img-panier" src={product.img} />
                </div>
                <div className="col-lg">
                  {" "}
                  <p>{product.nom}</p>
                  <p>{product.couleur}</p>
                </div>

                <div className="col-lg">
                  <p className={product.remisePrix ? "remise-prix" : ""}>
                    {product.prixFinal}
                  </p>
                  {product.remisePrix && (
                    <>
                      <div>
                        {product.remisePrix}x<p>{product.qte}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <div colSpan="4">Aucun produit dans le panier.</div>
            </div>
          )}
        </div>

        <hr />
        <div className="row">
          <div className="col text-start fw-bold">Total</div>
          <div className="col text-end">{totalPrice},000 TND</div>
        </div>
        <div className="row pt-2 pb-3">
          <div className="col text-start fw-bold">Total livraison</div>
          <div className="col text-end fw-bold">gratuit</div>
        </div>

        <hr />
        <div className="row justify-content-center">
          <div className="col">
            <b>Totale </b> <span>( TTC )</span>
          </div>
          <div className="col text-end">
            <b>{totalPrice} TND</b>
          </div>
        </div>
      </div>
    </>
  );
}
