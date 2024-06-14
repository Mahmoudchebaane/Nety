import { useRouter } from "next/router";
import AdresseList from "../../components/adresseList";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import Header from "../../components/header";

export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query; // Utilisation de la désconstruction pour récupérer orderId
// console.log("iccccciiiiiiiii",orderId);
// console.log("iccccciiiiiiiii",router.query);
  const [order, setOrder] = useState();

  async function getOrdersDetails(id_order) {
    console.log("TEST",id_order)
    try {
      const response = await fetch(
        `/api/auth/orderDetails?id_order=${id_order}`,
        {
          method: "GET",
        }
      );
      // console.log("11111111",response)
      // console.log("OOOOOOO",`/api/auth/orderDetails?id_order=${id_order}`)
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des détails de la commande"
        );
      }
      const orderDetails = await response.json();
      console.log("getOrdersDetails", orderDetails);
      return orderDetails;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const detailOrder = await getOrdersDetails(orderId);
        console.log("Contenu de orderDetail :", detailOrder);
        setOrder(detailOrder); // Mise en place du tableau pour correspondre à l'utilisation de map dans le JSX
        // console.log(orderId);
      }
    };

    fetchOrder();
  }, [orderId]);
  console.log("Contenu de order :", order);
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row pt-3">
          <div className="col-6">
            {order && (
              <div className="info-table-head card card-info-profil">
                <div className="card-header info-table-head">
                  <b>Commande n: </b>
                  {order.order_reference} <b> du </b>{" "}
                  {order.order_date.split(" ")[0]}
                </div>
                <div className="card-body info-Order">
                  <ul>
                    <li>
                      <b>Transporteur :</b> {order.shipping[0].carrier_name}
                    </li>
                    <li>
                      <b>Moyen de paiement :</b> {order.order_payment_method}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="col-6">
            <div className="card-info-profil">
              <div className="card-header pb-2">
                <h4 className="h4-order-details">Suivre votre commande pas à pas</h4>
              </div>
              <div className="card-body">
                <section className="rounded bg-light">
                  <table className="table table-bordered rounded">
                    <thead>
                      <tr>
                        <th className="col-4 info-table-head">Date</th>
                        <th className="col info-table-head">Etat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order && (
                        <>
                          <tr>
                            <td>{order.date_upd.split(" ")[0]}</td>
                            <td>{order.shipping[0].order_state_name}</td>
                          </tr>
                          <tr>
                            <td>{order.date_add.split(" ")[0]}</td>
                            <td>{order.shipping[0].order_state_name}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {order && (
          <>
            <div className="row pt-3">
            <h4 className="h4-order-details">Liste des adresses</h4>
              <div className="col-6 pt-3">
                <h5>Adresse de livraison</h5>
                <AdresseList id_adresse={order.delivery_address} />
              </div>
              <div className="col-6 pt-3">
                <h5>Adresse de facturation</h5>
                <AdresseList id_adresse={order.invoice_address} />
              </div>
            </div>
          </>
        )}
        <hr />
        <div className="row pt-3">
        <h4 className="pb-3 h4-order-details">Produits</h4>
          <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th className="info-table-head">Produit</th>
                <th className="info-table-head">Quantité</th>
                <th className="info-table-head">Prix unitaire</th>
                <th className="info-table-head">Prix total</th>
              </tr>
            </thead>
            <tbody>
              {order && (
                <>
                  <tr>
                    <td>{order.details[0]?.product_name}</td>
                    <td>{order.details[0]?.product_quantity}</td>
                    <td>{order.details[0]?.unit_price_tax_incl} TND</td>
                    <td>{order.details[0]?.unit_price_tax_incl}</td>
                  </tr>
                  <tr>
                    <td>Sous-total</td>
                    <td></td>
                    <td></td>
                    <td>{order.details[0]?.unit_price_tax_incl}</td>
                  </tr>
                  <tr>
                    <td>Frais de livraison</td>
                    <td></td>
                    <td></td>
                    <td>{order.order_shipping_cost}</td>
                  </tr>
                  <tr>
                    <td>Timbre fiscal</td>
                    <td></td>
                    <td></td>
                    <td>{order.order_tax_stamp}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td>{order.order_subtotal}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="row pt-3">
        <h4 className="pb-3 h4-order-details">Livraison</h4>
          <table className="table table-bordered rounded">
            <thead>
              <tr>
                <th className="info-table-head">Date</th>
                <th className="info-table-head">Transporteur</th>
                <th className="info-table-head">Frais d'expédition</th>
              </tr>
            </thead>
            <tbody>
              {order && (
                <>
                  <tr>
                    <td>{order.date_add.split(" ")[0]}</td>
                    <td>{order.shipping[0].carrier_name}</td>
                    <td>{order.shipping[0].shipping_cost_tax_excl} TND</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <hr />

        <div className="row pt-3">
          <h4 className="pb-3 h4-order-details">Ajouter un message :</h4>
          <p>
            Si vous voulez nous laisser un message à propos de votre commande,
            merci de bien vouloir le renseigner dans le champ ci-contre
          </p>
          <p className="col-2">Produit</p>

          <div className="col">
            <select className="form-select" aria-label="Default select example">
              <option selected>-- Veuiller choisir --</option>
              {order && (
                <option key={order.id_order} value={order.id_order}>
                  {order.details[0]?.product_name}
                </option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" />
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <button className="btn mt-4 btn-env-order">Envoyer</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
