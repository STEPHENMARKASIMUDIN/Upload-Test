import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../styles/login.scss'
import * as Title from 'react-document-title'
// import { toggleModal, checkbatch, pending} from './helpers/Functions';
import CheckBatch from './helper-components/generate.jsx'


var date = new Date();
var month = ("0" + (date.getMonth() + 1)).slice(-2);
var year = date.getFullYear();
var day = ("0" + (date.getDate() + 1)).slice(-2);
var currentHours = ("0" + date.getHours()).slice(-2);
var seconds = ("0" + date.getSeconds()).slice(-2);
var minNumber = 0;
var maxNumber = 99999

var randomNumber = randomNumberFromRange(minNumber, maxNumber);

function randomNumberFromRange(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

var finalDate = year + '' + month + '' + day + '' + currentHours + '' + seconds + '' + randomNumber;

class Upload extends Component {
   constructor(props) {
      super(props);
      this.state = {
         seconds: 0,
         value: '',
         showModal: false,
         OnCheck: false,
      }
      this.handleClick = this.handleClick.bind(this)
      this.uploadHandler = this.uploadHandler.bind(this);
      this.reload = this.reload.bind(this);
      this.onChange = this.onChange.bind(this)
      this.batchnumberCheck = this.batchnumberCheck.bind(this)
      this.CloseCheck = this.CloseCheck.bind(this)
      this.checkBatch = this.checkBatch.bind(this)
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

   checkBatch() {
      const self = this;
      console.log('Checking Batch Number')
      var generate = bootbox.dialog({
         message: '<div class="text-center"><i class="theme-border fa fa-spin fa-spinner"></i>&nbsp; Please wait while Checking Batchnumber Status ...</div >',
         closeButton: false
      });
      let user = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
      let checkBatch = $('#batchNumber').val();
      console.log(checkBatch)
      console.log(user.user_details.username)
      $.ajax({
         url: process.env.checkProcess,
         method: 'GET',
         dataType: 'json',
         data: {
            batchnumber: checkBatch,
            operatorName: user.user_details.username
         },
         success: (response, textStatus, jqXHR) => {
            if (response.statusCode === 200) {
               let processedBatch = $('#batchNumber').val();
               let user = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
               // console.log(processedBatch)
               $.ajax({
                  url: process.env.DoneProcess,
                  method: 'GET',
                  dataType: 'json',
                  data: {
                     batchnumber: processedBatch,
                     operatorName: user.user_details.username
                  },
                  success: (response, textStatus, jqXHR) => {
                     if (response.statusCode === 200) {
                        setTimeout(() => {
                           generate.modal('hide')
                           function callback() {
                              self.
                                 props.
                                 history.
                                 push('/genreport');
                           }

                           let appState = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
                           appState.body = response.body;
                           localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(appState));
                           self.props.updateReportsData(response.body, callback);
                        }, 3000)
                     }
                     else if (response.statusCode === 404) {
                        setTimeout(() => {
                           generate.modal('hide')
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                           );
                        }, 3000);
                     }
                     else if (response.statusCode === 463) {
                        setTimeout(() => {
                           generate.modal('hide')
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                           );
                        }, 3000);
                     }
                     else if (response.statusCode === 400) {
                        setTimeout(() => {
                           generate.modal('hide')
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                           );
                        }, 3000);
                     } else {
                        setTimeout(() => {
                           generate.modal('hide')
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                           );
                        }, 3000)
                     }
                  },
                  error: (error) => {
                     setTimeout(() => {
                        generate.modal('hide')
                        alertify.set('notifier', 'position', 'top-center');
                        alertify.error(
                           '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                        );
                     }, 3000)
                  }
               })
            }
            else if (response.statusCode === 401) {
               setTimeout(() => {
                  generate.modal('hide')
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000);
            }
            else if (response.statusCode === 1) {
               setTimeout(() => {
                  generate.modal('hide')
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000);
            }
            else if (response.statusCode === 404) {
               setTimeout(() => {
                  generate.modal('hide')
                  alertify.set('notifier', 'position', 'top-center');
                  alertify.error(
                     '<label style="color: #ffff; text-align: center">' + response.statusMessage + '</label>'
                  );
               }, 3000);
            }
            else {
               setTimeout(() => {
                           generate.modal('hide')
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                           );
                        }, 3000)
            }
         },
         error: (error) => {
            setTimeout(() => {
               generate.modal('hide')
               alertify.set('notifier', 'position', 'top-center');
               alertify.error(
                  '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
               );
            }, 3000)
         }
      })
   }

   handleClick() {
      document.getElementById('csvfile').click()
      $('#csvfile').change(() => {
         var a = $('#csvfile').val().toString().split('\\');
         $('#filename').val(a[a.length - 1]);

      });
   }

   componentDidUpdate(prevProps, prevState) {

      if (this.props.isAuthenticated) {
         this.props.history.push('/genreport');
         // console.log(this.props);
      }
      this.idleTimer()
   }
   getCurrentState() {
      return this.state;
   }

   componentDidMount() {
      localStorage.setItem('location', '/upload');
   }

   onChange(e) {
      const re = /^[0-9\b]+$/;
      if (e.target.value == '' || re.test(e.target.value)) {
         this.setState({ value: e.target.value })
      }
   }

   batchnumberCheck() {
      this.setState({ OnCheck: true })

   }

   CloseCheck() {
      this.setState({ OnCheck: false })
   }
   reload() {
      location.reload()

   }

   async uploadHandler(e) {
      e.preventDefault();
      const self = this;
      var user_details = this.props.getCurrentState().user_details;
      var numRows = $('#totalRows').val();
      var totalAmount = $('#totalAmount').val();
      var filename = $('#filename').val();
      
      var uploading = bootbox.dialog({
         message: '<div class="text-center"><i class="theme-border fa fa-spin fa-spinner"></i>&nbsp; Please wait while Uploading ...</div >',
         closeButton: false
      });
      if (!filename || filename == undefined) {
         setTimeout(() => {
            
            uploading.modal('hide');
            alertify.set('notifier', 'position', 'top-center');
            alertify.error(
               '<label style="color: #ffff; text-align: center">Please click the browse and choose a filename you want to upload.</label>'
            );
         }, 3000)
      }
      else if (!numRows || numRows == undefined) {
         setTimeout(() => {
            
            uploading.modal('hide');
            alertify.set('notifier', 'position', 'top-center');
            alertify.error(
               '<label style="color: #ffff; text-align: center">Please input the total number of rows of the uploaded file and try again.</label>'
            );
         }, 3000)
      }
      else if (!totalAmount || totalAmount == undefined) {
         setTimeout(() => {
            
            uploading.modal('hide');
            alertify.set('notifier', 'position', 'top-center');
            alertify.error(
               '<label style="color: #ffff; text-align: center">Please input the total amount of the uploaded file and try again.</label>'
            );
         }, 3000)
      }
      else {

         $('#csvbody').empty();
         let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
         if (regex.test($('#csvfile').val().toLowerCase())) {
            if (typeof (FileReader) !== "undefined") {
               var reader = new FileReader();
               reader.onload = (e) => {
                  var table = $('#csvtable > tbody');
                  var csvrows = e.target.result.split('\n');
                  for (var i = 1; i < csvrows.length; i++) {

                     if (csvrows[i] != '') {
                        var row = '<tr>';
                        var csvcols = csvrows[i].split(',');
                        //Looping through each cell in a csv row
                        for (var j = 0; j < csvcols.length; j++) {
                           var cols = "<td>" + csvcols[j] + "</td>";
                           row += cols;
                        }
                        row += '</tr>';
                        table.append(row);
                     }
                  }
                  var dispRows = $('#TotalNumRows');
                  var countRows = $('#csvtable td').closest('tr').length;
                  dispRows.html(countRows)
                  var totalamount = $('#TotalAmount');
                  var thisBatch = $('#Batchnumber');
                  let batch = finalDate
                  thisBatch.html(batch);
                  var currentRow = $('tbody#csvbody tr');
                  var dispTotalCharge = $('#TotalCharge');
                  var dispGrandTotal = $('#GrandTotal');
                  let datas = [];
                  let total = 0;

                  currentRow.each((i, el) => {
                     datas.push({
                        walletno: $(el).find('td:eq(1)').text(),
                        firstname: $(el).find('td:eq(2)').text(),
                        lastname: $(el).find('td:eq(3)').text(),
                        amount: parseFloat($(el).find('td:eq(4)').text()),
                     })
                     total += parseFloat($(el).find('td:eq(4)').text());
                  });
                  var partialformat = numeral(total);
                  var finalFormat = partialformat.format('0,00.00');

                  totalamount.html('<strong>Php</strong>' + ' ' + finalFormat);

                  let { filename = $('#filename').val(), senderWalletno = user_details.walletno, balance = user_details.balance, firstname = user_details.firstname,
                     lastname = user_details.lastname, operatorName = user_details.username, batchnumber = batch, uploadDetails = JSON.stringify(datas) } = this.state;

                  $('tbody#csvbody').hide();
                  dispRows.hide();
                  totalamount.hide();
                  thisBatch.hide();
                  dispTotalCharge.hide()
                  dispGrandTotal.hide()
                  var isReupload = 0;
                  
                  $.ajax({
                     url: process.env.upload,
                     method: 'POST',
                     dataType: 'json',
                     data: {
                        
                        filename,
                        senderWalletno,
                        balance,
                        firstname,
                        lastname,
                        parRows: countRows,
                        totalRows: numRows,
                        amount: total,
                        operatorName,
                        totalAmount: totalAmount,
                        batchnumber,
                        uploadDetails,
                        isReupload,


                     },
                     success: (response, textStatus, jqXHR) => {
                        console.log(uploadDetails)
                        if (response.statusCode === 200) {
                           // console.log(response.totalCharge)
                           var ChargeTotal = response.totalCharge;
                           var partialformat = numeral(ChargeTotal);
                           var finalChargeTotal = partialformat.format('0,00.00');
                           let totalGrand = parseFloat(total) + parseFloat(response.totalCharge);
                           var TotalGrand = totalGrand;
                           var partialformat = numeral(TotalGrand);
                           var finalTotalGrand = partialformat.format('0,00.00');

                           setTimeout(() => {
                              
                              let batchnumber = batch
                              
                              
                              $.ajax({
                                 url: process.env.generate,
                                 method: 'GET',
                                 dataType: 'json',
                                 data: {
                                    batchnumber,
                                    operatorName
                                 },
                                 success: (response, textStatus, jqXHR) => {
                                    if (response.statusCode === 200) {
                                       // console.log(response)
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
                                                      self.
                                                         props.
                                                         history.
                                                         push('/genreport');
                                                   }

                                                   let appState = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
                                                   appState.body = response.body;
                                                   localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(appState));
                                                   self.props.updateReportsData(response.body, callback);
                                                   
                                                }
                                             }
                                          }

                                       });
                                       
                                    }
                                 },
                                 error: (error) => {
                                    setTimeout(() => {
                                       uploading.modal('hide');
                                       alertify.set('notifier', 'position', 'top-center');
                                       alertify.error(
                                          '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                                       );
                                    }, 3000)
                                 }
                              })
                              $('tbody#csvbody').show();
                              dispTotalCharge.html('<strong>Php</strong>' + ' ' +
                                 '<span> ' + finalChargeTotal + '</span>');

                              dispGrandTotal.html('<strong">Php</strong>' + ' ' +
                                 '<span><strong> ' + finalTotalGrand +
                                 '</strong></span>');

                              dispRows.show();
                              totalamount.show();
                              thisBatch.show();
                              dispTotalCharge.show()
                              dispGrandTotal.show();
                           }, 3000);
                        }
                        else if (response.statusCode === 1) {
                           setTimeout(() => {
                              // toggleModal(this)
                              uploading.modal('hide');
                              bootbox.alert({
                                 title: 'System Message',
                                 message: response.statusMessage,
                                 closeButton: false
                              });
                           }, 3000);
                        }
                        else if (response.statusCode === 400) {
                           setTimeout(() => {
                              // toggleModal(this)
                              uploading.modal('hide');
                              bootbox.alert({
                                 title: 'System Message',
                                 message: response.statusMessage,
                                 closeButton: false
                              });
                           }, 3000);
                        }
                        else if (response.statusCode === 441) {
                           
                           setTimeout(() => {
                              uploading.modal('hide')
                              var verify = bootbox.dialog({
                                 title: 'System Message',
                                 size: 'small',
                                 closeButton: false,
                                 message: '<label style="text-align: center">' + response.statusMessage + '</label>',
                                 buttons: {

                                    cancel: {
                                       label: 'Cancel',
                                       className: 'btn-danger',
                                       callback: () => {
                                          verify.modal('hide')
                                          isReupload = 0;
                                       }
                                    },
                                    confirm: {
                                       label: 'Confirm',
                                       className: 'btn-primary',
                                       callback: () => {
                                          
                                          setTimeout(() => {
                                             verify.modal('hide')
                                             var reuploading = bootbox.dialog({
                                                message: '<div class="text-center"><i class="theme-border fa fa-spin fa-spinner"></i>&nbsp; Please wait while Uploading ...</div >',
                                                closeButton: false
                                             });
                                             isReupload = 1;
                                             $.ajax({
                                                url: process.env.upload,
                                                method: 'POST',
                                                dataType: 'json',
                                                data: {
                                                   filename,
                                                   senderWalletno,
                                                   balance,
                                                   firstname,
                                                   lastname,
                                                   parRows: countRows,
                                                   totalRows: numRows,
                                                   amount: total,
                                                   operatorName,
                                                   totalAmount: totalAmount,
                                                   batchnumber,
                                                   uploadDetails,
                                                   isReupload,
                                                },
                                                success: (response, textStatus, jqXHR) => {
                                                   if (response.statusCode === 200) {
                                                      setTimeout(() => {
                                                         var ChargeTotal = response.totalCharge;
                                                         var partialformat = numeral(ChargeTotal);
                                                         var finalChargeTotal = partialformat.format('0,00.00');
                                                         let totalGrand = parseFloat(total) + parseFloat(response.totalCharge);
                                                         // console.log(totalGrand)
                                                         var TotalGrand = totalGrand;
                                                         var partialformat = numeral(TotalGrand);
                                                         var finalTotalGrand = partialformat.format('0,00.00');
                                             
                                                         $.ajax({
                                                            url: process.env.generate,
                                                            method: 'GET',
                                                            dataType: 'json',
                                                            data: {
                                                               batchnumber,
                                                               operatorName
                                                            },
                                                            success: (response, textStatus, jqXHR) => {
                                                               if (response.statusCode === 200) {
                                                                  // console.log(response)
                                                                  reuploading.modal('hide');
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
                                                                              appState.body = response.body;
                                                                              localStorage.setItem('mlwalletbatchuploadDatas', JSON.stringify(appState));
                                                                              self.props.updateReportsData(response.body, callback);

                                                                           }
                                                                        }
                                                                     }

                                                                  });
                                                                  $('tbody#csvbody').show();
                                                                  dispTotalCharge.html('<strong>Php</strong>' + ' ' +
                                                                     '<span> ' + finalChargeTotal + '</span>');

                                                                  dispGrandTotal.html('<strong">Php</strong>' + ' ' +
                                                                     '<span><strong> ' + finalTotalGrand +
                                                                     '</strong></span>');

                                                                  dispRows.show();
                                                                  totalamount.show();
                                                                  thisBatch.show();
                                                                  dispTotalCharge.show()
                                                                  dispGrandTotal.show();
                                                               }
                                                            },
                                                            error: (error) => {
                                                               setTimeout(() => {
                                                                  reuploading.modal('hide');
                                                                  alertify.set('notifier', 'position', 'top-center');
                                                                  alertify.error(
                                                                     '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                                                                  );
                                                               }, 3000)
                                                            }
                                                         })
                                                      }, 3000)
                                                      
                                                   }
                                                },
                                                error: (error, textStatus, jqXHR) => {
                                                   reuploading.modal('hide');
                                                   setTimeout(() => {
                                                      uploading.modal('hide');
                                                      alertify.set('notifier', 'position', 'top-center');
                                                      alertify.error(
                                                         '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                                                      );
                                                   }, 3000)
                                                }
                                             })
                                          }, 3000)
                                          
                                       }
                                    }
                                 }

                              });
                           }, 3000)
                        }
                        else if (response.statusCode === 409) {
                           setTimeout(() => {
                              uploading.modal('hide');
                              bootbox.alert({
                                 size: 'small',
                                 title: 'System Message',
                                 message: response.statusMessage,
                                 closeButton: false
                              });
                           }, 3000);
                        }
                        else {
                           setTimeout(() => {
                              uploading.modal('hide');
                              alertify.set('notifier', 'position', 'top-center');
                              alertify.error(
                                 '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                              );
                           }, 3000)
                        }
                     },
                     error: (error, textStatus, jqXHR) => {
                        uploading.modal('hide');
                        setTimeout(() => {
                           uploading.modal('hide');
                           alertify.set('notifier', 'position', 'top-center');
                           alertify.error(
                              '<label style="color: #ffff; text-align: center">Unable to process request. Please try again later</label>'
                           );
                        }, 3000)
                     }

                  })

               }
               reader.readAsText($('#csvfile')[0].files[0], 'ISO-8859-1');
            }
         }

      }


   }

   render() {
      var state = JSON.parse(localStorage.getItem('mlwalletbatchuploadDatas'));
      return (
         <>
            <Title title="Upload" />
            <div className="container" align="center">
               <div className="card" style={{ width: "60rem", marginTop: "95px", textAlign: "left" }}>
                  <div className="card-header theme-color py-1" style={{ height: "45px" }}>
                     <table className="table table-borderless table-sm mb-0">
                        <tbody>
                           <tr>
                              <td style={{ width: "50%" }}>
                                 <button className="btn btn-dark" id="newfile"
                                    onClick={this.reload} style={{ fontSize: "14px", fontWeight: "bold", height: "2.3em" }}>
                                    <i className="far fa-file"></i>&nbsp; New</button>&nbsp;
                                            <button type="button" className="btn btn-dark" onClick={this.batchnumberCheck} id="generate"
                                    style={{ fontSize: "14px", fontWeight: "bold", height: "2.3em" }}>
                                    <i className="fas fa-file-pdf"></i>&nbsp; Generate Report</button>
                              </td>
                              <td className="float-right" style={{ marginLeft: "150px" }}>
                                 <label htmlFor="Batchnumber" className="mt-1" style={{ color: "white", fontSize: "15px", fontWeight: "bold", height: "2.3em" }}>Batch Number : </label>
                              </td>
                              <td className="ml-0">
                                 <p id="Batchnumber" style={{ color: "white", fontSize: "15px", fontWeight: "bold", height: "2.3em", marginTop: "5px", marginLeft: "15px" }} ></p>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="card-body mb-0 py-0 px-2" style={{ color: "black" }}>
                     <form id="UploadForm" className="form" encType="multipart/form-data" onSubmit={this.uploadHandler} acceptCharset="UTF-8" >
                        <div style={{ marginLeft: "170px" }}>
                           <label className="note1 pl-3 ml-4">Note: Please avoid uploading the same filename with the same record.</label>
                        </div>

                        <table className="table table-borderless mb-0 table-sm">
                           <tbody>
                              <tr className="mb-0">
                                 <td>
                                    <label htmlFor="filename" style={{ fontSize: "15px", fontWeight: "bold" }}>Filename
                                                    <span className="text-danger">*</span>
                                    </label>
                                 </td>
                                 <td>
                                    <div className="input-group input-group-sm mb-0">
                                       <input type="file" id="csvfile" accept={'.csv'} />
                                       <input type="text" className="form-control mb-0"
                                          name="filename" id="filename" style={{ height: "2em" }} readOnly={true} ></input>
                                       <div className="input-group-append" style={{ height: "2em" }}>
                                          <button type="button" style={{ fontSize: "14px", fontWeight: "bold", height: "2em", color: "white" }}
                                             onClick={this.handleClick} className="btn theme-color pointer">
                                             <i className="fas fa-search"></i>&nbsp;Browse
                                                        </button>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label htmlFor="totalRows" style={{ fontSize: "15px", fontWeight: "bold" }}>Number of Rows
                                                    <span className="text-danger">*</span>
                                    </label>
                                 </td>
                                 <td>
                                    <div className="form-group mb-0">
                                       <div className="input-group">
                                          <input type="text" name="" value={this.state.value} onChange={this.onChange} id="totalRows" className="form-control form-control-sm" style={{ marginRight: "400px", fontSize: "14px", height: "2em", textAlign: "right" }} />
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label htmlFor="totalAmount" style={{ fontSize: "15px", fontWeight: "bold" }}>Total Amount
                                                    <span className="text-danger">*</span>
                                    </label>
                                 </td>
                                 <td>
                                    <div className="form-group mb-0">
                                       <div className="input-group">
                                          <div className="input-group-prepend  input-group-sm border-0">
                                             <span className="input-group-text theme-color py-0" style={{ color: "white" }}>
                                                ₱
                                                            </span>
                                          </div>
                                          <input type="text" name="" id="totalAmount" className="form-control" style={{ marginRight: "400px", fontSize: "14px", height: "2em", textAlign: "right" }} />
                                       </div>
                                    </div>
                                 </td>
                                 <td>
                                    <button type="submit" style={{ fontSize: "14px", fontWeight: "bold", height: "2.3em"}} className="btn btn-info btn-upload mt-0" id="btnUpload">
                                       <i className="fas fa-file-upload">&nbsp; Upload</i>
                                    </button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <div className="table-sm subraData">
                           <table className="table table-sm responsive-table table-bordered table-striped" id="csvtable">
                              <thead className="table-default table-borderless text-center">
                                 <tr>
                                    <th scope="col" style={{ fontSize: "14px", fontWeight: "bold", height: "1em" }}>No</th>
                                    <th scope="col" style={{ fontSize: "14px", fontWeight: "bold", height: "1em" }}>Wallet ID</th>
                                    <th scope="col" style={{ fontSize: "14px", fontWeight: "bold", height: "1em" }}>First Name</th>
                                    <th scope="col" style={{ fontSize: "14px", fontWeight: "bold", height: "1em" }}>Last Name</th>
                                    <th scope="col" style={{ fontSize: "14px", fontWeight: "bold", height: "1em" }}>Amount</th>
                                 </tr>
                              </thead>
                              <tbody id="csvbody"></tbody>
                           </table>
                        </div>
                        <table className="table table-borderless table-sm">
                           <tbody>
                              <tr className="mb-0 pb-0">
                                 <td style={{ width: "200px" }} className="mb-0 pb-0">
                                    <label htmlFor="TotalNumRows" style={{ fontSize: "14px", fontWeight: "bold" }}>Total Number of Rows:</label>
                                 </td>
                                 <td className="mb-0 pb-0">
                                    <div className="form-group mb-0 pb-0">
                                       <div className="input-group">
                                          <div id="thisRows">
                                             <p id="TotalNumRows" style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "2px" }}></p>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr className="mb-0">
                                 <td>
                                    <label htmlFor="TotalAmount" style={{ fontSize: "14px", fontWeight: "bold" }}>Total Amount:</label>
                                 </td>
                                 <td>
                                    <div className="form-group mb-0">
                                       <div className="input-group">
                                          <p className="note2" id="TotalAmount" style={{ fontSize: "14px" }}></p>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr className="mb-0">
                                 <td>
                                    <label htmlFor="TotalCharge" style={{ fontSize: "14px", fontWeight: "bold" }}>Total Charge:</label>
                                 </td>
                                 <td>
                                    <div className="form-group mb-0">
                                       <div className="input-group">
                                          <p className="note2" id="TotalCharge" style={{ fontSize: "14px" }}></p>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr className="mb-0">
                                 <td>
                                    <label htmlFor="GrandTotal" style={{ fontSize: "14px", fontWeight: "bold" }}>Grand Total:</label>
                                 </td>
                                 <td>
                                    <div className="form-group mb-0">
                                       <div className="input-group">
                                          <p className="note2" id="GrandTotal" style={{ fontSize: "14px" }}></p>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </form>
                  </div>
               </div>
            </div>
            {/* <Loading showModal={this.state.showModal} /> */}
            <CheckBatch OnCheck={this.state.OnCheck} CloseCheck={this.CloseCheck} checkBatch={this.checkBatch} />

         </>
      )
   }
}

export default Upload;