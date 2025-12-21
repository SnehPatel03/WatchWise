import { preference } from "../Controllers/preferencesController.js"

export const promptMaker = (preference) => {
    const { genre, mood, era, language, notes, numberOfRec } = preference;

    const genreString = genre.join(", ")
    const prompt = `You are a highly precise movie recommendation assistant. 
Follow these rules strictly:

1. The user preferences are:
   - Genres: ${genreString}
   - Mood: ${mood}
   - Language: ${language}
   - Era: ${era}
   - Number of recommendations: ${numberOfRec}
   - Notes: ${notes || "No additional notes provided"}

2. Your output must:
   - Recommend exactly ${numberOfRec} movies.
   - Each movie must strictly match the given genre, mood, and language.
   - Use the notes field to guide semantic relevance if provided.
   - Return only the movie titles and release years.
   - Format output as a JSON array:
     [
       { "title": "Movie Title 1", "year": 2020 },
       { "title": "Movie Title 2", "year": 2018 }
     ]
   - Do NOT include explanations, recommendations outside the given preferences, or extra text.
   - Avoid hallucinations: do not make up movies or years; recommend real movies only.

3. Always ensure:
   - Output is valid JSON.
   - Number of items exactly equals ${numberOfRec}.
   - Movies strictly match the user preferences.

Provide the list of movies in JSON format only.`

    return prompt.trim();
}