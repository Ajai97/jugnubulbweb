import React, { useState, useRef } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';

 const API_URL = "http://localhost:8085/";

const ForgotPassword = (props) => {

    const history = useHistory();

    
    
    const [credentials, setcredentials] = useState({
        userName: null,
        email: "",
        mobileno: null,
        password: null,
        question:"",
        answer:"",
      });
      
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch("http://localhost:8085/user-api/forgotPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            question:credentials.question,
            answer:credentials.answer,
    
          }),
        });
        const json = await response.json();
    console.log(json)
        if (response.ok) {
          props.showAlert("Validattion Success..👍", "success");
          localStorage.setItem('femail',json.email);
          localStorage.setItem('userId',json.userId);
          const femail=localStorage.getItem('femail');


          console.log("femail======>"+femail)
          history.push("/resetPassword");
        } else {
          props.showAlert("invalid Details", "danger");
        }
      };
      const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };


    return(
            <div class="container mb-5">
              
              <br />
              <br />
              <div class="col-lg-8 m-auto d-block">
                <form onSubmit={handleSubmit} class="bg-light register-form">
                  <h4 className="text-center font-weight-bold">Validate Yourself</h4>
                  <div></div>               
                  <div class="formgroup">
                    <label>
                      <b> Email:</b>
                    </label>
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="email"
                      placeholder=" e.g.name@example.coms"
                      required
                      autoComplete="off"
                      onChange={handleChange}
                    />
                    <br />
                    <span id="vemail" class="text-danger font-weight-bold"></span>
                  </div>
                  <div class="formgroup">                           
                            <label htmlFor='question'><b>Question </b></label>
                                <select 
                                id='question' 
                                name="question"                      
                                type='text' 
                                onChange={handleChange}
                                className='form-control'
                               >
                                    <option selected value='1'>What is your Nickname ?</option>
                                    <option value='2'>What is your favourite Sport ?</option>
                                    <option value='3'>What is your favourite City ?</option>
                                    <option value='4'>Who is your Best Friend ?</option>
                                </select>
                                
                            </div>
                            <div className='form-group'>
                            
                            <label htmlFor='questionans'><b>Answer</b></label>
                            <input 
                            className='form-control ' 
                            type='text' 
                            name="answer"
                            placeholder='Enter your Answer'                   
                            onChange={handleChange}></input>
                        
                    </div>       
                  <br />
                  <div class="form-group">
                    <input type="submit" class="btn btn-primary mx-3 " value="SUBMIT" />
                    <input type="reset" class="btn btn-primary mx-3" value="RESET" />
                  </div>
                </form>
              </div>
            </div>
          );
}

export default ForgotPassword;