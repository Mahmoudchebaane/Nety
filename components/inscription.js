export default function Inscription() {
  return (
    <>
      <div className="container ">
        <h1 className="title-card text-center">INSCRIVEZ-VOUS</h1>
        <p className="text-center">Inscrivez-vous gratuitement à la Newsletter et recevez en exclusivité nos dernières nouveautés</p>
        <div className="row justify-content-center align-items-center">
          <div class="col-md-9 form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
            <label htmlFor="email">Entrez votre adresse e-mail</label>
          </div>
          
          <div className="col-md-2">
          <button
            type="button"
            className="btn btn-danger "
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
