import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as Title from 'react-document-title'
import '../styles/login.scss'
import HomeCardHead from './home-components/CardHeader.jsx'
import HomeCardBody from './home-components/CardBody.jsx'
import HomeCardFooter from './home-components/CardFooter.jsx'
// import Loading from './helper-components/Loading.jsx'
import state, { formatName, formatWalletNo, formatBalance } from './helpers/Functions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = state()
       this.idleTimer = this.idleTimer.bind(this);
    }

   
   idleTimer(){
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
       console.log(this.props)
       localStorage.setItem('location', '/home');
       this.idleTimer()
    }


  
    render() {
        let {user_details, showModal} = this.props;
        let { username, emailaddress, mobileno, walletno, balance, firstname, middlename, lastname } = user_details;
        let fullname = formatName(firstname, middlename, lastname);
      //console.log(user_details);
        var state = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
        return (
            <Title title="Account Details" >
                <div className="container" align="center">
                    <div className="card" style={{width: "22rem" , marginTop: "180px", textAlign: "left"}}>
                        <HomeCardHead username={username} />
                        <HomeCardBody
                            walletno={formatWalletNo(walletno)}
                            emailaddress={emailaddress}
                            mobileno={mobileno}
                            fullname={fullname} />
                        <HomeCardFooter balance={formatBalance(balance)} />
                    </div>
                    {/* <Loading showModal={showModal} /> */}
                </div>
            </Title>
        )
    }

}

export default Home;