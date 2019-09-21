import React from 'react';
import { Link } from 'react-router-dom';
import CompanyName from '../../images/mlhuillier_heading_white.png';
import CompanyLogo from '../../images/Diamante.png';
import '../../styles/login.scss';


const NavHome = ({ onClick, reportsToNull}) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top py-0" style={{ backgroundColor: "black" }}>
            <a to="/" className="navbar-brand">
                <img src={CompanyName} height="40" alt="logo" />
            </a>
            <div style={{ backgroundColor: "white" }} className="rounded-circle border mr-1">
                <img src={CompanyLogo} alt="ML Wallet Batch Upload Brand Image" height="40" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                   <Link to="/home" className="nav-link border-0" style={{ color: "white", fontSize: "14px" }}>
                            <i className="fas fa-home" style={{ fontSize: "14px" }}></i> Home
                        </Link>
                    </li>
                    <li className="nav-item">
                   <Link to="/upload" className="nav-link border-0" style={{ color: "white", fontSize: "14px" }}>
                            <i className="fas fa-upload" style={{ fontSize: "14px" }}></i> Upload
                        </Link>
                    </li>
                    <li className="nav-item">
                   <Link to="/report" className="nav-link border-0" style={{ color: "white", fontSize: "14px" }}>
                            <i className="fas fa-clipboard-list" style={{ fontSize: "14px" }}></i> Reports
                        </Link>
                    </li>
                </ul>
                <form className="form-inline mt-2 mt-md-0">
                    <label className="btnLogout pointer my-2 my-sm-0" style={{ color: "white", fontSize: "14px" }} onClick={onClick}>
                        <i className="fas fa-sign-out-alt"></i>&nbsp; Logout
                    </label>
                </form>
            </div>
        </nav>
    );
}

export default NavHome;