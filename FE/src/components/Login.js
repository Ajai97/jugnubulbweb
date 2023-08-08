import React, { useState, useEffect, useContext } from "react";
import {Link,useHistory} from "react-router-dom";
import "./Login.css";
export default function Login(props) {
const [credentials, setcredentials] = useState({email:"",password:""})
const history = useHistory();

const handleSubmit =  async (event) =>{

  event.preventDefault();
  let form = document.getElementById("form");
  console.log("hello ->>",form.checkValidity());
 
  const response = await fetch( "http://localhost:8085/user-api/user/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: credentials.email, password: credentials.password})
});
const json = await response.json();
if(response.ok){
  localStorage.setItem('user',JSON.stringify(json));
  const user=localStorage.getItem('user');
  const us=JSON.parse(user);
  console.log("USerType----"+us.userType);
  console.log("USer>>>>>>>>"+us.userName);
  props.showAlert("Logged In successfully","success")
  history.push('/')
}
else{
props.showAlert(json.erMessage,"danger")
}

};


const handleChange = (e) =>{
  
  setcredentials({...credentials,[e.target.name]:e.target.value});

}
  return (
    <section className="container-fluid my-5">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-4">
          <form id="form" onSubmit={handleSubmit} className={`form-container bg-light was-validated `}>
            <div className="form-group">
              <h4 className="text-center font-weight-bold"> Login Page</h4>
              <div className=""></div>
              <label htmlFor="Input1">Email</label>
              <input
                type="email"
                className="form-control"
                id="Input1"
                value={credentials.email}
                onChange={handleChange}
                required
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                name="email"
              />
              <div className="valid-feedback"></div>
              {/* <div className="invalid-feedback">
                Please fill out this field.
              </div> */}
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                name="password"
              />
              <div className="valid-feedback"></div>
              {/* <div className="invalid-feedback">
                Please fill out this field.
              </div> */}
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  required
                />{" "}
                I agree on terms and conditions
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Check this checkbox to continue.
                </div>
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <div className="form-footer">
              <p>
               
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
              <p>             
              forgot password..? <Link to="/forgotPassword">forgot password</Link>
             </p>
            
            </div>
          </form>
        </section>
      </section>
    </section>
  );
}
