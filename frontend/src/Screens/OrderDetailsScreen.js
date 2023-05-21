import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Image, Form } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import Message from '../Components/Message';
import { getOrderDetails } from '../Axios/apiCalls';

const OrderDetailsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { id } = useParams()

    const [orderItems, setOrderItems] = useState([])
    const [isDelivered_, setIsDelivered] = useState("")
    const [isPaid_, setIsPaid] = useState("")
    const [paymentMethod_, setPaymentMethod] = useState("")
    const [shippingAddress_, setShippingAddress] = useState({})
    const [taxPrice_, setTaxPrice] = useState("")
    const [totalPrice_, setTotalPrice] = useState("")
    const [shippingPrice_, setShippingPrice] = useState("")
    const [orderId, setOrderId] = useState("")

    useEffect(() => {
        setLoading(true)
        getOrderDetails(id).then((res) => {
            setLoading(false)
            const { orderItems, isDelivered, isPaid,
                paymentMethod, shippingAddress, taxPrice, totalPrice, shippingPrice,
                _id } = res.data
            setOrderItems(orderItems)
            setIsDelivered(isDelivered)
            setIsPaid(isPaid)
            setPaymentMethod(paymentMethod)
            setShippingPrice(shippingPrice)
            setShippingAddress(shippingAddress)
            setTaxPrice(taxPrice)
            setTotalPrice(totalPrice)
            setOrderId(_id)
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        })
    }, [id])

    const paymentHandler = (e) => {
        e.preventDefault()

    }
    return (
        <>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Your Order ID :  {orderId}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: {shippingAddress_.address} , {shippingAddress_.country} , {shippingAddress_.postalCode}</strong>
                            </p>
                        </ListGroup.Item>
                        {isDelivered_ ? <Message variant={"success"}>Delivered</Message> : <Message variant="danger">Not delivered</Message>}
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong >Method:    {paymentMethod_ && paymentMethod_} </strong>
                        </ListGroup.Item>
                        {isPaid_ ? <Message variant={"success"}>Paid</Message> : <Message variant="danger">Not Paid</Message>}
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <ListGroup variant='flush'>
                                {orderItems?.map((item) => (
                                    <ListGroup.Item key={item._id} >
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} fluid rounded alt={item.name} />
                                            </Col>
                                            <Col className='m-auto'>
                                                <h6>
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
                                    <Col>Shippping Price</Col>
                                    <Col>${shippingPrice_}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice_}</Col>
                                </Row>                           </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice_}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='submit'
                                    className='w-100'
                                    onClick={paymentHandler}
                                >
                                    Pay
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </>
    )
}


export default OrderDetailsScreen
