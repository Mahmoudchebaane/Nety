import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";
import StepWizard from "../components/stepWizard";

export default function DemandeAbonnement() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="pageabonnement"></div>
        </div>
        <div className="row">
          <section
            id="content"
            className="page-content abo-form-card abo-card-block"
          >
            <div className="row">
              <img
                src="/image/IconAbo.png"
                className="title-icon col-auto"
              />
              <div className="col">
                <label className="title-form-page">
                  Formulaire d’abonnement
                </label>
                <div>
                  Merci de remplir le formulaire suivant pour vous abonner à
                  Net's GO
                </div>
              </div>
            </div>
            <StepWizard />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
