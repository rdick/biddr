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
                <div className='welcome-container'>
                    <div className="ui teal clearing segment ">
                        <div>
                            <img src={`${auction.picture}`}></img>
                            <h1 className='auction-title'>{auction.title}</h1>

                            <p >{auction.description}</p>
                            <p >{auction.reserve_price}</p>
                            <p >{auction.ends_at}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <strong>{error}</strong>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    placeholder="Place Your Bid"
                                    name="price"
                                    id="price"
                                    type="number"
                                    className='bid-input'
                                    onChange={handleChange}
                                    value={text1.price}
                                />
                            </div>
                            <div>
                                <button>Bid</button>
                            </div>
                        </form>
                    </div>
                    <h2 className="ui horizontal divider header">Previous Bids</h2>
                    <div className="ui segment">
                        <ul className="ui list">
                            {auction.bids.map(bid => (
                                <div key={bid.id} className="ui raised clearing segment">
                                    <li>${bid.price} on {bid.created_at.toString().split("T")[0]}</li>
                                </div>
                            )
                            )}


                        </ul>
                    </div>
                </div>
                <div class="fill">
                    <img src="https://image.freepik.com/free-photo/abstract-background-luxury-cloth-liquid-wave-wavy-folds_34170-23.jpg" alt="" />
                </div>
            </main>
        );
    }
}

export default AuctionShowPage