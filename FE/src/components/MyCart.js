import React, { useState, useEffect } from "react";

export default function MyCart(props) {
  const [orders, setOrders] = useState([]);
  const [ordersInCart, setOrdersInCart] = useState([]);
  var no=0;
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:8085/orders-api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("user"))?.userId,
        }),
      });
  
      const parsedData = await response.json();
      console.log("parsedData > ", parsedData);
      setOrders(parsedData ?? []);
    };
  
    fetchOrders();
  }, []);
  
  useEffect(() => {
    const newOrdersInCart = orders.filter((order) => order.isOrderd === "N");
    setOrdersInCart(newOrdersInCart);
  }, [orders]);

  const removeProductFromCart = async (id) => {
    const response = await fetch(`http://localhost:8085/orders-api/removeProductFromCart/${id}`, { method: "DELETE" });
    console.log(response);
    if (response.ok) {
      props.showAlert("Product removed from cart successfully", "success");
      setOrdersInCart((prevOrders) => prevOrders.filter((order) => order.orderId !== id));
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  const handleClick = async (event) => {
    const confirm = window.confirm("Are you sure to buy?");
    if (confirm) {
      for (const order of ordersInCart) {
        try {
          const response = await fetch("http://localhost:8085/orders-api/placeOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: order.orderId,
              productdto: { productId: order.product.productId, productName: order.product.productName },
              buyerdto: { userId: JSON.parse(localStorage.getItem("user"))?.userId, email: JSON.parse(localStorage.getItem("user"))?.email },
            }),
          });
          if (response.ok) {
            setOrdersInCart((prevOrders) => prevOrders.filter((o) => o.orderId !== order.orderId));
          }
        } catch (error) {
          console.log(error);
          props.showAlert("Some error occurred", "danger");
        }
      }
      props.showAlert("Ordered successfully", "success");
      window.location.reload();
    }
  };

  if (ordersInCart.length === 0) {
    return <div><h3>No orders in the cart.</h3></div>;
  }

  return (
    <div className="mx-5 my-5 px-5 ">
      <h3>My Cart</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersInCart.map((order) => {
            no++;
            return (
              <tr>
                <th scope="row">{no}</th>
                <td>{order.product.productName}</td>
                <td>{order.product.category.category}</td>
                <td>{order.product.price}</td>
                <td>{new Date(order.date).toDateString()}</td>
                <td>  
            <button type="submit" onClick={() => {
                        removeProductFromCart(order.orderId);
                      }} className="btn btn-danger btn-block">
              Remove From Cart
            </button>
            </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
      <button onClick={handleClick} className="btn btn-primary">
        Order
      </button>
    </div>
  );
  
}
