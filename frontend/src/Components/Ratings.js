import React from 'react'

const Ratings = ({ rating , text , color }) => {
    return (
        <div className='ratings'>
            <span >
                <i style={{color}} className={rating >= 1 ? "fa-solid fa-star" : rating >= 0.5 ? "fas fa-star-half-alt" : "fa-regular fa-star"}></i>
            </span>
            <span>
            <i style={{color}} className={rating >= 2 ? "fa-solid fa-star" : rating >= 1.5 ? "fas fa-star-half-alt" : "fa-regular fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 3 ? "fa-solid fa-star" : rating >= 2.5 ? "fas fa-star-half-alt" : "fa-regular fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 4 ? "fa-solid fa-star" : rating >= 3.5 ? "fas fa-star-half-alt" : "fa-regular fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 5 ? "fa-solid fa-star" : rating >= 4.5 ? "fas fa-star-half-alt" : "fa-regular fa-star"}></i>
            </span>
            <span style={{marginLeft:"10px"}}>{text && text} Reviews</span>
        </div>
    )
}

Ratings.defaultProps = {
    color:'#f8e825'
}

export default Ratings
