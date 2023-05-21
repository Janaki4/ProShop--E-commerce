import React, { useState , useEffect } from 'react'
import { Row, Col, Form, FormGroup, Button, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../Store/Slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const Login = ({ emailState, passwordState, email, password }) => {
    const navigate = useNavigate()
    const [showErrorCard, setShowErrorCard] = useState(false)
    const dispatch = useDispatch()
    const { loading, error ,userInfo } = useSelector(state => {
        return state.user
    })

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }))

    }

    useEffect(() => {
        if (error) {
            setShowErrorCard(true);
            setTimeout(() => {
                setShowErrorCard(false);
            }, 3000);
        }
        if(userInfo) navigate("/")
    }, [error , userInfo ]);

    return (
        <Container>
            <h2 className='my-2'> Sign In</h2>
            {loading && <Loader />}
            {showErrorCard && <Message variant={"danger"}>{error}</Message>}
            <Form className='my-2' onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary' className='p-2 my-2'>Sign In</Button>
                <Row >
                    <Col style={{ "display": "flex" }} className='my-3'>New User ?
                        <h5>
                            <Link to={"/auth/1"} className='text-decoration-none mx-3'>Register </Link>
                        </h5>
                    </Col>
                </Row>
            </Form>
        </ Container>
    )
}

export default Login
