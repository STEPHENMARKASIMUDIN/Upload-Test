import React from 'react'
import CompanyName from '../../images/mlhuillier_heading_white.png';
import {Link} from 'react-router-dom';
import '../../styles/login.scss';

const NavLogin = (props) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top py-1" style={{ backgroundColor: 'black' }}>
          <Link to='/home' className="navbar-brand" onClick={e => props.reportsToNull()}><img src={CompanyName} height="40" alt="logo" /></Link>
        </nav>

    )


}



export default NavLogin;