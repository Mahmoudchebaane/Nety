import { getCookie, setCookie } from 'cookies-next';
// Fonction pour authentifier l'utilisateur
export async function Authentication(email, password) {
    // email = "elyesbenmahmoud@gmail.com";
    // password = "123456";
    
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  const response = await fetch(`${URL}/rest/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  
  return response;
}

// Gestionnaire d'endpoint pour la requête de connexion
export default async function handler(req, res) {
  try {
    // Récupération des informations d'identification de la demande
    const { email, password } = req.body;
    const response = await Authentication(email, password);
    const data=await response.json();
    const cookie=response.headers.get("set-Cookie");

    const loginCookie = (cookie || "")?.split('PrestaShop-7768c5e97d9f6121e567e3116355ab63=');
    const tab=loginCookie[2].split(';');
    setCookie("PrestaShop-7768c5e97d9f6121e567e3116355ab63", tab[0], { req,res });
    
    // Si l'authentification réussit, renvoyer une réponse de réussite
    if (response.statusText === "OK") {
      res.status(200).json({ success: true,data });
    
    } else {
      console.log("Échec de la connexion");
      res.status(401).json({ error: "Adresse e-mail ou mot de passe incorrect" });
    }
  } catch (error) {
    // Gestion des erreurs
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Quelque chose s'est mal passé" });
  }
 
}

// Fonction pour récupérer les informations du profil utilisateur
