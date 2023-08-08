import React, { useState, useEffect } from "react";

export default function Myorders() {
  const [orders, setOrders] = useState([]);
  const [ordersPlaced, setOrdersPlaced] = useState([]);

  const update = async () => { 
    const response = await fetch(
      "http://localhost:8085/orders-api/myorders",
      {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("user")).userId,
        }),
      }
    );

    const parsedData = await response.json();
    setOrders(parsedData);
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    var placedOrders;
    if(orders!=null)
    placedOrders = orders.filter((order) => order.isOrderd === "Y");
   
    setOrdersPlaced(placedOrders);
  }, [orders]);

  if (ordersPlaced.length > 0) {
    return (
      <div className="mx-5 my-5 px-5 ">
        <h3>My Orders</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersPlaced.map((order, index) => (
              <tr key={order._id}>
                <th scope="row">{index + 1}</th>
                <td>{order.product.productName}</td>
                <td>{order.product.category.category}</td>
                <td>{order.product.price}</td>
                <td>{new Date(order.date).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h3>No orders</h3>
      </div>
    );
  }
}
