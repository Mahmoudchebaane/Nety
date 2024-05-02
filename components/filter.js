import React, { useState } from 'react';

const Filtre = () => {
  // État pour stocker les valeurs sélectionnées du filtre
  const [filtre, setFiltre] = useState('');
  const [ram, setRam] = useState([]);
  const [stockage, setStockage] = useState([]);
  const [batterie, setBatterie] = useState(false);

   // Fonction pour mettre à jour l'état de la RAM lors de la sélection
  const handleRamChange = (event) => {
    const selectedRam = event.target.value;
    // Vérifie si l'option de RAM est déjà sélectionnée ou non
    if (ram.includes(selectedRam)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setRam(ram.filter((r) => r !== selectedRam));
    } else {
      // Sinon, l'ajoute à la liste
      setRam([...ram, selectedRam]);
    }
  };

  // Fonction pour mettre à jour l'état du stockage lors de la sélection
  const handleStockageChange = (event) => {
    const selectedStockage = event.target.value;
    // Vérifie si l'option de stockage est déjà sélectionnée ou non
    if (stockage.includes(selectedStockage)) {
      // Si elle est déjà sélectionnée, la retire de la liste
      setStockage(stockage.filter((s) => s !== selectedStockage));
    } else {
      // Sinon, l'ajoute à la liste
      setStockage([...stockage, selectedStockage]);
    }
  };

  // Fonction pour mettre à jour l'état de la batterie lors de la sélection
  const handleBatterieChange = (event) => {
    setBatterie(event.target.checked);
  };

  return (
    <div>
      <h2>Filtre :</h2>
      <h5>Ram :</h5>
      <label>
        <input type="checkbox" value="2GO" checked={ram.includes('2GO')} onChange={handleRamChange} />
        2GO
      </label>
      <br />
      <label>
        <input type="checkbox" value="4GO" checked={ram.includes('4GO')} onChange={handleRamChange} />
        4GO
      </label>
      <p>Vous avez sélectionné : {ram.join(', ')}</p>

      <h5>Stockage :</h5>
      <label>
        <input type="checkbox" value="32GO" checked={stockage.includes('32GO')} onChange={handleStockageChange} />
        32GO
      </label>
      <br />
      <label>
        <input type="checkbox" value="64GO" checked={stockage.includes('64GO')} onChange={handleStockageChange} />
        64GO
      </label>
      <br />
      <label>
        <input type="checkbox" value="128GO" checked={stockage.includes('128GO')} onChange={handleStockageChange} />
        128GO
      </label>
      <br />
      <label>
        <input type="checkbox" value="256GO" checked={stockage.includes('256GO')} onChange={handleStockageChange} />
        256GO
      </label>
      <p>Vous avez sélectionné : {stockage.join(', ')}</p>

      <h5>Batterie :</h5>
      <label>
        <input type="checkbox" checked={batterie} onChange={handleBatterieChange} />
        5000 mAh
      </label>
      <p>Vous avez sélectionné : {batterie ? '5000 mAh' : 'Aucune'}</p>
    </div>
  );
};

export default Filtre;
