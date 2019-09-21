import React from 'react'
import NavHome from './navigator/NavHome.jsx'
import NavLogin from './navigator/NavLogin.jsx'


const Navbar = ({ isAuthenticated, reportsToNull, onClick }) => {
    let nav = !isAuthenticated ? <NavLogin /> : <NavHome onClick={onClick} reportsToNull={reportsToNull} />
    return (
        <div>
            {nav}
        </div>
    )
}

export default Navbar;