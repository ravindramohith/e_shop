import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart)

    return (
        <>
            <MetaData title="Your Cart" />
            {cartItems?.length > 0 ?
                <>
                    <h2 className="mt-5">Your Cart: <b>{cartItems?.length} item{cartItems?.length > 1 ? "s" : ""}</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems?.map((item, i) => (
                                <>
                                    <hr />
                                    <div className="cart-item" data-key="product1">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item?.image}
                                                    alt="Laptop"
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item?.product}`}> {item?.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">Rs.{item?.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus"> - </span>
                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={item?.quantity}
                                                        readonly
                                                    />
                                                    <span className="btn btn-primary plus"> + </span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            ))}


                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">8 (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">$1499.97</span></p>
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary w-100">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                : <h2 className='mt-5'>Your Cart is Empty</h2>
            }
        </>
    )
}

export default Cart