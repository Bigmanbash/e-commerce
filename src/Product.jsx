import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({ title, image, price, rating, id }) {
    const [{ basket }, dispatch] = useStateValue();  
    
    console.log("this is the basket >>>", basket)

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
              id: id,
              title: title,
              image: image,
              price: price,
              rating: rating
            }
        })
    }

    return  (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                    <img 
                      src='data:image/png;base64,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'
                      alt=''
                    />
                    ))}
                </div>
            </div>
                <img 
                src={image}
                alt=''
                    />
                <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}

export default Product