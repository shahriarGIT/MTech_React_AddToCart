
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct, toggleModal } from '../../redux/actionCreators'
import Logo from '../../assets/images/logo1.jpg'

const mapStateToProps = state => {
    return {
        products: state.products,
        loading: state.loading,
        errSts: state.errStatus,
        errMsg: state.errMsg,
        modtalStatus: state.modalOpen,
        cartItems: state.cartItems,
        cartLength: state.cartLength
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: () => dispatch(fetchProduct()),
        toggleModal: () => dispatch(toggleModal()),
    }
}

class Nav extends Component {

    state = {

    }

    componentDidUpdate() {
        console.log("from Nav", this.props.cartItems);
    }


    render() {







        let badge = null;
        if (this.props.cartLength > 0) {
            badge = this.props.cartLength;
        }


        return (

            <nav className='navbar sticky-top navbar-dark bg-dark'>
                <nav class="navbar navbar-light bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">

                            E-Commerce
    </a>
                    </div>

                </nav>
                <div>
                    <button onClick={this.props.toggleModal} className="container nav-link btn btn-danger">View Cart<span style={{ marginLeft: "5px" }} class="badge badge-light">{badge}</span></button>
                </div>









            </nav >
        )

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);