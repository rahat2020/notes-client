import React, { useState } from 'react';
import './Notes.css';
import CreateNotes from '../CreateNotes/CreateNotes';
import { AuthContext } from '../../Context/Context';
import { useContext } from 'react';
import Authentication from '../Authentication/Authentication';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ViewNotes from '../ViewNotes/ViewNotes';

const Notes = () => {
    const [isOpen, setOpen] = useState(false)
    const [isAuth, setAuth] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [open, setModalOpen] = useState(false)

    const handleModalOpen = (_id) => {
        setModalOpen(true)
        localStorage.setItem('data', JSON.stringify(_id))
    }
    const handleOff = () => {
        setOpen(false)
        console.log('off clicked')
    }
    const handleOnn = () => {
        setOpen(true)
        console.log('clicked')
    }

    const handleAuthOff = () => {
        setAuth(!isAuth)
    }
    const handleAuthOn = () => {
        setAuth(true)
        // setCancel(true)
        console.log('clicked')
    }

    const { user } = useContext(AuthContext)

    // GET DATA FROM DATABASE
    const [data, setData] = useState([])
    // console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/notes/getByEmail?email=` + user?.email)
                // console.log(res)
                setData(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [user])

    // DELETE NOTES FROM DATABASE
    const handleDeleteOrder = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/notes/delete/${_id}`)
            res && Swal.fire({
                icon: "success",
                title: "Note deleted successfully"
            })
            res && window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="notes shadow">

            <div className="note__container">
                {
                    data.map((item, index) => (
                        <div className="card me-2 mt-1" style={{ width: '17rem', borderRadius: '10px' }} key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <div className="d-flex justify-content-between ">
                                    <button className="btn btn-danger" onClick={() => handleModalOpen(item._id)}>View</button>
                                    <button className="btn btn-primary" onClick={handleDeleteOrder}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    open ?
                        <ViewNotes/>
                        :
                        " "
                }
                {
                    isOpen ?
                        <CreateNotes isOpen={!isOpen} />
                        :
                        <>
                            {
                                data ?
                                    " "
                                    :
                                    <div className="d-flex justify-content-center align-items-center h-100 w-100 mt-5 pt-5">
                                        <h4 className="text-muted">Create your notes 😀</h4>
                                    </div>

                            }

                        </>
                }

            </div>
            <div className="noteAuth">
                {
                    user ?

                        " "
                        :
                        <>
                            {
                                isAuth ?
                                    <Authentication />
                                    :
                                    " "
                            }
                        </>
                }
            </div>
            <div className="float__button">
                {
                    isOpen ?
                        <button className="fl__btn" onClick={handleOff}><i className="fa-solid fa-xmark"></i></button>
                        :
                        <>
                            {
                                user ?
                                    <button className="fl__btn" onClick={handleOnn}><i className="fa-solid fa-plus"></i></button>
                                    :

                                    <>
                                        {
                                            cancel ?
                                                <button className="fl__btn" onClick={() => setCancel(cancel)}>Cancel</button>
                                                :
                                                <button className="fl__btn" onClick={handleAuthOn}>Login</button>

                                        }

                                    </>

                            }
                        </>
                }
                {/* <button className="btn-primary" >VIEW DEMO</button> */}

            </div>
        </div>
    )
}

export default Notes