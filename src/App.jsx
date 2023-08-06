import React from 'react'
import './App.css'
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51NXQXXAwRLoOvrUw6W65WzTULzDeB5RG35jaGDuJy7FnXr4mykzTz3301icjeJE6zxbE27260IE4ArRYzktvekoB009vXynEAW');

function App() {
 
  return (
    <Router>
        <div className="app">
          <Routes>

            <Route path='/checkout' element={(
                <>
                  <Header />
                  <Checkout />
                </>
              )} />

            <Route path='/login' element={(
                <>
                  <Login />
                </>
              )} />

            <Route path='/payment' element={(
                <>
                  <Header />         
                  <Elements stripe={promise}>          
                    <Payment />
                  </Elements>  
                </>
              )} />

            <Route path='/' element={(
                <>
                  <Header />          {/*This is the homepage route and it should be the last route page*/}
                  <Home />
                </>
              )} />

          </Routes>
        </div>
    </Router>
  )
}

export default App
