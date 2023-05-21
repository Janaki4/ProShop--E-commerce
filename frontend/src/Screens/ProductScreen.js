import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Image, Form } from "react-bootstrap"
import Ratings from '../Components/Ratings';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../Store/Slice/productListSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message'
import { addItemToCart } from '../Store';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)
    const { id } = useParams();
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => {
        return state.productList
    })

    useEffect(() => {
        dispatch(getProductById(id))
    }, [dispatch, id])

    const addTocartHandler = () => {
        const prodObj = Object.assign({ qty }, product);
        dispatch(addItemToCart(prodObj))
        setAddedToCart(true)
        setTimeout(() => {
            setAddedToCart(false)
        }, 3000)
    }

    return (
        <Container>
            <Link to={'/'} className='btn btn-dark my-5'>Back</Link>
            {addedToCart && <Message>{'Item added to cart'}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                <Row >
                    <Col md={4} >
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3} >
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Ratings rating={product.rating} text={`${product.numReviews}`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price</Col>
                                        <Col>{product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>{product.countInStock > 0 ? "In stock" : "Out of stock"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control as="select" onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>)
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>}
                                <ListGroup.Item>
                                    <Button disabled={product.countInStock === 0} onClick={addTocartHandler}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>}

        </Container>
    )
}

export default ProductScreen
