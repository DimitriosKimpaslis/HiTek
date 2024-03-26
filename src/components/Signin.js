import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../Client';
import { Cart } from './App';

const Signin = () => {
    const {cart, setCart} = useContext(Cart)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorExist, setErrorExist] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        setErrorExist(false)
        e.preventDefault();
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            setErrorExist(true)
            setErrorMessage(error.message)
        } else {
            navigate('/')
            window.localStorage.setItem('cart', JSON.stringify(cart))
            window.location.reload()
        }
    }

    return (
        <div className='h-[80vh] flex items-center'>
            <div className="w-full max-w-xl min-w-fit mx-auto">
                <h1 className='text-center font-semibold text-3xl'>Sign in </h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} autoComplete='email'/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" autoComplete="current-password"/>
                        {errorExist ? <p className='text-red-500 text-xs italic'>{errorMessage}</p> : ''}
                    </div>
                    <div className="flex items-center justify-between gap-x-10 gap-y-2 flex-wrap">
                        <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign in
                        </button>
                        <NavLink className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to={'/signup'}>
                            Not a member yet?
                        </NavLink>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2023 Dimitrios Kimpaslis. All rights reserved.
                </p>
            </div>

        </div>
    )
}

export default Signin