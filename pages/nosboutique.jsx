import Footer from "../components/footer";
import Header from "../components/header";

export default function Boutique() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row d-flex">
          <div className="col col-md-6 d-flex contact-nous image-contact p-0">
            <h1 className="">
              NOS <span className="text-white"> boutiques</span>
            </h1>
          </div>
          <div className="col p-0">
            <img
              src="/image/network.png"
              className="image-contact card-img-top"
              alt="..."
            />
          </div>
        </div>
        <div className="row">
          <div className="container text-center my-5">
            <h2 className="display-4 fw-bold">
              OÙ NOUS <span className="fw-normal">TROUVER</span>
            </h2>
            <p className="lead">
              Retrouvez l’agence Nety et le revendeur le plus proche de vous !
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
