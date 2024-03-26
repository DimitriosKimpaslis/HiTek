import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../Client';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({error: false, message: ''})
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            setError({error: true, message: 'The passwords are different!'})
            return
        }
        if(password.length < 6){
            setError({error: true, message: 'The passwords must be at least 6 characters!'})
            return
        }
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            })
            if(error){
                setError({error: true, message: error.message})
                return
            }
            if(data.user){
                navigate('/')
                window.location.reload()
            }else{
                return
            }
        }

    return (
        <div className='h-[80vh] flex items-center'>
            <div className="w-full max-w-xl min-w-fit mx-auto">
            <h1 className='text-center px-10 text-3xl font-semibold mb-10'>Sign up and get the best offers in the tech market!</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} autoComplete='email'/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter a password over 6 characters." autoComplete='new-password'/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ConfirmPassword">
                            Confirm Password
                        </label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="ConfirmPassword" type="password" placeholder="Confirm your password" autoComplete='new-password'/>
                        {error ? <p className='text-red-500 text-xs italic'>{error.message}</p> : ''}
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleSignUp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2023 Dimitrios Kimpaslis. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Signup