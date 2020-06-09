import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignIn from '../screens/SignIn'

const NavBar = props => {
    const { currentUser, signOut, SignIn } = props

    return (

        <div className="ui secondary pointing menu">
            <NavLink exact to="/" className="item">
                Home
</NavLink>
            <NavLink exact to="/auctions" className="item">
                Auctions
</NavLink>

            {!currentUser && (
                <NavLink className="ui small blue button" to="/sign_in" onClick={SignIn}>
                    Sign In
                </NavLink>
            )}
            {currentUser && (
                <>
                    <NavLink className="ui small red button" to="/" onClick={signOut}>
                        Sign Out
            </NavLink>
                </>
            )}
            <div className="right menu">
            </div>
        </div>
    )
}

export default NavBar