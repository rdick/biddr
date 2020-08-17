import React, { useState, useEffect } from 'react'
import { Auction } from '../api/auction'
import { Bid } from '../api/bid'
import './AuctionShowPage.css'

const AuctionShowPage = props => {
    const [auction, setAuction] = useState({ bids: [{ price: 0 }] })
    const [isLoading, setIsLoading] = useState(true)

    const [text1, setText1] = useState({ price: "", auction_id: "" });
    const [error, setError] = useState('')

    useEffect(() => {
        theBest()
    }, [])

    const theBest = () => {
        Auction.one(props.match.params.id)
            .then(auction1 => {

                auction1.bids.sort(function (a, b) {
                    var keyA = new Date(a.price),
                        keyB = new Date(b.price);
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
                setAuction(auction1)
                setIsLoading(false)
            })
    }

    function handleChange(evt) {

        const value = evt.target.value;

        setText1({
            ...text1,
            [evt.target.name]: value,
            auction_id: auction.id
        });
    }

    function handleSubmit(event) {
        event.preventDefault()

        let firstbid = 0 && Object.values(auction.bids)["0"].price
        if (text1.price < firstbid) {
            setError("Your Bid Must Be Higher Then The Last Bid")
        } else {

            resultBid()


        }
    }

    const resultBid = async () => {
        await Bid.create(text1)
            .then(data => {
                if (data.status === 422) {
                    setError(data.error)
                } else {
                    console.log(data)

                    setError("")
                }
            })
        await theBest()
    }

    if (isLoading) {
        return (
            <div>
                Loading
                {/* <Spinner message="Question doesn't exist" />; */}
            </div>
        )
    } else {
        return (
            <main className="AuctionShowPage">
                <div>
                    <div className="auction-container">
                        <img className='auction-picture' src={`${auction.picture}`}></img>
                        <h1 className='auction-title'>{auction.title}</h1>
                        <div className='auction-info'>
                            <p style={{ marginBottom: "0.75em" }}>{auction.description}</p>
                            <p ><span style={{ fontWeight: "300" }}>Minimum Bid Price: </span>${auction.reserve_price}</p>
                            <p ><span style={{ fontWeight: "300" }}>Final Auction Date: </span>{auction.ends_at}</p>
                        </div>
                    </div>
                </div>
                <div className="bid-container">
                    <div>
                        <div>
                            <strong>{error}</strong>
                        </div>
                        <form style={{ display: 'flex', justifyContent: "center" }} onSubmit={handleSubmit}>

                            <input
                                placeholder="$ XXX.XX"
                                name="price"
                                id="price"
                                type="number"
                                className='bid-input'
                                onChange={handleChange}
                                value={text1.price}
                            />
                            <button className='buy-sell-button'>Bid</button>
                        </form>
                    </div>

                    <h2 className="auction-info"><span style={{ fontWeight: "bold" }}>Previous Bids</span></h2>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <ul className="auction-info">
                            {auction.bids.map(bid => (
                                <div key={bid.id} className="all-bids">
                                    <li className="auction-bids" > ${bid.price} on {bid.created_at.toString().split("T")[0]}</li>
                                </div>
                            )
                            )}


                        </ul>
                    </div>
                    {/* <div class="fill">
                    <img src="https://image.freepik.com/free-photo/abstract-background-luxury-cloth-liquid-wave-wavy-folds_34170-23.jpg" alt="" />
                </div> */}
                </div>
            </main>
        );
    }
}

export default AuctionShowPage