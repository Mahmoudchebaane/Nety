import Link from "next/link";
import Dropdown from "./dropdown";
const menuItemsProducts = {
  title: "Produits",
  children: [
    {
      title: "Smartphones",
      route: "/products/hinkle-horns",
    },
    {
      title: "Accessoires",
      route: "/products/doozers",
    },
  ],
};
const menuItemsServices = {
  title: "Services",
  children: [
    {
      title: " Nety Security",
      route: "/products/hinkle-horns",
    },
    {
      title: "Nety Service de Contenu",
      route: "/products/doozers",
    },
  ],
};
const menuItemsOffres = {
  title: "Offres Internet",
  children: [
    {
      title: "Offres Net's Go",
      route: "/products/hinkle-horns",
    },
  ],
};

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-purple header-purple">
        <div className="container-fluid center-container">
          <Link href="#" className="navbar-brand">
            <img class="logo img-fluid" src="/image/logo.jpg" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav">
              <Dropdown items={menuItemsOffres} />
              <Dropdown items={menuItemsProducts} />
              <Dropdown items={menuItemsServices} />
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Nos boutiques
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
