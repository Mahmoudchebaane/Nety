export async function getAdresse(cookie,id_adress){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    console.log('check'+id_adress)
    const response = await fetch(`${URL}/rest/address?id_address=${id_adress}`,{
        method: "GET",
        headers: {
            'Cookie': cookie
        },
        
    });
    
    const responseAdresse = await response.json();
    if(response.ok){
        return responseAdresse;
    } else{
        console.log("Utilisateur non authentifié");
        return null;
    }
}

export default async function handler(req,res){
    try{
        const adress=req.query.id_address;
        const response = await getAdresse(req.headers.cookie,adress);
        if(response.code ===200){
            res.status(200).json(response);
        }else{
            console.log("Echec");
            res.status(401).json({error:"user non authentifié"});
        }
    }
    catch (error) {
        // Gestion des erreurs
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Quelque chose s'est mal passé" });
      }
    }
