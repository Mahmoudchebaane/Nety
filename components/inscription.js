export default function Inscription() {
  return (
    <>
    <div className="container">
    <h1 className="title-card text-center">INSCRIVEZ-VOUS</h1>
    <p className="text-center">Inscrivez-vous gratuitement à la Newsletter et recevez en exclusivité nos dernières nouveautés</p>
    <div className="row justify-content-center align-items-center">
      <div className="col-md-8 col-lg-9 form-floating mb-3 mt-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Entrez votre adresse e-mail"
          name="email"
        />
        <label htmlFor="email">Entrez votre adresse e-mail</label>
      </div>
      <div className="col-md-4 col-lg-2">
        <button
          type="button"
          className="btn btn-danger w-100"
          style={{ backgroundColor: "#F6537E" }}
        >
          S'abonner
        </button>
      </div>
    </div>
  </div>
  
    </>
  );
}
