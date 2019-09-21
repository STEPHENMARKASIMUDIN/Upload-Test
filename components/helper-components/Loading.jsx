// import React from 'react';
// import loadingImage from '../../images/ml_loading.gif';

// const LoadingModal = ({ showModal, closeModal }) => {
//     let display = !showModal ? 'd-none' : 'show';
//     return (
//         <>
//             <div className={`modal fade bd-example-modal-lg ` + display} data-backdrop="static" data-keyboard="false" tabIndex="-1"
//                 id="modal-loading" style={{ fontFamily: 'Arial, Helvetica, sans-serif', display: display == 'show' ? 'block' : 'none'}}>
//                 <div className="modal-dialog modal-sm">
//                     <div className="modal-content" style={{ width: '48px' }}>
//                         <span>
//                             <img src={loadingImage} style={{ color: 'white', background: '#e12e2e', height: '100px', width: '100px', borderRadius: '5px' }} />
//                         </span>
//                     </div>
//                 </div>
//             </div>
//             {display == 'show' ? <div className={`modal-backdrop fade show`}
//                 style={{ width: '100%', heigth: '100%', }} onClick={() => { alert(1234) }}>
//             </div> : null}
//         </>
//     )
// };

// export default LoadingModal;