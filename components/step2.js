import React from 'react';

const Step2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="row setup-content" id="step-2" style={{ display: 'none' }}>
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Type Identifiant<sup>*</sup></label>
              <select 
                name="type_identifiant" 
                required 
                className="form-control"
                value={formData.type_identifiant}
                onChange={handleChange}
              >
                <option value="1">CIN</option>
                <option value="2">Carte Séjour</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Identifiant<sup>*</sup></label>
              <input 
                name="identifiant" 
                type="text" 
                className="form-control" 
                required 
                value={formData.identifiant || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Nom<sup>*</sup></label>
              <input 
                name="first_name" 
                type="text" 
                className="form-control" 
                required 
                value={formData.first_name || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Prénom<sup>*</sup></label>
              <input 
                name="last_name" 
                type="text" 
                className="form-control" 
                required 
                value={formData.last_name || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Numéro de téléphone<sup>*</sup></label>
              <input 
                name="telmobile" 
                type="text" 
                className="form-control" 
                maxlength="8" 
                minlength="8" 
                required 
                value={formData.telmobile || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Email</label>
              <input 
                name="email" 
                type="text" 
                className="form-control" 
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <label className="font-size-16 font-weight-bold col">
            Télécharger votre carte d’identité nationale (CIN)
          </label>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group mb-0">
              <label className="control-label">Recto de la CIN *</label>
              <input 
                id="photocin1" 
                className="filestyle" 
                data-buttonname="custum-file-buton" 
                data-buttonbefore="true" 
                name="photocin1" 
                type="file" 
                data-placeholder="" 
                data-buttontext="Choisir un fichier" 
                required 
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group mb-0">
              <label className="control-label">Verso de la CIN<sup>*</sup></label>
              <input 
                id="photocin2" 
                className="filestyle" 
                data-buttonname="custum-file-buton" 
                data-buttonbefore="true" 
                name="photocin2" 
                type="file" 
                data-placeholder="" 
                data-buttontext="Choisir un fichier" 
                required 
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-next mt-10 nextBtn pull-right" type="button">Suivant</button>
      </div>
    </div>
  );
};

export default Step2;
