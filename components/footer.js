import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function AccordionItem({ id, title, contents }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"} offre`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
      >
        <div className="accordion-body">
          <ul className="list-unstyled">
            {contents &&
              contents.map((content, index) => (
                <li key={index} className="mb-2">
                  <Link className="link" href={content.link}>
                    {content.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const productsContents = [
    { label: "Smartphones", link: "/smartphones" },
    { label: "Accessoires", link: "/accessoires" },
    { label: "Tablette Android", link: "/tablette-android" },
  ];

  return (
    <>
      <div className="container-fluid footer">
        <div className="row align-items-start">
          <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src="/image/logo.jpg" alt="logo" width={60} height={50} />
          </div>
          <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
            <div className="linkTitle">
              <Link className="linkTitle" href="/aboutus">
                <p>A Propos de Nous</p>
              </Link>
              <p className="mb-2">Nos Services</p>
              <p className="mb-2">
                <Link className="link" href="/docs/5.3/">
                  Nety Security
                </Link>
              </p>
              <p className="mb-2">
                <Link className="link" href="/">
                  Nety Service de Contenu
                </Link>
              </p>
              <p className="mb-2">Nos Mises à Jour</p>
              <p className="mb-2">
                <Link className="link" href="/download/ADSL.img">
                  ADSL
                </Link>
              </p>
              <p className="mb-2">
                <Link className="link" href="/download/VDSL.img">
                  VDSL
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
            <div className="accordion accordion-flush accordion-bg">
              <AccordionItem
                id="offresInternet"
                title="Offres Internet"
                contents={[
                  { label: "Offres Net's Go", link: "/offres-internet" },
                ]}
              />
              <AccordionItem
                id="products"
                title="Produits"
                contents={productsContents}
              />
            </div>
          </div>

          <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center">
            <div className="footer-link text-center d-flex flex-column align-items-start">
              <p className="mb-2">
                <Image
                  src="/image/ICON ADRESSE .png"
                  alt="position"
                  width={30}
                  height={28}
                />{" "}
                <span>Les berges du lac 2, Tunis 1053</span>
              </p>
              <p className="mb-2">
                <Image
                  src="/image/ICON MAIL.png"
                  alt="Courrier"
                  width={30}
                  height={28}
                />{" "}
                <span>contact@nety.tn</span>
              </p>
              <p className="mb-2">
                <Image
                  src="/image/call.png"
                  alt="call"
                  width={20}
                  height={20}
                />{" "}
                70 751 851
              </p>
              <p className="mb-2">
                <Link
                  href="https://www.facebook.com/nety.officiel"
                  target="_blank"
                  rel="noopener"
                />
              </p>
              <p className="mb-2">
                <Image
                  src="/image/fcb.png"
                  alt="page facebook nety"
                  width={20}
                  height={20}
                />{" "}
                <b style={{ fontWeight: 500 }} />
                Page Facebook Officielle
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
