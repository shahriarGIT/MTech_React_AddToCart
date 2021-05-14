import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchProduct } from '../../redux/actionCreators'
import Spinner from '../../utility/spinner/Spinner'
import Card from '../card/Card'


const mapStateToProps = state => {
    return {
        products: state.products,
        loading: state.loading,
        errSts: state.errStatus,
        errMsg: state.errMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: () => dispatch(fetchProduct()),
    }
}

class Body extends Component {


    state = {

    }

    componentDidMount() {
        this.props.fetchProduct();

        //console.log(this.props.products);
    }

    componentDidUpdate() {
        console.log(this.props.products);
    }





    render() {


        let productCard = this.props.products.map(product => {
            return (
                <Card product={product} key={Math.random()}
                />
            )

        })




        return (

            <div className="row" style={{ marginTop: "3%" }}>
                { this.props.loading ? <Spinner /> : productCard}
            </div>

        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);