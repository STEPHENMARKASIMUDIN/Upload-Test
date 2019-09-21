import React from 'react'
import '../../styles/login.scss'
import CompanyLogo from '../../images/ic_mlwallet.png';


const GenerateModal = ({ OnCheck, CloseCheck, checkBatch }) => {
    let thisShow = !OnCheck ? ' d-none ' : ' d-block show '

    return (
        <>
            <div className={`modal` + thisShow} style={{marginTop: "100px"}}  role="dialog" tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img src={CompanyLogo} alt="CompanyBrand" height="35" />
                            <h6 className="modal-title pt-1 ml-1" id="modalName" style={{fontWeight: "900"}}>Generate Batch</h6>
                            <button type="button" className="close" onClick={CloseCheck}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body py-4">
                            <form>
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Batch Number</span>
                                    </div>
                                    <input type="text" name="batchNumber" id="batchNumber" className="form-control" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary py-0" type="button" onClick={checkBatch}><i className="fas fa-print"></i>&nbsp;Generate</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                OnCheck ?
                    <div className="modal-backdrop fade show" style={{ height: '100%' }} onClick={CloseCheck} onClick={checkBatch}>
                    </div> : null
            }
        </>
    )
}

export default GenerateModal;