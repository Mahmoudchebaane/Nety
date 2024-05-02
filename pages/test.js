export default function Test() {
  return (
    <>
      <ul className="portfolio-items">
        <li
          className="portfolio-item quarter double-height responsive-half pub_order"
          style={{ height: "auto" }}
        >
          <div className="card is-active" data-state="#contact">
            <div className="card-header">
              <div className="card-avatar pt-5 text-center">
                <i className="fa fa-user-o mt-5 fa-2x"></i>
              </div>
              <h2 className="card-jobtitle">Bienvenue Mr/Mme,</h2>
              <h1 className="card-fullname">Mahmoud Chebaane</h1>
            </div>
            <div className="card-main">
              <div className="card-section is-active" id="contact">
                <div className="card-content">
                  <div className="card-contact-wrapper">
                    <div className="card-contact">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <path d="M22 6l-10 7L2 6"></path>
                      </svg>{" "}
                      chebaane111.mahmoud@gmail.com
                    </div>
                    <a
                      className="contact-me"
                      href="https://www.nety.tn/fr/identite"
                    >
                      Modifier mes informations
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li
          className="portfolio-item quarter responsive-half pub_nety1 pub_order"
          id="reorderthis"
        ></li>
        <li
          className="portfolio-item half pub_nety3 responsive-half"
          id="place-before-me"
        ></li>
        <li
          className="portfolio-item half pub_nety4 pub_nety2 d-flex flex-start p-5 left-element"
          id="beforelast"
        ></li>
        
      </ul>
    </>
  );
}
