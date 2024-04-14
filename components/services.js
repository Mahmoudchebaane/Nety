import Image from "next/image";
export default function Service() {
  return (
    <div className="bg-service">
     
            <div className="text-center ">
              <span className="contactH1 pt-30">
                Nos <span className="service-title">Services</span>
              </span>
            </div>
          
        <div className="row justify-content-center align-items-center">
          <div className="card col-md-3 ml-2">
            <div className="card-header bg-white text-center">Nety Security</div>
            <div className="card-body ">
            <Image className="card-img mx-auto d-block" width={100} height={100} src="/image/security.png"  alt="Card image" />
             
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="card col-md-3 ml-2">
            <div className="card-header bg-white text-center">Nety service de contenu</div>
            <div className="card-body">
            <Image className="card-img mx-auto d-block" width={100} height={100} src="/image/contenu.png"  alt="Card image" />
            </div>
          </div>
        </div>
        
      </div>
    
  );
}
