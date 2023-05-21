import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Image, Form } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer';
import { addPaymentMethod } from '../Store';

const PaymentScreen = () => {
    const dispatch = useDispatch()
    const [paymentMethodState, setPaymentMethodState] = useState("")
    const { paymentMethod } = useSelector(state => state.cart)
    const paymentMethodHandler = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod({ paymentMethod: paymentMethodState }))
    }
    return (
        <FormContainer>
            <Form onSubmit={paymentMethodHandler}>
                <h1>Payment Method</h1>
                <Form.Group>
                    <Form.Label as={"legend"}>Select Payment</Form.Label>
                    <Form.Check type='radio' value="paypal" name="PayPal" id="paypal" label="Paypal / Credit card" onChange={e => setPaymentMethodState(e.target.value)} />
                </Form.Group>
                <Col>
                    <Link to="/place-order">
                        <Button variant='primary' type='submit' className='mt-4' disabled={!paymentMethodState}>Next</Button>
                    </Link>
                </Col>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
