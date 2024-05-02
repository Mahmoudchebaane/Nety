import { useEffect, useState } from "react";
import Footer from "../components/footer";
import HeaderProfile from "../components/headerProfile";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/router";

export default function Orders() {
  const [orderList, setOrderList] = useState();
  //const [orderDetail, setOrderDetail] = useState();
  async function getOreders(){
    const response = await fetch("/api/auth/ordersList",{
      method: "GET",
    });
    const order = await response.json();
    return order;
  }
//   async function getOrdersDetails(id_order){
// const response = await fetch("/api/auth/orderDetails?id_order=${id_order}",{
//   method: "GET",
// });
// const orderDetails = await response.json();
// return orderDetails;
//   }

  useEffect(() => {
    const fetchData = async () => {
      const userOrder = await getOreders();
     // const detailOrder = await getOrdersDetails();
      setOrderList(userOrder.psdata);
      //setOrderDetail(detailOrder.psdata);
    };
    
    fetchData();
  },[]);
const router = useRouter();
const handleChangeAction = (id_order) => {
  console.log("ID de la commande :", id_order);
  router.push('orderDetails/'+id_order)
  // Vous pouvez utiliser l'ID de la commande pour effectuer d'autres actions, comme récupérer les détails de la commande
};
 
  return (
    <>
      <HeaderProfile />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-4">
            <section className="rounded p-3 bg-light">
              <h4>My orders</h4>
              <table className="table table-bordered rounded">
                <thead>
                  <tr>
                    <th>Référence de commande</th>
                    <th>Date</th>
                    <th>Prix total</th>
                    <th>Etat</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {orderList?.map((order,key) => (
                  <tr key={key} >
                    <td>{order.reference}</td>
                    <td>{order.invoice_date}</td>
                    <td>{order.total_paid}</td>
                    <td>{order.order_state}</td>
                    <td className="text-center"><i onClick={() => handleChangeAction(order.id_order)} class="bi bi-info-circle"></i></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
