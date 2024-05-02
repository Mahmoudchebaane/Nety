export async function OrdersList(cookie){
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    const response = await fetch(`${URL}/rest/orderhistory`, {
        method: "GET",
        headers: {
            'Cookie' : cookie
        },   
    });
    console.log(response);

    const responseOrders = await response.json();
    if(response.ok){
        return responseOrders;
    } else{
        console.log("Utilisateur non authentifié");
        return null;
    }
}

export default async function handler(req,res){
    try {
        const response = await OrdersList(req.headers.cookie);
        console.log(response)
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