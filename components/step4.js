import React from 'react';

const Step4 = ({ formData }) => {
  return (
    <div className="row setup-content" id="step-4" style={{ display: 'none' }}>
      <div>
        <div className="row mx-0 my-3">
          <label className="col-auto font-size-20 font-weight-medium mr-50 custumlabel">Forfait abonnement</label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Débit:<span id="debit">{formData.produitid}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Périodicité de facturation: <span id="period">{formData.periodpaiement_id}</span></label>
        </div>
        <div className="row mx-0 my-3">
          <label className="col-auto font-size-20 font-weight-medium mr-50 custumlabel">Coordonnées</label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Nom: <span id="nom">{formData.first_name}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Prénom: <span id="prenom">{formData.last_name}</span></label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Identifiant: <span id="identifiant">{formData.identifiant}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">N° téléphone: <span id="numtel">{formData.telmobile}</span></label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Email: <span id="email">{formData.email}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">N° fixe: <span id="numfixe">{formData.telfixe}</span></label>
        </div>
        <div className="row my-3 mx-0">
          <label className="col-auto font-size-20 font-weight-medium mr-50 custumlabel">Position</label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Résidence: <span id="residence">{formData.locataire === 'true' ? 'Propriétaire' : 'Locataire'}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Gouvernerat: <span id="gov">{formData.gouvernoratid}</span></label>
        </div>
        <div className="row">
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Délégation: <span id="ville">{formData.villeid}</span></label>
          <label className="col col-xxs-12 font-size-16 font-weight-medium">Localité: <span id="codpostal">{formData.codepostale}</span></label>
        </div>
        <div className="row">
          <label className="col font-size-16 font-weight-medium">Adresse: <span id="adr">{formData.adresse}</span></label>
        </div>
        <div className="my-15 mr-10 d-flex align-items-center justify-content-end flex-wrap">
          <canvas id="captcha" width="200" height="80"></canvas>
          <input className="form-control" type="text" id="captcha-input" required placeholder="Entrer le code captcha" />
          <button type="button" className="btn-icon" id="refresh-captcha">
            <i className="fa fa-refresh mr-0"></i>
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-end m-2">
          <span id="captcha_error" className="has-error"></span>
        </div>
        <button id="confirmbtn" className="btn btn-next nextBtn2 pull-right" type="button">Confirmer</button>
        <div className="mt-35">
          <div className="col codeverifciation py-4" style={{ display: 'none' }}>
            <div className="row">
              <label className="col font-size-16 font-weight-bold">Code de confirmation</label>
            </div>
            <div className="row px-4 mb-5 form-group justify-content-end">
              <small className="font-size-14 text-muted mt-8">Saisissez le code qui vous a été envoyé par SMS.</small>
              <input name="codemobile" type="number" required length="6" className="form-control mb-5 ml-auto codesmsinput px-2" />
              <input id="submitDA" name="submitDA" className="btn mb-5 ml-auto btn-next nextBtn ml-5" type="button" value="Envoyer demande" />
            </div>
            <div className="row m-2">
              <span id="sms_error" className="has-error"></span>
            </div>
            <div className="row m-2 w-100">
              <u id="renvoyersms" className="d-none text-primary">Renvoyer le code</u>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
