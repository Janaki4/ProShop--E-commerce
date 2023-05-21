import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Image, Form } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { addOrder } from '../Axios/apiCalls';
import Message from '../Components/Message';

const PlaceOrder = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.user)
    // const dispatch = useDispatch()

    // calulation
    const itemsPrice = cartItems.reduce((acc, it) => acc + (it.price * it.qty), 0)
    const shippingCharge = +itemsPrice >= 100 ? 0 : 100
    const tax = 0.15 * +itemsPrice
    const totalPrice = itemsPrice + shippingCharge + tax

    const placeOrderHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        addOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod.paymentMethod,
            itemsPrice,
            taxPrice: tax,
            shippingPrice: shippingCharge,
            totalPrice
        }).then(res => {
            setLoading(false)
            navigate(`/order-details/${res.data._id}`)
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        }).finally(() => {
            loading && setLoading(!loading)
        })
    }

    useEffect(() => {
        if (!userInfo) navigate("/auth/1")
        if (!cartItems.length) navigate("/")
        if (!shippingAddress) navigate("/shipping-address")
        if (!paymentMethod) navigate("/payment")
    }, [cartItems, userInfo, shippingAddress, paymentMethod, navigate])

    if (!cartItems.length) console.log(cartItems.length)

    return (
        <>
            {loading ? <Loader /> : <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:{shippingAddress && `${shippingAddress.address}`} ,{shippingAddress && `${shippingAddress.state}`} , {shippingAddress && `${shippingAddress.country}`}</strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong >Method:    {paymentMethod && paymentMethod.paymentMethod.toUpperCase()} </strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <ListGroup variant='flush'>
                                {cartItems?.map((item) => (
                                    <ListGroup.Item key={item._id} >
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} fluid rounded alt={item.name} />
                                            </Col>
                                            <Col className='m-auto'>
                                                <h6 >
                                                    <Link to={`/product/${item._id}`} style={{ "textDecoration": "none" }}>{item.name}</Link>
                                                </h6>
                                            </Col>
                                            <Col md={4} className='m-auto'>
                                                {item.qty} x ${item.price} = $
                                                {(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>${itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippping Price</Col>
                                    <Col>${shippingCharge.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${tax.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <ListGroup.Item> <Message variant='danger'>{error}</Message> </ListGroup.Item>}

                            <ListGroup.Item>
                                {/* <Link to={"order-details/id"}> */}
                                    <Button
                                        type='submit'
                                        className='w-100'
                                        onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                {/* </Link> */}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}
        </>

    )
}

export default PlaceOrder
