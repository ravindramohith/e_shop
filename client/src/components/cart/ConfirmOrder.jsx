import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { calculateTotalOrderCost } from '../../helpers/helpers';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotalOrderCost(cartItems);

    return (
        <>
            <MetaData title={"Order Confirmation"} />
            <CheckoutSteps shipping confirmOrder />
            <div class="row d-flex justify-content-between">
                <div class="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 class="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phone}</p>
                    <p class="mb-4">
                        <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
                    </p>

                    <hr />
                    <h4 class="mt-4">Your Cart Items:</h4>
                    {cartItems?.map((item, i) => (
                        <>
                            <hr />
                            <div key={i} class="cart-item my-1">
                                <div class="row">
                                    <div class="col-4 col-lg-2">
                                        <img
                                            src={item?.image}
                                            alt="Laptop"
                                            height="45"
                                            width="65"
                                        />
                                    </div>

                                    <div class="col-5 col-lg-6">
                                        <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                    </div>

                                    <div class="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item?.quantity} x Rs.{item?.price} = <b>Rs.{(item?.quantity * item?.price).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}

                </div>

                <div class="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span class="order-summary-values">Rs.{itemsPrice}</span></p>
                        <p>Shipping: <span class="order-summary-values">Rs.{shippingPrice}</span></p>
                        {shippingPrice === 0 && <p style={{ fontSize: "14px" }} className='greenColor'>(Free Delivery on Orders Above Rs.9000)</p>}
                        <p>Tax: <span class="order-summary-values">Rs.{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span class="order-summary-values">Rs.{totalPrice}</span></p>

                        <hr />
                        <Link to="/payment_method" id="checkout_btn" class="btn btn-primary w-100">
                            Proceed to Payment
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder