import React from 'react';
import { useState } from 'react';
import './Authentication.css';
import axios from 'axios';
import { AuthContext } from '../../Context/Context';
import { useContext } from 'react';
import Swal from 'sweetalert2'


const Authentication = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, Sethide] = useState(false)
    const [registered, setRegistered] = useState('')
    console.log(registered)

    const { dispatch } = useContext(AuthContext)

    const handleShow = () => {
        Sethide(true)
    }
    const handleOff = () => {
        Sethide(false)
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        const userObj = {
            username,
            email,
            password,
        }
        console.log(userObj)
        try {
            const res = await axios.post('https://notes-server.up.railway.app/users/register', userObj)
            console.log(res)
            setRegistered(res.data)
            res && Swal.fire({
                icon: 'success',
                title: "Successfully registered"
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const userObj = {
            username,
            password,
        }
        console.log(userObj)
        try {
            const res = await axios.post('https://notes-server.up.railway.app/users/login', userObj)
            res && Swal.fire({
                icon: 'success',
                title: "Logged successfully"
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            console.log(res)
        } catch (err) {
            console.log(err)
            err && Swal.fire({
                icon: 'error',
                title: "Logged in failed"
            })
        }
    }
    return (
        <div className="authentication">
            <div className="authForm">
                <form className="">
                    <div className="mb-2">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white fw-bold">Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    {
                        registered?.username ?
                            " "
                            :
                            <>
                                {
                                    show ?
                                        <div className="">
                                            <label htmlFor="exampleInputPassword1" className="form-label text-white fw-bold">Email</label>
                                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputPassword1" />
                                        </div>
                                        :
                                        " "
                                }
                            </>
                    }

                    <div className="">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white fw-bold">Password</label>
                        <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                    </div>
                    <div className="mt-4 mb-2">
                        {
                            show ?
                            <>
                            {
                                registered?.username ?
                                <button type="submit" className="btn btn-primary w-100 fw-bold" onClick={handleLogin}>Login</button>
                                :
                                <button type="submit" className="btn btn-primary w-100 fw-bold" onClick={handleRegister}>Register</button>
                            }
                            </>
                                :
                                <button type="submit" className="btn btn-primary w-100 fw-bold" onClick={handleLogin}>Login</button>


                        }
                    </div>
                    <div className="">
                        {
                            show ?
                                <>
                                    <span className="text-white">Already have account?</span>
                                    <span className="text-white fw-bold cursor__sign" onClick={handleOff}> Sign in</span>
                                </>
                                :
                                <>
                                    <span className="text-white">Not have an account yet?</span>
                                    <span className="text-white fw-bold cursor__sign" onClick={handleShow}> Sign up</span>
                                </>


                        }

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Authentication