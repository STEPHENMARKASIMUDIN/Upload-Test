import React from 'react'
import { Redirect } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import '../styles/login.scss'
import CompanyName2 from '../images/ReviseML.jpg'





var date = new Date();
var day = date.getDate().toLocaleString();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var year = date.getFullYear();
var NowTransaction = year + '-' + day + '-' + month;
$('#karongAdlawa').html(NowTransaction);

class ReportGen extends React.Component {
   constructor(props) {
      super(props);
      var d = new Date();
      var karon = d.getDate().toLocaleString();
      var tuig = d.getFullYear();
      var buwan = new Array();
      buwan[0] = "January";
      buwan[1] = "February";
      buwan[2] = "March";
      buwan[3] = "April";
      buwan[4] = "May";
      buwan[5] = "June";
      buwan[6] = "July";
      buwan[7] = "August";
      buwan[8] = "September";
      buwan[9] = "October";
      buwan[10] = "November";
      buwan[11] = "December";
      var n = buwan[d.getMonth()];
      var fn = n + ' ' + karon + ', ' + tuig;

      this.state = {
         fn: fn,
      }

      this.idleTimer = this.idleTimer.bind(this);

   }
   idleTimer() {
      var timeout;
      let self = this;
      document.onmousemove = () => {
         clearTimeout(timeout);
         timeout = setTimeout(() => {
            bootbox.dialog({
               title: '<div class="text-center" style="color: red">System Message</div >',
               message: '<div class="text-center" style="color: black">You have been idled for 5 mins.</div>',
               closeButton: false,
               buttons: {
                  ok: {
                     label: 'OK',
                     className: 'btn-primary',
                     callback: () => {
                        console.log('23456')
                        localStorage.removeItem('mlwalletbatchuploadDatas');
                        window.location.href = '/'
                     }
                  }
               }

            }).css({
               'margin-top': '60px'
            });
         }, 300000)
      }
   }
   componentDidMount() {
      localStorage.setItem('location', '/genreport');
      let state = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
      // console.log(state)
      if (state) {
         this.setState(state, () => {
            // console.log(this.state);
         })
      }
      this.idleTimer()
   }


