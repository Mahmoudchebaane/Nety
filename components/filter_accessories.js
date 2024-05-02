import React, { useState } from 'react';

const FilterAccessories = () => {
  // État pour stocker les valeurs sélectionnées du filtre
  
  const [categorie, setCategorie] = useState([]);
  const [batterie, setBatterie] = useState([]);
  const [bluetooth, setBluetooth] = useState([]);
  const [resistanceEau, setResistanceEau] = useState([]);

  // Fonction pour mettre à jour l'état de la catégorie lors de la sélection
  const handleCategorieChange = (event) => {
    const selectedCategorie = event.target.value;
    // Vérifie si la catégorie est déjà sélectionnée ou non
    if (categorie.includes(selectedCategorie)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setCategorie(categorie.filter((cat) => cat !== selectedCategorie));
    } else {
      // Sinon, l'ajoute à la liste
      setCategorie([...categorie, selectedCategorie]);
    }
  };

  // Fonction pour mettre à jour l'état de la batterie lors de la sélection
  const handleBatterieChange = (event) => {
    const selectedBatterie = event.target.value;
    // Vérifie si la capacité de batterie est déjà sélectionnée ou non
    if (batterie.includes(selectedBatterie)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setBatterie(batterie.filter((bat) => bat !== selectedBatterie));
    } else {
      // Sinon, l'ajoute à la liste
      setBatterie([...batterie, selectedBatterie]);
    }
  };

  // Fonction pour mettre à jour l'état du bluetooth lors de la sélection
  const handleBluetoothChange = (event) => {
    const selectedBluetooth = event.target.value;
    // Vérifie si la version Bluetooth est déjà sélectionnée ou non
    if (bluetooth.includes(selectedBluetooth)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setBluetooth(bluetooth.filter((bt) => bt !== selectedBluetooth));
    } else {
      // Sinon, l'ajoute à la liste
      setBluetooth([...bluetooth, selectedBluetooth]);
    }
  };

  // Fonction pour mettre à jour l'état de la résistance à l'eau lors de la sélection
  const handleResistanceEauChange = (event) => {
    const selectedResistanceEau = event.target.value;
    // Vérifie si le niveau de résistance à l'eau est déjà sélectionné ou non
    if (resistanceEau.includes(selectedResistanceEau)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setResistanceEau(resistanceEau.filter((re) => re !== selectedResistanceEau));
    } else {
      // Sinon, l'ajoute à la liste
      setResistanceEau([...resistanceEau, selectedResistanceEau]);
    }
  };

  return (
    <div>
      <h2>Filtre :</h2>
      <h5>Catégories :</h5>
      <label>
        <input type="checkbox" value="Baffles" checked={categorie.includes('Baffles')} onChange={handleCategorieChange} />
        Baffles
      </label>
      <br />
      <label>
        <input type="checkbox" value="Chargeurs & PowerBank" checked={categorie.includes('Chargeurs & PowerBank')} onChange={handleCategorieChange} />
        Chargeurs & PowerBank
      </label>
      <br />
      <label>
        <input type="checkbox" value="Ecouteurs Bluetooth" checked={categorie.includes('Ecouteurs Bluetooth')} onChange={handleCategorieChange} />
        Ecouteurs Bluetooth
      </label>
      <br />
      <label>
        <input type="checkbox" value="Ecouteurs Filaires" checked={categorie.includes('Ecouteurs Filaires')} onChange={handleCategorieChange} />
        Ecouteurs Filaires
      </label>
      <br />
      <label>
        <input type="checkbox" value="Montres Connectées" checked={categorie.includes('Montres Connectées')} onChange={handleCategorieChange} />
        Montres Connectées
      </label>
      <br />
      <label>
        <input type="checkbox" value="Stockage" checked={categorie.includes('Stockage')} onChange={handleCategorieChange} />
        Stockage
      </label>
      <br/>
      <br/>
      <h5>Batterie :</h5>
      <label>
        <input type="checkbox" value="200mAh" checked={batterie.includes('200mAh')} onChange={handleBatterieChange} />
        200mAh
      </label>
      <br />
      <label>
        <input type="checkbox" value="220mAh" checked={batterie.includes('220mAh')} onChange={handleBatterieChange} />
        220mAh
      </label>
      <br />
      <label>
        <input type="checkbox" value="300mAh" checked={batterie.includes('300mAh')} onChange={handleBatterieChange} />
        300mAh
      </label>
     <br/><br/>
      <h5>Bluetooth :</h5>
      <label>
        <input type="checkbox" value="Version5" checked={bluetooth.includes('Version 5')} onChange={handleBluetoothChange}/>
        Version 5
        </label>
        <br/>
        <br/>
      <h5>Résistance À L'eau :</h5>
      <label>
      <input type='checkbox' name="waterproof" value="IP67" checked={resistanceEau.includes("IP67")} onChange={handleResistanceEauChange}/>
       IP67
      </label>
      <br/>
      <label>
      <input type='checkbox' name="waterproof" value="IP68" checked={resistanceEau.includes("IP68")} onChange={handleResistanceEauChange}/>
       IP68
      </label>
      <br/>
     
      <label>
      <input type='checkbox' name="waterproof" value="IPX5" checked={resistanceEau.includes("IPX5")} onChange={handleResistanceEauChange}/>
       IPX5
      </label>
      <br/>
    </div>
  );
};

export default FilterAccessories;
