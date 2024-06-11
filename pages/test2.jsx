import React, { useState } from 'react';

const AddressForm = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [carrier, setCarrier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Delivery Address:', deliveryAddress);
    console.log('Invoice Address:', invoiceAddress);
    console.log('Carrier:', carrier);

    // Here you would typically send the data to your server
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Choisissez une adresse de livraison :</h2>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_address_delivery" 
            value="1" 
            checked={deliveryAddress === '1'}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
          Adresse de livraison 1 : 123 Rue A, Ville, Pays
        </label>
      </div>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_address_delivery" 
            value="2" 
            checked={deliveryAddress === '2'}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          Adresse de livraison 2 : 456 Rue B, Ville, Pays
        </label>
      </div>

      <h2>Choisissez une adresse de facturation :</h2>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_address_invoice" 
            value="3" 
            checked={invoiceAddress === '3'}
            onChange={(e) => setInvoiceAddress(e.target.value)}
            required
          />
          Adresse de facturation 1 : 789 Rue C, Ville, Pays
        </label>
      </div>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_address_invoice" 
            value="4" 
            checked={invoiceAddress === '4'}
            onChange={(e) => setInvoiceAddress(e.target.value)}
          />
          Adresse de facturation 2 : 101 Rue D, Ville, Pays
        </label>
      </div>

      <h2>Choisissez un transporteur :</h2>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_carrier" 
            value="5" 
            checked={carrier === '5'}
            onChange={(e) => setCarrier(e.target.value)}
            required
          />
          Transporteur 1
        </label>
      </div>
      <div>
        <label>
          <input 
            type="radio" 
            name="id_carrier" 
            value="6" 
            checked={carrier === '6'}
            onChange={(e) => setCarrier(e.target.value)}
          />
          Transporteur 2
        </label>
      </div>

      <button type="submit">Confirmer la commande</button>
    </form>
  );
};

export default AddressForm;
