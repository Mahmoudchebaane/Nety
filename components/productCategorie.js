import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFilter } from "../pages/hooks/useFilter";
import { CategoryProduct } from "../pages/api/categoryProducts";
import { ProductAvailability } from "./productAvailability";

export default function ProductCategorie({ products, categorie_id }) {
  const { filters, addFilter } = useFilter();
  console.log(categorie_id);
  console.log(filters);
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const categoryProducts = await CategoryProduct(categorie_id, filters);
        setProductList(categoryProducts.products);
      } catch (err) {
        console.log("Erreur de chargement des produits");
      }
    }
    fetchCategoryProducts();
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
  console.log(productList);
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
                  <h5 className="">{product.name}</h5>
                  <ProductAvailability quantity={product.quantity} />
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
