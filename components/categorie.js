import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFilter } from "../pages/hooks/useFilter";

export default function Categorie({ products, categories }) {
  const { filters, addFilter } = useFilter();
  
  console.log(filters);
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if(filters && filters.length>0)
    {
        
        const categoryFilter = filters.find(filter => filter.name === "categorie")?.value.split(',').map(Number);
        const brandFilter = filters.find(filter => filter.name === "Marque")?.value.split(',').map(Number);
        
        // Filtrer les produits
        const filteredProducts = products.filter(product => {
            const categoryMatch = categoryFilter?.length ? categoryFilter.includes(parseInt(product.id_category_default)) : true;
            console.log(categoryFilter,parseInt(product.id_category_default))
            const brandMatch = brandFilter?.length ? brandFilter.includes(parseInt(product.id_manufacturer)) : true;
            return categoryMatch && brandMatch;
        
       
        });
       
        setProductList(filteredProducts);
    }
   
  }, [filters]);
  useEffect(() => {
    setProductList(products);
  }, [products]);
  const handelChangeDetail = (product_id) => {
    router.push("productDetails/" + product_id);
  };
  const getListCart = () => {
    if (typeof window !== "undefined") {
      const panierJSON = localStorage.getItem("panier");
      return JSON.parse(panierJSON);
    } else {
      return [];
    }
  };

  const listPanier = getListCart();

  const addToList = (product) => {
    const item = {
      id: product.id_product,
      qte: 1,
      price: product.price,
      name: product.name,
    };
    const panierJSON = JSON.stringify(item);
    localStorage.setItem("panier", panierJSON);
  };
  return (
    <div id="produit">
      <div className="row gap-3 justify-content-center align-items-center">
        {productList &&
          productList.map((product, index) => (
            <div key={index} className="card card-product-home">
              <div className="card-header card-header-product">
                <a className="text-dark">
                  <i
                    className="bi bi-cart-fill"
                    onClick={() => addToList(product)}
                  ></i>
                </a>
              </div>
              <div className="card-body text-center">
                <a
                  className="text-center text-dark text-decoration-none"
                  onClick={() => handelChangeDetail(product.id_product)}
                >
                  <img
                    src={product.cover.url}
                    className="card-img-top"
                    alt="..."
                  />
                  <h3 className="">{product.name}</h3>
                  <p className="">{product.availability_message}</p>
                  <p className="regular_price">{product.regular_price}</p>
                  <p className="price">{product.price}</p>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
