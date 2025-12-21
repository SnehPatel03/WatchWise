import { promptMaker } from "../Utils/promptMaker.js";
import { getMovieRecommendation } from "../Service/LLM_service.js";
import { getMovieInfo } from "../Service/tmdb_service.js";

export const preference = async (req, res) => {
    try {
        let { genre, mood, era, language, notes, numberOfRec } = req.body;

        if (!genre || genre.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Genre is required"
            });
        }

        if (genre.length > 3) {
            return res.status(400).json({
                success: false,
                message: "You can select a maximum of 3 genres"
            });
        }

        if (!mood || typeof mood !== "string") {
            return res.status(400).json({
                success: false,
                message: "Mood is required"
            });
        }

        if (!era || typeof era !== "string") {
            return res.status(400).json({
                success: false,
                message: "Era is required"
            });
        }

        if (!language || typeof language !== "string") {
            return res.status(400).json({
                success: false,
                message: "Language is required"
            });
        }

        if (!numberOfRec) {
            numberOfRec = 5;
        }
        if (typeof numberOfRec !== "number") {
            return res.status(400).json({
                success: false,
                message: "Number of Recommentation is must be Number"
            });
        }

        const prompt = promptMaker({ genre, mood, language, notes, numberOfRec })
        const moviesJSON = await getMovieRecommendation(prompt)
        const aimovies = JSON.parse(moviesJSON)
// console.log("aimovies" ,aimovies)
        const movies = [];
        for (const m of aimovies) {
            const movieData = await getMovieInfo(m.title, m.year)
            console.log(movieData)
            if (movieData) {
                movies.push(movieData)
            }
        }

        res.status(200).json({
            success: true,
            message: "Movies Data Fetched Successfully",
            data: movies
        })
    }
    catch (error) {
        console.error("Preference controller error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
