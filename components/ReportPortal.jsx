import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../styles/login.scss'
import * as Title from 'react-document-title'
import ReportHeader from './report-components/reportHeader.jsx'
import ReportBody from './report-components/reportBody.jsx'

class Report extends Component {
   constructor(props) {
      super(props);
      this.state = {
       
      }

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
   
   render() {
      let { user_details } = this.props;
      let { username, password } = user_details;
      console.log(username)
      console.log(password)
      return (
         <>
            <Title title="Report" />
            <div className="container" style={{ marginTop: "55px", marginLeft: "75px" }}>
               <div className="row">
                  <div className="col"></div>
                  <div className="col" align="center">
                     <div className="card" style={{ width: "75rem" }}>
                        <ReportHeader />
                        <ReportBody username={username} password ={password}/>
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
}

export default Report;