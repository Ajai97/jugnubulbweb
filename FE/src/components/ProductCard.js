import React from 'react';
import {useHistory} from "react-router-dom";

function ProductCard(props) {
  const history = useHistory();
  const handleClick = () =>{
    props.setCurrentProduct(props.product.productId);
    history.push('/product-description');
  }
    return (
        
            <div>
      <div className="card my-3 mx-3 shadow" style={{borderRadius:"1.15rem"}}>
      <img src={"http://localhost:8085/"+props.product.image} className="card-img-top" style={{borderRadius:"1.15rem,1.15rem,0,0"}} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.product.productName}</h5>
          <p className="card-text">
          {props.product.category.category}  
          </p>
        <p> Price: {props.product.price} ₹</p>
          <button onClick={handleClick} className="btn btn-primary">
            View Product
          </button>
        </div>
      </div>
    </div>
        
    )
}

export default ProductCard
