import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return  (
        <div className='home'>
            <div className='home__container'>
                    <img 
                        className='home__image'
                        src='https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg'
                        alt='e-commerce'
                    />

                    <div className='home__row'>
                    <Product
                            id= '1'
                            title='The lean startup'
                            price={29.99}
                            image='/lean-start-up.jpg'
                            rating={5}
                         />
                        <Product 
                            id= '2'
                            title='Petrol engine grinding machine'
                            price={129.99}
                            image='/grinding-machine.jpg'
                            rating={4}
                        />
                    </div>

                    <div className='home__row'>
                        <Product 
                            id= '3'
                            title='Laptop Bag Pack'
                            price={5.99}
                            image='/bag.jpg'
                            rating={5}
                        />
                        <Product
                            id= '4'
                            title='iPhone 14 Pro Max, 1Terabyte ROM'
                            price={1999.99}
                            image='/iPhone-14-promax.jpg'
                            rating={5}
                        />
                        <Product 
                            id= '5'
                            title='Benz 2023 Driverless Car With Petrol, Electric And Solar Powered'
                            price={65999.99}
                            image='/benz-2023.jpg'
                            rating={5}
                        />
                    </div>

                    <div className='home__row'>
                        <Product 
                            id= '6'
                            title='Sony Play Station 5 Console'
                            price={999.99}
                            image='/sony-playstation5.jpg'
                            rating={5}
                        />
                    </div>

            </div>
        </div>
    )
}

export default Home;