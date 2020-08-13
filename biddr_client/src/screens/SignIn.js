import React, { useState } from "react";
import { Session } from '../api/session'
import './SignIn.css'

const SignIn = props => {

    const [text1, setText1] = useState({ email: "", password: "" });
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

        Session.create(text1)
            .then(data => {
                if (data.status === 404) {
                    setError('Wrong Credentidals')
                } else {
                    props.theThing()
                    props.history.push('/auctions')
                }
            })
    }

    return (
        <div>
            <h1>Sign In</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        type="text"
                        onChange={handleChange}
                        value={text1.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        type="text"
                        onChange={handleChange}
                        value={text1.password}
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>

            <div class="fill">
                <img src="https://image.freepik.com/free-photo/abstract-background-luxury-cloth-liquid-wave-wavy-folds_34170-23.jpg" alt="" />
            </div>
        </div>
    );
};
export default SignIn;
