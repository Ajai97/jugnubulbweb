import React, { useEffect, useState } from "react"
import { useRef } from "react"
const AllMeembers = () => {
    const update = async () => {
        let data = await fetch(
          "http://localhost:8085/user-api/allUsers"
        );
    
        let parsedData = await data.json();
        setAllMemebersList(await parsedData);
      };
    
      useEffect(() => {
        update();
      }, []);
    const [allmembersList, setAllMemebersList] = useState([])
    return(
        <div className="container my-5">
        <h1>Users List</h1>
        <div className="mb-3">Users Count: {allmembersList.length}</div>
        <hr />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {allmembersList != null &&
            allmembersList.map((member) => {
              return (
                <div key={member.userId} className="col mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>User Id:</strong> {member.userId}
                      </h5>
                      <div className="card-text">
                        <p>
                          <strong>User Name:</strong> {member.userName}
                        </p>
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                        <p>
                          <strong>Contact:</strong>{" "}
                          {member.mobileno ? member.mobileno : <span>Not Available</span>}
                        </p>
                        <p>
                          <strong>Role:</strong>{" "}
                          {member.userType === "admin" ? (
                            <span className="text-danger">{member.userType}</span>
                          ) : (
                            <span>{member.userType}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      
)

}



export default AllMeembers;