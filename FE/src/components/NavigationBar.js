import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import categoryContext from "../contexts/category/CategoryContext";

function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User=================" + user);
  console.log("Type of User ==========" + typeof user);

  // const context = useContext(categoryContext)
  // console.log("Context***********************"+context);
  const [categories, setcategories] = useState([]);
  const update = async () => {
    let data = await fetch(
      "http://localhost:8085//productCategory-api/all-categories"
    );

    let parsedData = await data.json();
    console.log(parsedData);
    setcategories(parsedData);
    console.log(categories);
  };

  useEffect(() => {
    update();
  }, []);

  const history = useHistory();
  const search = () => {
    console.log(keyword.keyword);
    history.push(`/search-product/${keyword.keyword}`);
  };
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  const [keyword, setkeyword] = useState({ keyword: "" });

  const handleChange = (e) => {
    setkeyword({ ...keyword, keyword: e.target.value });
    console.log(keyword);
  };

  const search2 = () => {
    // console.log(keyword.keyword);
    history.push(`/city-product/${city.city}`);
  };

  const [city, setcity] = useState({ city: "" });

  const handleChange2 = (e) => {
    setcity({ ...city, city: e.target.value });
    // console.log(keyword);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b>AK GROUP</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav mb-2 mb-lg-0"
              style={{ marginRight: "10%" }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/AboutUs"
                >
                  AboutUs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/ContactUS"
                >
                  ContactUs
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle active"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map((category) => {
                    return (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/category-product/${category.id}/${category.category}`}
                        >
                          {category.category.toUpperCase()}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              { user !=null && user.userType==='admin' &&(
              <><li className="nav-item">
                  <Link   className="nav-link active"
                  aria-current="page"  to="/product-register">
                       Add Item To Inventory                 
                  </Link>
                </li>
                <li>
                    <Link   className="nav-link active"
                  aria-current="page"  to="/my-products">
                      Products Inventory
                    </Link>
                  </li>
                  <li>
                    <Link   className="nav-link active"
                  aria-current="page"  to="/AllMeembers">
                      All Users
                    </Link>
                  </li>
                  </>)}
            </ul>
            <div className="d-flex me-auto ">
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword.value}
                name="keyword"
                onChange={handleChange}
                autoComplete="off"
              />

              <button
                onClick={search}
                className="btn btn-primary"
                type="submit"
              >
                Search
              </button>
            </div>
         
            { user &&(
              <div>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle active"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill mx-1">{user.userName}</i>
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-lg-end"
                      aria-labelledby="navbarDropdown"
                    >
                     
                      <li>
                        <Link className="dropdown-item" to="/my-orders">
                          My orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-cart">
                          My Cart
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li style={{ cursor: "pointer" }} onClick={logout}>
                        <i className="fas fa-sign-out-alt mx-1"></i>
                        Logout
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            <ul className="navbar-nav mb-2 mb-lg-0">
            { user ===null &&(
              <><li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {" "}
                    <i className="bi bi-person-fill mx-1"></i>Login
                  </Link>
                </li><li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li></>
            )}
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
