import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'

function Checkout() {
    const [{ basket }, dispatch] = useStateValue()

    return  (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad' src='/advert1.jpg' alt='e-commerce' />
                <div>
                    <h2 className='checkout__title'>Your Shopping Basket</h2>
                    <h2>
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </h2>
                </div>
            </div>
            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout