import React, { useState, useEffect } from 'react'
import { Row, Col, Form, FormGroup, Button, Container } from "react-bootstrap"
import FormContainer from "../Components/FormContainer"
import Login from '../Components/Login'
import Register from '../Components/Register'
import { useParams } from 'react-router-dom'

const UserAuthScreen = () => {
    const { page } = useParams()
    const [whichPage, setWhichPage] = useState(page)
    useEffect(() => {
        setWhichPage(+page)
    }, [page])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailStateCallbackFn = (email) => {
        setEmail(email)
    }
    const passwordStateCallbackFn = (password) => {
        setPassword(password)
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {whichPage === 0 ? <Login emailState={emailStateCallbackFn} passwordState={passwordStateCallbackFn} email={email} password={password} /> :
                        <Register emailState={emailStateCallbackFn} passwordState={passwordStateCallbackFn} email={email} password={password} />}
                </Col>
            </Row>
        </Container>
    )
}

export default UserAuthScreen
