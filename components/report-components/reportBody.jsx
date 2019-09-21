import React from 'react'
import '../../styles/login.scss'


const ReportBody = ({ username, password }) => {
   var thisUrl = `http://localhost/Phil/MLKPCorporateReports/Webpages/postpage.aspx?user=${username}&pass=${password}`
   console.log(thisUrl);
   return (
      
      <div className="card-body">
         {/* <img src={LoadingImage} className="loading" height="80px" /> */}
         <iframe src={thisUrl}
            name="iframe_a" frameBorder={'0'} hspace="0" height={"500px"} width={"100%"} align="center"/>
      </div>
   )
}

export default ReportBody;