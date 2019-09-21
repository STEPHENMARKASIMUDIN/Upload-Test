import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import Login from './Login.jsx'
import Auth from './routes/AuthenticationRoute.jsx'
import Report from './ReportPortal.jsx'
import GenerateReport from './ReportGen.jsx'
import Home from './Home.jsx'
import Upload from './Upload.jsx'
import state, { toggleModal } from './helpers/Functions.js'


class App extends Component {
   constructor() {
      super();
      this.state = state()


      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.getCurrentState = this.getCurrentState.bind(this);
      this.authenticateData = this.authenticateData.bind(this);
      this.getUserDetails = this.getUserDetails.bind(this);
      this.setCurrentState = this.setCurrentState.bind(this);
      this.hasStorageData = this.hasStorageData.bind(this);
      this.updateReportsData = this.updateReportsData.bind(this);
      this.Logout = this.Logout.bind(this)

   }

   setCurrentState(state) {
      this.setState((prevState, props) => state,
         () => {
            localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(this.state))
         }
      )
   }

   hasStorageData(user_details, callback) {
      this.setState((prevState, props) => (
         user_details
      ), () => {
         return callback()
      })
   }

   updateReportsData(body, callback) {
      this.setState((prevState, props) => {
         return {
            body
         }
      }, callback)
   }


   componentDidMount() {
      let state = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
      // console.log(state)
      if (state) {
         this.setState(state)
      }
   }

   componentDidUpdate(prevProps, prevState) {
      // console.log(prevProps,prevState)
      let state = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
      // console.log(state)
      if (state) {
         // this.setState(state)
      }
   }

   getUserDetails(user_details) {
      this.setState((prevState, props) => ({
         user_details,
         isAuthenticated: !prevState.isAuthenticated
      }))
   }

   getCurrentState() {
      return this.state;
   }

   handleAuthentication(user_details) {
      // console.log(user_details)
      this.setState((prevState, props) => ({
         user_details,
         isAuthenticated: !prevState.isAuthenticated
      }),
         () => {
            localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(this.state))
            // console.log(this.state)
         })
   }


   authenticateData(state, callback) {
      this.setState((prevState, props) => (
         state
      ), callback)
   }



   Logout(e) {
      var self = this;
      e.preventDefault();
      bootbox.confirm({
         title: "System Message",
         message: "Are you sure you want to Logout ?",
         closeButton: false,
         buttons: {
            confirm: {
               className: 'btn-outline-primary',
               label: '<i class="fa fa-check"></i> Confirm'
            },
            cancel: {
               className: 'btn-outline-danger',
               label: '<i class="fa fa-times"></i> Cancel'
            }
         },
         callback: function (result) {
            if (result === true) {
               var out = bootbox.dialog({
                  message: '<div class="text-center"><i class="theme-border fa fa-spin fa-spinner"></i>&nbsp; Logging out. Please wait </div >',
                  closeButton: false
               });
               setTimeout(() => {
                  out.modal('hide')
                  setTimeout(() => {
                     localStorage.removeItem('mlwalletbatchuploadDatas');
                     self.setState((prevState, props) => (state()),
                        () => { callback(localStorage.getItem('location')) })
                  }, 0);
                  function callback(from) {
                     setTimeout(() => {
                        <Redirect to="/" from={from} />
                        localStorage.removeItem('location');
                     }, 0)
                  }
               }, 3000);
            }
         }
      });
   }
   render() {
      return (
         <BrowserRouter>
            <>
               <Navbar isAuthenticated={this.state.isAuthenticated} onClick={this.Logout} />
               <Switch>
                  <Auth exact path="/"
                     Com={Login}
                     handleAuthentication={this.handleAuthentication}
                     isAuthenticated={this.state.isAuthenticated}
                     getUserDetails={this.getUserDetails}
                     getCurrentState={this.getCurrentState}
                     setCurrentState={this.setCurrentState}

                  />
                  <Auth exact path="/home"

                     isAuth={this.state.isAuthenticated}
                     checkRoute={this.authenticateData}
                     Com={Home}
                     user_details={this.state.user_details}
                     getCurrentState={this.getCurrentState}
                     showModal={this.state.showModal}
                     Logout={this.Logout}
                     setCurrentState={this.setCurrentState}

                  />
                  <Auth path="/upload"
                     isAuth={this.state.isAuthenticated}
                     checkRoute={this.authenticateData}
                     Com={Upload}
                     showModal={this.state.showModal}
                     getCurrentState={this.getCurrentState}
                     Logout={this.Logout}
                     updateReportsData={this.updateReportsData}
                     body={this.state.body}



                  />
                  <Auth path="/genreport"
                     isAuth={this.state.isAuthenticated}
                     checkRoute={this.authenticateData}
                     Com={GenerateReport}
                     user_details={this.state.user_details}
                     showModal={this.state.showModal}
                     getCurrentState={this.getCurrentState}
                     upload_details={this.state.upload_details}
                     Logout={this.Logout}
                     body={this.state.body}

                  />


                  <Auth path="/report"
                     isAuth={this.state.isAuthenticated}
                     checkRoute={this.authenticateData}
                     Com={Report}
                     user_details={this.state.user_details}
                     showModal={this.state.showModal}
                     getCurrentState={this.getCurrentState}
                     upload_details={this.state.upload_details}
                     Logout={this.Logout}
                     body={this.state.body}

                  />
                  <Route></Route>
               </Switch>

            </>
         </BrowserRouter>
      );
   }


}

export default App;