import { useEffect, useState } from "react";

export default function AdresseList({id_adresse}) {
  const [adresse, setAdresse] = useState([]);

  async function getAddressList() {
    try {
      const response = await fetch(`/api/auth/adresse?id_address=${id_adresse}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("data :>> ", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error);
      return [];
    }
  }
console.log("ID ADDR ", id_adresse);
  useEffect(() => {
    const fetchAdress = async () => {
      const listAdress = await getAddressList();
      console.log(listAdress.psdata)
      setAdresse(listAdress.psdata || []);
    };
    fetchAdress();
  }, [id_adresse]);

  console.log("ici adresse",adresse)
  return (
      <div className="row">
      
        <div className="col-6" key={adresse.id}>
          <ul>
            <li>{adresse.firstname} {adresse.lastname}</li>
            <li>{adresse.address1}</li>
            <li>{adresse.postcode} {adresse.city}</li>
            <li>{adresse.country}</li>
            <li>{adresse.phone}</li>
          </ul>
        </div>
      
    </div>
    
   
    
   
  );
}
