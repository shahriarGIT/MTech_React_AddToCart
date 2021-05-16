import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchProduct, toggleModal } from '../../redux/actionCreators'
import Spinner from '../../utility/spinner/Spinner'
import Card from '../card/Card'
import CartItem from '../Cart/CartItem'
import { CardColumns, Modal, ModalBody, ModalFooter, Button, ModalHeader } from 'reactstrap';


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
        count: 0
    }

    componentDidMount() {
        this.props.fetchProduct();

        //console.log(this.props.products);
    }

    componentDidUpdate() {
        //console.log(this.props.products);
        //this.props.fetchProduct();
    }





    render() {


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
                        <Button style={{ marginLeft: "auto" }} color="btn btn-outline-danger" onClick={this.props.toggleModal}>
                            X
                             </Button>
                    </div>




                    <ModalBody >

                        {<CartItem />}
                    </ModalBody>

                    {/* < CommentForm item={this.state.selectedImage} /> */}
                    <Button color="btn btn-outline-danger" onClick={this.props.toggleModal}>
                        Close Cart
                    </Button>
                </Modal>

            </div>


        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);