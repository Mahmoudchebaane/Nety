export async function InfoProfil(cookie) {
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;

    // Appel à l'API pour récupérer les informations du profil utilisateur
    const response = await fetch(`${URL}/rest/accountInfo`, {
      "method": "GET",
      headers:{
        'Cookie':cookie
      }
      
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      console.log("Utilisateur non authentifié");
      return null;
    }
  }

  export default async function handler(req, res) {
    try {
      const response = await InfoProfil(req.headers.cookie);
      console.log({response})
      if (response.code === 200) {
        res.status(200).json(response);
      } else {
        console.log("Échec de la connexion profil");
        res.status(401).json({ error: "user non authentifie" });
      }
    }
    catch (error) {
        // Gestion des erreurs
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Quelque chose s'est mal passé" });
      }
    }