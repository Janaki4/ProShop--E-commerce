import React, { useEffect, useState } from 'react'
import { Button, ListGroup, Form, FormGroup, FormControl } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import Ratings from '../Components/Ratings';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer';
import { addShippingAddress } from '../Store';

const ShippingAddress = () => {
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [state, setState] = useState(shippingAddress.state || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const addressSubmitHandler = (e) => {
        console.log("object")
        e.preventDefault()
        dispatch(addShippingAddress({ address, state, postalCode, country }))
    }
    return (
        <FormContainer>
            <Form onSubmit={addressSubmitHandler}>
                <Form.Group controlId='address' className='py-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Address' required value={address} onChange={e => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='state' className='py-2'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type='text' placeholder='State' required value={state} onChange={e => setState(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='py-2'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control type='text' placeholder='Postal code' required value={postalCode} onChange={e => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='py-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Country' required value={country} onChange={e => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Link to={"/payment"}> 
                    <Button type='submit'>Continue</Button>
                </Link>
            </Form>
        </FormContainer>
    )
}

export default ShippingAddress
