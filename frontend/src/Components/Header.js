import React, { useState } from 'react'
import {
    Nav, Navbar, Container, NavDropdown
} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"
import { useSelector , useDispatch } from 'react-redux'
import { logout } from '../Store'

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container className='mr-auto'>
                    <LinkContainer to="/">
                        <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className='col justify-content-end'>
                            <LinkContainer to='/cart' style={{ "position": "relative" }}>
                                <Nav.Link > <i className='fas fa-shopping-cart'></i> Cart <span style={{ "position": "relative", "top": "-4px", "right": "-2px", "fontSize": "1rem", }}>{cartItems.length}</span></Nav.Link>
                            </LinkContainer>
                            {userInfo ? (<NavDropdown title={userInfo.name} id="username" >
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>) : <LinkContainer to="/auth/0">
                                <Nav.Link > <i className='fas fa-user'></i> Login</Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
