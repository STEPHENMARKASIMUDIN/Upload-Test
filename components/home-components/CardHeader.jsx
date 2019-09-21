import React from 'react'
import '../../styles/login.scss'

const Head = ({ username }) => {
    return (
        <div className="card-header theme-color mb-0 py-0">
            <i className="fas fa-user mr-2" style={{ fontSize: "12px", color: "white" }}></i>
            <label className="font-head mt-2" style={{ color: "white", fontSize: "14px" }}>Hi, </label>
            <label className="font-head" style={{ color: "white", fontSize: "14px" }}>&nbsp; {username}</label>
        </div>
    )
}

export default Head;