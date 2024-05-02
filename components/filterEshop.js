import React, { useState } from "react";

export default function FilterEshop() {
  const [categorie, setCategorie] = useState([]);
  const [marque, setMarque] = useState([]);

  const handleCategorieChange = (event) => {
    const selectCategorie = event.target.value;
    if (categorie.includes(selectCategorie)) {
      setCategorie(categorie.filter((c) => c !== selectCategorie));
    } else {
      setCategorie([...categorie, selectCategorie]);
    }
  };

  const handleMarqueChange = (event) => {
    const selectedMarque = event.target.value;
    if (marque.includes(selectedMarque)) {
      setMarque(marque.filter((m) => m !== selectedMarque));
    } else {
      setMarque([...marque, selectedMarque]);
    }
  };

  return (
    <>
      <div>
        <h2>Filtre</h2>
        <h5>Categorie :</h5>
        <label>
          <input
            type="checkbox"
            value="accessoires"
            checked={categorie.includes("accessoires")}
            onChange={handleCategorieChange}
          />
          Accessoires
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="smartphones"
            checked={categorie.includes("smartphones")}
            onChange={handleCategorieChange}
          />
          Smartphones
        </label>
        <p>Vous avez sélectionné : {categorie.join(", ")}</p>

        <h5>Marque :</h5>
        <label>
          <input
            type="checkbox"
            value="itel"
            checked={marque.includes("itel")}
            onChange={handleMarqueChange}
          />
          Itel
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="vivo"
            checked={marque.includes("vivo")}
            onChange={handleMarqueChange}
          />
          Vivo
        </label>
        <br />
        <p>Vous avez sélectionné : {marque.join(", ")}</p>
      </div>
    </>
  );
}
