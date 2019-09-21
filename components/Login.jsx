import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/login.scss'
import CompanyLogo from '../images/Diamante.png'
import Title from 'react-document-title'
// import Loading from '../components/helper-components/Loading.jsx'
// import { toggleModal } from './helpers/Functions';



class Login extends Component {
   constructor() {
      super();

      this.state = {
         type: 'password',
         username: '',
         password: '',
         showModal: false,
      }

      this.submitHandler = this.submitHandler.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.showHide = this.showHide.bind(this);
   }


   getCurrentState() {
      return this.state;
   }

   componentDidMount() {
      let { history, isAuthenticated } = this.props;

      if (isAuthenticated) {
         const loca = localStorage.getItem('location');
         if (loca) {
            history.push(localStorage.getItem('location'));
         }
         else if (location.pathname == '/') {
            history.push('/mlwalletbatchupload/home')
         }
      }
   }

   componentDidUpdate(prevProps, prevState) {

      if (this.props.isAuthenticated) {
         this.props.history.push('/mlwalletbatchupload/home');
         // console.log(this.props);
      }
   }

   async submitHandler(e) {
      e.preventDefault();
      let { username, password } = this.state;
      var logginIn = bootbox.dialog({
         size: 'small',
         message: '<div class="text-center" style="color: black"><i class="fa fa-spin fa-spinner theme-border"></i>&nbsp; Please Wait...</div>',
         closeButton: false
      }).css({
         'margin-top': '280px',
      });

      $.ajax({
         url: process.env.login,
         method: 'post',
         data: {
            username,
            password
         },
         success: (response, textStatus, jqXHR) => {
            if (response.statusCode === 200) {
               setTimeout(() => {
                  logginIn.modal('hide');
                  let user_details = response.user_details;
                  this.props.handleAuthentication(user_details);
                  console.log(user_details)
               }, 3000)

            }
            else if (response.statusCode === 401) {
               setTimeout(() => {
                  logginIn.modal('hide');
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000)
            }
            else if (response.statusCode === 463) {
               setTimeout(() => {
                  logginIn.modal('hide');
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000)
            }
            else {
               setTimeout(() => {
                  logginIn.modal('hide');
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000)
            }
         },
         error: (error, textStatus, jqXHR) => {
            setTimeout(() => {
               logginIn.modal('hide');
               alertify.set('notifier', 'position', 'top-center');
               alertify.error(
                  '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
               );
            }, 3000)
         },

      })



   }
   showHide(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
         type: this.state.type === 'input' ? 'password' : 'input'
      })
   }

   handleChange(e) {
      let val = e.target.value;
      let name = e.target.name;
      this.setState((prevState, props) => ({
         [name]: val
      }));
   }

   render() {
      return (
         <>
            <Title title="ML Wallet Batch Upload" />
            <div className="container">
               <div className="row">
                  <div className="col" align="center" style={{ marginTop: '180px' }}>
                     <div className="card border-0" style={{ width: '17rem' }}>
                        <div className="card-header theme-color pb-0">
                           <i className="fas fa-key ml-2 mr-1" style={{ fontSize: '14px', color: 'white' }}></i> &nbsp;
                                    <label className="text-center" htmlFor="" style={{ fontSize: '14px', color: 'white' }}>ML Wallet Batch Upload</label>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'black' }}>
                           <div className="col" align="center">
                              <img src={CompanyLogo} className="rounded-circle col-7" style={{ height: '90px', backgroundColor: 'white', padding: '4px' }} className="rounded-circle col-7"></img>
                           </div>
                           <form className="form" onSubmit={this.submitHandler} role="form">
                              <div className="border-0 mb-3 mt-4">
                                 <div className="input-group input-group-sm border-0">
                                    <div className="input-group-prepend border-0">
                                       <span className="input-group-text theme-color" >
                                          <i className="fas fa-user" style={{ color: 'white' }}></i>
                                       </span>
                                    </div>
                                    <input type="text" className="form-control border-0" onChange={this.handleChange}
                                       name="username" id="uname" placeholder="Username" value={this.state.username}></input>
                                 </div>
                              </div>
                              <div className="input-group input-group-sm border-0">
                                 <div className="input-group-prepend border-0">
                                    <span className="input-group-text theme-color" >
                                       <i className="fas fa-lock" style={{ color: 'white' }}></i>
                                    </span>
                                 </div>
                                 <input type={this.state.type} className="form-control border-0" onChange={this.handleChange}
                                    name="password" id="pwd" placeholder="Password" value={this.state.password} />
                                 <div className="input-group-append">
                                    <button className="btn password_show btn-default pointer theme-color" style={{ color: "white" }} type="button" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</button>
                                 </div>
                              </div>
                              <div className="input-group mb-1 mt-4 col">
                                 <button type="submit" className="btn btn-danger ml-2" style={{ width: '180px' }}>
                                    <i className="fas fa-sign-in-alt"></i>&nbsp; Login</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </>
      );
   }
}

export default Login;