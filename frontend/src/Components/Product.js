import React from 'react'
import { Card } from 'react-bootstrap'
import Ratings from './Ratings'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body >
                <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                    <Card.Title as="div" ><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Ratings rating={product.rating} text={product.numReviews}/>
                </Card.Text>
                <Card.Text as='div'>
                    <div className='my-2'>${product.price} </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
