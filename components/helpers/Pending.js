export const pending = () => {
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