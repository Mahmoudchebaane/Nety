export async function AddCart(cookie, items) {
    const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
    const response = await fetch(`${URL}/rest/cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(items),
    });
    //console.log("La réponse de cart", response);
    return response;
  }
  

export default async function handler(req, res) {
    try {
      const cookie = req.headers.cookie;
      const items = req.body;
      
      const response = await AddCart(cookie, items);
      const data = await response.json();
      
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: data.message || "Erreur lors de l'ajout au panier" });
      }
    } catch (error) {
      console.error("Erreur lors de la gestion de la requête", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
  