   render() {
      let { user_details, body } = this.props;
      let { firstname, lastname } = user_details;
      var TotalAmount = body.totalAmount;
      var partialformat = numeral(TotalAmount);
      var finalTotalAmount = partialformat.format('0,00.00');

      let formattedAmount = $('#formattedAmount');
      formattedAmount.html('<strong">Php</strong>' + ' ' +
         '<span><strong> ' + finalTotalAmount +
         '</strong></span>');
      // console.log(this.props)
      
      return (
         <>
            <div className="container mt-5 pt-3">
               <div className="rounded" style={{ backgroundColor: "white", padding: "10px" }}>
                  <div style={{ color: "black" }} ref={el => this.printComponent = el}>
                     <table className="thisborder" style={{ fontSize: "70%", width: "100%", fontFamily: "Arial" }}>
                        <thead>
                           <tr>
                              <td className="thisborder" style={{ width: "200px", textAlign: "center" }} rowSpan="4">
                                 <img src={CompanyName2} style={{ height: "50px" }} className="mt-1" />
                              </td>
                              <td className="thisborder" colSpan="9">
                                 <label className="mt-2 pr-5 float-right" style={{ fontSize: "15px" }}>
                                    <strong>ML WALLET BATCH UPLOAD PARTNER'S TRANSACTION REPORT</strong>
                                 </label>
                              </td>
                           </tr>
                           <tr>
                              <td className="thisborder">&nbsp; Date</td>
                              <td colSpan="8" id="karonAdlawa" style={{ paddingLeft: "20px", fontWeight: "bold" }} className="thisborder">{this.state.fn}</td>
                           </tr>
                           <tr>
                              <td style={{ width: "15%" }} className="thisborder">&nbsp; Printed By</td>
                              <td colSpan="8" style={{ paddingLeft: "20px", fontWeight: "bold" }} className="thisborder">{firstname}&nbsp;{lastname}</td>
                           </tr>
                           <tr>
                              <td style={{ width: "15%" }} className="thisborder">&nbsp; Batch Number</td>
                              <td colSpan="8" style={{ paddingLeft: "20px", fontWeight: "bold" }} className="thisborder">{body.ReportsData[0].batchnumber}</td>
                           </tr>
                           <tr>
                              <td colSpan="10" className="thisborder">&nbsp;</td>
                           </tr>
                        </thead>
                     </table>
                     <table className="table thisborder table-sm mb-4" style={{ fontSize: "70%", width: "100%", fontFamily: "Arial" }}>
                        <thead>
                           <tr className="thisborder">
                              <th style={{ textAlign: "center" }}>&nbsp;No</th>
                              <th style={{ width: "12%", textAlign: "center" }}> Date</th>
                              <th style={{ width: "300px", textAlign: "center" }}>Sender&#39;s Name</th>
                              <th style={{ width: "350px", textAlign: "center" }}>KPTN</th>
                              <th style={{ width: "450px", textAlign: "center" }}>Receiver&#39;s Name</th>
                              <th style={{ width: "12%", textAlign: "center" }}>Receiver&#39;s Wallet ID</th>
                              <th style={{ width: "209px", textAlign: "center" }}>Principal</th>
                              <th style={{ width: "80px", textAlign: "center" }}>Status</th>
                           </tr>
                        </thead>
                        <tbody id="ambot">
                           {this.props.body.ReportsData.map((report, index) => {
                              let condition = report.status == 'Failed'
                                 ? 'text-danger' :
                                 report.status == 'ON PROCESS' ? 'text-primary' : 'text-dark';
                              return (
                                 <tr className={`thisborder ` + condition}
                                    key={`${report.transdate}${index}`}
                                    style={{
                                       color: {condition}
                                    }}>

                                    <td style={{ width: '3%', textAlign: 'center' }}>&nbsp;
                                       {report.No}
                                    </td>
                                    <td style={{ width: '5%', textAlign: 'center' }}>
                                       {report.transdate}
                                    </td>
                                    <td style={{ width: '11%', textAlign: 'center' }}>
                                       {firstname}&nbsp;{lastname}
                                    </td>
                                    <td style={{ width: '10%', textAlign: 'center' }}>
                                       {report.kptn}
                                    </td>
                                    <td style={{ width: '11%', textAlign: 'left' }}>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{report.walletname}
                                    </td>
                                    <td style={{ width: '3%', textAlign: 'center' }}>
                                       {report.walletno}
                                    </td>
                                    <td style={{ width: '10%', textAlign: 'center' }}>&nbsp;
                                                    {report.amount}
                                    </td>
                                    <td style={{ width: '5%', textAlign: 'center', fontSize: '9px' }}>
                                       {report.status}
                                    </td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </table>
                     <table className="table table-borderless table-sm mt-2 mb-0">
                        <tbody>
                           <tr className="mb-0">
                              <td width="150px" className="py-0">
                                 <label htmlFor="TotalAmount" style={{ fontSize: "14px", fontWeight: "bold" }}> Total Amount </label>
                              </td>
                              <td style={{ width: "2%" }}>
                                 :
                                        </td>
                              <td className="py-0">
                                 <div className="form-group mb-0">
                                    <div className="input-group">
                                       <p id="formattedAmount" style={{ fontSize: "14px", marginTop: "3px" }}>{body.totalAmount}</p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr className="mb-0">
                              <td className="py-0">
                                 <label htmlFor="TotalCount" style={{ fontSize: "14px", fontWeight: "bold" }}> Total Count </label>
                              </td>
                              <td style={{ width: "2%" }}>
                                 :
                                        </td>
                              <td className="py-0">
                                 <div className="form-group mb-0">
                                    <div className="input-group">
                                       <p style={{ fontSize: "14px", marginTop: "5px" }}>{body.totalCount}</p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr className="mb-0">
                              <td>
                                 <label htmlFor="TotalSuccess" style={{ fontSize: "14px", fontWeight: "bold" }}> Total Success </label>
                              </td>
                              <td style={{ width: "2%" }}>
                                 :
                                        </td>
                              <td className="py-0">
                                 <div className="form-group mb-0">
                                    <div className="input-group">
                                       <p style={{ fontSize: "14px", marginTop: "7px" }}>{body.totalSuccess}</p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr className="mb-0">
                              <td>
                                 <label htmlFor="TotalFailed" style={{ fontSize: "14px", fontWeight: "bold" }}> Total Failed </label>
                              </td>
                              <td style={{ width: "2%" }}>
                                 :
                                        </td>
                              <td className="py-0">
                                 <div className="form-group mb-0">
                                    <div className="input-group">
                                       <p style={{ fontSize: "14px", color: "red", marginTop: "6px" }}>{body.totalFailed}</p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                           <tr className="mb-0">
                              <td>
                                 <label htmlFor="TotalPending" style={{ fontSize: "14px", fontWeight: "bold" }}> Total Pending </label>
                              </td>
                              <td style={{ width: "2%" }}>
                                 :
                                        </td>
                              <td className="py-0">
                                 <div className="form-group mb-0">
                                    <div className="input-group">
                                       <p style={{ fontSize: "14px", color: "blue", marginTop: "7px" }}>{body.totalPending}</p>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <ReactToPrint trigger={() =>
                     <button type="button" id="generate" className="btn btn-primary mt-3 col-md-2 offset-5">
                        <i className="fas fa-print"></i>&nbsp;&nbsp; Print Report</button>}
                     content={() => this.printComponent}
                  />
               </div>
            </div>

         </>
      )
   }
}

export default ReportGen;