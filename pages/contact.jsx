import Footer from "../components/footer";
import Header from "../components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row d-flex">
          <div className="col col-md-6 d-flex contact-nous image-contact p-0">
            <h1 className="text-center">
              Contacter <span className="text-white">Nous</span>
            </h1>
          </div>
          <div className="col p-0">
            <img
              src="/image/contact.png"
              className="image-contact card-img-top"
              alt="..."
            />
          </div>
        </div>
        <div className="row pt-5 align-items-center justify-content-center">
          <h1 className="text-center">
            AVEZ-VOUS <span className="fw-bold">DES QUESTIONS?</span>
          </h1>
        </div>
        <div className="row m-5">
          <form>
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom & Prénom*"
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Adresse E-Mail"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Numéro De Ligne"
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tél. :"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <select className="form-control">
                  <option>Service client</option>
                  <option>Support technique</option>
                  <option>Ventes</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adresse"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Votre Message Ici"
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mb-3 text-center my-5">
          <h1>
            CONTACT <span className="fw-bold">SERVICE CLIENT</span>
          </h1>
          <div className="row justify-content-center my-5">
            <div className="col-12 col-md-5 mb-4 mb-md-0">
              <div className="card card-contact">
                <div className="card-body">
                  <div className="">
                    <i
                      className="bi bi-headset"
                      style={{ fontSize: "4rem" }}
                    ></i>
                  </div>
                  <h5 className="card-title">Service Client</h5>
                  <p className="card-text">70 751 851</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="card p-4 card-contact">
                <div className="card-body">
                  <div className="">
                    <i className="bi bi-tools" style={{ fontSize: "4rem" }}></i>
                  </div>
                  <h5 className="card-title">Service Technique</h5>
                  <p className="card-text">70 751 851</p>
                </div>
              </div>
            </div>
          </div>
          <h1 className="my-5">INSCRIVEZ-VOUS</h1>
          <p className="mb-4">
            Inscrivez-vous gratuitement à la Newsletter et recevez en
            exclusivité nos dernières nouveautés
          </p>
          <form className="d-flex pb-4 justify-content-center">
            <div className="input-group" style={{ maxWidth: "500px" }}>
              <input
                type="email"
                className="form-control"
                placeholder="Votre adresse e-mail..."
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ backgroundColor: "#ff69b4", border: "none" }}
              >
                S'abonner
              </button>
            </div>
          </form>
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