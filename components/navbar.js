import "bootstrap-icons/font/bootstrap-icons.css";
import Dropdown from "./dropdown";
const menuItemsMyNety = {
  title: "My Nety",
  icon: "bi bi-person-fill",
  children: [
    {
      title: "Se connecter",
      route: "/products/hinkle-horns",
    },
    {
      title: "S'inscrire",
      route: "/products/doozers",
    },
  ],
};
const menuItemsLang = {
  title: "FR",
  children: [
    {
      title: "FR",
      img: "/image/fr.jpg",
      route: "/products/hinkle-horns",
    },
    {
      title: "AR",
      img: "/image/ar.jpg",
      route: "/products/doozers",
    },
    {
      title: "EN",
      img: "/image/en.jpg",
      route: "/products/doozers",
    },
  ],
};

export default function Navbar() {
  return (
    <div className="header-top hidden-sm-down navbar-purple">
  <div className="container center-container">
    <div className="d-flex align-items-center font-size-16 no-gutters justify-content-between">
      <div className="d-flex align-items-center font-size-18 justify-content-left">
        <a
          className="titleB2C b2cActive text-decoration-none"
          href="https://www.nety.tn"
        >
          Particulier
        </a>
        <a
          className="titleB2B text-decoration-none"
          href="https://business.nety.tn"
        >
          Professionnel
        </a>
      </div>
      <div className="d-flex ">
        <div className="nov_button nety-secondary mx-2">
          <a
            href="https://www.nety.tn/fr/module/paiementfacture/nouveau"
            id="paiementfacture"
            className="text-decoration-none"
          >
            {" "}
            Paiement facture{" "}
          </a>
        </div>
        <div className="nov_button nety-primary mx-2">
          <a
            href="https://www.nety.tn/fr/module/demandeabonnement/nouveau?"
            id="DAHeader"
            className="text-decoration-none"
          >
            {" "}
            Abonnez-Vous{" "}
          </a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-right">
        <div className="d-flex align-items-center text-decoration-none">
          <div className="px-4">
            <a
              href="/5-produits"
              style={{
                color: "#fdec25",
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              <i className="bi bi-shop"></i>
              <span>&nbsp; E-shop</span>
            </a>
          </div>
          <div className="dropdown myAccountDropdown">
            <Dropdown items={menuItemsMyNety} />
          </div>
          <div className="px-2">
            <div id="_desktop_cart">
              <div
                className="blockcart cart-preview"
                data-refresh-url="//www.nety.tn/fr/module/ps_shoppingcart/ajax"
              >
                <div className="header-cart d-flex flex-row align-items-center">
                  <div className="cart-left">
                    <span>
                      <i
                        className="bi bi-cart-fill"
                        style={{ color: "white" }}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown langDropdown">
            <Dropdown items={menuItemsLang} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
