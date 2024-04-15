import axios from 'axios';

export async function getAllAgeGroup() {
    try {
        const res = await axios.get("http://localhost:5000/getAllAgeGroup");

        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error("Something went wrong. Please try again later.");
        }
    } catch (error) {
        throw new Error("Something went wrong. Please try again later.");
    }
}