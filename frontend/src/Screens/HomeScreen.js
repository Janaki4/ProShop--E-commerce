import React from 'react'
// import products from "../products"
import { Col, Row } from "react-bootstrap"
import Product from '../Components/Product'
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from '../Store/Slice/productListSlice'
import { useEffect } from 'react'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const { products, loading, error } = useSelector(state => {
        return state.productList
    })


    return (
        <Container className=''>
            <h3 className='text-center py-3 m-0'>Latest Products</h3>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {products.map(product =>
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                )}
            </Row>}

        </Container>
    )
}

export default HomeScreen
