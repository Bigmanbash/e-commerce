import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Currencyformat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios'





function Payment() {
    const [{ basket, user }, dispatch] = useStateValue()
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState('')
    const [ error, setError ] = useState(null)
    const [ disabled, setDisabled ] = useState(true)
    const [ clientSecret, setClientSecret ] = useState(true)

    useEffect(() => {
            // generate the special stripe secret which allows us to charge a customer
            //This snippet is very very important for payment. Do not make mistakes here
            //It is linked to the axios installed
            const getClientSecret = async () => {
                    const response = await axios({
                        method: 'post',
                        // Stripe expects the total in a currencies subunits
                        url: '/payments/create?total=${getBasketTotal(basket) * 100}'
                    })    //axios is used for like post or get request
                    setClientSecret(response.data.clientSecret)
            }
            getClientSecret() 
    }, [basket])

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault()     //This line prevents it from refreshing
        setProcessing(true)        //Prevents submit button from pressing more than once

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)      //This block of code confirms card payment
                                                            //clientSecret let us know how much the customers are charged
            }
        }).then(({ paymentIntent}) => {
            //Payment intent means payment confirmation
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            navigate('/orders', { replace: true })
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    }
    
    return (
        <div className='payment'>
            <div className='payment__container'>
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
                {/* Payment section - delivery address */}
            <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{/*{user?.email}*/}</p>
                    </div>

                </div>

                {/* Payment section - review item */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items And Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe Magic will come here */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                    <Currencyformat 
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )} 
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}                       
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}                       
                                    />
                                    <button 
                                    disabled={ processing || disabled || succeeded }>
                                        <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                    </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment