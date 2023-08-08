import React, { useState, useEffect, useRef } from "react";

export default function Myproducts(props) {
  var no=0;
  const [products, setproducts] = useState([]);
  const [productToEdit, setproductToEdit] = useState({
    productId:"", 
    discription:"",
    productName: "",
    category: "",
    price: "",
    isSold: "",
    categoryId:"",
  });
  const handleChange = (e) => {
    setproductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
    
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const showModal = (product) => {
    ref.current.click();
    setproductToEdit({
      productId:product.productId,
      discription:product.discription,
      productName: product.productName,    
      price: product.price,
      isSold: product.isSold,
      category:product.category.category,
      categoryId:product.category.id,
    });
    console.log(product);
  };
  const removeProduct = async (id) => {
    let data = await fetch(
      `http://localhost:8085/product-api/removeProduct/${id}`,
      { method: "DELETE" }
    );

    let parsedData1 = await data;
    console.log(await parsedData1);
    await update();
    if (data.ok) {
      props.showAlert("Product Deleted successfully", "success");
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };
const updateProductInfo =async()=>{
  const formData = new FormData();
  formData.append("productId",productToEdit.productId)
  formData.append("productName", productToEdit.productName);
  formData.append("discription", productToEdit.discription);
  formData.append("price", productToEdit.price);
  formData.append("productCategory", productToEdit.category);
  formData.append("isSold",productToEdit.isSold);
  formData.append("categoryId",productToEdit.categoryId);
  const response = await fetch("http://localhost:8085/product-api/updateProduct", {
    method: "POST",
    body: formData,
  });
  const json = await response.json();
  if (response.ok) {
    alert("Product Updated successfully", "success");
    
  } else {
    props.showAlert("Some Error Occured", "danger");
  }

}

  const update = async () => {
    const response = await fetch(
      "http://localhost:8085/product-api/allproducts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    let parsedData = await response.json();
    console.log(parsedData);
    setproducts(await parsedData);
    console.log(products);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    ProductId
                  </label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    className="form-control"
                    value={productToEdit.productId}
                    onChange={handleChange}                   
                    required
                    readOnly 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className="form-control"
                    onChange={handleChange}
                    value={productToEdit.productName}                 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="textArea"
                    className="form-control"
                    id="discription"  
                    name="discription"               
                    onChange={handleChange}
                    value={productToEdit.discription}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={productToEdit.category}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={productToEdit.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Available for Sale
                  </label>
                  <br></br>
                <select
              className="custom-select"
              style={{ width: "300px" }}
              name="isSold"
              onChange={handleChange}
              value={productToEdit.isSold?"Yes":"No"}
            >
               <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"  onClick={updateProductInfo}>
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 my-5 px-5 ">
        <h3>Products Inventory</h3>
       {products.map!=null?
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Available For Sale</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product) => {
              no++;
              return (
                <tr>
                  <th scope="row">{no}</th>
                  <td>{product.productName}</td>
                  <td>{product.category.category}</td>
                  <td>{product.price}</td>
                  <td>{new Date(product.date).toDateString()}</td>
                  <td>{product.isSold ?"Yes":"No"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning mx-1"
                      onClick={() => showModal(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-danger btn-sm btn"
                      onClick={() => {
                        removeProduct(product.productId);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        :<div>
          <h3>No Products Available</h3>
          </div>
        } 
      </div>
      </div>:
      
    </>
  );
}
