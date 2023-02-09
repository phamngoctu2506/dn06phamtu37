import React, { Component } from 'react'
import { connect } from 'react-redux'
import { XEM_SV, XOA_SV } from './SV'
export class QLDSSV extends Component {

    state = {
        danhSachSV: this.props.danhSachSV,
        returnState: false
    }

    idSearch = 'hoTen'
    valueTimKiem = 'hoTen'

    static getDerivedStateFromProps(props, state) {
        if (state.returnState) {
            return { ...state }
        }
        else {
            return props
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.danhSachSV === nextProps.danhSachSV && this.state.danhSachSV === nextState.danhSachSV) {
            return false
        }
        else {
            return true;
        }
    }

    renderDSSV = () => {
        return this.state.danhSachSV.map((sv) => {
            return <tr key={sv.maSV}>
                <td>{sv.maSV}</td>
                <td>{sv.hoTen}</td>
                <td>{sv.sdt}</td>
                <td>{sv.email}</td>
                <td>
                    <button onClick={() => {
                        let dsState = this.state.danhSachSV.filter((svState) => {
                            return svState.maSV !== sv.maSV
                        })
                        this.setState({danhSachSV: [...dsState], returnState: true })
                        this.props.dispatch({
                            type: XOA_SV,
                            maSV: sv.maSV
                        })
                    }} className='btn btn-danger'>Xoá</button>
                    <button onClick={() => {
                        this.props.dispatch({
                            type: XEM_SV,
                            sv: {
                                maSV: sv.maSV,
                                hoTen: sv.hoTen,
                                sdt: sv.sdt,
                                email: sv.email
                            },
                            xemState: true,
                            error: {
                                maSV: '',
                                hoTen: '',
                                sdt: '',
                                email: ''
                            }
                        })
                    }} className='btn btn-success'>Xem</button>
                </td>
            </tr>
        })
    }

    timKiem = (value) => {
        let danhSach = this.props.danhSachSV.filter((sv) => {
            return sv[this.idSearch].toLowerCase().includes(value)
        })
        return danhSach
    }

    renderTimKiem = (value) => {
        if (value !== '') {
            let danhSach = this.timKiem(value)
            this.setState({
                danhSachSV: [...danhSach],
                returnState: true
            })
        } else {
            this.setState({
                danhSachSV: [],
                returnState: false
            })
        }
    }

    render() {
        return (
            <div className="danhSachSinhVien">
                <form className="form-inline my-2 my-lg-0">
                    <input onChange={(event) => {
                        this.valueTimKiem = event.target.value
                        this.renderTimKiem(this.valueTimKiem)
                    }} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <select onChange={(event) => {
                        this.idSearch = event.target.value
                        this.renderTimKiem(this.valueTimKiem)
                    }} className="custom-select">
                        <option value='hoTen'>Tìm kiếm theo tên</option>
                        <option value='maSV'>Tìm kiếm theo mã sinh viên</option>
                        <option value='sdt'>Tìm kiếm theo số điện thoại</option>
                        <option value='email'>Tìm kiếm theo email</option>
                    </select>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã SV</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDSSV()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return { danhSachSV: rootReducer.DSSVReducer.danhSachSV }
}

export default connect(mapStateToProps)(QLDSSV)