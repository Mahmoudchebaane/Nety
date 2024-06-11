import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

const StepWizard = () => {
  const [formData, setFormData] = useState({
    produitid: 'pack-2024-000061',
    periodpaiement_id: 'ref_1mois',
    hastelfixe: 'optionNon',
    locataire: 'false',
    // Add other form fields here
  });

  return (
    <form role="form" id="formDA" action="https://www.nety.tn/fr/module/demandeabonnement/nouveau?" method="post" encType="multipart/form-data" className="form-container" novalidate="novalidate">
      <div className="stepwizard">
        <div className="stepwizard-row setup-panel">
          <div className="stepwizard-step">
            <a href="#step-1" type="button" className="btn btn-circle btn-step">1</a>
            <p className="active-title">Forfait abonnement</p>
          </div>
          <div className="stepwizard-step">
            <a href="#step-2" type="button" className="btn btn-outline-step btn-circle disabled">2</a>
            <p>Coordonnées</p>
          </div>
          <div className="stepwizard-step">
            <a href="#step-3" type="button" className="btn btn-outline-step btn-circle disabled">3</a>
            <p>Position</p>
          </div>
          <div className="stepwizard-step">
            <a href="#step-4" type="button" className="btn btn-outline-step btn-circle beforelaststep disabled">4</a>
            <p>Confirmation</p>
          </div>
        </div>
      </div>
      <div className="stepwizard-content">
        <Step1 formData={formData} setFormData={setFormData} />
        <Step2 formData={formData} setFormData={setFormData} />
        <Step3 formData={formData} setFormData={setFormData} />
        <Step4 formData={formData} />
      </div>
    </form>
  );
};

export default StepWizard;
