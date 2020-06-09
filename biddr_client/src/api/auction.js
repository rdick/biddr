import { baseUrl } from "./config";
export const Auction = {
    all() {
        return fetch(`${baseUrl}/auctions`, {
            credentials: "include",
        }).then((res) => res.json());
    },

    one(id) {
        return fetch(`${baseUrl}/auctions/${id}`, {
            credentials: "include",
        }).then((res) => res.json());
    },

    create(params) {
        // params is an object that represents a question
        // { title: 'question title', body: 'question body' }
        return fetch(`${baseUrl}/auctions`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        }).then((res) => res.json());
    },

};