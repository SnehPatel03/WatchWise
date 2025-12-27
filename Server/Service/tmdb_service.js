import axios from "axios";

export const getMovieInfo = async (title, year) => {
    try {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: '25c19ccb',
                t: title,
                y: year
            }
        })
        if (response.data.Response === 'False') {
            return null
        }
        
        return {
            title: response.data.Title,
            year: response.data.Year,
            poster: response.data.Poster !== "N/A" ? response.data.Poster : 'https://www.freepik.com/free-photos-vectors/question-mark',
            rating: response.data.imdbRating,
            releaseDate: response.data.Released,
            language: response.data.Language,
            type: response.data.Type
        }
    } catch (error) {
        console.error("OMDB Error:", error);
        return null;
    }
}

// const result = await getMovieInfo('Hereditary',2018)
// console.log(result)