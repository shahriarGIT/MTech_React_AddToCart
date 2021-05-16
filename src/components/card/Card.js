import React, { Component } from 'react';
import { addToCart, removeFromCart } from '../../redux/actionCreators'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        products: state.products,
        loading: state.loading,
        errSts: state.errStatus,
        errMsg: state.errMsg,
        modtalStatus: state.modalOpen,
        cartItems: state.cartItems,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product))
    }

}

class Card extends Component {

    state = {
        count: 1

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

    }

    removeItemAndDecrement = item => {
        this.props.removeFromCart(item);
        this.decrement();

    }

    componentDidUpdate() {


    }

    render() {
        if (this.props.cartItems.length > 0) console.log(this.props.cartItems[0].number);


        const titleStyle = {
            display: "block",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "2em",
            lineHeight: "1em"
        }
        const imgStyle = {
            height: 300,
            objectFit: "fit",
            objectPosition: "0px 0px"
        }

        const btnStyle = {
            display: "flex",

        }

        let countFromStore = 0;
        if (this.props.cartItems.length > 0) {
            let countFromStoreIndex = this.props.cartItems.indexOf(this.props.product);
            if (countFromStoreIndex !== -1) {
                countFromStore = this.props.cartItems[countFromStoreIndex].number;
            }

        }



        let addSubButton = (

            <div style={btnStyle}>
                <button onClick={() => this.removeItemAndDecrement(this.props.product)} style={btnStyle, { textAlign: "center", margin: "auto" }} className="nav-link btn-sm btn btn-danger ">-</button>
                <span style={{ padding: "4%" }}>{countFromStore}</span>
                <button onClick={() => this.addItemAndIncrement(this.props.product)} style={btnStyle, { textAlign: "center", margin: "auto" }} className="nav-link btn btn-sm btn-primary ">+ </button>

            </div>
        )

        let buttonHolder = null;

        if (this.props.cartItems.length > 0) {
            if (this.props.cartItems.indexOf(this.props.product) !== -1) {


                buttonHolder = addSubButton

            }
            else {

                buttonHolder = <button onClick={() => this.props.addToCart(this.props.product)} className="btn btn-primary btn-xs" >Add to Cart</button>
            }

        }
        else {
            buttonHolder = <button onClick={() => this.props.addToCart(this.props.product)} className="btn btn-primary btn-xs" >Add to Cart</button>
        }


        return (
            <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                <div className="card">
                    <img
                        style={{ background: "#000" }}

                        src={`${this.props.product.image}`}
                        alt={this.props.product.title}
                        style={imgStyle}
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <div style={{ minHeight: "3em" }}>
                            <p style={titleStyle}><b> {this.props.product.title}</b></p>
                        </div>

                        <b>Price -</b> <span style={{ fontSize: 20 }}> &#2547;</span> <b> {this.props.product.price}</b>
                        <br />


                        <button style={{ margin: "3%" }} className="btn btn-outline-warning btn-sm">Product Details</button>

                        {buttonHolder}


                    </div>
                </div>
            </div>
        )


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
