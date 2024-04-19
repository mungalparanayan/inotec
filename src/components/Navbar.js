import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //   console.log(location.pathname);
    // }, [location]);  

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-warning" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "text-warning-emphasis" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "text-warning-emphasis" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? 
              <form className="d-flex" role="search">
                <Link className="btn btn-outline-info mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-outline-info mx-1" to="/signup" role="button">Signup</Link>
              </form> : 
              <div>
                <span className="text-info-emphasis mx-3">{localStorage.getItem('Email')}</span>
                <button onClick={handleLogout} className="btn btn-outline-info">Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></button>    
              </div>
            }
          </div>
        </div>
      </nav>
    )
}

export default Navbar
