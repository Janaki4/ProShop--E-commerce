import React from 'react'
import {
    Card, Container, Row, Col, ListGroup, Form, Button,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart, deleteCartItem } from '../Store'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cartItems } = useSelector(state => {
        return state.cart
    })
    const dispatch = useDispatch()

    const editQuantityHandler = (e, quantity, product) => {
        const prodObj = Object.assign({}, product);
        let qnty = +e.target.value
        let diffQty = Math.abs(+quantity - qnty)
        if (qnty >= quantity) {
            prodObj.qty = diffQty
            dispatch(addItemToCart(prodObj))
        }
        else {
            prodObj.qty = -diffQty
            dispatch(addItemToCart(prodObj))
        }
    }
    const removeItemHandler = (id) => {
        dispatch(deleteCartItem(id))
    }

    const EmptyCart = () => {
        return (
            <Container className='text-center my-3'>
                <h4 >Cart is Empty.</h4>
                <Link to={"/"}>
                    <Button >
                        Back
                    </Button>
                </Link>
            </Container>
        )
    }
    return (
        <Container className='m-auto'>
            <Row>
                {cartItems.length === 0 ? <EmptyCart /> : cartItems.map(product => {
                    return <Row key={product._id} className='my-2 p-2 border' >
                        <Col md={2}><Card.Img src={`${product.image}`} alt={`${product.name}`} /></Col>
                        <Col className='m-auto'>
                            <h5>{product.name}</h5>
                        </Col>
                        <Col md={2} className='m-auto'>
                            Quantity <span className='font-lg'>{product.qty}</span>
                            <Form.Control as="select" onChange={e => editQuantityHandler(e, product.qty, product)}>
                                {
                                    [...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>)
                                }
                            </Form.Control>
                        </Col>
                        <Col className='m-auto' style={{ "maxWidth": "max-content", "margin": "auto" }}>
                            <h6 className='text-justify' >Sub-Total</h6>
                            <h4 >${(product.qty * product.price).toFixed(2)}</h4>
                        </Col>
                        <Col className='fa-sharp fa-solid fa-trash m-auto' style={{ "fontSize": "1rem", "padding": "none", "textAlign": "center", "cursor": "pointer" }} onClick={e => removeItemHandler(product._id)} />
                    </Row>
                })}
            </Row>
            <Row md={4} className='justify-content-end' >
                <ListGroup>
                    <ListGroup.Item >
                        <Row >
                            <h4 className='text-center m-auto'>Total</h4>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <h4 className='text-center'>${cartItems.reduce((acc, curr) => acc + (curr.price * curr.qty), 0).toFixed(2)}</h4>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ "maxWidth": "100%" }}>
                        <Row style={{ "maxWidth": "100%" }}>
                            <Button disabled={cartItems.length === 0} style={{ "width": "100%" }}>
                                <Link to={"/shipping-address"} style={{ "maxWidth": "100%" }}>
                                    <span style={{"color":"white"}}>Checkout</span>
                                </Link>
                            </Button>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Row>
        </Container>
    )
}

export default Cart
