import Footer from "../components/footer";
import Header from "../components/header";
import Image from "../components/image";
import React, { useEffect, useState } from "react";

export default function OffreNetsGo() {
    const [offreList, setoffreList] = useState();
    async function getOffreInternet() {
        const response = await fetch("/api/offreInternet", {
          method: "GET",
        });
        const offre = await response.json();
        return offre;
      }
      useEffect(() => {
        const fetchData = async () => {
          const offerInternet = await getOffreInternet();
          console.log("offreInternet=", offerInternet.data);
          setoffreList(offerInternet.data || []);
          
    
        };
        fetchData();
      }, []);
  return (
    <>
      <Header />
      <Image title={"OFFRES NET'S GO"} image={"https://www.nety.tn/img/cms/offres.png"} />
      <div className="container">
        <style>{`
          .vc_custom_1680183602348 { background-color: #590e9d !important; }
        `}</style>
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
                          <span style={{ color: "#640fa2" }}>Accueil &gt; &nbsp;</span>
                          <span style={{ color: "#666666" }}>Services &gt; &nbsp;</span>
                        </a>
                        <span style={{ color: "#666666" }}>
                          <a href="https://www.nety.tn/fr/content/61-nety-security" style={{ color: "#666666" }}>
                            Nety Service de contenu
                          </a>
                        </span>
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
                INTERNET EN ILLIMITÉ EN MODE GUICHET UNIQUE
              </span>
            </strong>
          </p>
        </div>
        <div className="oneArea">
        {offreList?.map((offre,index)=>(
          <div className="oneBox product-miniature js-product-miniature item-one lupanh first_item" data-id-product="129" data-id-product-attribute="0" itemscope itemtype="http://schema.org/Product">
            <div className="card_pack-header pack_header">
              <div className="pack_header d-flex align-items-center" itemprop="name">
                <p style={{ fontWeight: 600 }} itemprop="description">
                  {offre.reference}
                </p>
                <span href="https://www.nety.tn/fr/offres-internet/129-10-mbps.html" className="packName">{offre.name}</span>
              </div>
              <div className="d-flex align-items-end">
                <div className="product-price-and-shipping">
                  <span itemprop="price" className="price">{offre.price}</span>
                  <span className="ttc">TTC/Mois</span>
                </div>
              </div>
            </div>
            <div className="card_pack-body">
              <div className="product-description mb-50 mb-xs-30">
              {offre.details.map((info, index) => (
                
                  <div key={index} className="vc_row wpb_row vc_row-fluid mb-0">
                    <div className="vc_col-sm-12 wpb_column vc_column_container">
                      <div className="vc_column-inner">
                        <div className="wpb_wrapper">
                          <div className="nov_image_text">
                            <div className="d-flex align-items-top">
                              <img src="https://www.nety.tn/modules/jscomposer/uploads/Icon-2x.png" className="image mt-3" alt="Icon-2x.png" />
                              <div className="content_text">
                                <div className="associated_product">
                                  <span >{info.product_name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="nov_button type-1">
              <a class="btn btn-primary" href={`/demandeabonnement/nouveau?id_product=${offre.id}`}>Commander</a>
              </div>
            </div>
          </div>
  ))}
        </div>
        
      </div>
      <Footer />
    </>
  );
}
