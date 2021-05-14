import React from 'react';


const Card = ({ product }) => {

    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em"
    }
    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px"
    }
    return (
        <div className="col-md-3 col-sm-4 col-xs-12 mb-3">
            <div className="card">
                <img
                    src={`${product.image}`}
                    alt={product.name}
                    style={imgStyle}
                    className="card-img-top"
                />
                <div className="card-body">
                    <div style={{ minHeight: "3em" }}>
                        <p style={titleStyle}>{product.name}</p>
                    </div>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}


                    <button className="btn btn-outline-warning btn-sm">View Product</button>


                        &nbsp;<button className="btn btn-outline-primary btn-sm" >Add to Cart</button>

                </div>
            </div>
        </div>
    )
}

export default Card;