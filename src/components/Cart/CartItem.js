import React, { Component } from 'react';
import { fetchProduct, toggleModal, addToCart, removeFromCart } from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

const mapStateToProps = state => {
    return {
        products: state.products,
        loading: state.loading,
        errSts: state.errStatus,
        errMsg: state.errMsg,
        modtalStatus: state.modalOpen,
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product))
    }

}

class CartItem extends Component {

    state = {
        count: 1,
        total: 0

    }

    increment = () => {
        if (this.state.count === 5) return
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement = () => {
        if (this.state.count === 0) {
            this.setState({ count: 1 })
        }
        else {
            this.setState({
                count: this.state.count - 1
            })
        }

    }

    addItemAndIncrement = item => {

        this.props.addToCart(item);
        this.increment();
        //console.log(this.props.cartItems[0].id, " ", this.props.cartItems[0].number);

    }

    removeItemAndDecrement = item => {
        this.props.removeFromCart(item);
        this.decrement();
        //console.log(this.props.cartItems[0].id, " ", this.props.cartItems[0].number);

        //console.log(this.props.cartItems.length);
    }

    render() {

        const cartItemStyle = {
            display: "flex"
        }

        const btnStyle = {
            display: "flex",

        }






        let allCartItem = null;
        let totalAmount = 0;
        allCartItem = this.props.cartItems.map(item => {


            totalAmount = totalAmount + item.price * item.number;

            let countFromStore = 0;
            if (this.props.cartItems.length > 0) {
                let countFromStoreIndex = this.props.cartItems.indexOf(item);
                if (countFromStoreIndex !== -1) {
                    countFromStore = this.props.cartItems[countFromStoreIndex].number;
                }

            }

            let addSubButton = (

                <div style={btnStyle}>
                    <button onClick={() => this.removeItemAndDecrement(item)} style={btnStyle, { textAlign: "center", margin: "auto", padding: "5px 5px" }} className="nav-link btn-xs btn btn-danger ">-</button>
                    <span style={{ padding: "50% 20%" }}>{countFromStore}</span>
                    <button onClick={() => this.addItemAndIncrement(item)} style={btnStyle, { textAlign: "center", margin: "auto", padding: "5px 5px" }} className="nav-link btn btn-xs btn-primary ">+ </button>

                </div>
            )
            return (


                <div>

                    <div style={cartItemStyle, { margin: "3%" }}>

                        <hr />
                        <div style={cartItemStyle}>
                            <p style={cartItemStyle}> <b>{item.title}</b> </p>
                            <button className="nav-link btn-sm btn btn-danger" style={btnStyle, { marginLeft: "auto", padding: "1% 2%", height: "30px" }}>x</button>
                        </div>

                        <div style={cartItemStyle}>

                            <img
                                src={`${item.image}`}
                                alt={item.title}
                                style={cartItemStyle, { width: "40px", marginRight: "5%" }}
                                className="card-img-top"
                            />
                            {addSubButton}
                            <p style={cartItemStyle, { marginLeft: "auto", marginTop: "3%" }} > <b>Subtotal - {item.price} x {item.number} = {item.price * item.number} </b> </p>



                        </div>

                        <hr />
                    </div>





                </div>
            )
        })

        let AlertMsg = <Alert style={{ margin: "20px" }} color="danger">Cart Empty</Alert>


        return (
            <div >
                {allCartItem.length === 0 ? AlertMsg : allCartItem}
                {allCartItem.length === 0 ? null :
                    <p className="container" style={{ marginRight: "10px" }}> <b>Total Amount : {totalAmount.toFixed(2)} Tk</b></p>
                }

            </div>
        )


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);



