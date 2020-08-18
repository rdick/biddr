import React, { useState } from 'react'
import { Auction } from '../api/auction'
import './AuctionNewPage.css'

const AuctionNewPage = props => {
    const [text1, setText1] = useState({ title: "", description: "", ends_at: "", reserve_price: "", picture: "" });
    const [error, setError] = useState('')

    function handleChange(evt) {
        const value = evt.target.value;
        setText1({
            ...text1,
            [evt.target.name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault()

        Auction.create(text1)
            .then(data => {
                if (data.status === 422) {
                    setError('Input Invalid')
                } else {
                    props.history.push(`/auctions/${data.id}`)
                }
            })
    }

    return (
        <div className='AuctionNewPage'>

            <div className='welcome-container'>
                <div className='welcome-title'>
                    <h1 className='luxor-auctions'>New Auction</h1>

                    <h3 className='welcome-description' style={{ fontSize: "2em" }}> Please Fill Out The Following</h3>
                    <p>{error}</p>
                    <form onSubmit={handleSubmit} className='new-form'>

                        <input
                            className='new-input input-name'
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Auction Name"
                            onChange={handleChange}
                            value={text1.title}
                        />

                        <textarea
                            className='new-input input-description'
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Auction Description"
                            onChange={handleChange}
                            value={text1.description}
                        />
                        <div className='new-2inputs-container'>
                            <input
                                className='new-input input-date'
                                name="ends_at"
                                id="ends_at"
                                type="date"
                                placeholder="DATE"
                                onChange={handleChange}
                                value={text1.ends_at}
                            />

                            <input
                                className='new-input input-price'
                                name="reserve_price"
                                id="reserve_price"
                                type="number"
                                placeholder="Reserve Price"
                                onChange={handleChange}
                                value={text1.reserve_price}
                            />

                        </div>
                        <input
                            className='new-input input-name'
                            name="picture"
                            id="picture"
                            type="text"
                            placeholder="Picture URL"
                            onChange={handleChange}
                            value={text1.picture}
                        />
                        <button className='buy-sell-button new-submit'>Submit</button>

                    </form>
                </div>
            </div>

            <div class="fill">
                <img src="https://image.freepik.com/free-photo/abstract-background-luxury-cloth-liquid-wave-wavy-folds_34170-23.jpg" alt="" />
            </div>


        </div>
    );
}

export default AuctionNewPage