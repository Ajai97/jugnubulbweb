
import React, { useEffect, useState } from 'react'



const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
 
}, [])


    return(
      
        <div className='container'>
          
          
              <h4>My Profile Details</h4>
           <hr></hr>
            <div className="card-body">
              <div className='row'>
                <div className='col-sm'>
                  <label>userId</label>
                  <p>{user.userId}</p>
                </div>
                <div className='col-sm'>
                  <label>Name</label>
                  <p>{user.userName}</p>
                </div>
                </div>
                <div className='row'>
                <div className='col-sm'>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className='col-sm'>
                  <label>Contact Number</label>
                  <p>{user.mobileno}</p>
                </div>
                </div>
              
            </div>
          </div>
       
    
    )
}

export default UserProfile;