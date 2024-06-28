export async function ProductDetails(product_id) {
  //console.log("iciiiiiiiiiiiiiiiiiii", product_id);
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  //console.log("iciiiiiiiiiiiiiiiiiii", product_id);
  try {
    const response = await fetch(
      `${URL}/rest/productdetail?product_id=${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log("iciiii product detail");
    //console.log(`${URL}/rest/productdetail?product_id=${product_id}`);
    
    if (!response.ok) {
      throw new Error("HTTP error! Erreur lors du chargement");
    }

    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    console.log("Erreur : ", error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const product_id = req.query.product_id;
    const details = await ProductDetails(product_id);
    console.log(details);
    if (!details) {
      console.log("bloc here")
      return res.status(404).json({ message: "Produit non trouvé !" });
    } else {
      return res.status(200).json(details);
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des détails de produits",
      err
    );
    return res
      .status(500)
      .json({ message: `Une erreur s'est produite : ${err}` });
  }
}
