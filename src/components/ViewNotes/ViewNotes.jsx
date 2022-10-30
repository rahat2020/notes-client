import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './ViewNotes.css';

const ViewNotes = ({handleModalClose}) => {
  const _id = JSON.parse(localStorage.getItem('data'))
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://notes-server.up.railway.app/notes/get/${_id}`)
        // console.log(res)
        setData(res.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [_id])
  return (
    <div className="viewNotes">
      <div className="Vnotes">
        <div className="card me-2 mt-1" style={{ width: '17rem', borderRadius: '10px' }}>
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>
            <div className="d-flex justify-content-between ">
              <button className="btn btn-primary"><i className="fa-solid fa-xmark" onClick={handleModalClose}></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNotes