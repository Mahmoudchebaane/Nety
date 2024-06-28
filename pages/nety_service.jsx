import Footer from "../components/footer";
import Header from "../components/header";
import Image from "../components/image";

export default function NetyService() {
  return (
    <>
      <Header />
      <Image title={"SERVICES DE CONTENU"} image={"https://www.nety.tn/img/cms/contenu1.png"} />
      <div className="container">
        <style>{`.vc_custom_1680183602348{background-color: #590e9d !important;}`}</style>
        <div className="vc_row-full-width"></div>
        <div className="vc_row wpb_row pt-4 vc_row-fluid ml-auto">
          <div className="vc_col-sm-12 breadcrumb breadcrumb-style-5 ml-auto wpb_column vc_column_container">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="wpb_text_column wpb_content_element">
                  <div className="wpb_wrapper">
                    <p>
                      <span style={{ fontSize: "12pt" }}>
                        <a href="https://www.nety.tn/fr">
                          <span style={{ color: "#640fa2" }}>
                            Accueil &gt; &nbsp;
                          </span>
                          <span style={{ color: "#666666" }}>
                            {" "}
                            Services &gt; &nbsp;{" "}
                          </span>
                        </a>
                        <span style={{ color: "#666666" }}>
                          <a
                            href="https://www.nety.tn/fr/content/61-nety-security"
                            style={{ color: "#666666" }}
                          >
                            Nety Service de contenu{" "}
                          </a>
                        </span>
                        <a></a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wpb_wrapper">
        <p>
            <strong>
            <span className="TitreH1" style={{ color: "#000000" }}>
                À PROPOS
            </span>
            </strong>
        </p>
        </div>

        <div className="row d-flex">
          <div className="col-md-6  wpb_column vc_column_container">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="wpb_text_column wpb_content_element">
                  <div className="wpb_wrapper">
                    <p>
                      <span className="serviceText">
                        <img src="https://www.nety.tn/img/cms/Plan%20de%20travail%20%E2%80%93%203%20(1).png" alt="" style={{ float: "none" }} width="21" height="21" />
                        Nos services de contenu vous offrent des contenus innovants et personnalisés en accédant + des offres mobiles à bas prix.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="wpb_text_column wpb_content_element">
                  <div className="wpb_wrapper">
                    <p>
                      <span className="serviceText">
                        <img src="https://www.nety.tn/img/cms/Plan%20de%20travail%20%E2%80%93%203%20(1).png" alt="" style={{ float: "none" }} width="21" height="21" />
                        Choisissez le service qui vous convient en vous rendant dans l’agence Nety la plus proche de chez vous ; nous nous chargerons de transférer votre numéro de l’ancien opérateur.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="wpb_single_image wpb_content_element parentImg vc_align_right">
                  <div className="wpb_wrapper">
                    <img className="vc_box_border_grey" alt="content services" width="" height="" 
                src="//www.nety.tn/modules/jscomposer/uploads/Web-1920-1-2.png" />
                  </div>
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
