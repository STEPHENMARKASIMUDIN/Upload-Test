import React from 'react'

const Body = ({ walletno, emailaddress, mobileno, fullname }) => {
    return (
        <div className="card-body">
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr style={{ height: "30px" }}>
                        <td style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>Name</td>
                        <td style={{ fontSize: "14px" }}>
                            <div id="fullname">:&nbsp;{fullname}</div>
                        </td>
                    </tr>
                    <tr style={{ height: "30px" }}>
                        <td style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>Wallet No</td>
                        <td style={{ fontSize: "14px" }}>
                            <div id="walletno">:&nbsp;{walletno}</div>
                        </td>
                    </tr>
                    <tr style={{ height: "30px" }}>
                        <td style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>Email</td>
                        <td style={{ fontSize: "14px" }}>:&nbsp;{emailaddress}</td>
                    </tr>
                    <tr style={{ height: "30px" }}>
                        <td style={{ fontWeight: "bold", fontSize: "14px" }}>Mobile No</td>
                        <td style={{ fontSize: "14px" }}>:&nbsp;{mobileno}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    
}


export default Body;