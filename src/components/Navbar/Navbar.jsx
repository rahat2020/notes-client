import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const Navbar = () => {

    const { user,dispatch } = useContext(AuthContext)
    const handlelogout = () => {
        dispatch({ type:"LOGOUT"})
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="#home" className="navbar-brand fw-bold text-muted">Note</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                user ?
                                    <li className="nav-item fw-bold text-muted me-2 cursor__sign"  onClick={handlelogout}>Logout</li>
                                    :
                                    <li className="nav-item fw-bold text-muted">Login</li>
                            }
                            <li className="nav-item fw-bold text-muted"> {user?.username}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar