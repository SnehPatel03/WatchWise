import axios from "axios";

export const getMovieRecommendation = async (preferences) => {
    const res = await axios.post(
        "https://watchwise-5hnp.onrender.com/preferences", preferences
        // "http://localhost:3000/preferences", preferences
    )
    return res.data
} 