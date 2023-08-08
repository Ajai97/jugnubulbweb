import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';


// const API_URL = "http://localhost:8080/";

const ResetPassword = (props) => {

    const history = useHistory();
    const [credentials, setcredentials] = useState({
        userId:"",
        email: "",
        password: null,
        password1:"",
       
      });


      useEffect(() => {
        setcredentials({ ...credentials, email: localStorage.getItem('femail') });
      }, []);
      const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      }; 
    

      const handleSubmit = async (event) => {
        event.preventDefault();
    if(credentials.password !=credentials.password1){
      props.showAlert("PasswordFields are not matching", "danger");
        return;
    }
        const response = await fetch("http://localhost:8085/user-api/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:credentials.email,
            password:credentials.password,
           
          }),
        });
        const json = await response.json();
    console.log(json)
        if (response.ok) {
          props.showAlert("Reset Success..👍", "success");
          localStorage.setItem('femail','');
          localStorage.setItem('userId','');
          history.push("/login");
        } 
      };
    return(
        <section className="container-fluid my-5">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-4">
            <form id="form" onSubmit={handleSubmit} className={`form-container bg-light was-validated `}>
              <div className="form-group">
                <h4 className="text-center font-weight-bold"> Reset Password</h4>
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
                  readOnly
                />
                <div className="valid-feedback"></div>
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword1"
                  placeholder="Password"              
                  onChange={handleChange}
                  required
                  name="password"
                />
                <div className="valid-feedback"></div>
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword2"
                  placeholder="Password1"                 
                  onChange={handleChange}
                  required
                  name="password1"
                />
                <div className="valid-feedback"></div>
              </div>
             
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </section>
        </section>
      </section>
    )
}

export default ResetPassword;
