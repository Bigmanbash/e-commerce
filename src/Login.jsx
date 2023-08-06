import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login()    {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = e => {
        e.preventDefault()  // this line prevents refreshing. We dont like refreshing in React.

        //Do some fancy firebase login here
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                    //It successfully created a new user with email and password
                    console.log(auth)
                if (auth) {
                     navigate('/')
                } 
            })
            .catch(error => alert(error.message)) 

            //Do some fancy firebase register here
    }


    return  (
        <div className='login'>
                <Link to='/'>
                <img
                    className='login__logo' 
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' />
                </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange = {e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange= {e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn}
                    className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON'S FAKE CLONE CONDITIONS of Use & Sale. Please see our 
                    Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register}
                className='login__registerButton'>Create your amazon account</button>
            </div>

        </div>
    )
}

export default Login