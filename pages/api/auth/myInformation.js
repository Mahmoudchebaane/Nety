export async function UpdateInfoProfil(cookie, dataToUpdate){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    const response = await fetch(`${URL}/rest/accountedit`, {
      method: "POST",
      headers: {
        'Cookie': cookie
        
      },
      body: JSON.stringify(dataToUpdate) // Envoyer les données à mettre à jour
    });
    console.log("### body ####" ,response.body);
    console.log("response updateInfo",response)
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      console.log("Erreur lors de la mise à jour du profil :", responseData.error);
      return null;
    }
  }

  export default async function handler(req,res){
    try{
        const data = req.body;
        console.log("######## data for update",data);
        const response = await UpdateInfoProfil(req.headers.cookie,data);
        console.log("*****",response);
        if(response.code === 200){
            res.status(200).json(response);
        }else{
            console.log("Mise à jour du profile échouer");
            res.status(401).json({error:"user non authentifie"});
        }
    }
    catch (error) {
        // Gestion des erreurs
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Quelque chose s'est mal passé" });
      }
  }