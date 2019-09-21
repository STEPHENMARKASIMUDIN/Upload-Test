import {
   Redirect
} from 'react-router-dom'


export const callback = () => {
   setTimeout(() => {
      return <Redirect to="/" />
   }, 5000)
}

export const toggleModal = context => {
   context.setState((prevState, props) => ({
      showModal: !prevState.showModal
   }))
}




export default function () {
   return ({
      isAuthenticated: false,
      showModal: false,
      user_details: null,
      body: null,
      showLogoutModal: false,
   })
}

export const formatWalletNo = (walletNumber) => {
   var rawWalletNumber = walletNumber.replace("(", "").replace(")", "").replace(/-/g, "").replace(/ /g, "");
   if (isNaN(rawWalletNumber)) {
      return null;
   } else {
      return rawWalletNumber.substring(0, 4) + "-" + rawWalletNumber.substring(4, 8) + "-" + rawWalletNumber.substring(8, 12) + "-" + rawWalletNumber.substring(12, 16);
   }
}

export const formatName = (fname = '', mname = '', lname = '') => {
   return !mname ? `${fname} ${lname}` : `${fname} ${mname[0].toUpperCase()}. ${lname}`
}

export const formatBalance = (balance) => {
   var Balance = `${balance}`
   var partialformat = numeral(Balance);
   var finalBalance = partialformat.format('0,00.00');
   return finalBalance;
}



export const pending = () => {
   var date = new Date();
   var month = ("0" + (date.getMonth() + 1)).slice(-2);
   var year = date.getFullYear();
   var day = ("0" + (date.getDate() + 1)).slice(-2);
   var currentHours = ("0" + date.getHours()).slice(-2);
   var seconds = ("0" + date.getSeconds()).slice(-2);
   // var seconds = date.getSeconds();
   var minNumber = 0;
   var maxNumber = 99999

   var randomNumber = randomNumberFromRange(minNumber, maxNumber);

   function randomNumberFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }

   var finalDate = year + '' + month + '' + day + '' + currentHours + '' + seconds + '' + randomNumber;
   console.log('Pending Batchnumber')
   let batch = finalDate
   let batchnumber = batch
   console.log(batchnumber);
   $.ajax({
      url: 'http://localhost:1991/generate',
      method: 'GET',
      dataType: 'json',
      data: {
         batchnumber
      },
      success: (data) => {
         if (data.statusCode === 200) {
            uploading.modal('hide');

            var report = bootbox.dialog({
               title: 'System Message',
               size: 'small',
               closeButton: false,
               message: '<label style="text-align: center">Successfully Uploaded</label>',
               buttons: {
                  ok: {
                     label: 'OK',
                     className: 'btn-primary',
                     callback: () => {
                        report.modal('hide')

                        function callback() {
                           self.props.history.push('/genreport');
                        }

                        let appState = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
                        appState.ReportsData = data.ReportsData;
                        localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(appState));

                        callback();

                     }
                  }
               }

            });
         }
      },
      error: (error) => {
         setTimeout(() => {
            uploading.modal('hide');
            console.log(error)
            alertify.set('notifier', 'position', 'top-center');
            alertify.error(
               '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
            );
         }, 3000)
      }
   })


}