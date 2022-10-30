import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/Context';
import './CreateNotes.css';

const CreateNotes = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const { user } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            title,
            description,
            email: user.email
        }
        console.log(newPost)
        try {
            const res = await axios.post('https://notes-server.up.railway.app/notes/add', newPost)
            console.log(res)
            res && Swal.fire({
                icon: 'success',
                title: "Notes created"
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="createnotes">
            <div className="cnotes">
                <form className="w-75">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white fw-bold">Email</label>
                        <input type="test" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white fw-bold">Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} type="test" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white fw-bold">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary fw-bold" onClick={handleSubmit}>Add</button>
                </form>

            </div>

        </div>
    )
}

export default CreateNotes