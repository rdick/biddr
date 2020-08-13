import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignIn from '../screens/SignIn'
import './NavBar.css'

const NavBar = props => {
    const { currentUser, signOut, SignIn } = props

    return (
        <>
            <div className="nav-bar">

                <h1 className='nav-logo' >Luxor</h1>
                {/* <div className='nav-items'> */}
                <NavLink exact to="/" className="nav-item" >
                    About
                    </NavLink>
                <NavLink exact to="/auctions" className="nav-item" >
                    Auctions
                    </NavLink>
                <NavLink exact to="/auctions/new" className="nav-item" >
                    Sell
                    </NavLink>

                {!currentUser && (
                    <NavLink className="nav-item" to="/sign_in" onClick={SignIn}>
                        Sign In
                    </NavLink>
                )}
                {currentUser && (
                    <>
                        <NavLink className="nav-item" to="/" onClick={signOut}>
                            Sign Out
                        </NavLink>
                    </>
                )}
                {/* </div> */}
            </div>
        </>
    )
}

export default NavBar