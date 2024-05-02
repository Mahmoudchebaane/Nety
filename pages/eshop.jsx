import Header from "../components/header";
import Footer from "../components/footer";
import FilterEshop from "../components/filterEshop";
export default function Eshop() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h1></h1>
          <div className="col-4">
            <div className="card">
              <FilterEshop />
            </div>
          </div>
          <div className="col-8"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
