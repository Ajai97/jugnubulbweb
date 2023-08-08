import React from 'react'
import {Link} from "react-router-dom";
import './Footer.css'
export default function Footer() {
    return (
        <footer className="footer">
        <div className="container ">
            <div className="row">
                <div className="footer-col">
                    <h4>Website</h4>
                    <ul>
                        <li><Link to="/AboutUs">about us</Link></li>
                        <li><Link to="/contactUs">ConactUs</Link></li>
                        <li><Link to="#">privacy policy</Link></li>

                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Get Help</h4>
                    <ul>
                        <li><Link to="#">FAQ</Link></li>
                        <li><Link to="/login">Order Status</Link></li>
                        <li><Link to="https://www.linkedin.com/company/ak-groupsindia/about/?viewAsMember=true">shipping</Link></li>
                        <li><Link to="#">payment options</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow us</h4>
                    <div className="social-links">
                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
                        <Link to="https://www.linkedin.com/company/ak-groupsindia/about/?viewAsMember=true"><i className="fab fa-linkedin-in"></i></Link>
                    </div>
                    <div className ="sb_footer_below">
                        <div classname ="sb_footercopyright">
                            <p>
                                @{new Date().getFullYear()}CodeInn. All rights reserved.
                            </p>
                        </div>
                        </div>
                    
                </div>
                
                

            </div>
            
        </div>
        
    </footer>
    )
}
