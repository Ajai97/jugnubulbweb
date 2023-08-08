import React, { useState } from "react";

export default function ProductRegister(props) {
  const [details, setDetails] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    city:"",
    tags:"",
    image:"",
  });


  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };


  const handleImageChange = (e) => {
    setDetails({ ...details, image: e.target.files[0] }); 
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", details.image);
    formData.append("productName", details.name);
    formData.append("discription", details.description);
    formData.append("price", details.price);
    formData.append("productCategory", details.category);
   
  
    const response = await fetch("http://localhost:8085/product-api/product", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();
    if (response.ok) {
      props.showAlert("Product Registered successfully", "success");
      details.image="";
      details.name="";
      details.description="";
      details.price="";
      
    } else {
      props.showAlert("Some Error Occured", "danger");
    }
  };
  



  return (
    <div className="container my-2">
      <br />
      <h1 className="text-center" style={{ color: "dimgrey" }}>
        Register Your Product
      </h1>
      <br />
      <div className="col-lg-8 m-auto d-block ">
        <form className="bg-light px-4 py-2" onSubmit={handleSubmit}>
          
          <div className="formgroup">
            <span>Product Name:</span>
            <input
              type="text"
              name="name"
              className="form-control"
              id="uname"
              value={details.name}
              onChange={handleChange}
              placeholder="Enter product Name"
              autoComplete="off"
              required
            />
            <span id="username" className="text-danger font-weight-bold"></span>
            <br />
          </div>
          <div className=" formgroup">
            <span>Select Product Category:</span>
            <select
              className="custom-select"
              style={{ width: "300px" }}
              name="category"
              onChange={handleChange}
              value={details.category}
            >
               <option value="LED LIGHTS">LED LIGHTS</option>
              <option value="ELECTRICAL EQUIPMENTS">ELECTRICAL EQUIPMENTS</option>
            </select>
          </div>
          <br />

          <div className="formgroup">
            <span>Description:</span>
            <textarea
              className="form-control"
              placeholder="Enter key points of product(like brand,color etc.).."
              id="floatingTextarea2"
              value={details.description}
              name="description"
              onChange={handleChange}
              style={{ height: "100px" }}
              required
            ></textarea>
            <span id="textarea" className="text-danger font-weight-bold"></span>
          </div>
          <br />
          <div className="formgroup">
            <span>Set a Price:</span>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={details.price}
              onChange={handleChange}
              placeholder="Enter Expected price"
              required
              autocomplete="off"
            />
            <br />
            <span id="price" className="text-danger font-weight-bold"></span>
          </div>
          <div className="photo">
            <div className="photpdiv">
            <div className="e22Bu">
                <span>Add Product Image</span>
              </div>
              <form>
                <div class="form-group">
                 
                  <input
                    type="file"
                    class="form-control-file"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>
              </form>
              
            </div>
          </div>
          <br />

          <br />
          <br />
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Post Product"
            />
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}
