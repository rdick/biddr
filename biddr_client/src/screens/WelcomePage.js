import React from 'react'
import './WelcomePage.css'

const WelcomePage = props => {
    return (
        <>
            <div className='welcome-container'>
                <div className='welcome-title'>
                    <h1 className='luxor-auctions'>Luxor Auctions</h1>

                    <h3 className='welcome-description'> Find Your Dream Car </h3>
                    <div className='welcome-button-container'>
                        <button className='buy-sell-button' onClick={() => props.history.push('/auctions')}>BUY</button>
                        <button className='buy-sell-button' onClick={() => props.history.push('/auctions/new')}>SELL</button>
                    </div>

                </div>


            </div>
            <div class="fill">
                <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />
            </div>
        </>
    )
}

export default WelcomePage