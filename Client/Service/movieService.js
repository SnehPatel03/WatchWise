import axios from "axios";

export const getMovieRecommendation = async (preferences) => {
    const res = await axios.post(
        "http://localhost:3000/preferences", preferences
    )
    return res.data
}