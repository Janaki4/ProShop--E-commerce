import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'
import { userRegister } from '../Store/Slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'

const Register = ({ emailState, passwordState, email, password, }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector(state => state.user)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (password !== confirmPassword) setIsError(true)
        else setIsError(false)
        if (userInfo) {
            navigate("/")
        }
    }, [confirmPassword, password, userInfo, navigate])

    const submitHandler = (e, registerDetails) => {
        e.preventDefault()
        dispatch(userRegister(registerDetails))
    }

    return (
        <Container>
            <h2 className='my-2'> Sign Up</h2>
            {isError && <Message variant={"danger"}>Password doesn't match </Message>}
            {loading && <Loader />}
            {error && <Message variant={"danger"}>{error}</Message>}
            <Form className='my-2' onSubmit={e => { submitHandler(e, { name, email, password }) }}>
                <Form.Group controlId='text' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter your name' value={name} onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email' value={email} onChange={e => emailState(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={e => passwordState(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='p-2 my-2'>Sign In</Button>
                <Row >
                    <Col style={{ "display": "flex" }} className='my-3'>New User ?
                        <h5 ><Link to={"/auth/0"} className='text-decoration-none mx-3'>Login </Link></h5>
                    </Col>
                </Row>
            </Form>
        </ Container>
    )
}

export default Register
