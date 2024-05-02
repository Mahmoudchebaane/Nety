import AdresseList from "../../components/adresseList";
import Footer from "../../components/footer";
import HeaderProfile from "../../components/headerProfile";

export default function OrderDetails() {
  return (
    <>
      <HeaderProfile />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card card-info-profil">
              <div className="card-header">
                Commande n : JYGCAQHHT du 22/04/2024{" "}
              </div>
              <div className="card-body">
                <ul>
                  <li>Transporteur :</li>
                  <li>Moyen de paiement :</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card-info-profil">
            <div className="card-body">
            <p>Suivre votre commande pas à pas</p>
              <section className="rounded p-3 bg-light">
                <table className="table table-bordered rounded">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </section>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <AdresseList />
         
        </div>
        <hr />
        <div className="row">
          <p>Produits</p>
          <div className="col"></div>
        </div>
        <hr />
        <div className="row">
          <p>Livraison</p>
          <div className="col"></div>
        </div>
        <hr />
        <div className="row">
          <p>Ajouter un message :</p>
          <div className="col"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
