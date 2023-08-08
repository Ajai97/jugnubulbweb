import React ,{ useState,useEffect } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";

export default function SearchProduct(props) {
  const params = useParams();
  const [products, setproducts] = useState([]);
  const [errorMessage, seterrorMessage] = useState(null)
  const [query, setquery] = useState(params.query)
  const update = async () => {
    if(query === ""){console.log("inside"); return}
    let data = await fetch(
      `http://localhost:8085/product-api/search-product/${query}`
    );
    
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.ok){
    
    setproducts(await parsedData);
    console.log(products);
  }
  else{
seterrorMessage(parsedData.erMessage)
  }
  };

  useEffect(() => {
    setquery(params.query);
    update();
  }, []);
  useEffect(() => {
    setproducts([]);
    setquery(params.query);
    if(query !==""){
    
    
    update();
    }
  }, [query])

  return (
      <div className="container my-5 ">
        
        {products.length == 0?<h3>No Products to Display</h3>:
        <><h3>Result for - "{params.query}"</h3>
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4" key={product.productId}>
                <ProductCard 
                  setCurrentProduct={props.setcurrentProduct}
                  product={product}
                />
              </div>
            );
          })}
        </div>
        </>
        }
      </div>
      
  );
}
