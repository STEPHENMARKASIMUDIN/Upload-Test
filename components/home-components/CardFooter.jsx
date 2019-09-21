import React from 'react'
import '../../styles/login.scss'

const Footer = ({ balance }) => {
    return (
        <div className="card-footer text-muted my-0 py-0 theme-color">
            <label className="mt-2" style={{ fontSize: "14px", color: "white" }}>
                <span style={{ fontWeight: "bold" }}>Balance</span>
                <span style={{ marginLeft: "25px" }}>&nbsp;&nbsp;&nbsp;:&nbsp;{balance}</span>
            </label>
        </div>
    )
}

export default Footer;