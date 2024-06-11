
export async function CategoryProduct(id_category,filters=null) {
  const URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL_API;
  let URLAPI=`${URL}/rest/categoryProducts?id_category=${id_category}`;
  if(filters)
    {
      console.log(filters)
      const params = new URLSearchParams();

      filters.forEach((filter, index) => {
      params.append(`filters[${index}][name]`, filter.name);
      params.append(`filters[${index}][value]`, filter.value);
    });
    const queryString = params.toString();
    console.log(queryString)
    URLAPI=`${URL}/rest/categoryProducts?id_category=${id_category}&${queryString}`;
    }
 
  try {
    const response = await fetch(
      `${URLAPI}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("iciiiiii",`${URL}/rest/categoryProducts?id_category=${id_category}`)
    if (!response.ok) {
      throw new Error("HTTP error! Erreur lors de la récupération");
    }
    const categoryDetails = await response.json();
    return categoryDetails.psdata;
  } catch (error) {
    console.log("Error : ", error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const id_category = req.query.id_category;
    const category = await CategoryProduct(id_category);
    if (!category) {
      return res.status(404).json({
        message: `Category with the id "${id_category}" is not found.`,
      });
    } else {
      return res.status(200).json(category);
    }
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des categorie des produits",
      err
    );
    return res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des détails de la categorie",
      });
  }
}
