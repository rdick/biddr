import React, { useState, useEffect } from 'react'
import './AuctionIndexPage.css'
import { Auction } from '../api/auction'
import { Link } from 'react-router-dom'


const AuctionIndexPage = props => {
    const [auctions, setAuctions] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Auction.all()
            .then(auctions => {
                setAuctions(auctions)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
                {/* <Spinner message="Loading questions from DB" />; */}
            </div>

        )
    }
    else {
        return (
            <main className="AuctionIndexPage">
                <div style={{ marginTop: '3em' }}>
                    <h2 className="luxor-auctions">Auctions</h2>
                </div>
                <div className='auction-items'>
                    {auctions.map((auction) => (
                        <div key={auction.id} className="auctions-card">
                            <Link to={`/auctions/${auction.id}`} style={{ textDecoration: 'none', position: 'relative', display: "flex", justifyContent: "center" }}>
                                <img src={`${auction.picture}`} className='auction-image' />
                                <h1 className='auction-description'>{auction.title}</h1>
                            </Link>

                        </div>
                    ))}
                </div>


            </main>
        );
    }
}

export default AuctionIndexPage