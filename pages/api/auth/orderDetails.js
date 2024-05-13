export async function OrderDetails(cookie, id_order) {
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  console.log(URL)
  try {
    const response = await fetch(
      `${URL}/rest/orderhistory?id_order=${id_order}`,
      {
        method: "GET",
        headers: {
            'Cookie': cookie
        }        
      }
    );
    console.log("*********",`${URL}/rest/orderhistory?id_order=${id_order}`);
    if (!response.ok) {
      
      
      throw new Error(
        "Erreur lors de la récupération des détails de la commande"
      );
    }
  
    const orderDetails = await response.json();
    // console.log("iciiiiiiiiiiiiiiiii")
    // console.log(orderDetails);
    return orderDetails.psdata;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Méthode non autorisée" });
    }
    const cookie = req.headers.cookie;
    const id_order = req.query.id_order;
   // console.log("77777777777",id_order, cookie)

    const orderDetails = await OrderDetails(cookie, id_order);
// console.log("i'm here",orderDetails);
    if (!orderDetails) {
      return res
        .status(404)
        .json({ message: "Détails de la commande introuvables" });
    }

    return res.status(200).json(orderDetails);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la commande:",
      error
    );
    return res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des détails de la commande",
      });
  }
}
