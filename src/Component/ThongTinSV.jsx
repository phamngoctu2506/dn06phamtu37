import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CAPNHAT_SV, HIENTHI_KQ, SUA_SV, THEM_SV } from './SV';

export class ThongTinSV extends Component {

    chiTietSV = {
        maSV: '',
        hoTen: '',
        sdt: '',
        email: ''
    }

    error = {
        maSV: '',
        hoTen: '',
        sdt: '',
        email: ''
    }

    handleChange = (event) => {
        let { id, value } = event.target;
        this.chiTietSV[id] = value
        this.chiTietSV = {
            ...this.props.chiTietSV,
            [id]: value

        }
        this.props.dispatch({
            type: SUA_SV,
            chiTiet: this.chiTietSV
        })
    }

    handleError = () => {
        for (const property in this.chiTietSV) {
            if (this.chiTietSV[property] === '') {
                let idField = ''
                switch (property) {
                    case 'maSV':
                        idField = 'Mã sinh viên'
                        break;
                    case 'hoTen':
                        idField = 'Họ tên'
                        break;
                    case 'sdt':
                        idField = 'Số điện thoại'
                        break;
                    case 'email':
                        idField = 'Email'
                        break;

                    default:
                        break;
                }
                this.error[property] = `${idField} không được để trống`
            } else {
                this.error[property] = ``
            }
        }
    }

    handleSubmit = (event) => {
        this.chiTietSV = this.props.chiTietSV
        this.handleError();
        event.preventDefault();
        let isError = false;
        for (const errorMessage in this.error) {
            if (this.error[errorMessage] !== '') {
                isError = true;
            }
        }
        if (!isError) {
            let findId = this.props.danhSachSV.find((sv) => {
                return sv.maSV === this.chiTietSV.maSV
            })

            if (findId) {
                this.error['maSV'] = `Mã sinh viên đã tồn tại`
                isError = true;
            } else {
                this.error['maSV'] = ``
            }

        }
        if (isError) {
            this.props.dispatch({
                type: HIENTHI_KQ,
                error: this.error
            })

        } else {
            this.props.dispatch({
                type: THEM_SV,
                chiTiet: this.chiTietSV,
                error: this.error
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.chiTietSV !== nextProps.chiTietSV || this.props.error !== nextProps.error || this.props.xemState !== nextProps.xemState){
            return true
        }
        else{
            return false
        }
    }
   
    render() {
        let { maSV, hoTen, sdt, email } = this.props.chiTietSV
        return (
            <div className="form">
                <div className="form_Title bg-dark">
                    THÔNG TIN SINH VIÊN
                </div>
                <div className="form_Content">
                    <form className='row' onSubmit={this.handleSubmit}>
                        <div className="form-group col-6">
                            <label>Mã SV</label>
                            <input disabled={this.props.xemState} id='maSV' value={maSV} onChange={this.handleChange} type="text" className="form-control" />
                            <p className='notifyError'>{this.props.error.maSV}</p>
                        </div>
                        <div className="form-group col-6">
                            <label>Họ Tên</label>
                            <input id='hoTen' value={hoTen} onChange={this.handleChange} type="text" className="form-control" />
                            <p className='notifyError'>{this.props.error.hoTen}</p>
                        </div>
                        <div className="form-group col-6">
                            <label>Số điện thoại</label>
                            <input id='sdt' value={sdt} onChange={this.handleChange} type="tel" pattern="[0-9]{4-14}" className="form-control" />
                            <p className='notifyError'>{this.props.error.sdt}</p>
                        </div>
                        <div className="form-group col-6">
                            <label>Email</label>
                            <input id='email' value={email} onChange={this.handleChange} type="email" className="form-control" />
                            <p className='notifyError'>{this.props.error.email}</p>
                        </div>
                        <div className="form-group col-6">
                            <button disabled={this.props.xemState} type="submit" className="btn btn-primary mr-3">Thêm sinh viên</button>
                            <button disabled={!this.props.xemState} onClick={() => {
                                this.chiTietSV = { ...this.props.chiTietSV }
                                this.handleError();
                                let isError = false;
                                for (const errorMessage in this.error) {
                                    if (this.error[errorMessage] !== '') {
                                        isError = true;
                                    }
                                }
                                if (isError) {
                                    this.props.dispatch({
                                        type: HIENTHI_KQ,
                                        error: this.error
                                    })

                                } else {      
                                    this.props.dispatch({
                                        type: CAPNHAT_SV,
                                        sv: this.props.chiTietSV,
                                        xemState: false
                                    })
                                }
                            }} type="button" className="btn btn-success">Cập nhật sinh viên</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (rootReducer) => {
    return {
        danhSachSV: rootReducer.DSSVReducer.danhSachSV,
        error: rootReducer.DSSVReducer.error,
        chiTietSV: rootReducer.DSSVReducer.chiTietSV,
        xemState: rootReducer.DSSVReducer.xemState
    }
}

export default connect(mapStateToProps)(ThongTinSV)