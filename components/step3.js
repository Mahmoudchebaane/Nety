import React from 'react';

const Step3 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="row setup-content" id="step-3" style={{ display: 'none' }}>
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="row col d-flex mt-30 flexrow">
              <label className="control-label locControl">Résidence<sup>*</sup></label>
              <div className="form-check form-check-inline mt-8">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="locataire" 
                  id="locataireOption1" 
                  value="false" 
                  checked={formData.locataire === 'false'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="locataireOption1">Locataire</label>
              </div>
              <div className="form-check form-check-inline mt-8">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="locataire" 
                  id="locataireOption2" 
                  value="true" 
                  checked={formData.locataire === 'true'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="locataireOption2">Propriétaire</label>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Gouvernerat<sup>*</sup></label>
              <select 
                name="gouvernoratid" 
                required 
                className="form-control"
                value={formData.gouvernoratid}
                onChange={handleChange}
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Délégation<sup>*</sup></label>
              <select 
                name="villeid" 
                required 
                className="form-control"
                value={formData.villeid}
                onChange={handleChange}
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-6">
            <div className="form-group">
              <label className="control-label">Localité<sup>*</sup></label>
              <select 
                name="codepostale" 
                required 
                className="form-control"
                value={formData.codepostale}
                onChange={handleChange}
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="control-label">Adresse *</label>
              <textarea 
                name="adresse" 
                type="text" 
                rows="2" 
                className="form-control" 
                required 
                value={formData.adresse}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row col mt-10 mr-1">
          <label className="font-size-16 col-auto font-weight-bold">Veuillez indiquer votre position</label>
          <input 
            name="codeadresse" 
            type="text" 
            className="postionxy form-control col pull-right" 
            required 
            value={formData.codeadresse}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-next nextBtn pull-right" type="button">Suivant</button>
      </div>
    </div>
  );
};

export default Step3;
