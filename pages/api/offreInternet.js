export async function OffreInternet(){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    try{
        const response = await fetch(
            `${URL}/rest/offresinternet`,
            {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("offre internet =", `${URL}/rest/offresinternet`)
        if(!response.ok){
            throw new Error("HTTP error! Erreur lors de la recuperation des offres");
        }
        const offres = await response.json();
        console.log("offre internet = ", offres)
        return offres;
    } catch(error){
        console.log("Error :", error);
        return null;
    }
}
export default async function handler(req, res){
    try{
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
          }
          const offre = await OffreInternet();
          if(!offre){
            return res.status(404).json({
                message: `Offre internet is not found.`,
            });
          } else{
            return res.status(200).json(offre);
          }
    } catch(err){
        console.error(
            "Erreur lors de la récupertaion des offres internet",
            err
        );
        return res.status(500).json({
            message: "Erreur lors de la récupération des offres internet"
        });
    }
}