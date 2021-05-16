import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchProduct, toggleModal } from '../../redux/actionCreators'
import Spinner from '../../utility/spinner/Spinner'
import Card from '../card/Card'
import CartItem from '../Cart/CartItem'
import { Modal, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';


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
        fetchProduct: () => dispatch(fetchProduct()),
        toggleModal: () => dispatch(toggleModal()),
    }
}

class Body extends Component {


    state = {
        addedProduct: [],
        count: 0,
        AlertMsg: null
    }

    componentDidMount() {
        this.props.fetchProduct();

    }




    render() {

        const showAlert = () => {
            this.setState({ AlertMsg: <Alert style={{ margin: "20px" }} color="success">Your order has been placed.</Alert> })

            setTimeout(() => {
                this.setState({ AlertMsg: null })
            }, 2000);
        }


        let productCard = this.props.products.map(product => {
            return (
                <Card
                    product={product}
                    key={product.id}
                    modal={() => this.props.toggleModal()}

                />
            )

        })




        return (
            <div>

                <div className="row" style={{ marginTop: "3%" }}>
                    {this.props.loading ? <Spinner /> : productCard}
                </div>

                <Modal isOpen={this.props.modtalStatus} style={{ marginRight: "5%", padding: "0" }} >


                    <div style={{ display: "flex", width: "100%" }}>

                        <h3 style={{ marginTop: "2%", marginLeft: "35%" }}>Cart Items</h3>
                        <Button style={{ marginLeft: "auto" }} color="btn btn-outline-danger" onClick={this.props.toggleModal}>X </Button>
                    </div>

                    <div>

                        {this.props.cartItems.length > 0 ? this.state.AlertMsg : null}

                    </div>


                    <ModalBody >

                        {<CartItem />}
                    </ModalBody>
                    <ModalFooter >
                        <button style={{ padding: "1% 30%", marginRight: "11%" }} class="btn btn-success btn-lg" onClick={showAlert}> Checkout </button>

                    </ModalFooter>

                    <Button color="btn btn-danger" onClick={this.props.toggleModal}>  Close Cart </Button>
                </Modal>

            </div>


        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);