import React, { useEffect, useState } from "react";

const Step1 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    console.log("e1 value",e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("INPUT formData =", formData);
    //console.log("e name",e.target.name)
    console.log("e2 value",e.target.value)
  };

//   const [selectedOffreInternet, setSelectedOffreInternet] = useState(null);
//   const [selectedOffrepaiement, setSelectedOffrepaiement] = useState(null);
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
      console.log("offreInternet=", offerInternet.data[0]);
      setoffreList(offerInternet.data || []);
      //setSelectedOffreInternet(offerInternet.data[0])

    };
    fetchData();
  }, []);
  function changeOffreInternet(e){
    setSelectedOffreInternet(e.target.value);
  }
  console.log("offreList", offreList);
  return (
    <div className="row setup-content" id="step-1">
      <div>
        <div className="form-group">
          <label className="control-label mb-2">
            Forfait abonnement <sup>*</sup>:
          </label>
          <div className="checkboxoffre">
            {/* Render radio inputs dynamically */}
            {offreList?.map((offre, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="name"
                  id={`radio${index}`}
                  value={offre.name}
                  checked={formData.id === offre.name}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`pack-${offre.name}`}
                >
                  {offre.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="control-label mb-2">
            Périodicité de facturation<sup>*</sup>:
          </label>
          <div className="checkboxoffre">
            {/* Render period options */}
            {["Mensuel", "Trimestriel", "Semestriel", "Annuel"].map(
              (label, index) => (
                <div className="form-check form-check-inline" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="periodpaiement_id"
                    id={`inlineRadio${label[0]}`}
                    value={`ref_${label.toLowerCase()}`}
                    checked={
                      formData.periodpaiement_id ===
                      `ref_${label.toLowerCase()}`
                    }
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`inlineRadio${label[0]}`}
                  >
                    {label}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
        <div className="row col">
          <span className="font-size-16 mr-30 text-muted">
            Avez-vous déjà un téléphone fixe?
          </span>
          <div className="row font-size-16">
            <div className="form-check col form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="hastelfixe"
                id="inlineRadioOui"
                value="optionOui"
                checked={formData.hastelfixe === "optionOui"}
                onChange={handleChange}
              />
              <label
                className="form-check-label mr-30"
                htmlFor="inlineRadioOui"
              >
                Oui
              </label>
            </div>
            <div className="form-check form-check-inline">
              <p>&nbsp;</p>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="hastelfixe"
                id="inlineRadioNon"
                value="optionNon"
                checked={formData.hastelfixe === "optionNon"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="inlineRadioNon">
                Non
              </label>
            </div>
          </div>
        </div>
        <div
          className="row rowfix"
          style={{
            display: formData.hastelfixe === "optionOui" ? "block" : "none",
          }}
        >
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label" htmlFor="telfixe">
                N° Tél. Fixe<sup>*</sup>
              </label>
              <input
                className="form-control"
                name="telfixe"
                type="text"
                maxLength="8"
                minLength="8"
                required={formData.hastelfixe === "optionOui"}
                value={formData.telfixe || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-next nextBtn pull-right" type="button">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1;
