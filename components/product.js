import { useState } from "react";
import productsData from "/public/products-mocks.json";
export default function Product() {
  const [products] = useState(productsData.products);
  return (
    <>
      <div className="container-fluid">
        <div className="text-center title-card">
          <span className="contactH1 pt-30">
            Nos <span className="service-title">Produits</span>
          </span>
        </div>
        <div className="row justify-content-center">
          <div
            className="btn-group hstack col-6"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-primary btn-product-cat"
              htmlFor="btnradio1"
            >
              Smartphones
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-primary btn-product-cat"
              htmlFor="btnradio3"
            >
              Accessoires
            </label>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          {products.map((product,index) => (

            <div key={index} className="card-product-home">
              <div className="card-header card-header-product">
                <a
                  className="text-dark"
                  href="#"
                >
                  <i className="bi bi-cart-fill"></i>
                </a>
              </div>
              <div className="card-body text-center">
                <a
                  className="text-center text-dark text-decoration-none"
                  href="#"
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
    </>
  );
}
