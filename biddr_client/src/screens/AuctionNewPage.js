import React, { useState } from 'react'
import { Auction } from '../api/auction'

const AuctionNewPage = props => {
    const [text1, setText1] = useState({ title: "", description: "", ends_at: "", reserve_price: "" });
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
        <div>
            <h1>New Auction</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        onChange={handleChange}
                        value={text1.title}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        name="description"
                        id="description"
                        type="text"
                        onChange={handleChange}
                        value={text1.description}
                    />
                </div>
                <div>
                    <label htmlFor="ends_at">Ends at</label>
                    <input
                        name="ends_at"
                        id="ends_at"
                        type="date"
                        onChange={handleChange}
                        value={text1.ends_at}
                    />
                </div>
                <div>
                    <label htmlFor="reserve_price">Reserve Price</label>
                    <input
                        name="reserve_price"
                        id="reserve_price"
                        type="number"
                        onChange={handleChange}
                        value={text1.reserve_price}
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AuctionNewPage